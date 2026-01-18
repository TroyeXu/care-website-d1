import { defineEventHandler } from 'h3'
import { getToken, getJWTSecret, setAuthCookie } from '../../utils/auth'
import { verifyJWT, generateJWT } from '../../utils/crypto'
import { createSuccessResponse } from '../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
} from '../../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 獲取當前 token
    const token = getToken(event)

    if (!token) {
      throw createAuthenticationError('未提供認證 Token')
    }

    // 獲取 JWT secret
    const secret = getJWTSecret(event)

    // 驗證 token
    const payload = await verifyJWT(token, secret)

    if (!payload || !payload.userId) {
      throw createAuthenticationError('Token 無效或已過期')
    }

    // 生成新的 token
    const newPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    }

    const newToken = await generateJWT(newPayload, secret)
    setAuthCookie(event, newToken)

    return createSuccessResponse(
      {
        token: newToken,
      },
      'Token 已更新',
    )
  } catch (error: any) {
    handleError(error, '更新 Token')
  }
})
