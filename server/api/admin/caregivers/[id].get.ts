// 管理員：看護師詳情 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createNotFoundError } from '../../../utils/error-handler'
import { validateId } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('caregiver.view')(event)

  const caregiverId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(caregiverId, 'id')

    const db = getD1(event)
    // 取得看護師基本資料
    const caregiver = await db
      .prepare(
        `
        SELECT 
          c.*,
          u.name,
          u.email,
          u.phone,
          u.avatar,
          u.created_at as user_created_at
        FROM caregivers c
        JOIN users u ON c.user_id = u.id
        WHERE c.id = ?
      `,
      )
      .bind(caregiverId)
      .first()

    if (!caregiver) {
      throw createNotFoundError('看護師', caregiverId)
    }

    // 取得審核資料
    const verification = await db
      .prepare(
        `
        SELECT * FROM caregiver_verifications 
        WHERE caregiver_id = ?
        ORDER BY submitted_at DESC
        LIMIT 1
      `,
      )
      .bind(caregiverId)
      .first()

    // 取得證照資料
    const certifications = await db
      .prepare(
        `
        SELECT * FROM caregiver_certifications
        WHERE caregiver_id = ?
        ORDER BY issue_date DESC
      `,
      )
      .bind(caregiverId)
      .all()

    // 取得服務地區
    const serviceAreas = await db
      .prepare(
        `
        SELECT * FROM caregiver_service_areas
        WHERE caregiver_id = ?
        ORDER BY is_primary DESC
      `,
      )
      .bind(caregiverId)
      .all()

    // 取得工作時段
    const schedules = await db
      .prepare(
        `
        SELECT * FROM caregiver_schedules
        WHERE caregiver_id = ?
        ORDER BY day_of_week
      `,
      )
      .bind(caregiverId)
      .all()

    // 取得預約統計
    const bookingStats = await db
      .prepare(
        `
        SELECT 
          COUNT(*) as total_bookings,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_bookings,
          COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_bookings,
          AVG(CASE WHEN status = 'completed' THEN total_amount END) as avg_amount
        FROM bookings
        WHERE caregiver_id = ?
      `,
      )
      .bind(caregiverId)
      .first()

    // 取得最近的預約
    const recentBookings = await db
      .prepare(
        `
        SELECT 
          b.*,
          u.name as user_name
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        WHERE b.caregiver_id = ?
        ORDER BY b.created_at DESC
        LIMIT 5
      `,
      )
      .bind(caregiverId)
      .all()

    return createSuccessResponse({
      caregiver: {
        id: caregiver.id,
        user_id: caregiver.user_id,
        name: caregiver.name,
        email: caregiver.email,
        phone: caregiver.phone,
        avatar: caregiver.avatar,
        bio: caregiver.bio,
        experience_years: caregiver.experience_years,
        hourly_rate: caregiver.hourly_rate,
        rating: caregiver.rating,
        status: caregiver.status,
        city: caregiver.city,
        district: caregiver.district,
        skills: caregiver.skills ? JSON.parse(caregiver.skills as string) : [],
        languages: caregiver.languages
          ? JSON.parse(caregiver.languages as string)
          : [],
        created_at: caregiver.created_at,
        updated_at: caregiver.updated_at,
      },
      verification: verification || null,
      certifications: certifications.results,
      service_areas: serviceAreas.results,
      schedules: schedules.results,
      stats: {
        total_bookings: bookingStats?.total_bookings || 0,
        completed_bookings: bookingStats?.completed_bookings || 0,
        cancelled_bookings: bookingStats?.cancelled_bookings || 0,
        avg_amount: bookingStats?.avg_amount || 0,
      },
      recent_bookings: recentBookings.results,
    })
  } catch (error: any) {
    handleError(error, '取得看護師詳情')
  }
})
