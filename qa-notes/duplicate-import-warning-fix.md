# 修正重複導入警告問題

## Q: Nuxt 開發伺服器顯示重複導入警告

編譯時出現警告訊息：
- Duplicated imports "Booking", the one from "/app/utils/mockData.ts" has been ignored
- Duplicated imports "Caregiver", the one from "/app/utils/mockData.ts" has been ignored

## A: 移除 mockData.ts 中的重複導出

### 解決步驟：

1. 檢查檔案間的導入關係
   - `mockData.ts` 從 stores 導入了 `Caregiver` 和 `Booking` 類型
   - 同時又在第46行重新導出這些類型

2. 移除重複的導出語句
   - 刪除 `export type { Caregiver, Booking }`
   - 保留註解說明類型來源

3. 重新啟動開發伺服器驗證
   - 警告訊息已消失
   - 編譯正常完成

### 相關檔案：

- app/utils/mockData.ts:46
- app/stores/bookings.ts:4
- app/stores/caregivers.ts:3

### 學習重點：

- 避免重新導出已經從其他模組導入的類型
- Nuxt 會自動偵測並警告重複的導入/導出
- 類型應該從原始定義處導入，而非透過中間檔案重新導出
