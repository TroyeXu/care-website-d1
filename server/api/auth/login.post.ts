import { mockStore } from '~/server/utils/mockStore'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 簡單的模擬驗證
  const user = mockStore.users.getByEmail(email)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: '無效的登入憑證'
    })
  }

  // 模擬密碼驗證（實際上接受任何密碼）
  if (password.length < 6) {
    throw createError({
      statusCode: 401,
      statusMessage: '密碼錯誤'
    })
  }

  // 返回用戶資料（不包含密碼）
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      profile: user.profile,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    token: `mock-token-${user.id}-${Date.now()}`
  }
})