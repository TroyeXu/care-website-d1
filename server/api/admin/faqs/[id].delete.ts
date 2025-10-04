// 管理員：刪除 FAQ API
import { defineEventHandler, createError } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('content.edit')(event)

  const faqId = getRouterParam(event, 'id')

  if (!faqId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少 FAQ ID',
    })
  }

  const db = getD1(event)

  try {
    // 檢查 FAQ 是否存在
    const existing = await db
      .prepare('SELECT * FROM faqs WHERE id = ?')
      .bind(faqId)
      .first()

    if (!existing) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該 FAQ',
      })
    }

    // 刪除 FAQ
    await db.prepare('DELETE FROM faqs WHERE id = ?').bind(faqId).run()

    // 記錄操作日誌
    await logAdminAction(event, 'delete_faq', 'faq', faqId, {
      question: existing.question,
      category: existing.category,
    })

    return {
      success: true,
      message: 'FAQ 已刪除',
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('刪除 FAQ 錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '刪除 FAQ 失敗',
    })
  }
})
