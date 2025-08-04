# 照護服務平台

一個基於 Nuxt 3 + Cloudflare D1 的照護服務媒合平台。

## 功能特色

- 🔍 照護員搜尋與篩選
- 📅 線上預約系統
- ⭐ 評價與評論系統
- 💰 費用計算器
- 🎯 智能媒合推薦

## 技術架構

- **前端框架**: Nuxt 3
- **資料庫**: Cloudflare D1 (SQLite)
- **部署平台**: Cloudflare Pages
- **樣式**: Tailwind CSS

## 本地開發

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開發伺服器將在 http://localhost:3000 啟動

## 部署到 Cloudflare

### 前置準備

1. 註冊 [Cloudflare 帳號](https://dash.cloudflare.com/sign-up)
2. 安裝 Wrangler CLI：

```bash
npm install -g wrangler
```

3. 登入 Cloudflare：

```bash
wrangler login
```

### 一鍵部署

執行部署腳本：

```bash
npm run deploy
```

或手動執行：

```bash
./scripts/deploy.sh
```

### 手動部署步驟

1. **建立 D1 資料庫**

```bash
wrangler d1 create care-platform-db
```

2. **更新 wrangler.toml**

將產生的資料庫 ID 更新到 `wrangler.toml` 中的 `database_id`

3. **初始化資料庫**

```bash
wrangler d1 execute care-platform-db --file=./database/schema.sql
wrangler d1 execute care-platform-db --file=./database/seed.sql
```

4. **建置專案**

```bash
npm run build
```

5. **部署到 Cloudflare Pages**

```bash
wrangler pages deploy .output/public --project-name=care-platform
```

## 專案結構

```
new-care/
├── components/          # Vue 元件
├── composables/        # 組合式函數
├── database/           # D1 資料庫檔案
│   ├── schema.sql     # 資料庫結構
│   └── seed.sql       # 初始資料
├── pages/             # 頁面路由
├── public/            # 靜態資源
├── server/            # API 路由
│   └── api/          # API endpoints
├── stores/            # Pinia 狀態管理
└── wrangler.toml      # Cloudflare 設定
```

## API 端點

- `GET /api/caregivers` - 取得照護員列表
- `GET /api/caregivers/[id]` - 取得特定照護員資料
- `POST /api/bookings` - 建立預約
- `GET /api/bookings` - 取得預約列表

## 環境變數

開發環境不需要特別設定，部署時 Cloudflare 會自動處理 D1 綁定。

## 注意事項

- 本專案為示範用途，不包含使用者認證系統
- 所有資料都是公開可見的
- 建議在正式使用前加入適當的安全機制

## License

MIT
