import { mockStore } from '../../utils/mockStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { patient_id, caregiver_id, status } = query

  let bookings = mockStore.bookings.getAll()

  // 根據病患篩選
  if (patient_id) {
    bookings = bookings.filter((b) => b.patient_id === patient_id)
  }

  // 根據照護員篩選
  if (caregiver_id) {
    bookings = bookings.filter((b) => b.caregiver_id === caregiver_id)
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
