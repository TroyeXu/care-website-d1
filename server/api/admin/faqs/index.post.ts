// 管理員：新增 FAQ API
import { defineEventHandler, readBody } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createValidationError,
} from '../../../utils/error-handler'
import { validateRequired } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('content.edit')(event)

  const body = await readBody(event)
  /* eslint-disable camelcase */
  const {
    category,
    question,
    answer,
    keywords,
    is_pinned,
    is_active,
    sort_order,
  } = body
  /* eslint-enable camelcase */

  try {
    // 使用統一的驗證工具
    validateRequired(category, 'category', '分類')
    validateRequired(question, 'question', '問題')
    validateRequired(answer, 'answer', '答案')

    const db = getD1(event)
    const admin = event.context.admin

    // 檢查分類是否存在
    const categoryExists = await db
      .prepare('SELECT id FROM faq_categories WHERE id = ?')
      .bind(category)
      .first()

    if (!categoryExists) {
      throw createValidationError('無效的分類', 'category')
    }

    // 如果沒有提供排序，自動計算
    /* eslint-disable camelcase */
    let finalSortOrder = sort_order
    /* eslint-enable camelcase */
    if (finalSortOrder === undefined) {
      const maxOrder = await db
        .prepare(
          'SELECT MAX(sort_order) as max_order FROM faqs WHERE category = ?',
        )
        .bind(category)
        .first()

      finalSortOrder = ((maxOrder?.max_order as number) || 0) + 10
    }

    const faqId = nanoid()
    const now = new Date().toISOString()

    // 新增 FAQ
    await db
      .prepare(
        `
        INSERT INTO faqs (
          id, category, question, answer, keywords,
          view_count, is_pinned, is_active, sort_order,
          created_by, updated_by, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .bind(
        faqId,
        category,
        question,
        answer,
        JSON.stringify(keywords || []),
        0,
        /* eslint-disable camelcase */
        is_pinned ? 1 : 0,
        is_active !== false ? 1 : 0,
        /* eslint-enable camelcase */
        finalSortOrder,
        admin.id,
        admin.id,
        now,
        now,
      )
      .run()

    // 記錄操作日誌
    await logAdminAction(event, 'create_faq', 'faq', faqId, {
      category,
      question,
    })

    // 取得新建立的 FAQ
    const newFaq = await db
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

    return createSuccessResponse(
      {
        id: newFaq?.id,
        category: newFaq?.category,
        category_name: newFaq?.category_name,
        question: newFaq?.question,
        answer: newFaq?.answer,
        keywords: newFaq?.keywords ? JSON.parse(newFaq.keywords as string) : [],
        is_pinned: newFaq?.is_pinned === 1,
        is_active: newFaq?.is_active === 1,
        sort_order: newFaq?.sort_order,
        created_at: newFaq?.created_at,
      },
      'FAQ 已新增',
    )
  } catch (error: any) {
    handleError(error, '新增 FAQ')
  }
})
