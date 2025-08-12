-- 遷移到新架構的腳本
-- 先刪除舊表格（請確認已備份重要資料）

-- 刪除舊表格
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS caregiver_service_areas;
DROP TABLE IF EXISTS caregiver_specialties;
DROP TABLE IF EXISTS caregiver_languages;
DROP TABLE IF EXISTS caregiver_certifications;
DROP TABLE IF EXISTS caregivers;

-- 建立新的使用者表
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'caregiver', 'admin')),
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT 0,
  phone_verified BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 建立新的看護師表
CREATE TABLE IF NOT EXISTS caregivers (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT UNIQUE NOT NULL,
  gender TEXT CHECK(gender IN ('male', 'female')),
  age INTEGER,
  bio TEXT,
  description TEXT,
  hourly_rate INTEGER,
  experience_years INTEGER,
  is_available BOOLEAN DEFAULT 1,
  total_service_hours INTEGER DEFAULT 0,
  response_rate INTEGER DEFAULT 0,
  response_time TEXT,
  rating REAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 建立其他必要表格
CREATE TABLE IF NOT EXISTS caregiver_skills (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE CASCADE,
  UNIQUE(caregiver_id, skill_name)
);

CREATE TABLE IF NOT EXISTS caregiver_certifications (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT NOT NULL,
  certification_name TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS caregiver_languages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT NOT NULL,
  language TEXT NOT NULL,
  proficiency_level TEXT CHECK(proficiency_level IN ('basic', 'intermediate', 'fluent', 'native')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE CASCADE,
  UNIQUE(caregiver_id, language)
);

CREATE TABLE IF NOT EXISTS caregiver_service_areas (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT NOT NULL,
  area_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE CASCADE,
  UNIQUE(caregiver_id, area_name)
);

CREATE TABLE IF NOT EXISTS caregiver_availability (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT UNIQUE NOT NULL,
  weekdays BOOLEAN DEFAULT 1,
  weekends BOOLEAN DEFAULT 1,
  nights BOOLEAN DEFAULT 0,
  holidays BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id) ON DELETE CASCADE
);

-- 建立預約表
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  caregiver_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  service_type TEXT CHECK(service_type IN ('hourly', 'shift-12', 'shift-24')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  total_hours INTEGER,
  hourly_rate INTEGER,
  total_cost INTEGER,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  special_requests TEXT,
  cancellation_reason TEXT,
  cancelled_at DATETIME,
  cancelled_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 建立評價表
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  booking_id TEXT UNIQUE NOT NULL,
  caregiver_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  is_anonymous BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_caregivers_user_id ON caregivers(user_id);
CREATE INDEX IF NOT EXISTS idx_caregivers_rating ON caregivers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_caregiver_id ON bookings(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);