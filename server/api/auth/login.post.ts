import { defineEventHandler, readBody, createError } from 'h3'
import { loginUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 驗證必填欄位
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: '請提供電子郵件和密碼',
    })
  }

  try {
    const result = await loginUser(event, email, password)
    
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
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '登入失敗，請稍後再試',
    })
  }
})