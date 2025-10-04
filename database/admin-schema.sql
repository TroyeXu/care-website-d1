-- 管理員角色表
CREATE TABLE IF NOT EXISTS admin_roles (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  permissions TEXT, -- JSON array
  created_at TEXT DEFAULT (datetime('now'))
);

-- 管理員表
CREATE TABLE IF NOT EXISTS admins (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  role_id TEXT NOT NULL,
  is_super INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES admin_roles(id)
);

-- 管理員操作日誌
CREATE TABLE IF NOT EXISTS admin_logs (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  details TEXT, -- JSON object
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (admin_id) REFERENCES admins(id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON admins(user_id);
CREATE INDEX IF NOT EXISTS idx_admins_role_id ON admins(role_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_action ON admin_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);