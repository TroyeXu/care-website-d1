// 初始化管理員帳號的臨時端點（僅限開發環境）
import { defineEventHandler, createError } from 'h3'
import { hashPassword } from '../utils/crypto'
import { getD1 } from '../utils/d1'

export default defineEventHandler(async (event) => {
  // 僅限開發環境
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'This endpoint is only available in development',
    })
  }

  const db = getD1(event)

  try {
    // 生成密碼雜湊
    const passwordHash = await hashPassword('admin123')

    // 生成 ID
    const userId = crypto.randomUUID()
    const adminId = crypto.randomUUID()
    const roleId = crypto.randomUUID()

    // 建立角色
    await db
      .prepare(
        `
      INSERT OR REPLACE INTO admin_roles (id, name, description, permissions, created_at) 
      VALUES (?, ?, ?, ?, datetime('now'))
    `,
      )
      .bind(roleId, '超級管理員', '擁有所有權限', JSON.stringify(['*']))
      .run()

    // 建立用戶
    await db
      .prepare(
        `
      INSERT OR REPLACE INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `,
      )
      .bind(
        userId,
        '系統管理員',
        'admin@example.com',
        passwordHash,
        '0912345678',
        'admin',
        'active',
      )
      .run()

    // 建立管理員記錄
    await db
      .prepare(
        `
      INSERT OR REPLACE INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `,
      )
      .bind(adminId, userId, roleId, 1, 'system')
      .run()

    return {
      success: true,
      message: '管理員帳號建立成功',
      credentials: {
        email: 'admin@example.com',
        password: 'admin123',
      },
    }
  } catch (error: any) {
    console.error('建立管理員帳號錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '建立管理員帳號失敗: ' + error.message,
    })
  }
})
