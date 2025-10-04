-- 管理員角色表
CREATE TABLE IF NOT EXISTS admin_roles (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    permissions TEXT, -- JSON string
    is_system INTEGER DEFAULT 0, -- boolean
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 管理員表
CREATE TABLE IF NOT EXISTS admins (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    role_id TEXT NOT NULL,
    department TEXT,
    is_super INTEGER DEFAULT 0, -- boolean
    last_login TIMESTAMP,
    created_by TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES admin_roles(id)
);

-- 操作日誌表
CREATE TABLE IF NOT EXISTS admin_logs (
    id TEXT PRIMARY KEY,
    admin_id TEXT NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id TEXT,
    details TEXT, -- JSON string
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES admins(id)
);

-- 插入預設角色
INSERT INTO admin_roles (id, name, description, permissions, is_system) VALUES
('super_admin', '超級管理員', '擁有所有權限', '["*"]', 1),
('admin', '管理員', '一般管理權限', '["caregiver.*","booking.*","user.*","content.*","report.view"]', 1),
('operator', '客服人員', '客服操作權限', '["caregiver.view","booking.view","booking.edit","user.view","user.reset_password"]', 1),
('content_manager', '內容管理員', '內容管理權限', '["content.*","settings.view"]', 1);