import type { D1Database } from '@cloudflare/workers-types'
import { calculateOffset, calculatePagination } from '../api-response'

interface AdminBookingListParams {
  status?: string
  caregiver_id?: string
  user_id?: string
  date_from?: string
  date_to?: string
  page?: number
  limit?: number
  sort?: string
  order?: string
}

export const getAdminBookingsList = async (
  db: D1Database,
  queryParams: AdminBookingListParams,
) => {
  /* eslint-disable camelcase */
  const {
    status,
    caregiver_id,
    user_id,
    date_from,
    date_to,
    page = 1,
    limit = 20,
    sort = 'created_at',
    order = 'desc',
  } = queryParams
  /* eslint-enable camelcase */

  // 建立查詢條件
  const conditions: string[] = []
  const params: any[] = []

  if (status) {
    conditions.push('b.status = ?')
    params.push(status)
  }

  /* eslint-disable camelcase */
  if (caregiver_id) {
    conditions.push('b.caregiver_id = ?')
    params.push(caregiver_id)
  }

  if (user_id) {
    conditions.push('b.user_id = ?')
    params.push(user_id)
  }

  if (date_from) {
    conditions.push('b.service_date >= ?')
    params.push(date_from)
  }

  if (date_to) {
    conditions.push('b.service_date <= ?')
    params.push(date_to)
  }
  /* eslint-enable camelcase */

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // 計算總數
  const countResult = await db
    .prepare(
      `SELECT COUNT(*) as total
      FROM bookings b
      ${whereClause}`,
    )
    .bind(...params)
    .first()

  const total = (countResult?.total as number) || 0

  // 查詢預約列表
  const offset = calculateOffset(Number(page), Number(limit))
  const result = await db
    .prepare(
      `SELECT
        b.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        c.user_id as caregiver_user_id,
        cu.name as caregiver_name,
        cu.email as caregiver_email,
        cu.phone as caregiver_phone,
        (SELECT COUNT(*) FROM booking_logs WHERE booking_id = b.id) as log_count,
        (SELECT COUNT(*) FROM booking_disputes WHERE booking_id = b.id) as dispute_count
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN caregivers c ON b.caregiver_id = c.id
      LEFT JOIN users cu ON c.user_id = cu.id
      ${whereClause}
      ORDER BY b.${sort} ${order}
      LIMIT ? OFFSET ?`,
    )
    .bind(...params, Number(limit), offset)
    .all()

  // 格式化資料
  const bookings = (result.results || []).map((row: any) => ({
    id: row.id,
    user: {
      id: row.user_id,
      name: row.user_name,
      email: row.user_email,
      phone: row.user_phone,
    },
    caregiver: {
      id: row.caregiver_id,
      name: row.caregiver_name,
      email: row.caregiver_email,
      phone: row.caregiver_phone,
    },
    service_date: row.service_date,
    start_time: row.start_time,
    end_time: row.end_time,
    service_hours: row.service_hours,
    service_location: row.service_location,
    service_type: row.service_type,
    requirements: row.requirements,
    status: row.status,
    total_amount: row.total_amount,
    payment_status: row.payment_status,
    payment_method: row.payment_method,
    notes: row.notes,
    log_count: row.log_count,
    dispute_count: row.dispute_count,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }))

  // 統計資料
  const statsResult = await db
    .prepare(
      `SELECT
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
        SUM(CASE WHEN status = 'completed' THEN total_amount END) as total_revenue
      FROM bookings b
      ${whereClause}`,
    )
    .bind(...params)
    .first()

  const pagination = calculatePagination(
    Number(total),
    Number(page),
    Number(limit),
  )

  return {
    bookings,
    stats: {
      pending: (statsResult?.pending_count as number) || 0,
      confirmed: (statsResult?.confirmed_count as number) || 0,
      completed: (statsResult?.completed_count as number) || 0,
      cancelled: (statsResult?.cancelled_count as number) || 0,
      total_revenue: (statsResult?.total_revenue as number) || 0,
    },
    pagination,
  }
}
