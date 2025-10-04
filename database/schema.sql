-- 基礎用戶表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  phone TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 看護師表
CREATE TABLE IF NOT EXISTS caregivers (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  bio TEXT,
  experience_years INTEGER,
  hourly_rate REAL,
  rating REAL DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'inactive',
  city TEXT,
  district TEXT,
  skills TEXT, -- JSON array
  languages TEXT, -- JSON array
  certifications TEXT, -- JSON array
  available_times TEXT, -- JSON object
  service_areas TEXT, -- JSON array
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 預約表
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  caregiver_id TEXT NOT NULL,
  service_date TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  service_hours REAL NOT NULL,
  service_location TEXT,
  service_type TEXT,
  requirements TEXT,
  special_needs TEXT,
  status TEXT DEFAULT 'pending',
  total_amount REAL NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  notes TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 評價表
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  caregiver_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  is_anonymous INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 付款記錄表
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  payment_method TEXT NOT NULL,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  processed_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 常見問題表
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT, -- JSON array
  view_count INTEGER DEFAULT 0,
  is_pinned INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_by TEXT,
  updated_by TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- FAQ 分類表
CREATE TABLE IF NOT EXISTS faq_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_caregivers_user_id ON caregivers(user_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_status ON caregivers(status);
CREATE INDEX IF NOT EXISTS idx_caregivers_city ON caregivers(city);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_caregiver_id ON bookings(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_service_date ON bookings(service_date);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_caregiver_id ON reviews(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON faqs(is_active);