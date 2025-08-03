# 修復重複識別符錯誤筆記

## Q: 出現錯誤 "Identifier 'loadReviews' has already been declared"，如何解決？

## A: 移除重複定義的函數，使用 useFetch 返回的 refresh 函數

### 錯誤原因：
在使用 `useFetch` 時，它會返回一個 `refresh` 函數，如果我們將它重命名為 `loadReviews`：
```javascript
const { data: reviewsData, pending: isLoading, refresh: loadReviews } = await useFetch(...)
```

然後又定義了一個同名的函數：
```javascript
const loadReviews = async () => {
  // ...
}
```

這會導致重複宣告的錯誤。

### 解決步驟：

1. **移除重複的函數定義**
   - 刪除手動定義的 `loadReviews` 函數
   - 使用 `useFetch` 返回的 `refresh` 函數（已命名為 `loadReviews`）

2. **更新相關的 import**
   - 移除不再使用的 `useApiService` import
   - 移除不再使用的類型 import

3. **修改提交評價的邏輯**
   ```javascript
   // 原本使用 apiService
   const newReview = await apiService.createReview(reviewData)
   
   // 改為模擬提交（因為還沒有 POST API）
   const newReview = {
     id: `review-${Date.now()}`,
     ...reviewData,
     caregiver_id: `caregiver-${reviewData.caregiver_id}`,
     patient_id: `user-${reviewData.user_id}`,
     created_at: new Date().toISOString(),
     updated_at: new Date().toISOString()
   }
   
   // 重新載入評價列表
   await loadReviews()
   ```

4. **修復類型錯誤**
   - 將 `Review` 類型改為 `any`（因為移除了類型 import）

### 相關檔案：
- pages/support/reviews.vue:670
- pages/support/reviews.vue:774
- pages/support/reviews.vue:794

### 學習重點：
- `useFetch` 的返回值包含 `data`、`pending`、`error` 和 `refresh` 函數
- 可以使用解構賦值重命名返回的函數
- 要注意避免變數名稱衝突
- 在沒有後端 API 時，可以先使用模擬的方式實現功能