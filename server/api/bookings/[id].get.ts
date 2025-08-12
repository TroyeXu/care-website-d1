import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  try {
    const db = getD1(event)
    
    // 查詢預約資料，包含相關的使用者和看護資訊
    const booking = await db.prepare(`
      SELECT 
        b.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        c.user_id as caregiver_user_id,
        cu.name as caregiver_name,
        cu.email as caregiver_email,
        cu.phone as caregiver_phone
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN caregivers c ON b.caregiver_id = c.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE b.id = ?
    `).bind(id).first()

    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: '預約不存在',
      })
    }

    // 整理回傳格式
    return {
      id: booking.id,
      user_id: booking.user_id,
      caregiver_id: booking.caregiver_id,
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
      user: {
        name: booking.user_name,
        email: booking.user_email,
        phone: booking.user_phone
      },
      caregiver: {
        id: booking.caregiver_id,
        name: booking.caregiver_name,
        email: booking.caregiver_email,
        phone: booking.caregiver_phone
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `無法取得預約資料: ${error.message}`
    })
  }
})