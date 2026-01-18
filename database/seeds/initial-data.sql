-- 初始資料

-- 建立測試用戶帳號
-- 密碼: Test123! (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'user-test-001',
    '王小明',
    'user@example.com',
    'd3f1033a67752f3e1b2d0bebf9889c4e:7c3d89ec55df1e01373f1f8b4b309ebafa375e9acd7149d563411fda4b5b06ed',
    '0912345678',
    'user',
    'active',
    datetime('now'),
    datetime('now')
);

-- 建立測試看護師帳號
-- 密碼: Test123! (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'caregiver-test-001',
    '張美麗',
    'caregiver@example.com',
    'd3f1033a67752f3e1b2d0bebf9889c4e:7c3d89ec55df1e01373f1f8b4b309ebafa375e9acd7149d563411fda4b5b06ed',
    '0923456789',
    'caregiver',
    'active',
    datetime('now'),
    datetime('now')
);

-- 建立看護師資料 (使用 JSON 欄位)
INSERT INTO caregivers (
    id, user_id, bio, experience_years, hourly_rate,
    rating, review_count, status, city, district,
    skills, languages, certifications, available_times, service_areas,
    created_at, updated_at
)
VALUES (
    'cg-001',
    'caregiver-test-001',
    '專業照護服務員，擁有8年以上照護經驗，專精於老人照護和失智症照護。',
    8,
    350.0,
    4.8,
    0,
    'active',
    '台北市',
    '大安區',
    '["失智症照護", "復健協助", "傷口護理", "長期照護"]',
    '["中文", "台語", "英文"]',
    '["照顧服務員證照", "CPR證照"]',
    '{"weekdays": true, "weekends": true, "nights": false, "holidays": true}',
    '["台北市", "新北市"]',
    datetime('now'),
    datetime('now')
);

-- 建立第二位測試看護師
-- 密碼: Test123! (使用 PBKDF2 雜湊)
INSERT INTO users (id, name, email, password_hash, phone, role, status, created_at, updated_at)
VALUES (
    'caregiver-test-002',
    '李淑芬',
    'caregiver2@example.com',
    'd3f1033a67752f3e1b2d0bebf9889c4e:7c3d89ec55df1e01373f1f8b4b309ebafa375e9acd7149d563411fda4b5b06ed',
    '0934567890',
    'caregiver',
    'active',
    datetime('now'),
    datetime('now')
);

INSERT INTO caregivers (
    id, user_id, bio, experience_years, hourly_rate,
    rating, review_count, status, city, district,
    skills, languages, certifications, available_times, service_areas,
    created_at, updated_at
)
VALUES (
    'cg-002',
    'caregiver-test-002',
    '擁有10年以上照護經驗，專長於術後照護及慢性病照護。',
    10,
    400.0,
    4.9,
    0,
    'active',
    '新北市',
    '板橋區',
    '["術後照護", "慢性病照護", "居家護理", "用藥管理"]',
    '["中文", "客家話"]',
    '["護理師證照", "照顧服務員證照"]',
    '{"weekdays": true, "weekends": false, "nights": true, "holidays": false}',
    '["新北市", "台北市"]',
    datetime('now'),
    datetime('now')
);

-- 建立範例 FAQ 分類
INSERT INTO faq_categories (id, name, description, sort_order, is_active, created_at, updated_at)
VALUES
    ('cat-001', '服務說明', '關於照護服務的基本說明', 1, 1, datetime('now'), datetime('now')),
    ('cat-002', '預約流程', '如何預約和使用服務', 2, 1, datetime('now'), datetime('now')),
    ('cat-003', '費用說明', '服務費用和付款方式', 3, 1, datetime('now'), datetime('now')),
    ('cat-004', '其他問題', '其他常見問題', 4, 1, datetime('now'), datetime('now'));

-- 建立範例 FAQ
INSERT INTO faqs (id, category, question, answer, keywords, view_count, is_pinned, is_active, sort_order, created_at, updated_at)
VALUES
    ('faq-001', '服務說明', '你們提供哪些照護服務？', '我們提供居家照護、醫院陪伴、復健協助、失智症照護等多種服務。', '["照護", "服務", "類型"]', 0, 1, 1, 1, datetime('now'), datetime('now')),
    ('faq-002', '預約流程', '如何預約看護服務？', '您可以透過網站選擇合適的看護師，填寫預約資訊後送出申請，我們會儘快安排。', '["預約", "流程", "申請"]', 0, 1, 1, 1, datetime('now'), datetime('now')),
    ('faq-003', '費用說明', '服務費用如何計算？', '費用依照服務時數和看護師等級計算，可選擇按小時或按日計費。', '["費用", "計算", "價格"]', 0, 1, 1, 1, datetime('now'), datetime('now')),
    ('faq-004', '費用說明', '支援哪些付款方式？', '我們支援銀行轉帳、匯款等方式，完成服務後會提供帳戶資訊。', '["付款", "轉帳", "匯款"]', 0, 0, 1, 2, datetime('now'), datetime('now'));
