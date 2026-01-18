// 初始化管理員帳號的臨時端點（僅限開發環境）
import { defineEventHandler } from 'h3'
import { hashPassword } from '../utils/crypto'
import { getD1 } from '../utils/d1'
import { createSuccessResponse } from '../utils/api-response'
import { handleError, createAuthorizationError } from '../utils/error-handler'

export default defineEventHandler(async (event) => {
  try {
    // 僅限開發環境
    if (process.env.NODE_ENV === 'production') {
      throw createAuthorizationError('此端點僅在開發環境可用')
    }

    const db = getD1(event)
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

    return createSuccessResponse(
      {
        credentials: {
          email: 'admin@example.com',
          password: 'admin123',
        },
      },
      '管理員帳號建立成功',
    )
  } catch (error: any) {
    handleError(error, '建立管理員帳號')
  }
})
