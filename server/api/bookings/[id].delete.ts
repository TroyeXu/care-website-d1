import { defineEventHandler, getRouterParam, createError } from 'h3'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: '預約 ID 為必填',
    })
  }

  try {
    const db = getD1(event)
    
    // 檢查預約是否存在
    const existingBooking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(id)
      .first()
    
    if (!existingBooking) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該預約',
      })
    }
    
    // 軟刪除：更新狀態為 cancelled
    await db
      .prepare(`
        UPDATE bookings 
        SET status = 'cancelled', 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `)
      .bind(id)
      .run()
    
    return {
      success: true,
      message: '預約已取消',
    }
  } catch (error: any) {
    console.error('Delete booking error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || '取消預約失敗',
    })
  }
})