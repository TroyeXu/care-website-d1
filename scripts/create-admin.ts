#!/usr/bin/env node

// 建立測試管理員帳號腳本
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

async function createTestAdmin() {
  console.log('建立測試管理員帳號...')

  // 生成密碼雜湊
  const password = 'admin123'
  const passwordHash = await bcrypt.hash(password, 10)

  // 生成 ID
  const userId = nanoid()
  const adminId = nanoid()

  // SQL 語句
  const sql = `
-- 建立管理員用戶
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

-- 建立管理員記錄
INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  '${adminId}',
  '${userId}',
  'super_admin',
  1,
  'system',
  datetime('now')
);

-- 建立一般管理員
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '${nanoid()}',
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
  '${nanoid()}',
  (SELECT id FROM users WHERE email = 'manager@example.com'),
  'admin',
  0,
  'system',
  datetime('now')
);

-- 建立客服人員
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '${nanoid()}',
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
  '${nanoid()}',
  (SELECT id FROM users WHERE email = 'operator@example.com'),
  'operator',
  0,
  'system',
  datetime('now')
);
  `

  console.log('請在 D1 資料庫中執行以下 SQL：')
  console.log('=' * 50)
  console.log(sql)
  console.log('=' * 50)
  console.log('\n測試帳號：')
  console.log('超級管理員：admin@example.com / admin123')
  console.log('一般管理員：manager@example.com / admin123')
  console.log('客服人員：operator@example.com / admin123')
}

createTestAdmin()
