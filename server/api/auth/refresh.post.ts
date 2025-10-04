import { defineEventHandler, createError } from 'h3'
import { getToken, getJWTSecret, setAuthCookie } from '../../utils/auth'
import { verifyJWT, generateJWT } from '../../utils/crypto'

export default defineEventHandler(async (event) => {
  // 獲取當前 token
  const token = getToken(event)

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: '未提供認證 Token',
    })
  }

  try {
    // 獲取 JWT secret
    const secret = getJWTSecret(event)

    // 驗證 token
    const payload = await verifyJWT(token, secret)

    if (!payload || !payload.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token 無效或已過期',
      })
    }

    // 生成新的 token
    const newPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    }

    const newToken = await generateJWT(newPayload, secret)
    setAuthCookie(event, newToken)

    return {
      success: true,
      token: newToken,
      message: 'Token 已更新',
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '更新 Token 失敗',
    })
  }
})
