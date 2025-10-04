// 管理員：更新用戶狀態 API
import { defineEventHandler, readBody, createError } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../../utils/d1'
import { requireAdmin, requirePermission } from '../../../middleware/admin'
import { logAdminAction } from '../../../utils/admin-auth'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  await requirePermission('user.suspend')(event)

  const userId = getRouterParam(event, 'id')
  const { status, reason } = await readBody(event)

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: '缺少用戶 ID',
    })
  }

  const validStatuses = ['active', 'suspended', 'banned']
  if (!status || !validStatuses.includes(status)) {
    throw createError({
      statusCode: 400,
      statusMessage: '無效的狀態',
    })
  }

  if ((status === 'suspended' || status === 'banned') && !reason) {
    throw createError({
      statusCode: 400,
      statusMessage: '停用或封禁用戶需要提供原因',
    })
  }

  const db = getD1(event)
  const admin = event.context.admin

  try {
    // 檢查用戶是否存在
    const user = await db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId)
      .first()

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到該用戶',
      })
    }

    // 檢查是否為管理員（避免誤操作）
    const isAdmin = await db
      .prepare('SELECT id FROM admins WHERE user_id = ?')
      .bind(userId)
      .first()

    if (isAdmin && !admin.is_super) {
      throw createError({
        statusCode: 403,
        statusMessage: '只有超級管理員可以更改其他管理員的狀態',
      })
    }

    const previousStatus = user.status || 'active'

    // 批次操作
    const operations = []

    // 更新用戶狀態
    operations.push(
      db
        .prepare(
          `
        UPDATE users 
        SET status = ?, updated_at = ?
        WHERE id = ?
      `,
        )
        .bind(status, new Date().toISOString(), userId),
    )

    // 記錄狀態變更
    operations.push(
      db
        .prepare(
          `
        INSERT INTO user_status_logs (
          id, user_id, previous_status, new_status, 
          reason, changed_by, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
        )
        .bind(
          nanoid(),
          userId,
          previousStatus,
          status,
          reason || null,
          admin.id,
          new Date().toISOString(),
        ),
    )

    // 如果是看護師，同步更新看護師狀態
    if (user.role === 'caregiver') {
      const caregiverStatus = status === 'active' ? 'active' : 'inactive'
      operations.push(
        db
          .prepare(
            `
          UPDATE caregivers 
          SET status = ?, updated_at = ?
          WHERE user_id = ?
        `,
          )
          .bind(caregiverStatus, new Date().toISOString(), userId),
      )
    }

    // 執行批次操作
    await db.batch(operations)

    // 記錄管理員操作
    await logAdminAction(event, 'update_user_status', 'user', userId, {
      previous_status: previousStatus,
      new_status: status,
      reason,
    })

    return {
      success: true,
      message: '用戶狀態已更新',
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        status,
        updated_at: new Date().toISOString(),
      },
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    console.error('更新用戶狀態錯誤:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '更新狀態失敗',
    })
  }
})
