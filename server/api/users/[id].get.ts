import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError, createNotFoundError } from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(id, 'id')

    const db = getD1(event)

    // 查詢用戶資料
    const user = await db
      .prepare(
        `
        SELECT
          id,
          email,
          name,
          phone,
          role,
          email_verified,
          phone_verified,
          address,
          gender,
          created_at,
          updated_at
        FROM users
        WHERE id = ?
      `,
      )
      .bind(id)
      .first()

    if (!user) {
      throw createNotFoundError('用戶', id)
    }

    // 如果是看護師，獲取額外資訊
    let caregiverInfo = null
    if (user.role === 'caregiver') {
      caregiverInfo = await db
        .prepare(
          `
          SELECT 
            c.*,
            (SELECT COUNT(*) FROM bookings WHERE caregiver_id = c.id) as total_bookings,
            (SELECT COUNT(*) FROM bookings WHERE caregiver_id = c.id AND status = 'completed') as completed_bookings
          FROM caregivers c
          WHERE c.user_id = ?
        `,
        )
        .bind(id)
        .first()
    }

    // 獲取用戶的預約統計
    const bookingStats = await db
      .prepare(
        `
        SELECT 
          COUNT(*) as total_bookings,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_bookings,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_bookings,
          COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings
        FROM bookings
        WHERE user_id = ?
      `,
      )
      .bind(id)
      .first()

    return createSuccessResponse({
      ...user,
      caregiver_info: caregiverInfo,
      booking_stats: bookingStats,
    })
  } catch (error: any) {
    handleError(error, '取得用戶資料')
  }
})
