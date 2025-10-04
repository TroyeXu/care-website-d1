// Cloudflare Workers 相容的加密工具
// 使用 Web Crypto API 替代 bcrypt

// 密碼雜湊
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // 使用 PBKDF2 演算法
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )

  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  )

  // 將 salt 和 hash 組合並轉換為 base64
  const hashArray = new Uint8Array(hashBuffer)
  const combined = new Uint8Array(salt.length + hashArray.length)
  combined.set(salt)
  combined.set(hashArray, salt.length)

  return btoa(String.fromCharCode(...combined))
}

// 驗證密碼
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const encoder = new TextEncoder()

    // 解碼 base64
    const combined = Uint8Array.from(atob(hashedPassword), (c) =>
      c.charCodeAt(0),
    )

    // 分離 salt 和 hash
    const salt = combined.slice(0, 16)
    const storedHash = combined.slice(16)

    // 使用相同的 salt 重新計算 hash
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits'],
    )

    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      256,
    )

    const hashArray = new Uint8Array(hashBuffer)

    // 比較 hash
    if (hashArray.length !== storedHash.length) {
      return false
    }

    for (let i = 0; i < hashArray.length; i++) {
      if (hashArray[i] !== storedHash[i]) {
        return false
      }
    }

    return true
  } catch (error) {
    console.error('密碼驗證錯誤:', error)
    return false
  }
}

// 產生安全的隨機 token
export function generateSecureToken(length: number = 32): string {
  const array = crypto.getRandomValues(new Uint8Array(length))
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  )
}

// 產生 JWT
export async function generateJWT(
  payload: Record<string, any>,
  secret: string,
  expiresIn: number = 86400, // 預設 24 小時
): Promise<string> {
  const encoder = new TextEncoder()

  // JWT Header
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  // 加入過期時間
  const now = Math.floor(Date.now() / 1000)
  const jwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  }

  // 編碼 header 和 payload
  const encodedHeader = btoa(JSON.stringify(header)).replace(/[=+/]/g, (m) =>
    m === '=' ? '' : m === '+' ? '-' : '_',
  )
  const encodedPayload = btoa(JSON.stringify(jwtPayload)).replace(
    /[=+/]/g,
    (m) => (m === '=' ? '' : m === '+' ? '-' : '_'),
  )

  // 建立簽名
  const data = `${encodedHeader}.${encodedPayload}`
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))

  const encodedSignature = btoa(
    String.fromCharCode(...new Uint8Array(signature)),
  ).replace(/[=+/]/g, (m) => (m === '=' ? '' : m === '+' ? '-' : '_'))

  return `${data}.${encodedSignature}`
}

// 驗證 JWT
export async function verifyJWT(
  token: string,
  secret: string,
): Promise<Record<string, any> | null> {
  try {
    const encoder = new TextEncoder()
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.')

    if (!encodedHeader || !encodedPayload || !encodedSignature) {
      return null
    }

    // 驗證簽名
    const data = `${encodedHeader}.${encodedPayload}`
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    )

    const signature = Uint8Array.from(
      atob(encodedSignature.replace(/[-_]/g, (m) => (m === '-' ? '+' : '/'))),
      (c) => c.charCodeAt(0),
    )

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(data),
    )

    if (!isValid) {
      return null
    }

    // 解碼 payload
    const payload = JSON.parse(
      atob(encodedPayload.replace(/[-_]/g, (m) => (m === '-' ? '+' : '/'))),
    )

    // 檢查過期時間
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      return null
    }

    return payload
  } catch (error) {
    console.error('JWT 驗證錯誤:', error)
    return null
  }
}
