-- 系統設定表
CREATE TABLE IF NOT EXISTS system_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'string', -- string, number, boolean, json
  description TEXT,
  category TEXT DEFAULT 'general', -- general, payment, notification, security
  is_public INTEGER DEFAULT 0, -- 0: 僅管理員可見, 1: 公開可見
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  updated_by TEXT,
  FOREIGN KEY (updated_by) REFERENCES admins(id)
);

-- 系統設定索引
CREATE INDEX IF NOT EXISTS idx_system_settings_category ON system_settings(category);
CREATE INDEX IF NOT EXISTS idx_system_settings_is_public ON system_settings(is_public);

-- 插入預設系統設定
INSERT INTO system_settings (key, value, type, description, category, is_public, created_at, updated_at)
VALUES
  -- 一般設定
  ('site_name', '照護平台', 'string', '網站名稱', 'general', 1, datetime('now'), datetime('now')),
  ('site_description', '專業的照護服務媒合平台', 'string', '網站描述', 'general', 1, datetime('now'), datetime('now')),
  ('contact_email', 'contact@care-platform.com', 'string', '聯絡 Email', 'general', 1, datetime('now'), datetime('now')),
  ('contact_phone', '0800-123-456', 'string', '聯絡電話', 'general', 1, datetime('now'), datetime('now')),
  ('support_hours', '週一至週五 09:00-18:00', 'string', '客服時間', 'general', 1, datetime('now'), datetime('now')),

  -- 預約設定
  ('booking_min_hours', '2', 'number', '最少預約時數', 'booking', 1, datetime('now'), datetime('now')),
  ('booking_max_hours', '12', 'number', '最多預約時數', 'booking', 1, datetime('now'), datetime('now')),
  ('booking_advance_days', '1', 'number', '需提前預約天數', 'booking', 1, datetime('now'), datetime('now')),
  ('booking_cancel_hours', '24', 'number', '可取消預約的提前時數', 'booking', 1, datetime('now'), datetime('now')),
  ('booking_auto_confirm', '0', 'boolean', '預約自動確認', 'booking', 0, datetime('now'), datetime('now')),

  -- 付款設定
  ('payment_methods', '["bank_transfer", "cash"]', 'json', '可用付款方式', 'payment', 1, datetime('now'), datetime('now')),
  ('bank_account_name', '照護平台有限公司', 'string', '銀行帳戶名稱', 'payment', 1, datetime('now'), datetime('now')),
  ('bank_account_number', '1234567890', 'string', '銀行帳號', 'payment', 1, datetime('now'), datetime('now')),
  ('bank_name', 'XX銀行', 'string', '銀行名稱', 'payment', 1, datetime('now'), datetime('now')),
  ('bank_branch', '台北分行', 'string', '分行名稱', 'payment', 1, datetime('now'), datetime('now')),

  -- 通知設定
  ('notification_email_enabled', '0', 'boolean', '啟用 Email 通知', 'notification', 0, datetime('now'), datetime('now')),
  ('notification_retention_days', '30', 'number', '已讀通知保留天數', 'notification', 0, datetime('now'), datetime('now')),
  ('notification_max_per_user', '100', 'number', '每位用戶最大通知數', 'notification', 0, datetime('now'), datetime('now')),

  -- 審核設定
  ('caregiver_auto_approve', '0', 'boolean', '看護師自動審核通過', 'security', 0, datetime('now'), datetime('now')),
  ('review_auto_publish', '1', 'boolean', '評價自動發布', 'security', 0, datetime('now'), datetime('now')),
  ('review_min_length', '10', 'number', '評價最少字數', 'security', 1, datetime('now'), datetime('now')),
  ('review_max_length', '500', 'number', '評價最多字數', 'security', 1, datetime('now'), datetime('now')),

  -- 費率設定
  ('platform_fee_percentage', '10', 'number', '平台服務費百分比', 'payment', 0, datetime('now'), datetime('now')),
  ('min_hourly_rate', '200', 'number', '最低時薪', 'payment', 1, datetime('now'), datetime('now')),
  ('max_hourly_rate', '1000', 'number', '最高時薪', 'payment', 1, datetime('now'), datetime('now')),

  -- 維護模式
  ('maintenance_mode', '0', 'boolean', '維護模式', 'general', 0, datetime('now'), datetime('now')),
  ('maintenance_message', '系統維護中，請稍後再試', 'string', '維護模式訊息', 'general', 1, datetime('now'), datetime('now'));
