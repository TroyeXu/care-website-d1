// 管理員：預約詳情 API
import { defineEventHandler, createError } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('booking.view')(event)

  const bookingId = getRouterParam(event, 'id')
  if (!bookingId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少預約 ID',
    })
  }

  const db = getD1(event)

  try {
    // 取得預約詳情
    const booking = await db
      .prepare(
        `
        SELECT 
          b.*,
          u.name as user_name,
          u.email as user_email,
          u.phone as user_phone,
          u.avatar as user_avatar,
          c.bio as caregiver_bio,
          c.experience_years,
          c.hourly_rate,
          c.rating,
          c.skills,
          c.languages,
          cu.name as caregiver_name,
          cu.email as caregiver_email,
          cu.phone as caregiver_phone,
          cu.avatar as caregiver_avatar
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN caregivers c ON b.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE b.id = ?
      `,
      )
      .bind(bookingId)
      .first()

    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該預約',
      })
    }

    // 取得狀態變更記錄
    const logs = await db
      .prepare(
        `
        SELECT 
          bl.*,
          u.name as actor_name
        FROM booking_logs bl
        LEFT JOIN users u ON bl.actor_id = u.id
        WHERE bl.booking_id = ?
        ORDER BY bl.created_at DESC
      `,
      )
      .bind(bookingId)
      .all()

    // 取得爭議記錄
    const disputes = await db
      .prepare(
        `
        SELECT 
          bd.*,
          u.name as reporter_name
        FROM booking_disputes bd
        LEFT JOIN users u ON bd.reporter_id = u.id
        WHERE bd.booking_id = ?
        ORDER BY bd.created_at DESC
      `,
      )
      .bind(bookingId)
      .all()

    // 取得退款記錄
    const refunds = await db
      .prepare(
        `
        SELECT * FROM refunds
        WHERE booking_id = ?
        ORDER BY created_at DESC
      `,
      )
      .bind(bookingId)
      .all()

    // 格式化資料
    return {
      success: true,
      booking: {
        id: booking.id,
        user: {
          id: booking.user_id,
          name: booking.user_name,
          email: booking.user_email,
          phone: booking.user_phone,
          avatar: booking.user_avatar,
        },
        caregiver: {
          id: booking.caregiver_id,
          name: booking.caregiver_name,
          email: booking.caregiver_email,
          phone: booking.caregiver_phone,
          avatar: booking.caregiver_avatar,
          bio: booking.caregiver_bio,
          experience_years: booking.experience_years,
          hourly_rate: booking.hourly_rate,
          rating: booking.rating,
          skills: booking.skills ? JSON.parse(booking.skills as string) : [],
          languages: booking.languages
            ? JSON.parse(booking.languages as string)
            : [],
        },
        service_date: booking.service_date,
        start_time: booking.start_time,
        end_time: booking.end_time,
        service_hours: booking.service_hours,
        service_location: booking.service_location,
        service_type: booking.service_type,
        requirements: booking.requirements,
        status: booking.status,
        total_amount: booking.total_amount,
        payment_status: booking.payment_status,
        payment_method: booking.payment_method,
        notes: booking.notes,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
      },
      logs: logs.results.map((log) => ({
        id: log.id,
        action: log.action,
        previous_status: log.previous_status,
        new_status: log.new_status,
        actor_id: log.actor_id,
        actor_name: log.actor_name,
        actor_type: log.actor_type,
        reason: log.reason,
        notes: log.notes,
        created_at: log.created_at,
      })),
      disputes: disputes.results.map((dispute) => ({
        id: dispute.id,
        reporter_id: dispute.reporter_id,
        reporter_name: dispute.reporter_name,
        reporter_type: dispute.reporter_type,
        dispute_type: dispute.dispute_type,
        description: dispute.description,
        evidence: dispute.evidence
          ? JSON.parse(dispute.evidence as string)
          : [],
        status: dispute.status,
        resolution: dispute.resolution,
        resolved_by: dispute.resolved_by,
        resolved_at: dispute.resolved_at,
        created_at: dispute.created_at,
      })),
      refunds: refunds.results,
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('取得預約詳情錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '取得預約詳情失敗',
    })
  }
})
