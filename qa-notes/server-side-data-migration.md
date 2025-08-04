# Server 端資料遷移筆記

## Q: 如何將頁面資料從 client-side stores 改為使用 server-side mock 資料？

## A: 使用 Nuxt3 的 server API 路由和 useFetch 來實現

### 解決步驟：

1. **建立 server 端 mock 資料儲存**

   - 檔案路徑：`server/utils/mockStore.ts`
   - 包含完整的 CRUD 操作方法
   - 提供 caregivers、users、bookings、payments、reviews 等資料

2. **建立 API 路由**

   - `/server/api/caregivers/index.get.ts` - 取得照護者列表
   - `/server/api/caregivers/[id].get.ts` - 取得單一照護者詳情
   - `/server/api/reviews/index.get.ts` - 取得評價列表

3. **更新頁面使用 useFetch**

   ```javascript
   // 首頁載入精選照護者
   const { data: caregiversData } = await useFetch('/api/caregivers', {
     query: {
       limit: 4,
       sortBy: 'rating',
       sortOrder: 'desc',
     },
   })

   // 照護者詳情頁
   const {
     data: caregiver,
     pending: isLoading,
     error,
   } = await useFetch(`/api/caregivers/${caregiverId.value}`, {
     transform: (data) => {
       // 轉換資料格式
     },
   })
   ```

4. **資料格式轉換**
   - server 端使用 `caregiver-1` 格式的 ID
   - client 端需要數字格式的 ID
   - 使用 `transform` 選項進行格式轉換

### 相關檔案：

- server/utils/mockStore.ts:36
- server/api/caregivers/index.get.ts:1
- server/api/caregivers/[id].get.ts:1
- server/api/reviews/index.get.ts:1
- pages/index.vue:385
- pages/caregivers/[id].vue:485
- pages/support/reviews.vue:670

### 學習重點：

- Nuxt3 的 `useFetch` 會在 server 端執行，實現 SSR
- 使用 `transform` 選項可以在接收資料時進行格式轉換
- API 路由檔案名稱中的 `[id]` 會自動成為動態參數
- `defineEventHandler` 用於定義 API 處理函數
- 使用 `getQuery` 和 `getRouterParam` 來取得請求參數
