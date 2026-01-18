import { defineEventHandler, readBody } from 'h3'
import { getD1 } from '../../utils/d1'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'
import { createBooking } from '../../utils/bookingService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const db = getD1(event)

    // 調用 Service 建立預約
    const newBooking = await createBooking(db, body)

    return createSuccessResponse(newBooking, '預約建立成功')
  } catch (error: any) {
    handleError(error, '建立預約')
  }
})
