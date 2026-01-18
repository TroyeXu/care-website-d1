// 管理員回覆聯絡表單 API
import { defineEventHandler, readBody, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import {
  getCurrentAdmin,
  hasPermission,
  logAdminAction,
} from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
  createNotFoundError,
} from '../../../utils/error-handler'
import { validateId, validateRequired } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const submissionId = getRouterParam(event, 'id')
  const { reply_message, status } = await readBody(event)

  try {
    validateId(submissionId, 'id')
    validateRequired(reply_message, 'reply_message', '回覆訊息')

    // 驗證管理員權限
    const admin = await getCurrentAdmin(event)
    if (!admin) {
      throw createAuthenticationError('請先登入管理後台')
    }

    // 檢查權限
    if (!hasPermission(admin, 'contact.reply')) {
      throw createAuthorizationError('無此操作權限')
    }

    const db = getD1(event)

    // 檢查提交是否存在
    const submission = await db
      .prepare('SELECT * FROM contact_submissions WHERE id = ?')
      .bind(submissionId)
      .first()

    if (!submission) {
      throw createNotFoundError('聯絡表單', submissionId)
    }

    // 更新回覆
    await db
      .prepare(
        `UPDATE contact_submissions
         SET reply_message = ?,
             status = ?,
             replied_at = datetime('now'),
             replied_by = ?,
             updated_at = datetime('now')
         WHERE id = ?`,
      )
      .bind(
        reply_message,
        status || 'replied',
        admin.id,
        submissionId,
      )
      .run()

    // 記錄操作日誌
    await logAdminAction(
      event,
      'reply_contact',
      'contact_submission',
      submissionId,
      { status: status || 'replied' },
    )

    // TODO: 發送 Email 通知給提交者（如果有 Email 服務）

    // 取得更新後的資料
    const updatedSubmission = await db
      .prepare(
        `SELECT
          c.*,
          a.user_id as replied_by_user_id,
          u.name as replied_by_name
         FROM contact_submissions c
         LEFT JOIN admins a ON c.replied_by = a.id
         LEFT JOIN users u ON a.user_id = u.id
         WHERE c.id = ?`,
      )
      .bind(submissionId)
      .first()

    return createSuccessResponse(updatedSubmission, '回覆成功')
  } catch (error: any) {
    handleError(error, '回覆聯絡表單')
  }
})
