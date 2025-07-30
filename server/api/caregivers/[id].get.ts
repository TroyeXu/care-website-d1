import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const caregiver = mockStore.caregivers.getById(id as string)
  
  if (!caregiver) {
    throw createError({
      statusCode: 404,
      statusMessage: '照護員不存在'
    })
  }

  return caregiver
})