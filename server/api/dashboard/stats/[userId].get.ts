// 用戶儀表板統計 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentUser } from '../../../utils/auth'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createAuthorizationError } from '../../../utils/error-handler'
import { validateId } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')

  try {
    validateId(userId, 'userId')

    // 驗證權限：只能查看自己的統計資料
    const currentUser = await getCurrentUser(event)
    if (currentUser && currentUser.id !== userId && currentUser.role !== 'admin') {
      throw createAuthorizationError('查看此統計資料')
    }

    const db = getD1(event)

    // 取得預約統計
    const bookingStats = await db
      .prepare(
        `SELECT
          COUNT(*) as total_bookings,
          SUM(CASE WHEN status = 'confirmed' OR status = 'in_progress' THEN 1 ELSE 0 END) as active_bookings,
          SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
          SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_bookings,
          COALESCE(SUM(total_amount), 0) as total_spent
         FROM bookings
         WHERE user_id = ?`,
      )
      .bind(userId)
      .first()

    // 取得最近的預約
    const { results: recentBookings } = await db
      .prepare(
        `SELECT
          b.*,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name,
          cu.avatar as caregiver_avatar
         FROM bookings b
         LEFT JOIN caregivers c ON b.caregiver_id = c.id
         LEFT JOIN users cu ON c.user_id = cu.id
         WHERE b.user_id = ?
         ORDER BY b.created_at DESC
         LIMIT 5`,
      )
      .bind(userId)
      .all()

    // 取得付款統計
    const paymentStats = await db
      .prepare(
        `SELECT
          COUNT(*) as total_payments,
          COALESCE(SUM(amount), 0) as total_paid,
          COALESCE(SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END), 0) as pending_amount
         FROM payments
         WHERE user_id = ?`,
      )
      .bind(userId)
      .first()

    // 取得評價統計
    const reviewStats = await db
      .prepare(
        `SELECT
          COUNT(*) as total_reviews,
          COALESCE(AVG(rating), 0) as average_rating
         FROM reviews
         WHERE user_id = ?`,
      )
      .bind(userId)
      .first()

    // 取得本月預約數
    const monthlyBookings = await db
      .prepare(
        `SELECT COUNT(*) as count
         FROM bookings
         WHERE user_id = ?
         AND service_date >= date('now', 'start of month')`,
      )
      .bind(userId)
      .first()

    // 取得即將到來的預約
    const { results: upcomingBookings } = await db
      .prepare(
        `SELECT
          b.*,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name
         FROM bookings b
         LEFT JOIN caregivers c ON b.caregiver_id = c.id
         LEFT JOIN users cu ON c.user_id = cu.id
         WHERE b.user_id = ?
         AND b.service_date >= date('now')
         AND b.status IN ('confirmed', 'pending')
         ORDER BY b.service_date ASC, b.start_time ASC
         LIMIT 3`,
      )
      .bind(userId)
      .all()

    return createSuccessResponse({
      stats: {
        totalBookings: Number(bookingStats?.total_bookings) || 0,
        activeBookings: Number(bookingStats?.active_bookings) || 0,
        completedBookings: Number(bookingStats?.completed_bookings) || 0,
        cancelledBookings: Number(bookingStats?.cancelled_bookings) || 0,
        totalSpent: Number(bookingStats?.total_spent) || 0,
        totalPayments: Number(paymentStats?.total_payments) || 0,
        totalPaid: Number(paymentStats?.total_paid) || 0,
        pendingAmount: Number(paymentStats?.pending_amount) || 0,
        totalReviews: Number(reviewStats?.total_reviews) || 0,
        averageRating: Number(reviewStats?.average_rating) || 0,
        monthlyBookings: Number(monthlyBookings?.count) || 0,
      },
      recentBookings: recentBookings || [],
      upcomingBookings: upcomingBookings || [],
    })
  } catch (error: any) {
    handleError(error, '取得用戶統計資料')
  }
})
