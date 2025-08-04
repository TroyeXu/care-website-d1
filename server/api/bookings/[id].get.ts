import { defineEventHandler, getRouterParam, createError } from 'h3'
import { mockStore } from '../../utils/mockStore'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const booking = mockStore.bookings.getById(id as string)

  if (!booking) {
    throw createError({
      statusCode: 404,
      statusMessage: '預約不存在',
    })
  }

  return booking
})
