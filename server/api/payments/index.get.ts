import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../utils/d1'
import {
  createSuccessResponse,
  calculatePagination,
  calculateOffset,
} from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'
import { validatePaginationParams } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    /* eslint-disable camelcase */
    const { user_id, booking_id, status } = query
    /* eslint-enable camelcase */

    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 20

    validatePaginationParams(page, limit)
    const offset = calculateOffset(page, limit)

    const db = getD1(event)

    // 建立查詢條件
    const conditions = []
    const params = []

    if (user_id) {
      conditions.push('p.user_id = ?')
      params.push(user_id)
    }

    if (booking_id) {
      conditions.push('p.booking_id = ?')
      params.push(booking_id)
    }

    if (status) {
      conditions.push('p.status = ?')
      params.push(status)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 查詢總數
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM payments p
      ${whereClause}
    `
    const countStmt =
      params.length > 0
        ? db.prepare(countQuery).bind(...params)
        : db.prepare(countQuery)
    const countResult = (await countStmt.first()) as { total: number }

    // 查詢付款記錄
    const listQuery = `
      SELECT 
        p.*,
        u.name as user_name,
        u.email as user_email,
        b.service_date,
        b.start_time,
        b.end_time,
        b.caregiver_id,
        cu.name as caregiver_name
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN bookings b ON p.booking_id = b.id
      LEFT JOIN caregivers c ON b.caregiver_id = c.id
      LEFT JOIN users cu ON c.user_id = cu.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `

    const listParams = [...params, Number(limit), offset]
    const listStmt = db.prepare(listQuery).bind(...listParams)
    const results = await listStmt.all()

    // 計算統計資料
    let stats = null
    /* eslint-disable camelcase */
    if (user_id) {
      const statsQuery = `
        SELECT
          COUNT(*) as total_payments,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_payments,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_payments,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_payments,
          COUNT(CASE WHEN status = 'refunded' THEN 1 END) as refunded_payments,
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_amount
        FROM payments
        WHERE user_id = ?
      `
      stats = await db.prepare(statsQuery).bind(user_id).first()
    }
    /* eslint-enable camelcase */

    const total = Number(countResult?.total || 0)
    const pagination = calculatePagination(total, page, limit)

    return createSuccessResponse(
      {
        payments: results.results || [],
        stats,
      },
      undefined,
      { pagination },
    )
  } catch (error: any) {
    handleError(error, '獲取付款記錄')
  }
})
