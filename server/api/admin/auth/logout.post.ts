// 管理員登出 API
import { defineEventHandler } from 'h3'
import { clearAdminAuth } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'

export default defineEventHandler((event) => {
  // 清除管理員認證 Cookie
  clearAdminAuth(event)

  return createSuccessResponse(null, '登出成功')
})
