-- 用戶狀態記錄表
CREATE TABLE IF NOT EXISTS user_status_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    previous_status TEXT,
    new_status TEXT,
    reason TEXT,
    changed_by TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 密碼重設記錄表
CREATE TABLE IF NOT EXISTS password_resets (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    method TEXT, -- email, sms, manual
    requested_by TEXT,
    used INTEGER DEFAULT 0, -- boolean
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_user_status_logs_user ON user_status_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);