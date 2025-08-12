import { defineEventHandler, getQuery, createError } from 'h3'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { userId, caregiverId, status, page = 1, limit = 20 } = query
  
  try {
    const db = getD1(event)
    
    // 建立查詢條件
    const conditions = []
    const params = []
    
    if (userId) {
      conditions.push('b.user_id = ?')
      params.push(userId)
    }
    
    if (caregiverId) {
      conditions.push('b.caregiver_id = ?')
      params.push(caregiverId)
    }
    
    if (status) {
      conditions.push('b.status = ?')
      params.push(status)
    }
    
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    
    // 計算分頁
    const offset = (Number(page) - 1) * Number(limit)
    
    // 查詢總數
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM bookings b 
      ${whereClause}
    `
    const countStmt = params.length > 0 
      ? db.prepare(countQuery).bind(...params)
      : db.prepare(countQuery)
    const { total } = await countStmt.first() as { total: number }
    
    // 查詢預約列表
    const listQuery = `
      SELECT 
        b.*,
        u.name as user_name,
        u.email as user_email,
        u.phone as user_phone,
        c.user_id as caregiver_user_id,
        cu.name as caregiver_name,
        cu.email as caregiver_email,
        cu.phone as caregiver_phone,
        c.hourly_rate as caregiver_hourly_rate,
        c.rating as caregiver_rating
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN caregivers c ON b.caregiver_id = c.id
      LEFT JOIN users cu ON c.user_id = cu.id
      ${whereClause}
      ORDER BY b.created_at DESC
      LIMIT ? OFFSET ?
    `
    
    const listStmt = db.prepare(listQuery).bind(...params, Number(limit), offset)
    
    const results = await listStmt.all()
    
    // 整理回傳格式
    const bookings = results.results?.map((booking: any) => ({
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
        phone: booking.caregiver_phone,
        hourly_rate: booking.caregiver_hourly_rate,
        rating: booking.caregiver_rating
      }
    })) || []
    
    return {
      bookings,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `無法取得預約列表: ${error.message}`
    })
  }
})