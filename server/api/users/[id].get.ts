import { mockStore } from '../../utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  const user = mockStore.users.getById(id as string)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: '用戶不存在'
    })
  }

  return user
})