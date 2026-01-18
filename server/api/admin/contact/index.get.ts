// 管理員查看聯絡表單列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { getCurrentAdmin, hasPermission } from '../../../utils/admin-auth'
import {
  createSuccessResponse,
  calculatePagination,
  calculateOffset,
} from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
} from '../../../utils/error-handler'
import { validatePaginationParams } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  try {
    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限（客服人員以上可查看）
    if (!hasPermission(admin, 'contact.view')) {
      throw createAuthorizationError('無此操作權限')
    }

    const query = getQuery(event)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 20

    validatePaginationParams(page, limit)
    const offset = calculateOffset(page, limit)
    const status = query.status as string

    const db = getD1(event)

    // 建立查詢條件
    let whereClause = ''
    const params: any[] = []

    if (status && ['pending', 'replied', 'closed'].includes(status)) {
      whereClause = 'WHERE status = ?'
      params.push(status)
    }

    // 取得聯絡表單列表
    const { results: submissions } = await db
      .prepare(
        `SELECT
          c.*,
          a.user_id as replied_by_user_id,
          u.name as replied_by_name
         FROM contact_submissions c
         LEFT JOIN admins a ON c.replied_by = a.id
         LEFT JOIN users u ON a.user_id = u.id
         ${whereClause}
         ORDER BY
           CASE WHEN c.status = 'pending' THEN 0 ELSE 1 END,
           c.created_at DESC
         LIMIT ? OFFSET ?`,
      )
      .bind(...params, limit, offset)
      .all()

    // 取得總數
    const totalQuery = whereClause
      ? db.prepare(`SELECT COUNT(*) as count FROM contact_submissions ${whereClause}`).bind(...params)
      : db.prepare('SELECT COUNT(*) as count FROM contact_submissions')

    const totalResult = await totalQuery.first()
    const total = totalResult?.count || 0

    // 取得統計資料
    const statsResult = await db
      .prepare(
        `SELECT
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied,
          SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) as closed
         FROM contact_submissions`,
      )
      .first()

    const pagination = calculatePagination(Number(total), page, limit)

    return createSuccessResponse(
      {
        submissions: submissions || [],
        stats: {
          total: Number(statsResult?.total) || 0,
          pending: Number(statsResult?.pending) || 0,
          replied: Number(statsResult?.replied) || 0,
          closed: Number(statsResult?.closed) || 0,
        },
      },
      undefined,
      { pagination },
    )
  } catch (error: any) {
    handleError(error, '取得聯絡表單列表')
  }
})
