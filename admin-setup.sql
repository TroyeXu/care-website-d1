-- 建立角色
INSERT OR REPLACE INTO admin_roles (id, name, description, permissions, created_at) 
VALUES 
  ('da830281-bafb-4c3b-9f62-bd417c05af02', '超級管理員', '擁有所有權限', '["*"]', datetime('now')),
  ('c1043456-f338-444c-aad1-b0da754d5773', '管理員', '一般管理權限', '["users.read","users.update","booking.read","booking.update","provider.read","provider.update"]', datetime('now')),
  ('481907f2-69bb-4531-997c-8c735158e4bc', '客服人員', '客服權限', '["booking.read","booking.update","users.read"]', datetime('now'));

-- 建立超級管理員用戶
INSERT OR REPLACE INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  '74597843-d706-40cf-8f7d-1cec97574c4e',
  '系統管理員',
  'admin@example.com',
  'L2nJ8naaGt/G65oPMvHyTiJCiNj12nIWjfZnkLVgXN4VfymPN6ZG4/oQ2sjqz4qU',
  '0912345678',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

-- 建立超級管理員記錄
INSERT OR REPLACE INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  'fb97628b-a2f4-4b25-9dac-d44da4e14841',
  '74597843-d706-40cf-8f7d-1cec97574c4e',
  'da830281-bafb-4c3b-9f62-bd417c05af02',
  1,
  'system',
  datetime('now')
);

-- 建立一般管理員
INSERT OR REPLACE INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  'e5f23fb8-2064-4eed-a8aa-8efe4821d1a8',
  '管理員',
  'manager@example.com',
  'L2nJ8naaGt/G65oPMvHyTiJCiNj12nIWjfZnkLVgXN4VfymPN6ZG4/oQ2sjqz4qU',
  '0923456789',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

INSERT OR REPLACE INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  'bf6c34fd-c955-45f0-a759-aa96746c059b',
  'e5f23fb8-2064-4eed-a8aa-8efe4821d1a8',
  'c1043456-f338-444c-aad1-b0da754d5773',
  0,
  'system',
  datetime('now')
);

-- 建立客服人員
INSERT OR REPLACE INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at) 
VALUES (
  'a65bc3ed-9282-41c7-b037-5bc3095c8fe9',
  '客服人員',
  'operator@example.com',
  'L2nJ8naaGt/G65oPMvHyTiJCiNj12nIWjfZnkLVgXN4VfymPN6ZG4/oQ2sjqz4qU',
  '0934567890',
  'admin',
  'active',
  datetime('now'),
  datetime('now')
);

INSERT OR REPLACE INTO admins (id, user_id, role_id, is_super, created_by, created_at) 
VALUES (
  '60ad21a3-edf9-4f3c-8d45-75292773981b',
  'a65bc3ed-9282-41c7-b037-5bc3095c8fe9',
  '481907f2-69bb-4531-997c-8c735158e4bc',
  0,
  'system',
  datetime('now')
);