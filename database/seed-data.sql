-- 種子資料
-- 建立測試使用者

-- 管理員帳號
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'admin-001',
    'admin@care-platform.com',
    -- 密碼: Admin123! (使用 PBKDF2 雜湊)
    'salt:hash_placeholder',
    '系統管理員',
    'admin',
    1,
    datetime('now'),
    datetime('now')
);

-- 測試使用者帳號
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'user-001',
    'user@example.com',
    -- 密碼: User123!
    'salt:hash_placeholder',
    '測試使用者',
    'user',
    1,
    datetime('now'),
    datetime('now')
);

-- 測試看護師帳號 1
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'caregiver-user-001',
    'caregiver1@example.com',
    -- 密碼: Care123!
    'salt:hash_placeholder',
    '張美麗',
    'caregiver',
    1,
    datetime('now'),
    datetime('now')
);

-- 測試看護師帳號 2
INSERT INTO users (id, email, password_hash, name, role, email_verified, created_at, updated_at)
VALUES (
    'caregiver-user-002',
    'caregiver2@example.com',
    -- 密碼: Care123!
    'salt:hash_placeholder',
    '王大明',
    'caregiver',
    1,
    datetime('now'),
    datetime('now')
);

-- 建立看護師資料 1
INSERT INTO caregivers (
    id, user_id, gender, age, bio, description, 
    hourly_rate, experience_years, is_available,
    rating, reviews_count, created_at, updated_at
)
VALUES (
    'cg-001',
    'caregiver-user-001',
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

-- 建立看護師資料 2
INSERT INTO caregivers (
    id, user_id, gender, age, bio, description, 
    hourly_rate, experience_years, is_available,
    rating, reviews_count, created_at, updated_at
)
VALUES (
    'cg-002',
    'caregiver-user-002',
    'male',
    42,
    '男性看護師，專精復健與行動輔助',
    '擁有物理治療背景，專門協助術後復健和行動不便的患者。',
    400,
    12,
    1,
    4.9,
    0,
    datetime('now'),
    datetime('now')
);

-- 新增技能（看護師1）
INSERT INTO caregiver_skills (caregiver_id, skill_name)
VALUES 
    ('cg-001', '失智症照護'),
    ('cg-001', '復健協助'),
    ('cg-001', '傷口護理'),
    ('cg-001', '管灌餵食'),
    ('cg-001', '翻身拍背');

-- 新增技能（看護師2）
INSERT INTO caregiver_skills (caregiver_id, skill_name)
VALUES 
    ('cg-002', '復健運動'),
    ('cg-002', '術後照護'),
    ('cg-002', '行動輔助'),
    ('cg-002', '肌力訓練'),
    ('cg-002', '關節活動');

-- 新增語言（看護師1）
INSERT INTO caregiver_languages (caregiver_id, language, proficiency_level)
VALUES 
    ('cg-001', '中文', 'native'),
    ('cg-001', '台語', 'fluent'),
    ('cg-001', '英文', 'intermediate');

-- 新增語言（看護師2）
INSERT INTO caregiver_languages (caregiver_id, language, proficiency_level)
VALUES 
    ('cg-002', '中文', 'native'),
    ('cg-002', '台語', 'native');

-- 新增服務區域（看護師1）
INSERT INTO caregiver_service_areas (caregiver_id, area_name)
VALUES 
    ('cg-001', '台北市'),
    ('cg-001', '新北市');

-- 新增服務區域（看護師2）
INSERT INTO caregiver_service_areas (caregiver_id, area_name)
VALUES 
    ('cg-002', '台北市'),
    ('cg-002', '桃園市');

-- 新增可用時段（看護師1）
INSERT INTO caregiver_availability (caregiver_id, weekdays, weekends, nights, holidays)
VALUES ('cg-001', 1, 1, 0, 1);

-- 新增可用時段（看護師2）
INSERT INTO caregiver_availability (caregiver_id, weekdays, weekends, nights, holidays)
VALUES ('cg-002', 1, 0, 0, 0);

-- 新增證照（看護師1）
INSERT INTO caregiver_certifications (caregiver_id, certification_name, issue_date)
VALUES 
    ('cg-001', '照顧服務員證照', '2018-03-15'),
    ('cg-001', '急救證照', '2020-06-20'),
    ('cg-001', '失智症照護專業訓練', '2019-09-10');

-- 新增證照（看護師2）
INSERT INTO caregiver_certifications (caregiver_id, certification_name, issue_date)
VALUES 
    ('cg-002', '照顧服務員證照', '2015-01-10'),
    ('cg-002', '物理治療助理證照', '2014-05-20'),
    ('cg-002', 'BLS基本生命支持術', '2021-03-15');