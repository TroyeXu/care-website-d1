// 管理員：更新預約狀態 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createValidationError,
} from '../../../utils/error-handler'
import { validateId, validateRequired, validateEnum } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('booking.edit')(event)

  const bookingId = getRouterParam(event, 'id')
  const { status, reason, notes } = await readBody(event)

  try {
    // 使用統一的驗證工具
    validateId(bookingId, 'id')
    validateRequired(status, 'status', '狀態')

    // 驗證狀態列舉值
    const validStatuses = [
      'pending',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled',
      'disputed',
    ]
    validateEnum(status, validStatuses, 'status', '預約狀態')

    const db = getD1(event)
    const admin = event.context.admin

    // 取得當前預約狀態
    const booking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(bookingId)
      .first()

    if (!booking) {
      throw createNotFoundError('預約', bookingId)
    }

    const previousStatus = booking.status

    // 檢查狀態轉換是否合法
    const statusTransitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['in_progress', 'cancelled'],
      in_progress: ['completed', 'disputed', 'cancelled'],
      completed: ['disputed'],
      cancelled: [],
      disputed: ['resolved', 'cancelled'],
    }

    const allowedTransitions = statusTransitions[previousStatus as string] || []

    // 管理員可以強制更改狀態（除了某些限制）
    if (!admin.is_super && !allowedTransitions.includes(status)) {
      throw createValidationError(
        `無法從 ${previousStatus} 轉換到 ${status}`,
        'status',
      )
    }

    // 使用批次操作（D1 不支援事務）
    const operations = []

    // 更新預約狀態
    operations.push(
      db
        .prepare(
          `
        UPDATE bookings 
        SET status = ?, updated_at = ?
        WHERE id = ?
      `,
        )
        .bind(status, new Date().toISOString(), bookingId),
    )

    // 記錄狀態變更
    operations.push(
      db
        .prepare(
          `
        INSERT INTO booking_logs (
          id, booking_id, action, previous_status, new_status,
          actor_id, actor_type, reason, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        )
        .bind(
          nanoid(),
          bookingId,
          'status_change',
          previousStatus,
          status,
          admin.id,
          'admin',
          reason || null,
          notes || null,
          new Date().toISOString(),
        ),
    )

    // 如果是取消預約，可能需要處理退款
    if (status === 'cancelled' && previousStatus !== 'cancelled') {
      // 這裡可以加入退款邏輯
      // 由於沒有實際付款系統，只記錄退款意圖
      operations.push(
        db
          .prepare(
            `
          INSERT INTO refunds (
            id, booking_id, amount, reason, status, 
            processed_by, notes, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
          )
          .bind(
            nanoid(),
            bookingId,
            booking.total_amount,
            reason || '管理員取消預約',
            'pending',
            admin.id,
            notes || null,
            new Date().toISOString(),
          ),
      )
    }

    // 執行批次操作
    await db.batch(operations)

    // 記錄管理員操作
    await logAdminAction(event, 'update_booking_status', 'booking', bookingId, {
      previous_status: previousStatus,
      new_status: status,
      reason,
      notes,
    })

    // 取得更新後的預約資料
    const updated = await db
      .prepare(
        `
        SELECT 
          b.*,
          u.name as user_name,
          cu.name as caregiver_name
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN caregivers c ON b.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE b.id = ?
      `,
      )
      .bind(bookingId)
      .first()

    return createSuccessResponse(
      {
        id: updated?.id,
        status: updated?.status,
        user_name: updated?.user_name,
        caregiver_name: updated?.caregiver_name,
        updated_at: updated?.updated_at,
      },
      '預約狀態已更新',
    )
  } catch (error: any) {
    handleError(error, '更新預約狀態')
  }
})
