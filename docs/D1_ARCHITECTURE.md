# Cloudflare D1 與 Server 端架構說明

## 架構概念

### ❌ 錯誤理解
```
傳統架構：
Client → Server → Database (透過連線字串)

誤解的 D1 架構：
Client → D1 API (直接存取？)
```

### ✅ 正確理解
```
Cloudflare Workers + D1 架構：
Client → Cloudflare Workers (你的 Server 端) → D1 (透過綁定)
         ↑
         這裡運行你的 Nuxt Server (Nitro)
```

## Server 端仍然存在且重要！

### 1. Server 資料夾的作用

您的 `server/` 資料夾中的程式碼**仍然在 Cloudflare Workers 中執行**：

```typescript
// server/api/caregivers/index.get.ts
export default defineEventHandler(async (event) => {
  // 這段程式碼在 Cloudflare Workers 中執行
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB  // 透過綁定存取 D1
  
  // 你的業務邏輯
  const results = await db.prepare('SELECT * FROM caregivers').all()
  
  // 資料處理、驗證、轉換等
  return {
    caregivers: results.results
  }
})
```

### 2. 為什麼需要 Server 端？

Server 端（Nitro/Workers）負責：

1. **業務邏輯處理**
   - 資料驗證
   - 權限檢查
   - 複雜查詢組合

2. **API 路由管理**
   - RESTful API 端點
   - 請求參數處理
   - 回應格式化

3. **安全性控制**
   - 防止 SQL 注入
   - 資料存取權限
   - API 認證

4. **SSR 渲染**
   - 頁面預渲染
   - SEO 優化
   - 初始資料載入

### 3. D1 的角色

D1 只是**資料儲存層**，不是完整的後端：

```typescript
// ❌ 客戶端無法直接存取 D1
// 沒有這種用法：
const db = new D1Client('...')  // 不存在！

// ✅ 必須透過 Workers API
// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB
  
  const userId = getRouterParam(event, 'id')
  
  // 安全的參數化查詢
  const user = await db
    .prepare('SELECT * FROM users WHERE id = ?')
    .bind(userId)
    .first()
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: '使用者不存在'
    })
  }
  
  return user
})
```

## 實際運作流程

### 1. 客戶端請求
```javascript
// pages/caregivers/index.vue
const { data } = await $fetch('/api/caregivers', {
  query: {
    area: '台北市',
    specialty: '老年照護'
  }
})
```

### 2. Server 端處理（在 Workers 中）
```typescript
// server/api/caregivers/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB
  
  // 建構查詢
  let sql = 'SELECT * FROM caregivers WHERE 1=1'
  const params = []
  
  if (query.area) {
    sql += ' AND id IN (SELECT caregiver_id FROM caregiver_service_areas WHERE area = ?)'
    params.push(query.area)
  }
  
  // 執行查詢
  const results = await db
    .prepare(sql)
    .bind(...params)
    .all()
  
  // 回傳處理後的資料
  return {
    caregivers: results.results,
    total: results.results.length
  }
})
```

### 3. D1 資料庫
- 儲存資料
- 執行 SQL 查詢
- 返回結果給 Workers

## 架構優勢

### 1. 安全性
- 客戶端無法直接存取資料庫
- 所有查詢都經過 Server 端驗證
- 可以實施細緻的權限控制

### 2. 效能
- D1 與 Workers 在同一邊緣節點
- 極低的延遲
- 自動的全球分佈

### 3. 可維護性
- 業務邏輯集中在 Server 端
- 易於測試和除錯
- 版本控制和部署管理

## 常見誤解澄清

### ❌ 誤解 1：D1 可以從客戶端直接存取
**事實**：D1 只能透過 Cloudflare Workers 存取

### ❌ 誤解 2：有了 D1 就不需要後端 API
**事實**：仍需要 API 層處理業務邏輯和安全性

### ❌ 誤解 3：D1 是一個獨立的 API 服務
**事實**：D1 是整合在 Workers 環境中的資料庫

## 最佳實踐

### 1. 保持關注點分離
```typescript
// ✅ 好的做法：Repository 模式
// server/utils/repositories/caregiver.repository.ts
export class CaregiverRepository {
  constructor(private db: D1Database) {}
  
  async findAll(filters?: CaregiverFilters) {
    // 資料存取邏輯
  }
  
  async findById(id: string) {
    // 資料存取邏輯
  }
}

// server/api/caregivers/index.get.ts
export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context
  const repo = new CaregiverRepository(cloudflare.env.DB)
  
  // 使用 repository
  const caregivers = await repo.findAll(filters)
  return { caregivers }
})
```

### 2. 錯誤處理
```typescript
export default defineEventHandler(async (event) => {
  try {
    const { cloudflare } = event.context
    const db = cloudflare?.env?.DB
    
    if (!db) {
      throw createError({
        statusCode: 500,
        statusMessage: '資料庫連線錯誤'
      })
    }
    
    // 你的邏輯
  } catch (error) {
    console.error('Database error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '伺服器錯誤'
    })
  }
})
```

### 3. 類型安全
```typescript
// server/utils/types/database.ts
export interface CaregiverRow {
  id: string
  name: string
  rating: number
  // ...
}

// 使用類型
const result = await db
  .prepare('SELECT * FROM caregivers')
  .all<CaregiverRow>()
```

## 總結

- **Server 端絕對需要**：處理業務邏輯、API 路由、安全控制
- **D1 是資料庫層**：只負責資料儲存，必須透過 Workers 存取
- **客戶端無法直接連 D1**：所有資料存取都要經過你的 API
- **這是更安全的架構**：完全控制資料存取和業務規則

您的 `server/` 資料夾中的程式碼是整個應用的核心，D1 只是將資料庫整合到 Workers 環境中，讓存取更快速和方便。