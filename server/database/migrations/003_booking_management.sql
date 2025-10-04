-- 預約狀態變更記錄表
CREATE TABLE IF NOT EXISTS booking_logs (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    action TEXT NOT NULL, -- created, confirmed, cancelled, completed, disputed
    previous_status TEXT,
    new_status TEXT,
    actor_id TEXT,
    actor_type TEXT, -- user, caregiver, admin, system
    reason TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 預約爭議處理表
CREATE TABLE IF NOT EXISTS booking_disputes (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    reporter_id TEXT NOT NULL,
    reporter_type TEXT, -- user, caregiver
    dispute_type TEXT, -- service_quality, no_show, payment, other
    description TEXT NOT NULL,
    evidence TEXT, -- JSON string
    status TEXT DEFAULT 'open', -- open, investigating, resolved, closed
    resolution TEXT,
    resolved_by TEXT,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 退款記錄表 (簡化版，因為沒有實際付款系統)
CREATE TABLE IF NOT EXISTS refunds (
    id TEXT PRIMARY KEY,
    booking_id TEXT NOT NULL,
    amount DECIMAL(10,2),
    reason TEXT,
    status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
    processed_by TEXT,
    processed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_booking_logs_booking ON booking_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_logs_action ON booking_logs(action);
CREATE INDEX IF NOT EXISTS idx_booking_disputes_booking ON booking_disputes(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_disputes_status ON booking_disputes(status);
CREATE INDEX IF NOT EXISTS idx_refunds_booking ON refunds(booking_id);