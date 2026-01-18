// 取得用戶通知列表 API
import { defineEventHandler, getRouterParam, getQuery } from 'h3'
import { getD1 } from '../../utils/d1'
import { getCurrentUser } from '../../utils/auth'
import {
  createSuccessResponse,
  calculatePagination,
  calculateOffset,
} from '../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
} from '../../utils/error-handler'
import { validateId, validatePaginationParams } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'userId')
  const query = getQuery(event)

  try {
    // 驗證 ID
    validateId(userId, 'userId')

    // 驗證用戶身份
    const currentUser = await getCurrentUser(event)
    if (!currentUser) {
      throw createAuthenticationError('請先登入')
    }

    // 確認只能查看自己的通知（除非是管理員）
    if (currentUser.id !== userId && currentUser.role !== 'admin') {
      throw createAuthorizationError('只能查看自己的通知')
    }

    const db = getD1(event)

    // 驗證分頁參數
    const { page, limit } = validatePaginationParams(query)
    const offset = calculateOffset(page, limit)

    // 篩選條件
    const conditions = ['user_id = ?']
    const params: any[] = [userId]

    // 只顯示未讀
    if (query.unread === 'true') {
      conditions.push('read = 0')
    }

    // 依類型篩選
    if (query.type) {
      conditions.push('type = ?')
      params.push(query.type)
    }

    // 排除已過期的通知
    conditions.push(
      '(expires_at IS NULL OR expires_at > datetime("now"))',
    )

    const whereClause = conditions.join(' AND ')

    // 查詢總數
    const countResult = await db
      .prepare(`SELECT COUNT(*) as total FROM notifications WHERE ${whereClause}`)
      .bind(...params)
      .first()

    const total = countResult?.total || 0

    // 查詢通知列表
    const { results: notifications } = await db
      .prepare(
        `SELECT
          id, user_id, type, title, message, link, data,
          read, read_at, created_at, expires_at
         FROM notifications
         WHERE ${whereClause}
         ORDER BY
           read ASC,
           created_at DESC
         LIMIT ? OFFSET ?`,
      )
      .bind(...params, limit, offset)
      .all()

    // 查詢未讀數量
    const unreadResult = await db
      .prepare(
        'SELECT COUNT(*) as count FROM notifications WHERE user_id = ? AND read = 0',
      )
      .bind(userId)
      .first()

    const unreadCount = unreadResult?.count || 0

    // 計算分頁資訊
    const pagination = calculatePagination(total, page, limit)

    return createSuccessResponse(
      notifications || [],
      undefined,
      {
        pagination,
        unreadCount,
      },
    )
  } catch (error) {
    handleError(error, '取得通知列表')
  }
})
