import { defineEventHandler, readBody } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createConflictError,
  createValidationError,
} from '../../utils/error-handler'
import { validateRequired, validateNumberRange } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    // 使用統一的驗證工具
    validateRequired(body.booking_id, 'booking_id', '預約 ID')
    validateRequired(body.user_id, 'user_id', '用戶 ID')
    validateRequired(body.caregiver_id, 'caregiver_id', '看護師 ID')
    validateRequired(body.rating, 'rating', '評分')

    // 驗證評分範圍
    validateNumberRange(body.rating, 1, 5, 'rating', '評分')

    const db = getD1(event)

    // 檢查預約是否存在且已完成
    const booking = await db
      .prepare(
        `
        SELECT * FROM bookings
        WHERE id = ? AND user_id = ? AND caregiver_id = ?
      `,
      )
      .bind(body.booking_id, body.user_id, body.caregiver_id)
      .first()

    if (!booking) {
      throw createNotFoundError('預約記錄', body.booking_id)
    }

    if (booking.status !== 'completed') {
      throw createValidationError('只能對已完成的預約進行評價', 'booking_id')
    }

    // 檢查是否已評價過
    const existingReview = await db
      .prepare('SELECT * FROM reviews WHERE booking_id = ?')
      .bind(body.booking_id)
      .first()

    if (existingReview) {
      throw createConflictError('該預約已經評價過了', {
        reviewId: existingReview.id,
      })
    }

    const reviewId = nanoid()
    const now = new Date().toISOString()

    // 插入評價
    await db
      .prepare(
        `
        INSERT INTO reviews (
          id, booking_id, user_id, caregiver_id, 
          rating, comment, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .bind(
        reviewId,
        body.booking_id,
        body.user_id,
        body.caregiver_id,
        body.rating,
        body.comment || '',
        now,
      )
      .run()

    // 更新看護師的評分統計
    const { results: allReviews } = await db
      .prepare(
        `
        SELECT rating FROM reviews 
        WHERE caregiver_id = ?
      `,
      )
      .bind(body.caregiver_id)
      .all()

    if (allReviews && allReviews.length > 0) {
      const totalRating = allReviews.reduce(
        (sum: number, r: any) => sum + r.rating,
        0,
      )
      const avgRating = totalRating / allReviews.length

      await db
        .prepare(
          `
          UPDATE caregivers
          SET rating = ?, review_count = ?, updated_at = datetime('now')
          WHERE id = ?
        `,
        )
        .bind(avgRating.toFixed(1), allReviews.length, body.caregiver_id)
        .run()
    }

    // 返回新建的評價
    const newReview = await db
      .prepare(
        `
        SELECT
          r.*,
          u.name as user_name,
          cu.name as caregiver_name
        FROM reviews r
        LEFT JOIN users u ON r.user_id = u.id
        LEFT JOIN caregivers c ON r.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE r.id = ?
      `,
      )
      .bind(reviewId)
      .first()

    return createSuccessResponse(newReview, '評價新增成功')
  } catch (error: any) {
    handleError(error, '新增評價')
  }
})
