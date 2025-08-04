#!/bin/bash

echo "🚀 開始部署到 Cloudflare Pages..."

# 檢查是否已安裝必要工具
if ! command -v npm &> /dev/null; then
    echo "❌ 錯誤：未找到 npm"
    exit 1
fi

# 安裝依賴
echo "📦 安裝依賴..."
npm ci

# 建構專案
echo "🔨 建構專案..."
npm run build

# 檢查是否已安裝 wrangler
if ! command -v wrangler &> /dev/null; then
    echo "📦 安裝 Wrangler CLI..."
    npm install -g wrangler
fi

# 部署到 Cloudflare Pages
echo "☁️  部署到 Cloudflare Pages..."
wrangler pages deploy .output/public --project-name=care-platform --commit-dirty=true

echo "✅ 部署完成！"