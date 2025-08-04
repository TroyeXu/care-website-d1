# 移除不需要的功能和 API

## Q: 如何移除登入系統、支付記錄、排程管理、個人儀表板、評價系統等功能，並清理相關的 API 和 SQL？

## A: 系統性地移除所有相關檔案、API 路由和資料庫結構

### 解決步驟：

1. **刪除 server API 路由**
   - 刪除 `/server/api/auth/` - 認證相關 API
   - 刪除 `/server/api/payments/` - 支付相關 API  
   - 刪除 `/server/api/reviews/` - 評價相關 API
   - 刪除 `/server/api/users/` - 用戶相關 API

2. **更新 SQL 結構**
   - 從 `database/schema.sql` 移除 reviews 表和相關索引
   - 從 `database/seed.sql` 移除 reviews_count 欄位和評價測試資料

3. **刪除頁面檔案**
   - 內容相關：blog.vue, resources.vue
   - 資訊頁面：app.vue, subsidy.vue, guide.vue, pricing.vue, safety.vue
   - 認證相關：login.vue, register.vue
   - 用戶功能：schedule.vue, dashboard.vue, reviews.vue

### 相關檔案：

- database/schema.sql:65-68 (移除 reviews 表和索引)
- database/seed.sql:2-7 (移除 reviews_count 欄位)
- server/api/ (刪除整個 auth, payments, reviews, users 資料夾)

### 學習重點：

- 移除功能時要從資料庫結構開始，再移除 API，最後移除前端頁面
- 確保 SQL 檔案中的欄位與實際使用的欄位一致
- 系統性地清理所有相關檔案，避免留下無用的程式碼