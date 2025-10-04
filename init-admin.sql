-- 清理舊資料
DELETE FROM admins WHERE user_id IN (SELECT id FROM users WHERE email IN ('admin@example.com', 'manager@example.com', 'operator@example.com'));
DELETE FROM users WHERE email IN ('admin@example.com', 'manager@example.com', 'operator@example.com');
DELETE FROM admin_roles WHERE name IN ('超級管理員', '管理員', '客服人員');

-- 建立角色
INSERT INTO admin_roles (id, name, description, permissions, created_at) 
VALUES 
  ('role_super', '超級管理員', '擁有所有權限', '["*"]', datetime('now')),
  ('role_admin', '管理員', '一般管理權限', '["users.read","users.update","booking.read","booking.update"]', datetime('now')),
  ('role_operator', '客服人員', '客服權限', '["booking.read","booking.update","users.read"]', datetime('now'));

-- 建立超級管理員 (密碼: admin123, 使用預先生成的雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  'user_admin',
  '系統管理員',
  'admin@example.com',
  'L2nJ8naaGt/G65oPMvHyTiJCiNj12nIWjfZnkLVgXN4VfymPN6ZG4/oQ2sjqz4qU',
  '0912345678',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  'admin_1',
  'user_admin',
  'role_super',
  1,
  'system',
  datetime('now')
);