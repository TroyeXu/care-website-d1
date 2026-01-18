// 更新預約狀態 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { getCurrentUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createAuthorizationError,
} from '../../utils/error-handler'
import {
  validateId,
  validateRequired,
  validateEnum,
} from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const bookingId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(bookingId, 'id')

    const { status } = await readBody(event)

    // 驗證必填欄位
    validateRequired(status, 'status')

    // 驗證狀態值
    const validStatuses = [
      'pending',
      'confirmed',
      'in_progress',
      'completed',
      'cancelled',
    ]
    validateEnum(status, validStatuses, 'status')

    const db = getD1(event)

    // 檢查預約是否存在
    const booking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(bookingId)
      .first()

    if (!booking) {
      throw createNotFoundError('預約', bookingId)
    }

    // 驗證權限
    const user = await getCurrentUser(event)
    if (user && booking.user_id !== user.id) {
      if (user.role !== 'admin') {
        throw createAuthorizationError('更新此預約')
      }
    }

    // 更新預約狀態
    await db
      .prepare(
        `UPDATE bookings
         SET status = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(status, bookingId)
      .run()

    // 如果狀態變更為 completed，自動更新付款狀態
    if (status === 'completed') {
      await db
        .prepare(
          `UPDATE bookings
           SET payment_status = 'pending'
           WHERE id = ? AND payment_status = 'pending'`,
        )
        .bind(bookingId)
        .run()
    }

    // 取得更新後的預約資料
    const updatedBooking = await db
      .prepare(
        `SELECT
          b.*,
          u.name as user_name,
          u.email as user_email,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name
         FROM bookings b
         LEFT JOIN users u ON b.user_id = u.id
         LEFT JOIN caregivers c ON b.caregiver_id = c.id
         LEFT JOIN users cu ON c.user_id = cu.id
         WHERE b.id = ?`,
      )
      .bind(bookingId)
      .first()

    return createSuccessResponse(updatedBooking, '預約狀態更新成功')
  } catch (error: any) {
    handleError(error, '更新預約狀態')
  }
})
