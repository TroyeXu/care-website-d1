// Cloudflare Workers 相容的認證工具
// 使用 Web Crypto API 而非 bcrypt (Workers 不支援 Node.js 原生模組)

import type { H3Event } from 'h3'
import type { User } from '../../shared/types'
import { queryFirst, execute, generateId } from './d1'

// 匯入共享的 User 類型（不含密碼）

// 使用 Web Crypto API 進行密碼雜湊
export async function hashPasswordCrypto(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey'],
  )

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )

  const exported = await crypto.subtle.exportKey('raw', key)
  const hashArray = Array.from(new Uint8Array(exported))
  const saltArray = Array.from(salt)

  // 組合 salt 和 hash
  return (
    saltArray.map((b) => b.toString(16).padStart(2, '0')).join('') +
    ':' +
    hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  )
}

// 驗證密碼
export async function verifyPasswordCrypto(
  password: string,
  storedHash: string,
): Promise<boolean> {
  try {
    const [saltHex, hashHex] = storedHash.split(':')
    const salt = new Uint8Array(
      saltHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)),
    )

    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey'],
    )

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt'],
    )

    const exported = await crypto.subtle.exportKey('raw', key)
    const hashArray = Array.from(new Uint8Array(exported))
    const computedHash = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    return computedHash === hashHex
  } catch {
    return false
  }
}

// 簡單的 JWT 實作（適用於 Workers）
async function generateAuthJWT(
  payload: Record<string, any>,
  secret: string,
  expiresIn: number = 7 * 24 * 60 * 60, // 預設 7 天
): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const now = Math.floor(Date.now() / 1000)
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  }

  const encoder = new TextEncoder()
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '')
  const encodedPayload = btoa(JSON.stringify(fullPayload)).replace(/=/g, '')

  const message = `${encodedHeader}.${encodedPayload}`

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message),
  )

  const encodedSignature = btoa(
    String.fromCharCode(...new Uint8Array(signature)),
  )
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `${message}.${encodedSignature}`
}

// 驗證 JWT
async function verifyAuthJWT(
  token: string,
  secret: string,
): Promise<Record<string, any> | null> {
  try {
    const [header, payload, signature] = token.split('.')

    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    )

    const signatureBuffer = Uint8Array.from(
      atob(signature.replace(/-/g, '+').replace(/_/g, '/')),
      (c) => c.charCodeAt(0),
    )

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBuffer,
      encoder.encode(`${header}.${payload}`),
    )

    if (!valid) return null

    const decodedPayload = JSON.parse(atob(payload))

    // 檢查過期時間
    if (
      decodedPayload.exp &&
      decodedPayload.exp < Math.floor(Date.now() / 1000)
    ) {
      return null
    }

    return decodedPayload
  } catch {
    return null
  }
}

// 從請求中獲取 JWT Secret（Cloudflare Workers 環境）
export function getJWTSecret(event: H3Event): string {
  // 從 Cloudflare Workers 環境變數取得
  const cfEnv = event.context.cloudflare?.env
  if (cfEnv?.JWT_SECRET) {
    return cfEnv.JWT_SECRET
  }

  // 開發環境使用環境變數
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET
  }

  // 預設值（僅開發環境）
  if (process.dev) {
    console.warn('⚠️ Using default JWT secret. Set JWT_SECRET in production!')
    return 'dev-secret-change-in-production'
  }

  throw new Error('JWT_SECRET not configured')
}

// 使用者介面（含密碼欄位，僅後端使用）
interface UserWithPassword {
  id: string
  email: string
  password_hash: string
  name: string
  phone?: string
  role: 'user' | 'caregiver' | 'admin'
  avatar_url?: string
  email_verified: boolean
  phone_verified: boolean
  created_at: string
  updated_at: string
}

// JWT Payload
export interface JWTPayload {
  userId: string
  email: string
  role: string
  iat?: number
  exp?: number
}

// 從 Cookie 獲取 token
export function getTokenFromCookie(event: H3Event): string | null {
  return getCookie(event, 'auth-token') || null
}

