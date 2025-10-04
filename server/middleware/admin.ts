// 管理員認證中介層
import { defineEventHandler, createError } from 'h3'
import { getCurrentAdmin, hasPermission } from '../utils/admin-auth'

// Nitro 中介層需要 default export
export default defineEventHandler(async (event) => {
  // 只處理 /api/admin 路徑
  if (!event.node.req.url?.startsWith('/api/admin')) {
    return
  }

  // 排除登入路徑
  if (event.node.req.url === '/api/admin/auth/login') {
    return
  }

  const admin = await getCurrentAdmin(event)

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: '請先登入管理後台',
    })
  }

  // 將管理員資訊存入 context
  event.context.admin = admin
})

// 輔助函數供 API 使用
export async function requireAdmin(event: any) {
  // 只處理 /api/admin 路徑
  if (!event.node.req.url?.startsWith('/api/admin')) {
    return
  }

  // 排除登入路徑
  if (event.node.req.url === '/api/admin/auth/login') {
    return
  }

  const admin = await getCurrentAdmin(event)

  if (!admin) {
    throw createError({
      statusCode: 401,
      statusMessage: '請先登入管理後台',
    })
  }

  // 將管理員資訊存入 context
  event.context.admin = admin
}

export function requirePermission(permission: string) {
  return (event: any) => {
    const admin = event.context.admin

    if (!admin) {
      throw createError({
        statusCode: 401,
        statusMessage: '未授權',
      })
    }

    if (!hasPermission(admin, permission)) {
      throw createError({
        statusCode: 403,
        statusMessage: '權限不足',
      })
    }
  }
}
