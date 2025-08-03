# 頁面 apiService 問題報告

## 問題描述
以下頁面仍在使用 `useApiService`，需要改為使用 server 端 API：

### 需要修復的頁面清單：

1. **user/dashboard.vue** - 使用者儀表板
   - 使用 `getDashboardStats`
   - 使用 `getFeaturedCaregivers`
   - 使用 `getBookingsByUser`
   - 使用 `cancelBooking`

2. **booking/match.vue** - 智能媒合頁面
   - 需要檢查具體使用情況

3. **booking/schedule.vue** - 排程管理頁面
   - 需要檢查具體使用情況

4. **caregivers/search.vue** - 看護師搜尋頁面
   - 需要檢查具體使用情況

5. **support/contact.vue** - 聯絡支援頁面
   - 需要檢查具體使用情況

### 已修復的頁面：
- ✅ pages/index.vue - 首頁
- ✅ pages/caregivers/[id].vue - 照護者詳情頁
- ✅ pages/support/reviews.vue - 評價頁面
- ✅ pages/caregivers/index.vue - 照護者列表頁

### 修復方案：
1. 建立對應的 server API 路由
2. 使用 `useFetch` 或 `$fetch` 取代 `apiService` 的呼叫
3. 轉換資料格式以符合頁面需求

### 錯誤類型：
- **Identifier 'loadReviews' has already been declared** - 重複宣告變數
- **Cannot find module '~/composables/useApiService'** - 找不到模組（因為已經被移除）

### 相關檔案：
- server/api/* - Server API 路由
- composables/useApiService.ts - 已移除的檔案