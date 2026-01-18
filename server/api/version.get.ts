// 版本資訊端點
import { defineEventHandler } from 'h3'
import { createSuccessResponse } from '../utils/api-response'

export default defineEventHandler(() => {
  return createSuccessResponse({
    name: 'Care Platform API',
    version: '1.0.0',
    build: process.env.BUILD_ID || 'development',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    api: {
      version: 'v1',
      endpoints: [
        '/api/health',
        '/api/version',
        '/api/auth/*',
        '/api/admin/*',
        '/api/bookings/*',
        '/api/caregivers/*',
        '/api/reviews/*',
        '/api/payments/*',
        '/api/users/*',
        '/api/contact',
      ],
    },
    features: {
      authentication: true,
      adminPanel: true,
      bookingSystem: true,
      reviewSystem: true,
      paymentTracking: true,
      contactForm: true,
    },
  })
})
