import { defineEventHandler, readBody } from 'h3'
import { loginUser } from '../../utils/auth'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError } from '../../utils/error-handler'
import { validateRequired, validateEmail } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  try {
    // 使用統一的驗證工具
    validateRequired(email, 'email', 'Email')
    validateRequired(password, 'password', '密碼')
    validateEmail(email, 'email')

    const result = await loginUser(event, email, password)

    return createSuccessResponse(result, '登入成功')
  } catch (error: any) {
    handleError(error, '登入')
  }
})
