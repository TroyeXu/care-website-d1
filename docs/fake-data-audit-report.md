# 假資料與資料庫使用檢查報告

## 執行時間
2025-08-12

## 一、仍在使用假資料的地方

### 1. Mock 相關檔案（尚未移除）
- `/app/composables/useMockApi.ts` - 完整的 mock API 實作
- `/app/utils/mockData.ts` - mock 資料定義
- `/server/utils/mockStore.ts` - 伺服器端 mock store

### 2. 引用 Mock 的程式碼

#### Stores
- **bookings.ts**
  - `loadMockData()` 方法仍存在（雖然已改為空陣列）
  - `fetchBookings()` 錯誤時會呼叫 `loadMockData()`

- **auth.ts**
  - `loadMockData()` 方法仍存在

#### Pages
- **bookings/[id].vue** (line 355)
  ```typescript
  bookingStore.loadMockData()
  ```

- **bookings/index.vue** (line 201)
  ```typescript
  bookingStore.loadMockData()
  ```

#### Composables
- **useApiService.ts** (line 2)
  ```typescript
  import type { User, Review, Payment, Booking } from '~/utils/mockData'
  ```

### 3. 硬編碼的假資料

#### 首頁統計數據 (pages/index.vue)
- line 84: `1,500+` 專業看護
- line 95: `98%` 客戶滿意度  
- line 107: `24/7` 全天候服務
- line 119: `100%` 認證看護

#### 假頭像 URL
多處使用 `https://i.pravatar.cc/150` 作為預設頭像：
- pages/bookings/[id].vue (line 377)
- pages/bookings/index.vue (line 240)
- pages/caregivers/index.vue (lines 399, 412, 425)
- pages/index.vue (lines 507, 514, 521)

#### 假的照護員資料
pages/caregivers/index.vue 有硬編碼的照護員資料用於載入前顯示

## 二、資料庫使用情況

### ✅ 已使用 D1 資料庫的 API
1. `/api/auth/login.post.ts`
2. `/api/auth/register.post.ts`
3. `/api/auth/me.get.ts`
4. `/api/bookings/[id].get.ts`
5. `/api/bookings/index.get.ts`
6. `/api/bookings/index.post.ts`
7. `/api/caregivers/[id].get.ts`
8. `/api/caregivers/index.get.ts`

### ❌ 未使用資料庫的 API
1. `/api/auth/logout.post.ts` - 只清除 cookie，不需要資料庫
2. `/api/auth/refresh.post.ts` - 可能需要檢查 token 有效性

### 資料庫連線方式
- 使用 `event.context.cloudflare?.env?.DB` 取得 D1 實例
- 透過 `getD1Database()` 輔助函數（但實際上沒有 API 直接呼叫此函數）

## 三、建議修正項目

### 優先修正（影響功能）
1. **移除 mock 相關檔案**
   - 刪除 `/app/composables/useMockApi.ts`
   - 刪除 `/app/utils/mockData.ts`
   - 刪除 `/server/utils/mockStore.ts`

2. **移除 loadMockData 呼叫**
   - 修改 `bookings/[id].vue` 和 `bookings/index.vue`
   - 改為顯示載入狀態或空資料提示

3. **修正 import 語句**
   - `useApiService.ts` 應該定義自己的 type，而非從 mockData 引入

### 次要修正（改善品質）
1. **替換硬編碼數據**
   - 首頁統計數據改為從 API 取得
   - 或建立設定檔管理這些數值

2. **替換假頭像 URL**
   - 使用真實的預設頭像
   - 或建立頭像生成服務

3. **移除假的照護員資料**
   - 改為骨架載入畫面（skeleton loader）

## 四、資料流程現況

```
前端頁面
  ↓
useApiService / Stores
  ↓
$fetch (真實 API 呼叫) ← 主要使用
  ↓
Server API endpoints
  ↓
D1 Database (Cloudflare)
```

但仍有例外：
- 錯誤時回退到 mock 資料
- 某些頁面直接呼叫 loadMockData

## 五、總結

### 完成度評估
- **API 層**: 90% 完成（大部分已使用 D1）
- **Store 層**: 80% 完成（仍有 mock 方法殘留）
- **頁面層**: 70% 完成（有硬編碼資料）
- **整體**: 約 80% 完成真實資料遷移

### 下一步行動
1. 立即移除所有 mock 相關檔案和引用
2. 修正頁面中的 loadMockData 呼叫
3. 建立配置管理系統處理靜態數據
4. 實作真實的統計 API 端點