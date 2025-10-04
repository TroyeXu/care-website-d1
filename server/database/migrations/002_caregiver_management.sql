-- 看護師狀態與審核表
CREATE TABLE IF NOT EXISTS caregiver_verifications (
    id TEXT PRIMARY KEY,
    caregiver_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected, suspended
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    reviewed_by TEXT,
    rejection_reason TEXT,
    documents TEXT, -- JSON string
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 看護師證照表
CREATE TABLE IF NOT EXISTS caregiver_certifications (
    id TEXT PRIMARY KEY,
    caregiver_id TEXT NOT NULL,
    cert_type TEXT NOT NULL, -- license, training, language
    cert_name TEXT NOT NULL,
    cert_number TEXT,
    issuer TEXT,
    issue_date DATE,
    expiry_date DATE,
    file_url TEXT,
    verified INTEGER DEFAULT 0, -- boolean
    verified_by TEXT,
    verified_at TIMESTAMP,
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 看護師服務地區表
CREATE TABLE IF NOT EXISTS caregiver_service_areas (
    id TEXT PRIMARY KEY,
    caregiver_id TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    is_primary INTEGER DEFAULT 0, -- boolean
    transportation TEXT,
    max_distance INTEGER,
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 看護師工作時段表
CREATE TABLE IF NOT EXISTS caregiver_schedules (
    id TEXT PRIMARY KEY,
    caregiver_id TEXT NOT NULL,
    day_of_week INTEGER, -- 0-6 (週日-週六)
    start_time TEXT, -- HH:MM format
    end_time TEXT, -- HH:MM format
    is_available INTEGER DEFAULT 1, -- boolean
    FOREIGN KEY (caregiver_id) REFERENCES caregivers(id)
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_caregiver_verifications_status ON caregiver_verifications(status);
CREATE INDEX IF NOT EXISTS idx_caregiver_verifications_caregiver ON caregiver_verifications(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_certifications_caregiver ON caregiver_certifications(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_service_areas_caregiver ON caregiver_service_areas(caregiver_id);
CREATE INDEX IF NOT EXISTS idx_caregiver_schedules_caregiver ON caregiver_schedules(caregiver_id);