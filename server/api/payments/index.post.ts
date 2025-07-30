import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const newPayment = {
    id: `payment-${Date.now()}`,
    ...body,
    status: 'pending',
    transaction_id: `txn_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const createdPayment = mockStore.payments.create(newPayment)
  
  // 模擬付款處理
  setTimeout(() => {
    mockStore.payments.update(createdPayment.id, {
      status: 'completed',
      paid_at: new Date().toISOString()
    })
    
    // 更新預約狀態
    if (body.booking_id) {
      mockStore.bookings.update(body.booking_id, {
        status: 'confirmed'
      })
    }
  }, 2000)
  
  return createdPayment
})