// 從 Header 獲取 token
export function getTokenFromHeader(event: H3Event): string | null {
  const authorization = getHeader(event, 'authorization')
  if (!authorization) return null

  const [type, token] = authorization.split(' ')
  if (type !== 'Bearer' || !token) return null

  return token
}

// 獲取 token（優先 Cookie，其次 Header）
export function getToken(event: H3Event): string | null {
  return getTokenFromCookie(event) || getTokenFromHeader(event)
}

// 設定認證 Cookie
export function setAuthCookie(event: H3Event, token: string): void {
  setCookie(event, 'auth-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 天
    path: '/',
  })
}

// 清除認證 Cookie
export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, 'auth-token')
}

// 獲取當前使用者
export async function getCurrentUser(event: H3Event): Promise<User | null> {
  const token = getToken(event)
  if (!token) return null

  const secret = getJWTSecret(event)
  const payload = await verifyAuthJWT(token, secret)
  if (!payload || !payload.userId) return null

  const user = await queryFirst<UserWithPassword>(
    event,
    'SELECT * FROM users WHERE id = ?',
    [payload.userId],
  )

  if (!user) return null

  // 移除密碼雜湊
  // eslint-disable-next-line camelcase
  const { password_hash, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

// 要求認證
export async function requireAuth(event: H3Event): Promise<User> {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return user
}

// 要求特定角色
export async function requireRole(
  event: H3Event,
  roles: string[],
): Promise<User> {
  const user = await requireAuth(event)

  if (!roles.includes(user.role)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
    })
  }

  return user
}

// 登入使用者
export async function loginUser(
  event: H3Event,
  email: string,
  password: string,
): Promise<{
  user: User
  token: string
}> {
  // 查找使用者
  const user = await queryFirst<UserWithPassword>(
    event,
    'SELECT * FROM users WHERE email = ?',
    [email],
  )

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // 驗證密碼
  const isValid = await verifyPasswordCrypto(password, user.password_hash)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid email or password',
    })
  }

  // 生成 JWT
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const secret = getJWTSecret(event)
  const token = await generateAuthJWT(payload, secret)

  // 設定 Cookie
  setAuthCookie(event, token)

  // 移除密碼雜湊
  // eslint-disable-next-line camelcase
  const { password_hash, ...userWithoutPassword } = user

  return {
    user: userWithoutPassword as User,
    token,
  }
}

// 註冊使用者
export async function registerUser(
  event: H3Event,
  data: {
    email: string
    password: string
    name: string
    phone?: string
    role?: 'user' | 'caregiver'
  },
): Promise<{
  user: User
  token: string
}> {
  // 檢查 email 是否已存在
  const existing = await queryFirst<{ id: string }>(
    event,
    'SELECT id FROM users WHERE email = ?',
    [data.email],
  )

  if (existing) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email already registered',
    })
  }

  // 雜湊密碼
  const passwordHash = await hashPasswordCrypto(data.password)

  // 建立使用者
  const userId = generateId()

  await execute(
    event,
    `INSERT INTO users (
      id, email, password_hash, name, phone, role,
      email_verified, phone_verified, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`,
    [
      userId,
      data.email,
      passwordHash,
      data.name,
      data.phone || null,
      data.role || 'user',
      0,
      0,
    ],
  )

  // 如果是看護師角色，建立看護師資料
  if (data.role === 'caregiver') {
    const caregiverId = generateId()
    await execute(
      event,
      `INSERT INTO caregivers (
        id, user_id, created_at, updated_at
      ) VALUES (?, ?, datetime('now'), datetime('now'))`,
      [caregiverId, userId],
    )
  }

  // 生成 JWT
  const payload: JWTPayload = {
    userId,
    email: data.email,
    role: data.role || 'user',
  }

  const secret = getJWTSecret(event)
  const token = await generateAuthJWT(payload, secret)

  // 設定 Cookie
  setAuthCookie(event, token)

  return {
    user: {
      id: userId,
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      role: data.role || 'user',
      avatar_url: null,
      email_verified: false,
      phone_verified: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    token,
  }
}

// 登出使用者
export function logoutUser(event: H3Event): void {
  clearAuthCookie(event)
}
