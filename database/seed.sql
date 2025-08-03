-- 插入照護員資料
INSERT INTO caregivers (id, name, avatar, rating, reviews_count, hourly_rate, experience_years, bio) VALUES
('cg-001', '張美麗', 'https://i.pravatar.cc/150?img=1', 4.8, 124, 350, 5, '專業照護服務員，擁有5年以上照護經驗，專精失智症照護與復健協助'),
('cg-002', '林志明', 'https://i.pravatar.cc/150?img=2', 4.9, 36, 600, 8, '專業重症護理師，熟悉各種醫療儀器操作，能處理複雜的醫療狀況'),
('cg-003', '王淑芬', 'https://i.pravatar.cc/150?img=3', 4.7, 52, 450, 15, '協助患者進行復健訓練，提供專業的復健護理服務'),
('cg-004', '陳美玲', 'https://i.pravatar.cc/150?img=4', 4.8, 48, 500, 10, '專注於提供高品質的老年照護服務，擁有豐富的醫院和居家照護經驗'),
('cg-005', '李建國', 'https://i.pravatar.cc/150?img=5', 4.5, 42, 550, 12, '提供全人照護，重視病人尊嚴，協助病人及家屬面對生命議題');

-- 插入證照資料
INSERT INTO caregiver_certifications (caregiver_id, certification) VALUES
('cg-001', '照顧服務員'),
('cg-001', '急救證照'),
('cg-002', '護理師執照'),
('cg-002', '重症護理師證照'),
('cg-002', 'ACLS高級心臟救命術'),
('cg-003', '護理師執照'),
('cg-003', '復健護理認證'),
('cg-004', '護理師執照'),
('cg-004', '長照人員認證'),
('cg-004', 'CPR急救證照'),
('cg-005', '護理師執照'),
('cg-005', '安寧療護專科護理師');

-- 插入語言資料
INSERT INTO caregiver_languages (caregiver_id, language) VALUES
('cg-001', '中文'),
('cg-001', '台語'),
('cg-002', '中文'),
('cg-002', '英文'),
('cg-003', '中文'),
('cg-003', '台語'),
('cg-003', '客語'),
('cg-004', '中文'),
('cg-004', '英文'),
('cg-004', '日文'),
('cg-005', '中文'),
('cg-005', '台語');

-- 插入專長資料
INSERT INTO caregiver_specialties (caregiver_id, specialty) VALUES
('cg-001', '失智症照護'),
('cg-001', '復健協助'),
('cg-002', '重症照護'),
('cg-002', '呼吸照護'),
('cg-002', '心臟監測'),
('cg-003', '復健護理'),
('cg-003', '物理治療輔助'),
('cg-003', '肌力訓練'),
('cg-004', '老年護理'),
('cg-004', '失智症照護'),
('cg-004', '傷口護理'),
('cg-005', '安寧照護'),
('cg-005', '疼痛管理'),
('cg-005', '心理支持');

-- 插入服務區域資料
INSERT INTO caregiver_service_areas (caregiver_id, area) VALUES
('cg-001', '台北市'),
('cg-001', '新北市'),
('cg-002', '台北市'),
('cg-002', '新北市'),
('cg-002', '桃園市'),
('cg-003', '台中市'),
('cg-003', '彰化縣'),
('cg-003', '南投縣'),
('cg-004', '高雄市'),
('cg-004', '屏東縣'),
('cg-005', '台南市'),
('cg-005', '嘉義市');

-- 插入範例預約資料
INSERT INTO bookings (id, patient_name, patient_phone, patient_email, caregiver_id, service_type, service_date, start_time, end_time, status, total_cost, notes) VALUES
('bk-001', '王大明', '0912-345-678', 'wang@example.com', 'cg-001', 'hourly', '2024-01-15', '09:00', '12:00', 'completed', 1050, '需要協助復健運動'),
('bk-002', '李小華', '0923-456-789', 'lee@example.com', 'cg-002', 'daily', '2024-01-20', '08:00', '20:00', 'completed', 7200, '重症照護，需要監測生命徵象'),
('bk-003', '陳阿姨', '0934-567-890', NULL, 'cg-003', 'hourly', '2024-01-25', '14:00', '17:00', 'confirmed', 1350, '膝蓋術後復健');

-- 插入評價資料
INSERT INTO reviews (id, booking_id, caregiver_id, patient_name, rating, comment) VALUES
('rv-001', 'bk-001', 'cg-001', '王大明', 5, '張美麗護理師非常專業，對待我的父親就像家人一樣。她的失智症照護經驗豐富，讓我們很放心。'),
('rv-002', 'bk-002', 'cg-002', '李小華', 5, '林志明護理師的重症護理經驗確實很豐富，處理緊急狀況很冷靜。');