# CamelCase 命名修復筆記

## Q: 如何修復 server API 檔案中的底線命名錯誤，將其改為駝峰命名？

## A: 使用 MultiEdit 工具批量修改所有相關檔案中的變數命名

### 解決步驟：

1. **讀取並分析所有需要修改的檔案**
   - server/api/bookings/index.get.ts
   - server/api/bookings/index.post.ts  
   - server/api/caregivers/[id].get.ts
   - server/api/caregivers/index.get.ts
   - server/api/reviews/index.get.ts

2. **識別需要修改的底線命名變數**
   - user_id → userId
   - caregiver_id → caregiverId
   - patient_name → patientName
   - patient_phone → patientPhone
   - patient_email → patientEmail
   - service_type → serviceType
   - service_date → serviceDate
   - start_time → startTime
   - end_time → endTime
   - total_cost → totalCost
   - service_areas → serviceAreas

3. **使用 MultiEdit 工具逐個修改檔案**
   - 針對每個檔案建立多個編輯操作
   - 同時修改變數宣告、使用和物件屬性名稱
   - 注意區分資料庫欄位名稱（保持底線）和 JavaScript 變數名稱（使用駝峰）

### 相關檔案：

- /Users/troye/code/troye/new-care/server/api/bookings/index.get.ts:6,12,17
- /Users/troye/code/troye/new-care/server/api/bookings/index.post.ts:22-33,35-41,64-76
- /Users/troye/code/troye/new-care/server/api/caregivers/[id].get.ts:24,67,94
- /Users/troye/code/troye/new-care/server/api/caregivers/index.get.ts:27,85,99,106
- /Users/troye/code/troye/new-care/server/api/reviews/index.get.ts:6,11-12

### 學習重點：

- **變數命名一致性**：JavaScript 中應使用 camelCase 命名慣例
- **區分資料庫與程式碼**：資料庫欄位名稱通常使用底線，但 JavaScript 變數應使用駝峰命名
- **批量修改效率**：使用 MultiEdit 工具可以一次性對單個檔案進行多個編輯操作
- **命名轉換規則**：底線分隔的單字轉為駝峰命名時，移除底線並將後續單字首字母大寫
- **測試資料一致性**：修改變數名稱時也要同步更新測試資料中的物件屬性名稱

### 修復結果：

所有 5 個 server API 檔案已成功修復，底線命名變數全部改為駝峰命名，提升程式碼的一致性和可讀性。