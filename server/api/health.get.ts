// 健康檢查端點
import { defineEventHandler } from 'h3'
import { getD1 } from '../utils/d1'
import { createSuccessResponse } from '../utils/api-response'
import { handleError } from '../utils/error-handler'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    // 檢查資料庫連線
    const db = getD1(event)
    await db.prepare('SELECT 1').first()

    const responseTime = Date.now() - startTime

    return createSuccessResponse({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? process.uptime() : 0,
      responseTime: `${responseTime}ms`,
      database: {
        status: 'connected',
        type: 'D1',
      },
      environment: process.env.NODE_ENV || 'development',
    })
  } catch (error) {
    return createSuccessResponse({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Database connection failed',
      database: {
        status: 'disconnected',
      },
    })
  }
})
