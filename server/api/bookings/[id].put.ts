import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createNotFoundError,
  createValidationError,
} from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    // 驗證 ID
    validateId(id, 'id')

    const body = await readBody(event)
    const db = getD1(event)

    // 檢查預約是否存在
    const existingBooking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(id)
      .first()

    if (!existingBooking) {
      throw createNotFoundError('預約', id)
    }

    // 建立更新欄位
    const updates = []
    const params = []

    // 可更新的欄位
    const allowedFields = [
      'service_date',
      'start_time',
      'end_time',
      'total_hours',
      'hourly_rate',
      'total_amount',
      'status',
      'notes',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates.push(`${field} = ?`)
        params.push(body[field])
      }
    }

    if (updates.length === 0) {
      throw createValidationError('沒有要更新的資料')
    }

    // 加入更新時間
    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(id)

    // 執行更新
    const updateQuery = `
      UPDATE bookings
      SET ${updates.join(', ')}
      WHERE id = ?
    `

    await db
      .prepare(updateQuery)
      .bind(...params)
      .run()

    // 返回更新後的資料
    const updatedBooking = await db
      .prepare(
        `SELECT
          b.*,
          u.name as user_name,
          u.email as user_email,
          c.user_id as caregiver_user_id,
          cu.name as caregiver_name
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN caregivers c ON b.caregiver_id = c.id
        LEFT JOIN users cu ON c.user_id = cu.id
        WHERE b.id = ?`,
      )
      .bind(id)
      .first()

    return createSuccessResponse(updatedBooking, '預約更新成功')
  } catch (error: any) {
    handleError(error, '更新預約')
  }
})
