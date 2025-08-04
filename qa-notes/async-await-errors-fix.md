# Async/Await 錯誤修復報告

## Q: 如何修復 async 函數沒有 await 表達式的錯誤？

## A: 移除不必要的 async 關鍵字，將同步函數改為普通函數

### 解決步驟：

1. **分析問題**：
   - 識別所有標記為 async 但沒有 await 操作的函數
   - 這些函數大多是 Mock API，不需要真正的異步操作

2. **修復 app/composables/useApiConfig.ts**：
   - 第77行的 `smartApiSelection` 函數移除 async 關鍵字
   - 該函數只是根據環境切換 API 模式，不需要異步操作

3. **修復 app/composables/useApiService.ts**：
   - 移除10個不需要 async 的函數的 async 關鍵字
   - 包括 `logout`, `getUserProfile`, `getBookingById` 等函數
   - 這些函數只返回靜態資料或 null，不需要異步操作

4. **修復 server/api 檔案**：
   - 修復6個 server/api 檔案中的 `defineEventHandler`
   - 移除 async 關鍵字，因為這些 Mock API 只是同步資料操作
   - 檔案包括：
     - `server/api/bookings/[id].get.ts`
     - `server/api/bookings/index.get.ts`
     - `server/api/payments/[id].get.ts`
     - `server/api/reviews/index.get.ts`
     - `server/api/users/[id].get.ts`
     - `server/api/users/index.get.ts`

### 相關檔案：

- `/Users/troye/code/troye/new-care/app/composables/useApiConfig.ts:77`
- `/Users/troye/code/troye/new-care/app/composables/useApiService.ts:33-290`
- `/Users/troye/code/troye/new-care/server/api/bookings/[id].get.ts:4`
- `/Users/troye/code/troye/new-care/server/api/bookings/index.get.ts:4`
- `/Users/troye/code/troye/new-care/server/api/payments/[id].get.ts:4`
- `/Users/troye/code/troye/new-care/server/api/reviews/index.get.ts:4`
- `/Users/troye/code/troye/new-care/server/api/users/[id].get.ts:4`
- `/Users/troye/code/troye/new-care/server/api/users/index.get.ts:4`

### 學習重點：

- **async/await 最佳實踐**：只有真正需要等待異步操作（如 API 呼叫、檔案讀寫、資料庫查詢）的函數才應該使用 async
- **Mock API 設計**：Mock API 通常是同步的，除非需要模擬網路延遲
- **TypeScript 錯誤解讀**：`async function with no await expression` 錯誤提示我們函數可能不需要 async
- **批量修復技巧**：使用 MultiEdit 工具可以有效率地修復多個檔案中的類似問題
- **程式碼一致性**：保持 async 函數的使用一致性，避免不必要的複雜度

### 修復結果：

- 總共修復了18個不必要的 async 函數
- 1個 composable 檔案中的 `smartApiSelection` 函數
- 10個 useApiService 中的靜態函數
- 6個 server/api 檔案中的 event handler
- 所有修復都保持了原有的功能邏輯，只是移除了不必要的 async 關鍵字