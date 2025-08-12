#!/bin/bash

# D1 資料庫設定腳本
# 用於初始化 Cloudflare D1 資料庫

echo "🚀 開始設定 Cloudflare D1 資料庫..."

# 檢查是否已安裝 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 錯誤：未安裝 wrangler CLI"
    echo "請執行: npm install -g wrangler"
    exit 1
fi

# 檢查是否已登入 Cloudflare
echo "📝 檢查 Cloudflare 登入狀態..."
if ! wrangler whoami &> /dev/null; then
    echo "🔐 請登入 Cloudflare..."
    wrangler login
fi

# 建立 D1 資料庫（如果不存在）
echo "📦 建立 D1 資料庫..."
DB_NAME="care-platform-db"

# 檢查資料庫是否已存在
if wrangler d1 list | grep -q "$DB_NAME"; then
    echo "✅ 資料庫 $DB_NAME 已存在"
else
    echo "🆕 建立新資料庫 $DB_NAME..."
    wrangler d1 create $DB_NAME
    
    # 獲取資料庫 ID 並更新 wrangler.toml
    DB_ID=$(wrangler d1 list | grep "$DB_NAME" | awk '{print $2}')
    echo "📝 資料庫 ID: $DB_ID"
    
    # 更新 wrangler.toml 中的資料庫 ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/database_id = \".*\"/database_id = \"$DB_ID\"/" wrangler.toml
    else
        # Linux
        sed -i "s/database_id = \".*\"/database_id = \"$DB_ID\"/" wrangler.toml
    fi
fi

# 執行資料庫架構
echo "🏗️ 執行資料庫架構..."
wrangler d1 execute $DB_NAME --file=./database/schema.sql

# 建立種子資料檔案（如果需要）
if [ ! -f "./database/seeds/initial-data.sql" ]; then
    echo "📝 建立種子資料檔案..."
    mkdir -p ./database/seeds
    cat > ./database/seeds/initial-data.sql << 'EOF'
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
EOF
fi

# 詢問是否要載入種子資料
read -p "是否要載入種子資料？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📊 載入種子資料..."
    wrangler d1 execute $DB_NAME --file=./database/seeds/initial-data.sql
fi

# 設定環境變數
echo "🔐 設定環境變數..."
echo "請設定 JWT_SECRET："
read -s JWT_SECRET
wrangler secret put JWT_SECRET <<< "$JWT_SECRET"

echo ""
echo "✅ D1 資料庫設定完成！"
echo ""
echo "📋 接下來的步驟："
echo "1. 執行 npm run dev:wrangler 啟動開發伺服器"
echo "2. 執行 npm run deploy 部署到 Cloudflare Workers"
echo ""
echo "📚 資料庫資訊："
echo "- 名稱: $DB_NAME"
echo "- 環境: 開發環境"
echo ""