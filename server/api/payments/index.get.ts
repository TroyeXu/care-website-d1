import { defineEventHandler, getQuery, createError } from 'h3'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { user_id, booking_id, status, page = 1, limit = 20 } = query

  try {
    const db = getD1(event)
    
    // 建立查詢條件
    const conditions = []
    const params = []
    
    if (user_id) {
      conditions.push('p.user_id = ?')
      params.push(user_id)
    }
    
    if (booking_id) {
      conditions.push('p.booking_id = ?')
      params.push(booking_id)
    }
    
    if (status) {
      conditions.push('p.status = ?')
      params.push(status)
    }
    
    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` 
      : ''
    
    // 計算分頁
    const offset = (Number(page) - 1) * Number(limit)
    
    // 查詢總數
    const countQuery = `
      SELECT COUNT(*) as total 
      FROM payments p
      ${whereClause}
    `
    const countStmt = params.length > 0
      ? db.prepare(countQuery).bind(...params)
      : db.prepare(countQuery)
    const countResult = await countStmt.first() as { total: number }
    
    // 查詢付款記錄
    const listQuery = `
      SELECT 
        p.*,
        u.name as user_name,
        u.email as user_email,
        b.service_date,
        b.start_time,
        b.end_time,
        b.caregiver_id,
        cu.name as caregiver_name
      FROM payments p
      LEFT JOIN users u ON p.user_id = u.id
      LEFT JOIN bookings b ON p.booking_id = b.id
      LEFT JOIN caregivers c ON b.caregiver_id = c.id
      LEFT JOIN users cu ON c.user_id = cu.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `
    
    const listParams = [...params, Number(limit), offset]
    const listStmt = db.prepare(listQuery).bind(...listParams)
    const results = await listStmt.all()
    
    // 計算統計資料
    let stats = null
    if (user_id) {
      const statsQuery = `
        SELECT 
          COUNT(*) as total_payments,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_payments,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_payments,
          COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_payments,
          COUNT(CASE WHEN status = 'refunded' THEN 1 END) as refunded_payments,
          SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_amount
        FROM payments
        WHERE user_id = ?
      `
      stats = await db.prepare(statsQuery).bind(user_id).first()
    }
    
    return {
      success: true,
      data: {
        payments: results.results || [],
        total: countResult?.total || 0,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil((countResult?.total || 0) / Number(limit)),
        stats: stats,
      },
    }
  } catch (error: any) {
    console.error('Get payments error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '獲取付款記錄失敗',
    })
  }
})