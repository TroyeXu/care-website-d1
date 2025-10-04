#!/bin/bash

# Cloudflare D1 Migration 執行腳本
# 用於執行所有資料庫 migrations

set -e  # 遇到錯誤時停止執行

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 資料庫名稱
DB_NAME="care-platform-db"

# 顯示開始訊息
echo -e "${BLUE}🚀 開始執行 Cloudflare D1 Migration...${NC}"
echo ""

# 檢查是否已安裝 wrangler
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}❌ 錯誤：未安裝 wrangler CLI${NC}"
    echo "請執行: npm install -g wrangler"
    exit 1
fi

# 檢查是否已登入 Cloudflare
echo -e "${YELLOW}📝 檢查 Cloudflare 登入狀態...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${YELLOW}🔐 請登入 Cloudflare...${NC}"
    wrangler login
fi

# 檢查資料庫是否存在
echo -e "${YELLOW}📦 檢查資料庫 $DB_NAME...${NC}"
if ! wrangler d1 list | grep -q "$DB_NAME"; then
    echo -e "${RED}❌ 錯誤：資料庫 $DB_NAME 不存在${NC}"
    echo "請先執行: npm run db:setup"
    exit 1
fi

# 取得 migrations 目錄
MIGRATIONS_DIR="./server/database/migrations"

# 檢查 migrations 目錄是否存在
if [ ! -d "$MIGRATIONS_DIR" ]; then
    echo -e "${RED}❌ 錯誤：找不到 migrations 目錄: $MIGRATIONS_DIR${NC}"
    exit 1
fi

# 取得所有 SQL 檔案並排序
SQL_FILES=($(find "$MIGRATIONS_DIR" -name "*.sql" | sort))

if [ ${#SQL_FILES[@]} -eq 0 ]; then
    echo -e "${YELLOW}⚠️ 警告：未找到任何 SQL migration 檔案${NC}"
    exit 0
fi

echo -e "${BLUE}📋 找到 ${#SQL_FILES[@]} 個 migration 檔案:${NC}"
for file in "${SQL_FILES[@]}"; do
    echo "  - $(basename "$file")"
done
echo ""

# 詢問執行環境
echo -e "${YELLOW}🌍 選擇執行環境:${NC}"
echo "1) 本地開發環境 (--local)"
echo "2) 遠端 Cloudflare 環境"
echo ""
read -p "請選擇 (1 或 2): " -n 1 -r
echo ""

LOCAL_FLAG=""
ENV_NAME="遠端 Cloudflare"

if [[ $REPLY =~ ^[1]$ ]]; then
    LOCAL_FLAG="--local"
    ENV_NAME="本地開發"
fi

echo -e "${BLUE}🎯 執行環境: $ENV_NAME${NC}"
echo ""

# 建立 migrations 追蹤表
echo -e "${YELLOW}🗃️ 建立 migrations 追蹤表...${NC}"
cat > /tmp/create_migrations_table.sql << 'EOF'
CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT UNIQUE NOT NULL,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF

wrangler d1 execute $DB_NAME $LOCAL_FLAG --file=/tmp/create_migrations_table.sql

# 取得已執行的 migrations
echo -e "${YELLOW}📊 檢查已執行的 migrations...${NC}"
EXECUTED_MIGRATIONS=$(wrangler d1 execute $DB_NAME $LOCAL_FLAG --command="SELECT filename FROM migrations;")

# 逐一執行 migrations
SUCCESS_COUNT=0
SKIP_COUNT=0

for sql_file in "${SQL_FILES[@]}"; do
    filename=$(basename "$sql_file")
    
    # 檢查是否已執行
    if echo "$EXECUTED_MIGRATIONS" | grep -q "$filename"; then
        echo -e "${YELLOW}⏭️ 跳過已執行的 migration: $filename${NC}"
        ((SKIP_COUNT++))
        continue
    fi
    
    echo -e "${BLUE}🔄 執行 migration: $filename${NC}"
    
    # 執行 migration
    if wrangler d1 execute $DB_NAME $LOCAL_FLAG --file="$sql_file"; then
        # 記錄已執行的 migration
        wrangler d1 execute $DB_NAME $LOCAL_FLAG --command="INSERT INTO migrations (filename) VALUES ('$filename');"
        echo -e "${GREEN}✅ Migration $filename 執行成功${NC}"
        ((SUCCESS_COUNT++))
    else
        echo -e "${RED}❌ Migration $filename 執行失敗${NC}"
        exit 1
    fi
    
    echo ""
done

# 清理臨時檔案
rm -f /tmp/create_migrations_table.sql

# 顯示執行結果
echo -e "${GREEN}🎉 Migration 執行完成！${NC}"
echo ""
echo -e "${BLUE}📊 執行統計:${NC}"
echo -e "  ✅ 成功執行: ${GREEN}$SUCCESS_COUNT${NC} 個 migration"
echo -e "  ⏭️ 跳過已執行: ${YELLOW}$SKIP_COUNT${NC} 個 migration"
echo -e "  📁 總計檔案: ${BLUE}${#SQL_FILES[@]}${NC} 個 migration"
echo ""

# 驗證表格建立狀態
echo -e "${YELLOW}🔍 驗證資料庫表格狀態...${NC}"
TABLES=$(wrangler d1 execute $DB_NAME $LOCAL_FLAG --command="SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;")

if [[ -n "$TABLES" ]]; then
    echo -e "${GREEN}✅ 已建立的表格:${NC}"
    echo "$TABLES" | grep -v "^$" | while read -r table; do
        if [[ -n "$table" && "$table" != "name" && "$table" != "----" ]]; then
            echo "  📋 $table"
        fi
    done
else
    echo -e "${YELLOW}⚠️ 無法取得表格清單或無表格建立${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Migration 流程完成！您可以開始使用資料庫了。${NC}"
echo ""
echo -e "${BLUE}📚 後續步驟建議:${NC}"
echo "1. 執行測試確認資料庫功能正常"
echo "2. 如需要，可以執行 seed 資料"
echo "3. 開始開發或部署應用程式"