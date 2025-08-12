import { defineEventHandler, readBody, createError } from 'h3'
import { registerUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name, phone, role } = body

  // 驗證必填欄位
  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: '請提供必要資訊',
    })
  }

  // 驗證密碼強度
  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      statusMessage: '密碼長度至少需要 8 個字符',
    })
  }

  // 驗證 email 格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: '請提供有效的電子郵件地址',
    })
  }

  try {
    const result = await registerUser(event, {
      email,
      password,
      name,
      phone,
      role: role || 'user'
    })
    
    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    // 如果是已知錯誤，直接拋出
    if (error.statusCode) {
      throw error
    }
    
    // 未知錯誤
    console.error('Registration error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '註冊失敗，請稍後再試',
    })
  }
})