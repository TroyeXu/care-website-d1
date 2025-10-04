-- FAQ 管理表
CREATE TABLE IF NOT EXISTS faqs (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT, -- JSON array as string
    view_count INTEGER DEFAULT 0,
    is_pinned INTEGER DEFAULT 0, -- boolean
    is_active INTEGER DEFAULT 1, -- boolean
    sort_order INTEGER,
    created_by TEXT,
    updated_by TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQ 分類表
CREATE TABLE IF NOT EXISTS faq_categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入預設分類
INSERT INTO faq_categories (id, name, description, sort_order) VALUES
('general', '一般問題', '關於平台的基本問題', 1),
('booking', '預約相關', '預約流程與注意事項', 2),
('payment', '付款問題', '費用與付款方式', 3),
('caregiver', '看護師相關', '看護師資格與服務', 4),
('service', '服務說明', '服務範圍與內容', 5);

-- 建立索引
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_active ON faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_pinned ON faqs(is_pinned);