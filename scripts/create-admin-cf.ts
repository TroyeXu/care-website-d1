#!/usr/bin/env node

// 建立測試管理員帳號腳本 (Cloudflare Workers 版本)
// 使用 Web Crypto API 產生密碼雜湊

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))

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
  const combined = new Uint8Array(salt.length + hashArray.length)
  combined.set(salt)
  combined.set(hashArray, salt.length)

  return btoa(String.fromCharCode(...combined))
}

function generateId(): string {
  return crypto.randomUUID()
}

async function createTestAdmin() {
  console.log('建立測試管理員帳號 (Cloudflare Workers)...')

  // 生成密碼雜湊
  const password = 'admin123'
  const passwordHash = await hashPassword(password)

  // 生成 ID
  const userId = generateId()
  const adminId = generateId()
  const userId2 = generateId()
  const adminId2 = generateId()
  const userId3 = generateId()
  const adminId3 = generateId()
  const roleId1 = generateId()
  const roleId2 = generateId()
  const roleId3 = generateId()

  // SQL 語句
  const sql = `
-- 建立角色
INSERT INTO admin_roles (id, name, description, permissions, created_at, updated_at) 
VALUES 
  ('${roleId1}', '超級管理員', '擁有所有權限', '["*"]', datetime('now'), datetime('now')),
  ('${roleId2}', '管理員', '一般管理權限', '["users.read","users.update","booking.read","booking.update","provider.read","provider.update"]', datetime('now'), datetime('now')),
  ('${roleId3}', '客服人員', '客服權限', '["booking.read","booking.update","users.read"]', datetime('now'), datetime('now'));

-- 建立超級管理員用戶
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '${userId}',
  '系統管理員',
  'admin@example.com',
  '${passwordHash}',
  '0912345678',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

-- 建立超級管理員記錄
INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  '${adminId}',
  '${userId}',
  '${roleId1}',
  1,
  'system',
  datetime('now')
);

-- 建立一般管理員
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '${userId2}',
  '管理員',
  'manager@example.com',
  '${passwordHash}',
  '0923456789',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  '${adminId2}',
  '${userId2}',
  '${roleId2}',
  0,
  'system',
  datetime('now')
);

-- 建立客服人員
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '${userId3}',
  '客服人員',
  'operator@example.com',
  '${passwordHash}',
  '0934567890',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  '${adminId3}',
  '${userId3}',
  '${roleId3}',
  0,
  'system',
  datetime('now')
);
  `

  console.log('請在 D1 資料庫中執行以下 SQL：')
  console.log('='.repeat(50))
  console.log(sql)
  console.log('='.repeat(50))
  console.log('\n測試帳號：')
  console.log('超級管理員：admin@example.com / admin123')
  console.log('一般管理員：manager@example.com / admin123')
  console.log('客服人員：operator@example.com / admin123')
  console.log('\n執行方式：')
  console.log('1. 複製上述 SQL')
  console.log(
    '2. 執行：npx wrangler d1 execute YOUR_DATABASE_NAME --local --file=<sql-file>',
  )
  console.log(
    '   或：npx wrangler d1 execute YOUR_DATABASE_NAME --remote --file=<sql-file>',
  )
}

createTestAdmin()
