# Cloudflare Workers + D1 部署指南

本指南詳細說明如何將 Nuxt 3 應用部署到 Cloudflare Workers，並使用 D1 作為資料庫。

## 目錄
- [前置需求](#前置需求)
- [專案配置](#專案配置)
- [資料庫設置](#資料庫設置)
- [部署流程](#部署流程)
- [常見問題](#常見問題)
- [維護指南](#維護指南)

## 前置需求

1. **Cloudflare 帳號**
   - 需要有 Cloudflare 帳號
   - 開啟 Workers 和 D1 服務

2. **安裝 Wrangler CLI**
   ```bash
   npm install -g wrangler
   # 或使用專案內的
   npx wrangler
   ```

3. **登入 Cloudflare**
   ```bash
   npx wrangler login
   ```

## 專案配置

### 1. Nuxt 配置 (`nuxt.config.ts`)

```typescript
export default defineNuxtConfig({
  // Cloudflare Workers 配置（支援 SSR）
  nitro: {
    preset: 'cloudflare-module',
    prerender: false,  // 不預渲染，使用完整 SSR
    publicAssets: [{
      baseURL: '/',
      dir: '.output/public',
      maxAge: 31536000  // 1 年快取
    }]
  },
  ssr: true,  // 啟用 SSR
  // ... 其他配置
})
```

### 2. Nitro 配置 (`nitro.config.ts`)

```typescript
import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'cloudflare-module',
  publicAssets: [{
    baseURL: '/',
    dir: '.output/public'
  }],
  cloudflare: {
    pages: false,
    wrangler: {
      configPath: './wrangler.toml'
    }
  },
  routeRules: {
    '/**': { cors: true }
  }
})
```

### 3. Wrangler 配置 (`wrangler.toml`)

```toml
name = "care-platform-worker"
main = "./.output/server/index.mjs"
compatibility_date = "2024-01-01"
assets = { directory = "./.output/public" }

# D1 資料庫配置
[[d1_databases]]
binding = "DB"
database_name = "care-platform-db"
database_id = "你的資料庫ID"
```

## 資料庫設置

### 1. 建立 D1 資料庫

```bash
# 建立新的 D1 資料庫
npx wrangler d1 create care-platform-db
```

將回傳的 `database_id` 更新到 `wrangler.toml`。

### 2. 建立資料庫結構

建立 `database/schema.sql` 檔案：

```sql
-- 刪除既有表格（如果存在）
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS caregiver_service_areas;
DROP TABLE IF EXISTS caregiver_specialties;
DROP TABLE IF EXISTS caregiver_languages;
DROP TABLE IF EXISTS caregiver_certifications;
DROP TABLE IF EXISTS caregivers;

-- 建立看護師表
CREATE TABLE caregivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  rating REAL DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  hourly_rate INTEGER NOT NULL,
  experience_years INTEGER DEFAULT 0,
  bio TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 其他表格...
```

### 3. 準備種子資料

建立 `database/seed.sql` 檔案：

```sql
-- 插入看護師資料
INSERT INTO caregivers (id, name, avatar, rating, reviews_count, hourly_rate, experience_years, bio)
VALUES 
  ('cg-001', '張美麗', 'https://i.pravatar.cc/150?img=1', 4.8, 124, 350, 5, '專業照護服務員...');

-- 其他資料...
```

### 4. 初始化資料庫

```bash
# 本地測試
npx wrangler d1 execute care-platform-db --local --file=./database/schema.sql
npx wrangler d1 execute care-platform-db --local --file=./database/seed.sql

# 遠端生產環境
npx wrangler d1 execute care-platform-db --remote --file=./database/schema.sql
npx wrangler d1 execute care-platform-db --remote --file=./database/seed.sql
```

## 部署流程

### 1. 建構專案

```bash
npm run build
```

### 2. 部署到 Cloudflare Workers

```bash
npx wrangler deploy
```

### 3. 驗證部署

部署成功後會顯示 URL：
```
Uploaded care-platform-worker (6.75 sec)
Deployed care-platform-worker triggers (0.47 sec)
  https://care-platform-worker.zooka8548.workers.dev
```

### 4. 測試功能

```bash
# 測試首頁
curl https://your-worker.workers.dev/

# 測試 API
curl https://your-worker.workers.dev/api/caregivers

# 測試靜態資源
curl -I https://your-worker.workers.dev/_nuxt/entry.css
```

## 常見問題

### 1. 靜態資源 404 錯誤

**問題**：部署後 CSS/JS 檔案返回 404

**解決方案**：
- 確保 `wrangler.toml` 使用 `assets` 配置而非 `site.bucket`
- 檢查 `nitro.config.ts` 的 `publicAssets` 配置
- 重新建構並部署

### 2. API 返回 500 錯誤

**問題**：API 端點返回「資料庫查詢錯誤」

**解決方案**：
- 確認 D1 資料庫已初始化
- 執行 schema 和 seed SQL
- 檢查 `wrangler.toml` 的資料庫綁定

### 3. SSR 不工作

**問題**：頁面沒有在伺服器端渲染

**解決方案**：
- 確保使用 `cloudflare-module` preset
- 設定 `ssr: true` 和 `prerender: false`
- 不要使用 `cloudflare-pages` preset

## 維護指南

### 更新部署

```bash
# 1. 拉取最新代碼
git pull

# 2. 安裝依賴
npm install

# 3. 建構專案
npm run build

# 4. 部署
npx wrangler deploy
```

### 資料庫遷移

```bash
# 1. 建立新的遷移檔案
touch database/migrations/001_add_new_table.sql

# 2. 執行遷移
npx wrangler d1 execute care-platform-db --remote --file=./database/migrations/001_add_new_table.sql
```

### 監控和日誌

```bash
# 查看即時日誌
npx wrangler tail

# 查看 Workers 分析
# 訪問 https://dash.cloudflare.com/workers
```

### 環境變數

在 `wrangler.toml` 中設定：

```toml
[vars]
API_KEY = "your-api-key"
ENVIRONMENT = "production"
```

在代碼中使用：

```typescript
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const apiKey = cloudflare?.env?.API_KEY
})
```

## 成本考量

### 免費方案限制
- Workers: 每日 100,000 次請求
- D1: 5GB 儲存空間，每月 500 萬次讀取
- 適合中小型專案

### 付費方案
- Workers: $5/月起，1000 萬次請求
- D1: 按使用量計費
- 適合大型商業專案

## 安全建議

1. **API 安全**
   - 實施適當的身份驗證
   - 使用 CORS 限制來源
   - 驗證所有輸入資料

2. **資料庫安全**
   - 使用參數化查詢防止 SQL 注入
   - 定期備份資料
   - 限制資料庫權限

3. **部署安全**
   - 使用 GitHub Actions 自動化部署
   - 保護 API 密鑰和敏感資訊
   - 定期更新依賴項

## 故障排除檢查清單

- [ ] Wrangler CLI 已安裝並登入
- [ ] D1 資料庫已建立並初始化
- [ ] `wrangler.toml` 配置正確
- [ ] 使用正確的 Nitro preset
- [ ] 靜態資源路徑配置正確
- [ ] API 路由正確處理錯誤
- [ ] 環境變數已設定

## 相關資源

- [Cloudflare Workers 文檔](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 文檔](https://developers.cloudflare.com/d1/)
- [Nuxt 3 文檔](https://nuxt.com/)
- [Nitro 文檔](https://nitro.unjs.io/)

---

最後更新：2025-08-03