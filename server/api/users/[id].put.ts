import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  
  const updatedUser = mockStore.users.update(id as string, body)
  
  if (!updatedUser) {
    throw createError({
      statusCode: 404,
      statusMessage: '用戶不存在'
    })
  }

  return updatedUser
})