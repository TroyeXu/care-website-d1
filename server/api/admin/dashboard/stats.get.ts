// 管理員儀表板統計資料 API
import { defineEventHandler } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentAdmin } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createAuthenticationError } from '../../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError()
    }

    const db = getD1(event)

    // 獲取總用戶數
    const totalUsersResult = await db
      .prepare('SELECT COUNT(*) as count FROM users WHERE role = ?')
      .bind('user')
      .first()
    const totalUsers = totalUsersResult?.count || 0

    // 獲取本月新增用戶數
    const newUsersResult = await db
      .prepare(
        `SELECT COUNT(*) as count FROM users
         WHERE role = 'user'
         AND created_at >= datetime('now', 'start of month')`,
      )
      .first()
    const newUsersThisMonth = newUsersResult?.count || 0

    // 獲取活躍看護師數量
    const activeCaregiversResult = await db
      .prepare("SELECT COUNT(*) as count FROM caregivers WHERE status = 'active'")
      .first()
    const activeCaregivers = activeCaregiversResult?.count || 0

    // 獲取待審核看護師數量
    const pendingCaregiversResult = await db
      .prepare(
        "SELECT COUNT(*) as count FROM caregivers WHERE status = 'pending'",
      )
      .first()
    const pendingCaregivers = pendingCaregiversResult?.count || 0

    // 獲取本月預約數
    const monthlyBookingsResult = await db
      .prepare(
        `SELECT COUNT(*) as count FROM bookings
         WHERE service_date >= date('now', 'start of month')`,
      )
      .first()
    const monthlyBookings = monthlyBookingsResult?.count || 0

    // 獲取進行中的預約數
    const activeBookingsResult = await db
      .prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE status IN ('confirmed', 'in_progress')",
      )
      .first()
    const activeBookings = activeBookingsResult?.count || 0

    // 獲取本月收入
    const monthlyRevenueResult = await db
      .prepare(
        `SELECT COALESCE(SUM(total_amount), 0) as total FROM bookings
         WHERE service_date >= date('now', 'start of month')
         AND payment_status = 'paid'`,
      )
      .first()
    const monthlyRevenue = monthlyRevenueResult?.total || 0

    // 獲取上月收入（用於計算成長率）
    const lastMonthRevenueResult = await db
      .prepare(
        `SELECT COALESCE(SUM(total_amount), 0) as total FROM bookings
         WHERE service_date >= date('now', '-1 month', 'start of month')
         AND service_date < date('now', 'start of month')
         AND payment_status = 'paid'`,
      )
      .first()
    const lastMonthRevenue = lastMonthRevenueResult?.total || 0

    // 計算收入成長率
    const revenueGrowth =
      lastMonthRevenue > 0
        ? Math.round(
            ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100,
          )
        : 0

    // 獲取待處理事項數量
    const pendingDisputesResult = await db
      .prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE status = 'disputed'",
      )
      .first()
    const pendingDisputes = pendingDisputesResult?.count || 0

    const pendingRefundsResult = await db
      .prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE status = 'refund_requested'",
      )
      .first()
    const pendingRefunds = pendingRefundsResult?.count || 0

    return createSuccessResponse({
      stats: {
        totalUsers: Number(totalUsers),
        newUsersThisMonth: Number(newUsersThisMonth),
        activeCaregivers: Number(activeCaregivers),
        pendingCaregivers: Number(pendingCaregivers),
        monthlyBookings: Number(monthlyBookings),
        activeBookings: Number(activeBookings),
        monthlyRevenue: Number(monthlyRevenue),
        revenueGrowth: Number(revenueGrowth),
      },
      pendingItems: {
        caregivers: Number(pendingCaregivers),
        disputes: Number(pendingDisputes),
        refunds: Number(pendingRefunds),
      },
    })
  } catch (error: any) {
    handleError(error, '獲取儀表板統計資料')
  }
})
