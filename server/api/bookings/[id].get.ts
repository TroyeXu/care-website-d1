import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const booking = mockStore.bookings.getById(id as string)
  
  if (!booking) {
    throw createError({
      statusCode: 404,
      statusMessage: '預約不存在'
    })
  }

  return booking
})