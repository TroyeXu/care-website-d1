import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { caregiver_id } = query

  let reviews = mockStore.reviews.getAll()
  
  // 根據照護員篩選
  if (caregiver_id) {
    reviews = reviews.filter(r => r.caregiver_id === caregiver_id)
  }

  return {
    reviews,
    total: reviews.length
  }
})