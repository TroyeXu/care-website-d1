// 管理員：用戶列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import {
  createSuccessResponse,
  calculatePagination,
  calculateOffset,
} from '../../../utils/api-response'
import { handleError } from '../../../utils/error-handler'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('user.view')(event)

  const query = getQuery(event)
  const {
    role,
    status,
    search,
    page = 1,
    limit = 20,
    sort = 'created_at',
    order = 'desc',
  } = query

  const db = getD1(event)

  try {
    // 驗證分頁參數
    const pageNum = Number(page) || 1
    const limitNum = Number(limit) || 20

    // 建立查詢條件
    const conditions = []
    const params = []

    if (role) {
      conditions.push('u.role = ?')
      params.push(role)
    }

    if (status) {
      conditions.push('u.status = ?')
      params.push(status)
    }

    if (search) {
      conditions.push('(u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)')
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 計算總數
    const countResult = await db
      .prepare(
        `
        SELECT COUNT(*) as total
        FROM users u
        ${whereClause}
      `,
      )
      .bind(...params)
      .first()

    const total = countResult?.total || 0

    // 查詢用戶列表
    const offset = calculateOffset(pageNum, limitNum)
    const result = await db
      .prepare(
        `
        SELECT 
          u.*,
          (SELECT COUNT(*) FROM bookings WHERE user_id = u.id) as booking_count,
          (SELECT COUNT(*) FROM bookings WHERE user_id = u.id AND status = 'completed') as completed_bookings,
          (SELECT MAX(created_at) FROM bookings WHERE user_id = u.id) as last_booking_date,
          c.id as caregiver_id,
          c.hourly_rate,
          c.rating,
          a.id as admin_id,
          a.role_id as admin_role
        FROM users u
        LEFT JOIN caregivers c ON u.id = c.user_id
        LEFT JOIN admins a ON u.id = a.user_id
        ${whereClause}
        ORDER BY u.${sort} ${order}
        LIMIT ? OFFSET ?
      `,
      )
      .bind(...params, limitNum, offset)
      .all()

    // 格式化資料
    const users = result.results.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      avatar: row.avatar,
      role: row.role,
      status: row.status || 'active',
      booking_count: row.booking_count || 0,
      completed_bookings: row.completed_bookings || 0,
      last_booking_date: row.last_booking_date,
      is_caregiver: !!row.caregiver_id,
      caregiver_info: row.caregiver_id
        ? {
            id: row.caregiver_id,
            hourly_rate: row.hourly_rate,
            rating: row.rating,
          }
        : null,
      is_admin: !!row.admin_id,
      admin_info: row.admin_id
        ? {
            id: row.admin_id,
            role: row.admin_role,
          }
        : null,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    // 使用統一的分頁回應格式
    const pagination = calculatePagination(Number(total), pageNum, limitNum)

    return createSuccessResponse(users, undefined, { pagination })
  } catch (error) {
    handleError(error, '取得用戶列表')
  }
})
