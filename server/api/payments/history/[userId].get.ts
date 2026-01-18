// 取得付款歷史 API
import { defineEventHandler, getRouterParam, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentUser } from '../../../utils/auth'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createAuthorizationError } from '../../../utils/error-handler'
import { validateId, validatePaginationParams } from '../../../utils/validation'
import { calculatePagination, calculateOffset } from '../../../utils/api-response'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')

  try {
    validateId(userId, 'userId')

    const query = getQuery(event)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10

    validatePaginationParams(page, limit)
    const offset = calculateOffset(page, limit)

    // 驗證權限：只能查看自己的付款歷史
    const currentUser = await getCurrentUser(event)
    if (currentUser && currentUser.id !== userId && currentUser.role !== 'admin') {
      throw createAuthorizationError('查看此付款歷史')
    }

    const db = getD1(event)

    // 取得付款記錄（從 bookings 和 payments 表）
    const { results: payments } = await db
      .prepare(
        `SELECT
          p.*,
          b.service_date,
          b.start_time,
          b.end_time,
          b.service_type,
          b.total_amount as booking_amount,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name
         FROM payments p
         LEFT JOIN bookings b ON p.booking_id = b.id
         LEFT JOIN caregivers c ON b.caregiver_id = c.id
         LEFT JOIN users cu ON c.user_id = cu.id
         WHERE p.user_id = ?
         ORDER BY p.created_at DESC
         LIMIT ? OFFSET ?`,
      )
      .bind(userId, limit, offset)
      .all()

    // 取得總數
    const totalResult = await db
      .prepare('SELECT COUNT(*) as count FROM payments WHERE user_id = ?')
      .bind(userId)
      .first()

    const total = Number(totalResult?.count || 0)

    // 計算統計資料
    const statsResult = await db
      .prepare(
        `SELECT
          COUNT(*) as total_payments,
          COALESCE(SUM(amount), 0) as total_amount,
          COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as paid_amount,
          COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_amount
         FROM payments
         WHERE user_id = ?`,
      )
      .bind(userId)
      .first()

    const pagination = calculatePagination(total, page, limit)

    return createSuccessResponse(
      {
        payments: payments || [],
        stats: {
          totalPayments: Number(statsResult?.total_payments) || 0,
          totalAmount: Number(statsResult?.total_amount) || 0,
          paidAmount: Number(statsResult?.paid_amount) || 0,
          pendingAmount: Number(statsResult?.pending_amount) || 0,
        },
      },
      undefined,
      { pagination },
    )
  } catch (error: any) {
    handleError(error, '取得付款歷史')
  }
})
