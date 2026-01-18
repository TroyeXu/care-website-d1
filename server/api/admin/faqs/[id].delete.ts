// 管理員：刪除 FAQ API
import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createNotFoundError } from '../../../utils/error-handler'
import { validateId } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('content.edit')(event)

  const faqId = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(faqId, 'id')

    const db = getD1(event)

    // 檢查 FAQ 是否存在
    const existing = await db
      .prepare('SELECT * FROM faqs WHERE id = ?')
      .bind(faqId)
      .first()

    if (!existing) {
      throw createNotFoundError('FAQ', faqId)
    }

    // 刪除 FAQ
    await db.prepare('DELETE FROM faqs WHERE id = ?').bind(faqId).run()

    // 記錄操作日誌
    await logAdminAction(event, 'delete_faq', 'faq', faqId, {
      question: existing.question,
      category: existing.category,
    })

    return createSuccessResponse(null, 'FAQ 已刪除')
  } catch (error: any) {
    handleError(error, '刪除 FAQ')
  }
})
