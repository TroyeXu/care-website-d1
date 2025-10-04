// 管理員登入 API
import { defineEventHandler, readBody, createError } from 'h3'
import { verifyPassword } from '../../../utils/crypto'
import { getD1 } from '../../../utils/d1'
import { setAdminAuth, type AdminUser } from '../../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: '請輸入電子郵件和密碼',
    })
  }

  const db = getD1(event)

  try {
    // 查詢用戶
    const user = await db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first()

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: '帳號或密碼錯誤',
      })
    }

    // 驗證密碼
    const isValidPassword = await verifyPassword(
      password,
      user.password_hash as string,
    )
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: '帳號或密碼錯誤',
      })
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
      throw createError({
        statusCode: 403,
        statusMessage: '您沒有管理員權限',
      })
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

    return {
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: adminData.role_name,
        is_super: admin.is_super,
        permissions: admin.permissions,
      },
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('管理員登入錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '登入失敗，請稍後再試',
    })
  }
})
