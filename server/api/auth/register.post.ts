import { defineEventHandler, readBody } from 'h3'
import { registerUser } from '../../utils/auth'
import { validatePassword } from '../../utils/password-validator'
import { createSuccessResponse } from '../../utils/api-response'
import { handleError, createValidationError } from '../../utils/error-handler'
import { validateRequired, validateEmail } from '../../utils/validation'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, name, phone, role } = body

  try {
    // 使用統一的驗證工具
    validateRequired(email, 'email', 'Email')
    validateRequired(password, 'password', '密碼')
    validateRequired(name, 'name', '姓名')

    // 驗證 email 格式
    validateEmail(email, 'email')

    // 驗證密碼強度
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      throw createValidationError(
        passwordValidation.errors.join('；'),
        'password',
      )
    }

    const result = await registerUser(event, {
      email,
      password,
      name,
      phone,
      role: role || 'user',
    })

    return createSuccessResponse(result, '註冊成功')
  } catch (error: any) {
    handleError(error, '註冊')
  }
})
