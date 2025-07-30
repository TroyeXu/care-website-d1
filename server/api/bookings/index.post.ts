import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const newBooking = {
    id: `booking-${Date.now()}`,
    ...body,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const createdBooking = mockStore.bookings.create(newBooking)
  
  return createdBooking
})