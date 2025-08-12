import { defineEventHandler } from 'h3'
import { logoutUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 清除認證 Cookie
  logoutUser(event)
  
  return {
    success: true,
    message: '已成功登出',
  }
})