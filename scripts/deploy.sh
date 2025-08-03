#!/bin/bash

echo "🚀 開始部署到 Cloudflare Pages..."

# 檢查是否已安裝 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "❌ 請先安裝 wrangler: npm install -g wrangler"
    exit 1
fi

# 檢查是否已登入 Cloudflare
if ! wrangler whoami &> /dev/null; then
    echo "📝 請先登入 Cloudflare..."
    wrangler login
fi

# 建立 D1 資料庫（如果不存在）
echo "📊 設定 D1 資料庫..."
if ! wrangler d1 list | grep -q "care-platform-db"; then
    echo "建立新的 D1 資料庫..."
    wrangler d1 create care-platform-db
    
    # 等待資料庫建立完成
    sleep 5
    
    # 取得資料庫 ID
    DB_ID=$(wrangler d1 list | grep "care-platform-db" | awk '{print $2}')
    echo "資料庫 ID: $DB_ID"
    
    # 更新 wrangler.toml
    sed -i '' "s/YOUR_DATABASE_ID/$DB_ID/g" wrangler.toml
fi

# 初始化資料庫結構
echo "📝 初始化資料庫結構..."
wrangler d1 execute care-platform-db --file=./database/schema.sql

# 插入初始資料
echo "🌱 插入初始資料..."
wrangler d1 execute care-platform-db --file=./database/seed.sql

# 建置專案
echo "🔨 建置 Nuxt 專案..."
npm run build

# 部署到 Cloudflare Pages
echo "☁️ 部署到 Cloudflare Pages..."
wrangler pages deploy .output/public --project-name=care-platform

echo "✅ 部署完成！"
echo "🌐 您的網站將在幾分鐘內可以訪問："
echo "   https://care-platform.pages.dev"