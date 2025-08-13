import { defineEventHandler, readBody, createError } from 'h3'
import { getD1 } from '../../utils/d1'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // 驗證必填欄位
  const requiredFields = ['booking_id', 'user_id', 'caregiver_id', 'rating']
  for (const field of requiredFields) {
    if (!body[field]) {
      throw createError({
        statusCode: 400,
        statusMessage: `${field} 為必填欄位`,
      })
    }
  }
  
  // 驗證評分範圍
  if (body.rating < 1 || body.rating > 5) {
    throw createError({
      statusCode: 400,
      statusMessage: '評分必須在 1 到 5 之間',
    })
  }

  try {
    const db = getD1(event)
    
    // 檢查預約是否存在且已完成
    const booking = await db
      .prepare(`
        SELECT * FROM bookings 
        WHERE id = ? AND user_id = ? AND caregiver_id = ?
      `)
      .bind(body.booking_id, body.user_id, body.caregiver_id)
      .first()
    
    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該預約記錄',
      })
    }
    
    if (booking.status !== 'completed') {
      throw createError({
        statusCode: 400,
        statusMessage: '只能對已完成的預約進行評價',
      })
    }
    
    // 檢查是否已評價過
    const existingReview = await db
      .prepare('SELECT * FROM reviews WHERE booking_id = ?')
      .bind(body.booking_id)
      .first()
    
    if (existingReview) {
      throw createError({
        statusCode: 400,
        statusMessage: '該預約已經評價過了',
      })
    }
    
    const reviewId = nanoid()
    const now = new Date().toISOString()
    
    // 插入評價
    await db
      .prepare(`
        INSERT INTO reviews (
          id, booking_id, user_id, caregiver_id, 
          rating, comment, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        reviewId,
        body.booking_id,
        body.user_id,
        body.caregiver_id,
        body.rating,
        body.comment || '',
        now
      )
      .run()
    
    // 更新看護師的評分統計
    const { results: allReviews } = await db
      .prepare(`
        SELECT rating FROM reviews 
        WHERE caregiver_id = ?
      `)
      .bind(body.caregiver_id)
      .all()
    
    if (allReviews && allReviews.length > 0) {
      const totalRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0)
      const avgRating = totalRating / allReviews.length
      
      await db
        .prepare(`
          UPDATE caregivers 
          SET rating = ?, total_reviews = ? 
          WHERE id = ?
        `)
        .bind(avgRating, allReviews.length, body.caregiver_id)
        .run()
    }
    
    // 返回新建的評價
    const newReview = await db
      .prepare(`
        SELECT 
          r.*,
          u.name as user_name,
          cu.name as caregiver_name
        FROM reviews r
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN caregivers c ON r.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE r.id = ?
      `)
      .bind(reviewId)
      .first()
    
    return {
      success: true,
      data: newReview,
    }
  } catch (error: any) {
    console.error('Create review error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '新增評價失敗',
    })
  }
})