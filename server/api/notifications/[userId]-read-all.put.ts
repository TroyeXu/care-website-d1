// 標記所有通知為已讀 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { getCurrentUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
} from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')

  try {
    // 驗證 ID
    validateId(userId, 'userId')

    // 驗證用戶身份
    const currentUser = await getCurrentUser(event)
    if (!currentUser) {
      throw createAuthenticationError('請先登入')
    }

    // 確認只能標記自己的通知（除非是管理員）
    if (currentUser.id !== userId && currentUser.role !== 'admin') {
      throw createAuthorizationError('只能標記自己的通知')
    }

    const db = getD1(event)

    // 標記所有未讀通知為已讀
    const result = await db
      .prepare(
        `UPDATE notifications
         SET read = 1, read_at = datetime('now')
         WHERE user_id = ? AND read = 0`,
      )
      .bind(userId)
      .run()

    return createSuccessResponse(
      {
        userId,
        markedCount: result.meta?.changes || 0,
      },
      '所有通知已標記為已讀',
    )
  } catch (error) {
    handleError(error, '標記所有通知為已讀')
  }
})
