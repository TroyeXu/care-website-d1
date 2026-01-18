-- 管理員角色初始資料

-- 建立超級管理員角色
INSERT INTO admin_roles (id, name, description, permissions, created_at)
VALUES (
    'role-super-admin',
    '超級管理員',
    '擁有系統所有權限',
    '["*"]',
    datetime('now')
);

-- 建立一般管理員角色
INSERT INTO admin_roles (id, name, description, permissions, created_at)
VALUES (
    'role-admin',
    '一般管理員',
    '擁有大部分管理權限',
    '["users.view", "users.edit", "caregivers.view", "caregivers.edit", "caregivers.verify", "bookings.view", "bookings.edit", "faqs.view", "faqs.edit", "faqs.create", "faqs.delete"]',
    datetime('now')
);

-- 建立客服人員角色
INSERT INTO admin_roles (id, name, description, permissions, created_at)
VALUES (
    'role-operator',
    '客服人員',
    '負責客戶服務相關操作',
    '["users.view", "caregivers.view", "bookings.view", "bookings.edit", "faqs.view"]',
    datetime('now')
);

-- 建立稽核人員角色
INSERT INTO admin_roles (id, name, description, permissions, created_at)
VALUES (
    'role-auditor',
    '稽核人員',
    '僅能查看資料，用於稽核',
    '["users.view", "caregivers.view", "bookings.view", "payments.view", "faqs.view"]',
    datetime('now')
);

-- 建立超級管理員帳號
-- 密碼: Admin@123 (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'admin-super-001',
    '系統管理員',
    'admin@care-platform.com',
    '45bb0d5ced755949682a8dc289ea983a:678b1045362f188dd3388f84d1c0f60dd825afc5c32ba9fd4c9bc1286db57229',
    '0900000000',
    'admin',
    'active',
    datetime('now'),
    datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at)
VALUES (
    'adm-001',
    'admin-super-001',
    'role-super-admin',
    1,
    'system',
    datetime('now')
);

-- 建立一般管理員帳號
-- 密碼: Admin@123 (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'admin-general-001',
    '管理員',
    'manager@care-platform.com',
    '45bb0d5ced755949682a8dc289ea983a:678b1045362f188dd3388f84d1c0f60dd825afc5c32ba9fd4c9bc1286db57229',
    '0911111111',
    'admin',
    'active',
    datetime('now'),
    datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at)
VALUES (
    'adm-002',
    'admin-general-001',
    'role-admin',
    0,
    'admin-super-001',
    datetime('now')
);

-- 建立客服人員帳號
-- 密碼: Admin@123 (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'admin-operator-001',
    '客服人員',
    'support@care-platform.com',
    '45bb0d5ced755949682a8dc289ea983a:678b1045362f188dd3388f84d1c0f60dd825afc5c32ba9fd4c9bc1286db57229',
    '0922222222',
    'admin',
    'active',
    datetime('now'),
    datetime('now')
);

INSERT INTO admins (id, user_id, role_id, is_super, created_by, created_at)
VALUES (
    'adm-003',
    'admin-operator-001',
    'role-operator',
    0,
    'admin-super-001',
    datetime('now')
);
