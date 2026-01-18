// 管理員更新付款狀態 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import {
  getCurrentAdmin,
  hasPermission,
  logAdminAction,
} from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
} from '../../../utils/error-handler'
import { validateId, validateRequired, validateEnum } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const paymentId = getRouterParam(event, 'id')
  const { status, notes } = await readBody(event)

  try {
    validateId(paymentId, 'id')
    validateRequired(status, 'status', '付款狀態')

    // 驗證狀態值
    const validStatuses = ['pending', 'completed', 'failed', 'refunded']
    validateEnum(status, validStatuses, 'status')

    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限
    if (!hasPermission(admin, 'payments.edit')) {
      throw createAuthorizationError('無此操作權限')
    }

    const db = getD1(event)

    // 檢查付款是否存在
    const payment = await db
      .prepare('SELECT * FROM payments WHERE id = ?')
      .bind(paymentId)
      .first()

    if (!payment) {
      throw createNotFoundError('付款記錄', paymentId)
    }

    // 更新付款狀態
    await db
      .prepare(
        `UPDATE payments
         SET status = ?,
             processed_at = CASE WHEN ? = 'completed' THEN datetime('now') ELSE processed_at END
         WHERE id = ?`,
      )
      .bind(status, status, paymentId)
      .run()

    // 同步更新預約的付款狀態
    await db
      .prepare(
        `UPDATE bookings
         SET payment_status = ?,
             updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(status, payment.booking_id)
      .run()

    // 記錄操作日誌
    await logAdminAction(
      event,
      'update_payment_status',
      'payment',
      paymentId,
      { old_status: payment.status, new_status: status, notes },
    )

    // 取得更新後的付款記錄
    const updatedPayment = await db
      .prepare(
        `SELECT
          p.*,
          b.service_date,
          b.total_amount as booking_amount,
          u.name as user_name
         FROM payments p
         LEFT JOIN bookings b ON p.booking_id = b.id
         LEFT JOIN users u ON p.user_id = u.id
         WHERE p.id = ?`,
      )
      .bind(paymentId)
      .first()

    return createSuccessResponse(updatedPayment, '付款狀態更新成功')
  } catch (error: any) {
    handleError(error, '更新付款狀態')
  }
})
