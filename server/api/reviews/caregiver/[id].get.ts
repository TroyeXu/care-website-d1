// 取得看護師評價列表 API
import { defineEventHandler, getRouterParam, getQuery } from 'h3'
import { getD1 } from '../../../utils/d1'
import { createSuccessResponse } from '../../../utils/api-response'
import { handleError, createNotFoundError } from '../../../utils/error-handler'
import { validateId, validatePaginationParams } from '../../../utils/validation'
import { calculatePagination, calculateOffset } from '../../../utils/api-response'

export default defineEventHandler(async (event) => {
  const caregiverId = getRouterParam(event, 'id')

  try {
    validateId(caregiverId, 'id')

    const query = getQuery(event)
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10

    validatePaginationParams(page, limit)
    const offset = calculateOffset(page, limit)

    const db = getD1(event)

    // 檢查看護師是否存在
    const caregiver = await db
      .prepare('SELECT id, rating, review_count FROM caregivers WHERE id = ?')
      .bind(caregiverId)
      .first()

    if (!caregiver) {
      throw createNotFoundError('看護師', caregiverId)
    }

    // 取得評價列表
    const { results: reviews } = await db
      .prepare(
        `SELECT
          r.*,
          u.name as user_name,
          u.avatar as user_avatar
         FROM reviews r
         LEFT JOIN users u ON r.user_id = u.id
         WHERE r.caregiver_id = ?
         ORDER BY r.created_at DESC
         LIMIT ? OFFSET ?`,
      )
      .bind(caregiverId, limit, offset)
      .all()

    // 取得總數
    const totalResult = await db
      .prepare('SELECT COUNT(*) as count FROM reviews WHERE caregiver_id = ?')
      .bind(caregiverId)
      .first()

    const total = Number(totalResult?.count || 0)

    // 計算評分分布
    const ratingDistribution = await db
      .prepare(
        `SELECT
          rating,
          COUNT(*) as count
         FROM reviews
         WHERE caregiver_id = ?
         GROUP BY rating
         ORDER BY rating DESC`,
      )
      .bind(caregiverId)
      .all()

    const pagination = calculatePagination(total, page, limit)

    return createSuccessResponse(
      {
        reviews: reviews || [],
        summary: {
          averageRating: Number(caregiver.rating) || 0,
          totalReviews: Number(caregiver.review_count) || 0,
          ratingDistribution: ratingDistribution.results || [],
        },
      },
      undefined,
      { pagination },
    )
  } catch (error: any) {
    handleError(error, '取得評價列表')
  }
})
