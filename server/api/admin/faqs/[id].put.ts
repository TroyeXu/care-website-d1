// 管理員：更新 FAQ API
import { defineEventHandler, readBody, createError } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('content.edit')(event)

  const faqId = getRouterParam(event, 'id')
  const updates = await readBody(event)

  if (!faqId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少 FAQ ID',
    })
  }

  const db = getD1(event)
  const admin = event.context.admin

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

    // 準備更新欄位
    const updateFields = []
    const updateValues = []

    // 可更新的欄位
    const allowedFields = [
      'category',
      'question',
      'answer',
      'keywords',
      'is_pinned',
      'is_active',
      'sort_order',
    ]

    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        if (field === 'keywords') {
          updateFields.push(`${field} = ?`)
          updateValues.push(JSON.stringify(updates[field]))
        } else if (field === 'is_pinned' || field === 'is_active') {
          updateFields.push(`${field} = ?`)
          updateValues.push(updates[field] ? 1 : 0)
        } else {
          updateFields.push(`${field} = ?`)
          updateValues.push(updates[field])
        }
      }
    }

    if (updateFields.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '沒有提供要更新的欄位',
      })
    }

    // 加入更新者和時間
    updateFields.push('updated_by = ?', 'updated_at = ?')
    updateValues.push(admin.id, new Date().toISOString())

    // 執行更新
    updateValues.push(faqId)

    await db
      .prepare(
        `
        UPDATE faqs 
        SET ${updateFields.join(', ')}
        WHERE id = ?
      `,
      )
      .bind(...updateValues)
      .run()

    // 記錄操作日誌
    await logAdminAction(event, 'update_faq', 'faq', faqId, { updates })

    // 取得更新後的資料
    const updated = await db
      .prepare(
        `
        SELECT 
          f.*,
          fc.name as category_name
        FROM faqs f
        LEFT JOIN faq_categories fc ON f.category = fc.id
        WHERE f.id = ?
      `,
      )
      .bind(faqId)
      .first()

    return {
      success: true,
      message: 'FAQ 已更新',
      faq: {
        id: updated?.id,
        category: updated?.category,
        category_name: updated?.category_name,
        question: updated?.question,
        answer: updated?.answer,
        keywords: updated?.keywords
          ? JSON.parse(updated.keywords as string)
          : [],
        is_pinned: updated?.is_pinned === 1,
        is_active: updated?.is_active === 1,
        sort_order: updated?.sort_order,
        updated_at: updated?.updated_at,
      },
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('更新 FAQ 錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '更新 FAQ 失敗',
    })
  }
})
