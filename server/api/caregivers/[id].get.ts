import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError, createNotFoundError } from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const caregiverId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(caregiverId, 'id')

    const db = getD1(event)

    // 查詢看護基本資料（包含使用者資料）
    const caregiver = await db
      .prepare(
        `
      SELECT 
        c.*,
        u.name,
        u.email,
        u.phone,
        u.avatar,
        u.gender,
        u.birth_date,
        u.address,
        u.emergency_contact,
        u.emergency_phone
      FROM caregivers c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `,
      )
      .bind(caregiverId)
      .first()

    if (!caregiver) {
      throw createNotFoundError('看護師', caregiverId)
    }

    // 查詢證照
    const certificationsResult = await db
      .prepare(
        `
      SELECT name, issuer, issue_date, expiry_date, verified 
      FROM certifications 
      WHERE caregiver_id = ?
      ORDER BY issue_date DESC
    `,
      )
      .bind(caregiverId)
      .all()

    // 查詢專長
    const specialtiesResult = await db
      .prepare(
        `
      SELECT name, category, years_experience 
      FROM specialties 
      WHERE caregiver_id = ?
    `,
      )
      .bind(caregiverId)
      .all()

    // 查詢服務區域
    const serviceAreasResult = await db
      .prepare(
        `
      SELECT city, district, coverage_type 
      FROM service_areas 
      WHERE caregiver_id = ?
    `,
      )
      .bind(caregiverId)
      .all()

    // 查詢評價統計
    const reviewStats = await db
      .prepare(
        `
      SELECT 
        COUNT(*) as total_reviews,
        AVG(rating) as average_rating,
        SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as five_star,
        SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as four_star,
        SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as three_star,
        SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as two_star,
        SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as one_star
      FROM reviews 
      WHERE caregiver_id = ?
    `,
      )
      .bind(caregiverId)
      .first()

    // 查詢最近的評價
    const recentReviews = await db
      .prepare(
        `
      SELECT 
        r.*,
        u.name as reviewer_name,
        u.avatar as reviewer_avatar
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.caregiver_id = ?
      ORDER BY r.created_at DESC
      LIMIT 5
    `,
      )
      .bind(caregiverId)
      .all()

    // 查詢服務統計
    const serviceStats = await db
      .prepare(
        `
      SELECT 
        COUNT(*) as total_bookings,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_bookings,
        AVG(service_hours) as avg_service_hours
      FROM bookings 
      WHERE caregiver_id = ?
    `,
      )
      .bind(caregiverId)
      .first()

    // 整理回傳格式
    const caregiverDetail = {
      id: caregiver.id,
      user_id: caregiver.user_id,
      name: caregiver.name,
      email: caregiver.email,
      phone: caregiver.phone,
      avatar: caregiver.avatar,
      gender: caregiver.gender,
      birth_date: caregiver.birth_date,
      address: caregiver.address,
      emergency_contact: caregiver.emergency_contact,
      emergency_phone: caregiver.emergency_phone,

      // 看護專業資訊
      hourly_rate: caregiver.hourly_rate,
      experience_years: caregiver.experience_years,
      bio: caregiver.bio,
      background_checked: caregiver.background_checked,
      drug_test_passed: caregiver.drug_test_passed,

      // 狀態資訊
      status: caregiver.status,
      rating: caregiver.rating || reviewStats?.average_rating || 0,
      total_reviews: caregiver.total_reviews || reviewStats?.total_reviews || 0,
      response_rate: caregiver.response_rate,
      acceptance_rate: caregiver.acceptance_rate,
      completion_rate: caregiver.completion_rate,
      on_time_rate: caregiver.on_time_rate,

      // 關聯資料
      certifications: certificationsResult.results || [],
      specialties: specialtiesResult.results || [],
      service_areas: serviceAreasResult.results || [],

      // 評價資訊
      review_stats: {
        total: reviewStats?.total_reviews || 0,
        average: reviewStats?.average_rating || 0,
        distribution: {
          5: reviewStats?.five_star || 0,
          4: reviewStats?.four_star || 0,
          3: reviewStats?.three_star || 0,
          2: reviewStats?.two_star || 0,
          1: reviewStats?.one_star || 0,
        },
      },
      recent_reviews: recentReviews.results || [],

      // 服務統計
      service_stats: {
        total_bookings: serviceStats?.total_bookings || 0,
        completed_bookings: serviceStats?.completed_bookings || 0,
        cancelled_bookings: serviceStats?.cancelled_bookings || 0,
        avg_service_hours: serviceStats?.avg_service_hours || 0,
      },

      created_at: caregiver.created_at,
      updated_at: caregiver.updated_at,
    }

    return createSuccessResponse(caregiverDetail)
  } catch (error: any) {
    handleError(error, '取得看護師詳情')
  }
})
