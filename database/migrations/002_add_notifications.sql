-- 通知系統表
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  data TEXT,
  read INTEGER DEFAULT 0,
  read_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 通知範本表
CREATE TABLE IF NOT EXISTS notification_templates (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  title_template TEXT NOT NULL,
  message_template TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 通知偏好設定表
CREATE TABLE IF NOT EXISTS notification_preferences (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  email_enabled INTEGER DEFAULT 1,
  push_enabled INTEGER DEFAULT 1,
  booking_updates INTEGER DEFAULT 1,
  payment_updates INTEGER DEFAULT 1,
  review_updates INTEGER DEFAULT 1,
  marketing_updates INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);
CREATE INDEX IF NOT EXISTS idx_notification_templates_code ON notification_templates(code);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);

-- 插入預設通知範本
INSERT INTO notification_templates (id, code, type, title_template, message_template, is_active, created_at, updated_at)
VALUES
  ('tpl-001', 'booking_confirmed', 'booking', '預約確認', '您的預約 {{booking_id}} 已確認，服務日期：{{service_date}}', 1, datetime('now'), datetime('now')),
  ('tpl-002', 'booking_cancelled', 'booking', '預約取消', '您的預約 {{booking_id}} 已取消', 1, datetime('now'), datetime('now')),
  ('tpl-003', 'booking_completed', 'booking', '服務完成', '您的預約 {{booking_id}} 已完成，請為看護師評價', 1, datetime('now'), datetime('now')),
  ('tpl-004', 'payment_received', 'payment', '收到付款', '我們已收到您的付款 NT$ {{amount}}', 1, datetime('now'), datetime('now')),
  ('tpl-005', 'review_received', 'review', '收到評價', '您收到了一則新的評價', 1, datetime('now'), datetime('now')),
  ('tpl-006', 'caregiver_verified', 'admin', '審核通過', '恭喜！您的看護師申請已通過審核', 1, datetime('now'), datetime('now')),
  ('tpl-007', 'caregiver_rejected', 'admin', '審核未通過', '很抱歉，您的看護師申請未通過審核', 1, datetime('now'), datetime('now'));
