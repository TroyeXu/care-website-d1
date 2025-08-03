import { mockStore } from '../../utils/mockStore'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { role } = query

  let users = mockStore.users.getAll()
  
  // 根據角色篩選
  if (role) {
    users = users.filter(user => user.role === role)
  }

  return {
    users,
    total: users.length
  }
})