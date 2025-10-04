// 管理員認證工具 - Cloudflare Workers 相容版本
import type { H3Event } from 'h3'
import { getCookie, setCookie, deleteCookie, getHeader } from 'h3'
import { getD1 } from './d1'
import { generateJWT, verifyJWT } from './crypto'

const ADMIN_TOKEN_COOKIE = 'admin-token'

export interface AdminUser {
  id: string
  user_id: string
  role_id: string
  permissions: string[]
  is_super: boolean
  email: string
  name: string
}

// 取得 JWT Secret
function getAdminJWTSecret(event: H3Event): string {
  // 從 Cloudflare Workers 環境變數取得
  const cfEnv = event.context.cloudflare?.env
  if (cfEnv?.ADMIN_JWT_SECRET) {
    return cfEnv.ADMIN_JWT_SECRET
  }

  // 開發環境使用環境變數
  if (process.env.ADMIN_JWT_SECRET) {
    return process.env.ADMIN_JWT_SECRET
  }

  // 使用一般的 JWT_SECRET
  if (cfEnv?.JWT_SECRET) {
    return cfEnv.JWT_SECRET
  }

  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET
  }

  // 預設值（僅開發環境）
  if (process.dev) {
    console.warn(
      '⚠️ Using default admin JWT secret. Set ADMIN_JWT_SECRET in production!',
    )
    return 'admin-secret-key-change-in-production'
  }

  throw new Error('ADMIN_JWT_SECRET not configured')
}

// 生成管理員 JWT
export async function generateAdminToken(
  event: H3Event,
  admin: AdminUser,
): Promise<string> {
  const secret = getAdminJWTSecret(event)

  const payload = {
    id: admin.id,
    user_id: admin.user_id,
    role_id: admin.role_id,
    is_super: admin.is_super,
    type: 'admin', // 區分管理員 token
  }

  // 8 小時過期
  return await generateJWT(payload, secret, 8 * 60 * 60)
}

// 驗證管理員 JWT
export async function verifyAdminToken(
  event: H3Event,
  token: string,
): Promise<any | null> {
  try {
    const secret = getAdminJWTSecret(event)
    const decoded = await verifyJWT(token, secret)

    // 確認是管理員 token
    if (decoded && decoded.type === 'admin') {
      return decoded
    }

    return null
  } catch {
    return null
  }
}

// 取得當前管理員
export async function getCurrentAdmin(
  event: H3Event,
): Promise<AdminUser | null> {
  const token = getCookie(event, ADMIN_TOKEN_COOKIE)
  if (!token) return null

  const decoded = await verifyAdminToken(event, token)
  if (!decoded) return null

  const db = getD1(event)

  // 從資料庫取得完整管理員資料
  const admin = await db
    .prepare(
      `
      SELECT 
        a.*,
        u.email,
        u.name,
        r.permissions
      FROM admins a
      JOIN users u ON a.user_id = u.id
      JOIN admin_roles r ON a.role_id = r.id
      WHERE a.id = ?
    `,
    )
    .bind(decoded.id)
    .first()

  if (!admin) return null

  return {
    ...admin,
    permissions: JSON.parse((admin.permissions as string) || '[]'),
  } as AdminUser
}

// 設定管理員登入
export async function setAdminAuth(event: H3Event, admin: AdminUser) {
  const token = await generateAdminToken(event, admin)

  setCookie(event, ADMIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: !process.dev,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  })

  // 更新最後登入時間
  const db = getD1(event)
  await db
    .prepare('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?')
    .bind(admin.id)
    .run()
}

// 清除管理員登入
export function clearAdminAuth(event: H3Event) {
  deleteCookie(event, ADMIN_TOKEN_COOKIE)
}

// 檢查權限
export function hasPermission(
  admin: AdminUser,
  requiredPermission: string,
): boolean {
  if (admin.is_super) return true

  const permissions = admin.permissions || []

  // 檢查完全匹配
  if (permissions.includes(requiredPermission)) return true

  // 檢查萬用字元權限 (例如 "caregiver.*" 匹配 "caregiver.view")
  const [resource, action] = requiredPermission.split('.')
  if (permissions.includes(`${resource}.*`)) return true
  if (permissions.includes('*')) return true

  return false
}

// 產生唯一 ID
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // 備用方案：簡單的隨機字串
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 記錄管理員操作
export async function logAdminAction(
  event: H3Event,
  action: string,
  resourceType: string,
  resourceId: string,
  details?: any,
) {
  const admin = await getCurrentAdmin(event)
  if (!admin) return

  const db = getD1(event)

  await db
    .prepare(
      `
      INSERT INTO admin_logs (
        id, admin_id, action, resource_type, resource_id, 
        details, ip_address, user_agent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    )
    .bind(
      generateId(),
      admin.id,
      action,
      resourceType,
      resourceId,
      JSON.stringify(details || {}),
      getClientIP(event) || '',
      getHeader(event, 'user-agent') || '',
    )
    .run()
}

// 取得客戶端 IP
function getClientIP(event: H3Event): string {
  return (
    getHeader(event, 'cf-connecting-ip') ||
    getHeader(event, 'x-forwarded-for') ||
    getHeader(event, 'x-real-ip') ||
    ''
  )
}
