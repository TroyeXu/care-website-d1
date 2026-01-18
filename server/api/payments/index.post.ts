// 記錄付款資訊 API (供管理員使用)
import { defineEventHandler, readBody } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../utils/d1'
import { getCurrentUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createValidationError,
  createAuthorizationError,
} from '../../utils/error-handler'
import {
  validateRequired,
  validateEnum,
  validateNumberRange,
} from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    booking_id: bookingId,
    amount,
    payment_method: paymentMethod,
    transaction_id: transactionId,
    status,
    notes,
  } = body

  try {
    // 使用統一的驗證工具
    validateRequired(bookingId, 'booking_id', '預約 ID')
    validateRequired(amount, 'amount', '金額')
    validateRequired(paymentMethod, 'payment_method', '付款方式')

    // 驗證金額
    validateNumberRange(amount, 0.01, 1000000, 'amount', '金額')

    // 驗證付款方式
    const validMethods = ['bank_transfer', 'cash', 'credit_card', 'other']
    validateEnum(paymentMethod, validMethods, 'payment_method')

    const db = getD1(event)

    // 檢查預約是否存在
    const booking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(bookingId)
      .first()

    if (!booking) {
      throw createNotFoundError('預約', bookingId)
    }

    // 驗證權限（只有管理員或預約的用戶可以記錄付款）
    const user = await getCurrentUser(event)
    if (user && booking.user_id !== user.id && user.role !== 'admin') {
      throw createAuthorizationError('記錄此付款')
    }

    const paymentId = nanoid()

    // 插入付款記錄
    await db
      .prepare(
        `INSERT INTO payments (
          id, booking_id, user_id, amount, payment_method,
          transaction_id, status, processed_at, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
      )
      .bind(
        paymentId,
        bookingId,
        booking.user_id,
        amount,
        paymentMethod,
        transactionId || null,
        status || 'completed',
      )
      .run()

    // 更新預約的付款狀態
    await db
      .prepare(
        `UPDATE bookings
         SET payment_status = ?,
             payment_method = ?,
             updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(status || 'completed', paymentMethod, bookingId)
      .run()

    // 取得新建立的付款記錄
    const newPayment = await db
      .prepare(
        `SELECT
          p.*,
          b.service_date,
          b.total_amount as booking_amount,
          u.name as user_name,
          u.email as user_email
         FROM payments p
         LEFT JOIN bookings b ON p.booking_id = b.id
         LEFT JOIN users u ON p.user_id = u.id
         WHERE p.id = ?`,
      )
      .bind(paymentId)
      .first()

    return createSuccessResponse(newPayment, '付款記錄已建立')
  } catch (error: any) {
    handleError(error, '建立付款記錄')
  }
})
