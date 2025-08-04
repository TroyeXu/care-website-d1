import { defineEventHandler, getQuery } from 'h3'
import { mockStore } from '../../utils/mockStore'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { userId, caregiverId, status } = query

  let bookings = mockStore.bookings.getAll()

  // 根據用戶篩選
  if (userId) {
    bookings = bookings.filter((b) => b.userId === userId)
  }

  // 根據照護員篩選
  if (caregiverId) {
    bookings = bookings.filter((b) => b.caregiverId === caregiverId)
  }

  // 根據狀態篩選
  if (status) {
    bookings = bookings.filter((b) => b.status === status)
  }

  return {
    bookings,
    total: bookings.length,
  }
})
