#!/bin/bash

# 本地開發腳本 - 使用 Wrangler 的 D1 資料庫

echo "正在啟動本地開發環境..."

# 檢查是否有本地資料庫
if [ ! -f ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite" ]; then
  echo "初始化本地 D1 資料庫..."
  wrangler d1 execute care-platform-db --local --file=./database/schema.sql
  wrangler d1 execute care-platform-db --local --file=./database/seeds/initial-data.sql
fi

# 建置專案
echo "建置專案..."
npm run build

# 啟動 wrangler dev
echo "啟動 Wrangler Dev Server..."
wrangler dev --local --persist-to .wrangler/state --port 3333