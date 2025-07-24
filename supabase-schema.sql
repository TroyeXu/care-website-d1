-- 建立 users 表格
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立 caregivers 表格
CREATE TABLE IF NOT EXISTS caregivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  experience TEXT,
  skills TEXT,
  licenses TEXT[],
  rating DECIMAL(2,1) DEFAULT 0.0,
  photo TEXT,
  available TEXT,
  hourly_rate INTEGER DEFAULT 0,
  shift_rate INTEGER DEFAULT 0,
  location VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 建立 bookings 表格
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  caregiver_id INTEGER REFERENCES caregivers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_type VARCHAR(20) NOT NULL CHECK (service_type IN ('hourly', 'shift')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  special_requests TEXT,
  total_cost INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  patient_info JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入測試資料 - caregivers
INSERT INTO caregivers (name, experience, skills, licenses, rating, photo, available, hourly_rate, shift_rate) VALUES
('王小明', '5年照護經驗', '老人照護、急救訓練', ARRAY['照服員結業證書', 'CPR 證照'], 4.5, '', '周一至周五 09:00-18:00', 200, 2500),
('李小美', '3年醫院工作經驗', '傷口護理、復健協助', ARRAY['護理師證照'], 4.8, '', '排班彈性', 250, 3000),
('張大華', '7年專業照護', '失智症照護、醫療陪伴', ARRAY['照服員結業證書', '失智症照護證書'], 4.6, '', '全年無休', 220, 2800),
('陳小花', '4年居家照護', '生活照料、用藥提醒', ARRAY['照服員結業證書'], 4.4, '', '周一至周六', 180, 2200);

-- 插入測試資料 - users
INSERT INTO users (email, name, phone) VALUES
('user001@example.com', '陳先生', '0912-345-678'),
('user002@example.com', '林小姐', '0923-456-789');

-- 插入測試資料 - bookings
INSERT INTO bookings (caregiver_id, user_id, service_type, start_date, end_date, start_time, end_time, special_requests, total_cost, status, patient_info) VALUES
(1, (SELECT id FROM users WHERE email = 'user001@example.com'), 'hourly', '2024-01-15', '2024-01-15', '09:00', '15:00', '需要協助用藥提醒', 1200, 'confirmed', '{"name": "陳老先生", "age": 78, "gender": "男", "medicalConditions": ["高血壓", "糖尿病"], "emergencyContact": "0912-345-678"}'),
(2, (SELECT id FROM users WHERE email = 'user001@example.com'), 'shift', '2024-01-20', '2024-01-22', '08:00', NULL, '需要傷口護理', 16500, 'pending', '{"name": "李奶奶", "age": 82, "gender": "女", "medicalConditions": ["關節炎", "輕微失智"], "emergencyContact": "0923-456-789"}');

-- 建立 updated_at 觸發器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_caregivers_updated_at BEFORE UPDATE ON caregivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();