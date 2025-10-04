-- 初始資料
-- 建立管理員帳號
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'admin-001',
    'admin@care-platform.com',
    -- 密碼: Admin123! (需要使用實際的雜湊值)
    'hashed_password_here',
    '系統管理員',
    'admin',
    1,
    datetime('now'),
    datetime('now')
);

-- 建立測試看護師帳號
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'caregiver-test-001',
    'caregiver1@example.com',
    -- 密碼: Test123!
    'hashed_password_here',
    '張美麗',
    'caregiver',
    1,
    datetime('now'),
    datetime('now')
);

-- 建立看護師資料
INSERT INTO caregivers (
    id, user_id, gender, age, bio, description, 
    hourly_rate, experience_years, is_available,
    rating, reviews_count, created_at, updated_at
)
VALUES (
    'cg-001',
    'caregiver-test-001',
    'female',
    35,
    '專業照護服務員，擁有8年以上照護經驗',
    '我是一位充滿愛心與耐心的專業看護師，專精於老人照護和失智症照護。',
    350,
    8,
    1,
    4.8,
    0,
    datetime('now'),
    datetime('now')
);

-- 新增技能
INSERT INTO caregiver_skills (caregiver_id, skill_name)
VALUES 
    ('cg-001', '失智症照護'),
    ('cg-001', '復健協助'),
    ('cg-001', '傷口護理');

-- 新增語言
INSERT INTO caregiver_languages (caregiver_id, language, proficiency_level)
VALUES 
    ('cg-001', '中文', 'native'),
    ('cg-001', '台語', 'fluent'),
    ('cg-001', '英文', 'intermediate');

-- 新增服務區域
INSERT INTO caregiver_service_areas (caregiver_id, area_name)
VALUES 
    ('cg-001', '台北市'),
    ('cg-001', '新北市');

-- 新增可用時段
INSERT INTO caregiver_availability (caregiver_id, weekdays, weekends, nights, holidays)
VALUES ('cg-001', 1, 1, 0, 1);
