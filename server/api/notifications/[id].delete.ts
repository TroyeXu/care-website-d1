// 刪除通知 API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { getCurrentUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
} from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const notificationId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(notificationId, 'id')

    // 驗證用戶身份
    const currentUser = await getCurrentUser(event)
    if (!currentUser) {
      throw createAuthenticationError('請先登入')
    }

    const db = getD1(event)

    // 檢查通知是否存在且屬於當前用戶
    const notification = await db
      .prepare('SELECT * FROM notifications WHERE id = ?')
      .bind(notificationId)
      .first()

    if (!notification) {
      throw createNotFoundError('通知', notificationId)
    }

    // 確認通知屬於當前用戶
    if (notification.user_id !== currentUser.id) {
      throw createAuthorizationError('只能刪除自己的通知')
    }

    // 刪除通知
    await db
      .prepare('DELETE FROM notifications WHERE id = ?')
      .bind(notificationId)
      .run()

    return createSuccessResponse(
      { id: notificationId },
      '通知已刪除',
    )
  } catch (error) {
    handleError(error, '刪除通知')
  }
})
