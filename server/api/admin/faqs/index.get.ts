// 管理員：FAQ 列表 API
import { defineEventHandler, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('content.view')(event)

  const query = getQuery(event)
  /* eslint-disable camelcase */
  const { category, search, is_active, page = 1, limit = 20 } = query
  /* eslint-enable camelcase */

  const db = getD1(event)

  try {
    // 建立查詢條件
    const conditions = []
    const params = []

    if (category) {
      conditions.push('f.category = ?')
      params.push(category)
    }

    /* eslint-disable camelcase */
    if (is_active !== undefined) {
      conditions.push('f.is_active = ?')
      params.push(is_active === 'true' ? 1 : 0)
    }
    /* eslint-enable camelcase */

    if (search) {
      conditions.push(
        '(f.question LIKE ? OR f.answer LIKE ? OR f.keywords LIKE ?)',
      )
      const searchPattern = `%${search}%`
      params.push(searchPattern, searchPattern, searchPattern)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 計算總數
    const countResult = await db
      .prepare(
        `
        SELECT COUNT(*) as total
        FROM faqs f
        ${whereClause}
      `,
      )
      .bind(...params)
      .first()

    const total = countResult?.total || 0

    // 查詢 FAQ 列表
    const offset = (Number(page) - 1) * Number(limit)
    const result = await db
      .prepare(
        `
        SELECT 
          f.*,
          fc.name as category_name,
          fc.icon as category_icon
        FROM faqs f
        LEFT JOIN faq_categories fc ON f.category = fc.id
        ${whereClause}
        ORDER BY f.is_pinned DESC, f.sort_order ASC, f.created_at DESC
        LIMIT ? OFFSET ?
      `,
      )
      .bind(...params, Number(limit), offset)
      .all()

    // 取得分類列表
    const categories = await db
      .prepare(
        'SELECT * FROM faq_categories WHERE is_active = 1 ORDER BY sort_order',
      )
      .all()

    // 格式化資料
    const faqs = result.results.map((row) => ({
      id: row.id,
      category: row.category,
      category_name: row.category_name,
      category_icon: row.category_icon,
      question: row.question,
      answer: row.answer,
      keywords: row.keywords ? JSON.parse(row.keywords as string) : [],
      view_count: row.view_count || 0,
      is_pinned: row.is_pinned === 1,
      is_active: row.is_active === 1,
      sort_order: row.sort_order,
      created_by: row.created_by,
      updated_by: row.updated_by,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    return {
      success: true,
      faqs,
      categories: categories.results,
      pagination: {
        total: Number(total),
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(Number(total) / Number(limit)),
      },
    }
  } catch (error) {
    console.error('取得 FAQ 列表錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '取得 FAQ 列表失敗',
    })
  }
})
