# 開發指南

## 重要提醒 ⚠️

### 必須使用正確的開發指令

由於專案使用 Cloudflare D1 資料庫，**不能使用普通的 `npm run dev`**！

#### ❌ 錯誤的方式
```bash
npm run dev  # 這會啟動在 port 3333，但無法連接 D1 資料庫
```

使用這個指令會出現錯誤：
```
D1 database not configured for development. Please use wrangler dev.
```

#### ✅ 正確的方式
```bash
npm run dev:wrangler  # 這會啟動在 port 8787，可以使用 D1 資料庫
```

## API 架構說明

### 已實作的 API（使用 D1 資料庫）

| API 端點 | 功能 | 狀態 |
|---------|------|------|
| GET `/api/caregivers` | 獲取看護師列表 | ✅ 已實作 |
| GET `/api/caregivers/[id]` | 獲取單一看護師詳情 | ✅ 已實作 |
| GET `/api/bookings` | 獲取預約列表 | ✅ 已實作 |
| GET `/api/bookings/[id]` | 獲取單一預約詳情 | ✅ 已實作 |
| POST `/api/bookings` | 建立新預約 | ✅ 已實作 |
| POST `/api/auth/login` | 用戶登入 | ✅ 已實作 |
| POST `/api/auth/register` | 用戶註冊 | ✅ 已實作 |
| POST `/api/auth/logout` | 用戶登出 | ✅ 已實作 |
| GET `/api/auth/me` | 獲取當前用戶資訊 | ✅ 已實作 |

### Caregivers API 支援的查詢參數

```typescript
// GET /api/caregivers 支援的參數
{
  city?: string          // 城市篩選
  district?: string      // 區域篩選
  specialty?: string     // 專長篩選
  minRate?: number       // 最低時薪
  maxRate?: number       // 最高時薪
  minRating?: number     // 最低評分
  experienceYears?: number // 最少經驗年數
  gender?: string        // 性別篩選
  sortBy?: string        // 排序方式 (rating, price_low, price_high, experience)
  page?: number          // 頁碼
  limit?: number         // 每頁筆數
}
```

### 範例呼叫

```javascript
// 獲取評分最高的 4 位看護師
await $fetch('/api/caregivers?limit=4&sortBy=rating')

// 篩選台北市、女性、時薪 300-500 的看護師
await $fetch('/api/caregivers', {
  query: {
    city: '台北市',
    gender: 'female',
    minRate: 300,
    maxRate: 500
  }
})
```

## 資料流程

```
前端頁面/組件
    ↓
useApiService / Stores
    ↓
$fetch('/api/...')
    ↓
Server API (server/api/*.ts)
    ↓
getD1(event) 取得資料庫實例
    ↓
D1 Database (Cloudflare)
```

## 本地開發步驟

### 1. 啟動開發伺服器
```bash
npm run dev:wrangler
```

### 2. 訪問應用程式
打開瀏覽器訪問：http://localhost:8787

### 3. 測試 API
```bash
# 測試看護師 API
curl http://localhost:8787/api/caregivers?limit=2 | jq

# 測試預約 API
curl http://localhost:8787/api/bookings | jq
```

## 常見問題

### Q: 為什麼 API 返回資料庫錯誤？
A: 確認使用 `npm run dev:wrangler` 而不是 `npm run dev`

### Q: 如何查看本地 D1 資料庫的資料？
A: 使用 wrangler 指令：
```bash
wrangler d1 execute care-platform-db --local --command "SELECT * FROM users LIMIT 5"
```

### Q: 如何重置本地資料庫？
A: 刪除 .wrangler/state 資料夾並重新執行遷移：
```bash
rm -rf .wrangler/state
npm run db:local
```

## 部署

### 建置專案
```bash
npm run build
```

### 部署到 Cloudflare Workers
```bash
npm run deploy
```

### 訪問生產環境
https://care-platform-worker.zooka8548.workers.dev

## 技術棧

- **前端**: Nuxt 3 + Vue 3 + Quasar
- **後端**: Cloudflare Workers
- **資料庫**: Cloudflare D1 (SQLite)
- **部署**: Cloudflare Workers

## 注意事項

1. **所有 API 都已實作並使用真實的 D1 資料庫**
2. **沒有任何 mock 資料或假資料**
3. **必須使用 wrangler dev 進行本地開發**
4. **生產環境自動使用 Cloudflare 的 D1 資料庫**