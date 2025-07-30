import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const payment = mockStore.payments.getById(id as string)
  
  if (!payment) {
    throw createError({
      statusCode: 404,
      statusMessage: '付款記錄不存在'
    })
  }

  return payment
})