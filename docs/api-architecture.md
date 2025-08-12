# API 架構設計文件 - Cloudflare Workers + D1 + SSR

## 架構總覽

本專案使用 Nuxt 3 + Cloudflare Workers + D1 資料庫的完整 SSR 架構，提供高效能的照護服務平台。

## 技術堆疊

- **前端框架**: Nuxt 3 (SSR 模式)
- **運行環境**: Cloudflare Workers
- **資料庫**: Cloudflare D1 (SQLite)
- **認證**: JWT + HttpOnly Cookies
- **部署**: Cloudflare Pages/Workers

## 目錄結構

```
/new-care
├── app/                    # Nuxt 4 應用程式目錄
│   ├── pages/             # 頁面路由
│   ├── components/        # Vue 元件
│   ├── stores/           # Pinia 狀態管理
│   └── composables/      # 組合式函數
├── server/                # 伺服器端程式碼
│   ├── api/              # API 路由
│   │   ├── auth/        # 認證相關 API
│   │   ├── caregivers/  # 看護師相關 API
│   │   ├── bookings/    # 預約相關 API
│   │   └── payments/    # 付款相關 API
│   └── utils/           # 伺服器工具函數
│       ├── d1.ts       # D1 資料庫工具
│       ├── auth.ts     # 認證工具
│       └── jwt.ts      # JWT 工具
├── database/             # 資料庫相關
│   ├── schema.sql      # D1 資料庫架構
│   ├── migrations/     # 資料庫遷移
│   └── seeds/         # 種子資料
└── wrangler.toml       # Cloudflare Workers 設定
```

## API 端點設計

### 認證 API

```typescript
// POST /api/auth/register
// 註冊新使用者
{
  email: string
  password: string
  name: string
  phone?: string
  role?: 'user' | 'caregiver'
}

// POST /api/auth/login
// 使用者登入
{
  email: string
  password: string
}

// POST /api/auth/logout
// 使用者登出

// GET /api/auth/me
// 獲取當前使用者資訊

// POST /api/auth/refresh
// 更新認證 token

// PUT /api/auth/profile
// 更新使用者資料
{
  name?: string
  phone?: string
  avatar_url?: string
}

// POST /api/auth/change-password
// 更改密碼
{
  oldPassword: string
  newPassword: string
}

// POST /api/auth/forgot-password
// 忘記密碼
{
  email: string
}

// POST /api/auth/reset-password
// 重設密碼
{
  token: string
  newPassword: string
}
```

### 看護師 API

```typescript
// GET /api/caregivers
// 獲取看護師列表（支援篩選、排序、分頁）
Query Parameters:
- page: number
- limit: number
- area: string
- gender: 'male' | 'female'
- minRating: number
- minRate: number
- maxRate: number
- skills: string[] (comma separated)
- languages: string[] (comma separated)
- availability: string[] (weekdays,weekends,nights,holidays)
- sortBy: 'rating' | 'rate' | 'experience' | 'created'
- sortOrder: 'asc' | 'desc'

// GET /api/caregivers/:id
// 獲取特定看護師詳細資料

// POST /api/caregivers
// 建立看護師檔案（需要 caregiver 角色）
{
  gender: 'male' | 'female'
  age: number
  bio: string
  description: string
  hourly_rate: number
  experience_years: number
  skills: string[]
  certifications: Array<{
    name: string
    issue_date?: string
    expiry_date?: string
  }>
  languages: Array<{
    language: string
    proficiency_level: 'basic' | 'intermediate' | 'fluent' | 'native'
  }>
  service_areas: string[]
  availability: {
    weekdays: boolean
    weekends: boolean
    nights: boolean
    holidays: boolean
  }
}

// PUT /api/caregivers/:id
// 更新看護師資料（需要擁有者或管理員）

// DELETE /api/caregivers/:id
// 刪除看護師檔案（需要擁有者或管理員）

// GET /api/caregivers/:id/reviews
// 獲取看護師評價列表

// GET /api/caregivers/:id/availability
// 獲取看護師可用時段

// POST /api/caregivers/:id/availability
// 更新看護師可用時段
```

### 預約 API

```typescript
// GET /api/bookings
// 獲取預約列表（根據使用者角色過濾）
Query Parameters:
- status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
- startDate: string (ISO date)
- endDate: string (ISO date)
- caregiverId: string
- userId: string (admin only)

// GET /api/bookings/:id
// 獲取特定預約詳情

// POST /api/bookings
// 建立新預約
{
  caregiver_id: string
  service_type: 'hourly' | 'shift-12' | 'shift-24'
  start_date: string
  end_date: string
  start_time: string
  end_time?: string
  special_requests?: string
  patient_info: {
    name: string
    age: number
    gender: 'male' | 'female' | 'other'
    medical_conditions?: string[]
    medications?: string[]
    allergies?: string[]
    emergency_contact_name: string
    emergency_contact_phone: string
    special_needs?: string
  }
}

// PUT /api/bookings/:id
// 更新預約資訊

// POST /api/bookings/:id/confirm
// 確認預約（看護師）

// POST /api/bookings/:id/cancel
// 取消預約
{
  reason: string
}

// POST /api/bookings/:id/complete
// 完成預約（看護師）

// POST /api/bookings/:id/review
// 評價預約
{
  rating: number (1-5)
  comment?: string
  is_anonymous?: boolean
}
```

