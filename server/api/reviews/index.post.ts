import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const newReview = {
    id: `review-${Date.now()}`,
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const createdReview = mockStore.reviews.create(newReview)
  
  // 更新照護員的評分
  const caregiver = mockStore.caregivers.getById(body.caregiver_id)
  if (caregiver) {
    const allReviews = mockStore.reviews.getByCaregiverId(body.caregiver_id)
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0)
    const avgRating = totalRating / allReviews.length
    
    mockStore.caregivers.update(body.caregiver_id, {
      rating: Math.round(avgRating * 10) / 10,
      reviews_count: allReviews.length
    })
  }
  
  return createdReview
})