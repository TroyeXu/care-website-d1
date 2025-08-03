# 快速部署指南

這是一個簡化版的部署流程，適合已經熟悉基本概念的開發者。

## 快速部署步驟

### 1. 一鍵部署腳本

建立 `deploy.sh`：

```bash
#!/bin/bash

# 建構專案
echo "🔨 建構專案..."
npm run build

# 部署到 Workers
echo "🚀 部署到 Cloudflare Workers..."
npx wrangler deploy

# 顯示部署結果
echo "✅ 部署完成！"
```

### 2. 資料庫初始化腳本

建立 `init-db.sh`：

```bash
#!/bin/bash

# 初始化遠端資料庫
echo "📊 初始化資料庫結構..."
npx wrangler d1 execute care-platform-db --remote --file=./database/schema.sql

echo "🌱 插入種子資料..."
npx wrangler d1 execute care-platform-db --remote --file=./database/seed.sql

echo "✅ 資料庫初始化完成！"
```

## 常用命令

```bash
# 本地開發
npm run dev

# 建構專案
npm run build

# 部署
npx wrangler deploy

# 查看日誌
npx wrangler tail

# 資料庫查詢（遠端）
npx wrangler d1 execute care-platform-db --remote --command "SELECT * FROM caregivers"

# 資料庫查詢（本地）
npx wrangler d1 execute care-platform-db --local --command "SELECT * FROM caregivers"
```

## 環境檢查清單

部署前確認：

- [ ] `wrangler.toml` 已配置正確的 database_id
- [ ] `nuxt.config.ts` 使用 `cloudflare-module` preset
- [ ] `nitro.config.ts` 已建立並配置
- [ ] 資料庫 schema 和 seed 檔案已準備
- [ ] 已登入 Cloudflare (`npx wrangler login`)

## 部署後驗證

```bash
# 檢查網站
curl https://your-worker.workers.dev/

# 檢查 API
curl https://your-worker.workers.dev/api/caregivers | jq

# 檢查靜態資源
curl -I https://your-worker.workers.dev/_nuxt/entry.css
```

## 緊急回滾

如果部署出現問題：

```bash
# 查看部署歷史
npx wrangler deployments list

# 回滾到上一個版本
npx wrangler rollback
```

---

提示：將這些腳本設為可執行：
```bash
chmod +x deploy.sh init-db.sh
```