### 付款 API

```typescript
// GET /api/payments
// 獲取付款記錄

// GET /api/payments/:id
// 獲取特定付款詳情

// POST /api/payments
// 建立付款
{
  booking_id: string
  payment_method: 'credit_card' | 'bank_transfer' | 'cash' | 'line_pay'
}

// POST /api/payments/:id/refund
// 申請退款
{
  reason: string
  amount?: number
}
```

### 通知 API

```typescript
// GET /api/notifications
// 獲取通知列表

// PUT /api/notifications/:id/read
// 標記通知為已讀

// PUT /api/notifications/read-all
// 標記所有通知為已讀

// DELETE /api/notifications/:id
// 刪除通知
```

## 資料庫設計

### 主要資料表

1. **users** - 使用者基本資料
2. **caregivers** - 看護師專業資料
3. **caregiver_skills** - 看護師技能
4. **caregiver_certifications** - 看護師證照
5. **caregiver_languages** - 看護師語言能力
6. **caregiver_service_areas** - 看護師服務區域
7. **caregiver_availability** - 看護師可用時段
8. **bookings** - 預約記錄
9. **patient_info** - 病患資訊
10. **reviews** - 評價記錄
11. **payments** - 付款記錄
12. **notifications** - 通知記錄

## 安全性考量

### 認證與授權

- 使用 JWT + HttpOnly Cookies 進行認證
- 實作角色基礎存取控制 (RBAC)
- Token 定期更新機制
- 密碼使用 Web Crypto API 進行雜湊

### API 安全

- 輸入驗證與清理
- SQL 注入防護（使用參數化查詢）
- Rate limiting（透過 Cloudflare）
- CORS 設定

### 資料保護

- 敏感資料加密
- PII 資料最小化
- 安全的密碼重設流程
- 審計日誌記錄

## 效能優化

### 資料庫優化

- 適當的索引設計
- 查詢優化
- 分頁實作
- 快取策略

### API 優化

- 回應壓縮
- 欄位過濾
- 批次操作
- 並行處理

### SSR 優化

- 頁面級快取
- API 回應快取
- 靜態資源 CDN
- 程式碼分割

## 部署流程

### 開發環境

```bash
# 安裝依賴
npm install

# 建立 D1 資料庫
wrangler d1 create care-platform-db

# 執行資料庫遷移
wrangler d1 execute care-platform-db --file=./database/schema.sql

# 啟動開發伺服器
npm run dev:wrangler
```

### 生產部署

```bash
# 建置應用程式
npm run build

# 設定環境變數
wrangler secret put JWT_SECRET

# 部署到 Cloudflare Workers
wrangler deploy
```

## 監控與維護

### 錯誤追蹤

- Cloudflare Analytics
- 自定義錯誤日誌
- 效能監控

### 備份策略

- D1 自動備份
- 定期資料匯出
- 災難復原計畫

## API 回應格式

### 成功回應

```json
{
  "success": true,
  "data": {},
  "message": "操作成功"
}
```

### 錯誤回應

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "錯誤訊息",
    "details": {}
  }
}
```

### 分頁回應

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 開發指南

### 新增 API 端點

1. 在 `server/api/` 建立對應的路由檔案
2. 使用 `server/utils/d1.ts` 的工具函數操作資料庫
3. 實作適當的認證與授權檢查
4. 加入輸入驗證
5. 撰寫對應的測試

### 資料庫遷移

1. 在 `database/migrations/` 建立遷移檔案
2. 使用 wrangler 執行遷移
3. 更新 `database/schema.sql`

### 環境變數

必要的環境變數：

- `JWT_SECRET` - JWT 簽名密鑰
- `DATABASE_ID` - D1 資料庫 ID
- `ENVIRONMENT` - 執行環境 (development/production)

## 測試策略

### 單元測試

- 工具函數測試
- API 端點測試
- 資料驗證測試

### 整合測試

- API 流程測試
- 資料庫操作測試
- 認證流程測試

### E2E 測試

- 使用者註冊流程
- 預約流程
- 付款流程

## 未來擴展

### 計畫中的功能

- WebSocket 即時通訊
- 推播通知
- 多語言支援
- AI 推薦系統
- 視訊諮詢功能

### 技術債務

- 完整的測試覆蓋
- API 文件自動生成
- 效能基準測試
- 安全性審計