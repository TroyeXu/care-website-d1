import { defineEventHandler } from 'h3'
import { logoutUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'

export default defineEventHandler((event) => {
  // 清除認證 Cookie
  logoutUser(event)

  return createSuccessResponse(null, '已成功登出')
})
