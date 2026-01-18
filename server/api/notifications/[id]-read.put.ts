// 標記通知為已讀 API
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
      throw createAuthorizationError('只能標記自己的通知')
    }

    // 如果已經是已讀狀態，直接返回
    if (notification.read === 1) {
      return createSuccessResponse(notification, '通知已是已讀狀態')
    }

    // 更新為已讀
    await db
      .prepare(
        `UPDATE notifications
         SET read = 1, read_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(notificationId)
      .run()

    // 取得更新後的通知
    const updatedNotification = await db
      .prepare('SELECT * FROM notifications WHERE id = ?')
      .bind(notificationId)
      .first()

    return createSuccessResponse(updatedNotification, '通知已標記為已讀')
  } catch (error) {
    handleError(error, '標記通知為已讀')
  }
})
