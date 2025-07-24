# Q&A 筆記：專案 API 調用搜尋分析

## Q: 專案中所有的 API 調用分佈情況如何？

## A: 專案採用混合架構，包含 Mock API 和 Supabase 後端服務

### 解決步驟：
1. 搜尋 HTTP 請求相關調用 (fetch, axios, $fetch)
2. 搜尋 Supabase 相關調用
3. 檢查 composables 目錄中的 API 相關檔案
4. 檢查 stores 目錄中的 API 調用
5. 分析 API 端點、資料模型和認證模式

### 相關檔案：
- /Users/troye/code/troye/new-care/composables/useHttpClient.ts - HTTP 客戶端工具
- /Users/troye/code/troye/new-care/composables/useApiService.ts - 統一 API 服務層
- /Users/troye/code/troye/new-care/composables/useApiRoutes.ts - API 路由配置
- /Users/troye/code/troye/new-care/composables/useSupabase.ts - Supabase 客戶端
- /Users/troye/code/troye/new-care/composables/useMockApi.ts - Mock API 實作
- /Users/troye/code/troye/new-care/stores/auth.ts - 認證相關 Store
- /Users/troye/code/troye/new-care/stores/caregivers.ts - 看護師資料 Store
- /Users/troye/code/troye/new-care/stores/bookings.ts - 預約管理 Store
- /Users/troye/code/troye/new-care/pages/demo/api-demo.vue - API 測試頁面
- /Users/troye/code/troye/new-care/utils/mockData.ts - 模擬資料

### 學習重點：

#### 1. API 架構設計
- **雙層架構**：Mock API + Real API (Supabase)
- **統一服務層**：`useApiService` 作為統一接口
- **自動降級**：Real API 失敗時自動降級到 Mock API

#### 2. HTTP 請求處理
- **自定義 HTTP 客戶端**：基於 fetch API 實作
- **錯誤處理**：統一的錯誤處理機制
- **重試機制**：支援自動重試和取消請求
- **請求配置**：支援超時、重試次數等配置

#### 3. API 端點分類

**認證相關 API：**
- `/api/auth/login` - 用戶登入
- `/api/auth/register` - 用戶註冊
- `/api/auth/logout` - 用戶登出
- `/api/auth/reset-password` - 密碼重設

**用戶相關 API：**
- `/api/users/profile` - 用戶資料
- `/api/users/{id}` - 特定用戶資料

**看護師相關 API：**
- `/api/caregivers` - 看護師列表
- `/api/caregivers/search` - 搜尋看護師
- `/api/caregivers/filter` - 篩選看護師
- `/api/caregivers/{id}` - 特定看護師詳情
- `/api/caregivers/featured` - 精選看護師
- `/api/caregivers/top-rated` - 高評分看護師

**預約相關 API：**
- `/api/bookings` - 建立/列出預約
- `/api/bookings/{id}` - 特定預約操作
- `/api/bookings/{id}/cancel` - 取消預約
- `/api/bookings/{id}/confirm` - 確認預約

**支付相關 API：**
- `/api/payments/process` - 處理支付
- `/api/payments/history` - 支付記錄

**評價相關 API：**
- `/api/reviews` - 建立評價
- `/api/reviews/caregiver/{id}` - 看護師評價

#### 4. Supabase 整合
- **認證服務**：使用 Supabase Auth
- **資料庫操作**：直接操作 Supabase 資料表
  - `profiles` - 用戶資料表
  - `caregivers` - 看護師資料表  
  - `bookings` - 預約資料表

#### 5. 資料模型

**用戶模型 (User)：**
```typescript
interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'patient' | 'caregiver' | 'admin'
  avatar?: string
  profile?: UserProfile
}
```

**看護師模型 (Caregiver)：**
```typescript
interface Caregiver {
  id: number
  name: string
  experience: string
  skills: string
  licenses: string[]
  rating: number
  hourly_rate: number
  shift_rate: number
  location?: string
}
```

**預約模型 (Booking)：**
```typescript
interface Booking {
  id: string
  caregiver_id: number
  user_id: string
  service_type: 'hourly' | 'shift'
  start_date: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  patient_info: PatientInfo
}
```

#### 6. 認證機制
- **Supabase Auth**：主要認證服務
- **降級機制**：Supabase 失敗時使用本地認證
- **JWT Token**：自動處理 token 管理
- **角色控制**：支援多種用戶角色

#### 7. 錯誤處理
- **HTTP 狀態碼映射**：統一的錯誤訊息
- **網路錯誤處理**：連線失敗自動降級
- **用戶友善訊息**：中文錯誤提示

#### 8. Mock API 特性
- **真實延遲模擬**：500ms 延遲
- **錯誤機率模擬**：5% 隨機錯誤
- **完整 CRUD 操作**：支援所有主要操作
- **分頁支持**：模擬真實分頁邏輯

#### 9. 性能考量
- **快取機制**：避免重複請求
- **分頁載入**：大量資料分頁處理
- **請求取消**：支援中斷長時間請求
- **響應時間測試**：內建性能測試工具

#### 10. 開發工具
- **API 測試頁面**：`/demo/api-demo` 提供完整測試介面
- **實時切換**：可在 Mock 和 Real API 間切換
- **詳細日誌**：完整的錯誤和操作日誌

這個專案展現了現代前端應用的最佳實踐，包括完善的錯誤處理、降級機制、型別安全和開發者友善的工具。