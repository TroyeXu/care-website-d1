// 管理員登入 API
import { defineEventHandler, readBody } from 'h3'
import { verifyPassword } from '../../../utils/crypto'
import { getD1 } from '../../../utils/d1'
import { setAdminAuth, type AdminUser } from '../../../utils/admin-auth'
import { createSuccessResponse } from '../../../utils/api-response'
import {
  handleError,
  createAuthenticationError,
  createAuthorizationError,
} from '../../../utils/error-handler'
import { validateRequired, validateEmail } from '../../../utils/validation'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  try {
    // 使用統一的驗證工具
    validateRequired(email, 'email', 'Email')
    validateRequired(password, 'password', '密碼')
    validateEmail(email, 'email')

    const db = getD1(event)

    // 查詢用戶
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first()

    if (!user) {
      throw createAuthenticationError('帳號或密碼錯誤')
    }

    // 驗證密碼
    const isValidPassword = await verifyPassword(
      password,
      user.password_hash as string,
    )
    if (!isValidPassword) {
      throw createAuthenticationError('帳號或密碼錯誤')
    }

    // 檢查是否為管理員
    const adminData = await db
      .prepare(
        `
        SELECT
          a.*,
          r.name as role_name,
          r.permissions
        FROM admins a
        JOIN admin_roles r ON a.role_id = r.id
        WHERE a.user_id = ?
      `,
      )
      .bind(user.id)
      .first()

    if (!adminData) {
      throw createAuthorizationError('您沒有管理員權限')
    }

    // 準備管理員資料
    const admin: AdminUser = {
      id: adminData.id as string,
      user_id: user.id as string,
      role_id: adminData.role_id as string,
      permissions: JSON.parse((adminData.permissions as string) || '[]'),
      is_super: adminData.is_super === 1,
      email: user.email as string,
      name: user.name as string,
    }

    // 設定登入狀態
    await setAdminAuth(event, admin)

    return createSuccessResponse(
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: adminData.role_name,
        is_super: admin.is_super,
        permissions: admin.permissions,
      },
      '登入成功',
    )
  } catch (error: any) {
    handleError(error, '管理員登入')
  }
})
