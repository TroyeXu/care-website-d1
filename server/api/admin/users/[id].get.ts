// 管理員：用戶詳情 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createNotFoundError } from '../../../utils/error-handler'
import { validateId } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('user.view')(event)

  const userId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(userId, 'id')

    const db = getD1(event)
    // 取得用戶資料
    const user = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId)
      .first()

    if (!user) {
      throw createNotFoundError('用戶', userId)
    }

    // 取得預約記錄
    const bookings = await db
      .prepare(
        `
        SELECT 
          b.*,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name
        FROM bookings b
        LEFT JOIN caregivers c ON b.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE b.user_id = ?
        ORDER BY b.created_at DESC
        LIMIT 10
      `,
      )
      .bind(userId)
      .all()

    // 取得付款記錄（簡化版）
    const payments = await db
      .prepare(
        `
        SELECT 
          p.*,
          b.service_date,
          b.service_type
        FROM payments p
        LEFT JOIN bookings b ON p.booking_id = b.id
        WHERE p.user_id = ?
        ORDER BY p.created_at DESC
        LIMIT 10
      `,
      )
      .bind(userId)
      .all()

    // 取得狀態變更記錄
    const statusLogs = await db
      .prepare(
        `
        SELECT * FROM user_status_logs
        WHERE user_id = ?
        ORDER BY created_at DESC
        LIMIT 10
      `,
      )
      .bind(userId)
      .all()

    // 檢查是否為看護師
    const caregiver = await db
      .prepare('SELECT * FROM caregivers WHERE user_id = ?')
      .bind(userId)
      .first()

    // 檢查是否為管理員
    const admin = await db
      .prepare(
        `
        SELECT a.*, r.name as role_name
        FROM admins a
        JOIN admin_roles r ON a.role_id = r.id
        WHERE a.user_id = ?
      `,
      )
      .bind(userId)
      .first()

    // 統計資料
    const stats = await db
      .prepare(
        `
        SELECT 
          COUNT(*) as total_bookings,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_bookings,
          COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings,
          SUM(CASE WHEN status = 'completed' THEN total_amount END) as total_spent
        FROM bookings
        WHERE user_id = ?
      `,
      )
      .bind(userId)
      .first()

    return createSuccessResponse({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status || 'active',
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      caregiver: caregiver
        ? {
            id: caregiver.id,
            bio: caregiver.bio,
            experience_years: caregiver.experience_years,
            hourly_rate: caregiver.hourly_rate,
            rating: caregiver.rating,
            status: caregiver.status,
          }
        : null,
      admin: admin
        ? {
            id: admin.id,
            role: admin.role_name,
            department: admin.department,
            is_super: admin.is_super === 1,
            last_login: admin.last_login,
          }
        : null,
      bookings: bookings.results.map((b) => ({
        id: b.id,
        caregiver_name: b.caregiver_name,
        service_date: b.service_date,
        status: b.status,
        total_amount: b.total_amount,
        created_at: b.created_at,
      })),
      payments: payments.results,
      status_logs: statusLogs.results,
      stats: {
        total_bookings: stats?.total_bookings || 0,
        completed_bookings: stats?.completed_bookings || 0,
        cancelled_bookings: stats?.cancelled_bookings || 0,
        total_spent: stats?.total_spent || 0,
      },
    })
  } catch (error: any) {
    handleError(error, '取得用戶詳情')
  }
})
