import { defineEventHandler, getRouterParam } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError, createNotFoundError } from '../../utils/error-handler'
import { validateId } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    validateId(id, 'id')

    const db = getD1(event)

    // 檢查預約是否存在
    const existingBooking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(id)
      .first()

    if (!existingBooking) {
      throw createNotFoundError('預約', id)
    }

    // 軟刪除：更新狀態為 cancelled
    await db
      .prepare(
        `
        UPDATE bookings
        SET status = 'cancelled',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `,
      )
      .bind(id)
      .run()

    return createSuccessResponse(null, '預約已取消')
  } catch (error: any) {
    handleError(error, '取消預約')
  }
})
