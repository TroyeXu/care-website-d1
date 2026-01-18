import { defineEventHandler } from 'h3'
import { getCurrentUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 獲取 D1 實例
    const { cloudflare } = event.context
    const db = cloudflare?.env?.DB

    // 如果沒有 D1（開發環境），返回 null
    if (!db) {
      return createSuccessResponse(null)
    }

    const user = await getCurrentUser(event)

    return createSuccessResponse(user)
  } catch (error) {
    handleError(error, '取得當前用戶資訊')
  }
})
