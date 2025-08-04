-- 照護員表
CREATE TABLE IF NOT EXISTS caregivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  rating REAL DEFAULT 0,
  hourly_rate INTEGER NOT NULL,
  experience_years INTEGER DEFAULT 0,
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 照護員證照表
CREATE TABLE IF NOT EXISTS caregiver_certifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caregiver_id TEXT NOT NULL,
  certification TEXT NOT NULL,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 照護員語言表
CREATE TABLE IF NOT EXISTS caregiver_languages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caregiver_id TEXT NOT NULL,
  language TEXT NOT NULL,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 照護員專長表
CREATE TABLE IF NOT EXISTS caregiver_specialties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caregiver_id TEXT NOT NULL,
  specialty TEXT NOT NULL,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 照護員服務區域表
CREATE TABLE IF NOT EXISTS caregiver_service_areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  caregiver_id TEXT NOT NULL,
  area TEXT NOT NULL,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 預約記錄表
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  caregiver_id TEXT NOT NULL,
  service_type TEXT NOT NULL,
  service_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_cost REAL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 建立索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_bookings_caregiver ON bookings(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(service_date);
CREATE INDEX IF NOT EXISTS idx_caregiver_rating ON caregivers(rating);