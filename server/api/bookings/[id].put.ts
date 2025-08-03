import { mockStore } from '../../utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const updatedBooking = mockStore.bookings.update(id as string, body)
  
  if (!updatedBooking) {
    throw createError({
      statusCode: 404,
      statusMessage: '預約不存在'
    })
  }

  return updatedBooking
})