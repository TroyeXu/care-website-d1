import { defineEventHandler, createError } from 'h3'
import { getCurrentUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 獲取 D1 實例
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB

  // 如果沒有 D1（開發環境），返回模擬用戶
  if (!db) {
    return {
      user: null,
    }
  }

  try {
    const user = await getCurrentUser(event)

    if (!user) {
      return {
        user: null,
      }
    }

    return {
      user,
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '獲取用戶資訊失敗',
    })
  }
})
