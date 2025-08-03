## Q: 如何修復 server/utils/mockStore.ts 中的 TypeScript 錯誤？

## A: 成功修復了所有 TypeScript 錯誤，主要涉及類型定義和欄位名稱的統一

### 解決步驟：

1. **修復 Caregiver 類型名稱**
   - 將 `Caregiver` 類型改為 `ServerCaregiver`
   - 包括變數宣告、函數參數和返回類型

2. **修復 Payment 欄位名稱**
   - 將 `payment_method` 改為 `method`
   - 移除不存在的 `paid_at` 欄位

3. **修復 Reviews 欄位類型和名稱**
   - 將 `caregiver_id` 從字串 `'caregiver-X'` 改為數字 `X`
   - 將 `patient_id` 改為 `user_id`
   - 更新相關的查詢方法參數類型

4. **修復 Bookings 資料結構**
   - 將 `total_amount` 改為 `total_cost`（符合 Booking 介面定義）
   - 添加必要的欄位：`service_type`, `start_date`, `end_date`, `patient_info`
   - 調整時間格式從 ISO 字串改為符合介面的格式

5. **修復類型轉換問題**
   - 在所有 update 方法中添加 `as` 類型斷言
   - 解決 Partial 類型與完整類型合併時的推斷問題

### 相關檔案：
- `/Users/troye/code/troye/new-care/server/utils/mockStore.ts:37` - Caregiver 類型宣告
- `/Users/troye/code/troye/new-care/server/utils/mockStore.ts:194` - payment_method 欄位
- `/Users/troye/code/troye/new-care/server/utils/mockStore.ts:207-262` - reviews 資料結構
- `/Users/troye/code/troye/new-care/server/utils/mockStore.ts:171-190` - bookings 資料結構
- `/Users/troye/code/troye/new-care/server/utils/mockStore.ts:283,309,336,362,380` - update 方法類型轉換

### 學習重點：
- TypeScript 中介面定義需要與實際資料保持一致
- 使用 `as` 關鍵字進行類型斷言來解決複雜的類型推斷問題
- Partial<T> 類型與完整類型合併時需要明確指定最終類型
- 欄位名稱和類型的統一性對於 TypeScript 專案至關重要
- Mock 資料應該完全符合實際介面定義的結構