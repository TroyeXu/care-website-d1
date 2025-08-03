# Composables TypeScript 錯誤修復

## Q: 如何修復 composables 目錄中的所有 TypeScript 錯誤？

## A: 系統性地為每個 composable 添加適當的類型定義，包括函數參數、介面定義和型別註解

### 解決步驟：

1. **掃描並識別問題檔案**
   - 使用 `npx tsc --noEmit --skipLibCheck` 檢查 TypeScript 錯誤
   - 識別出主要問題在 useCareFilters.ts、useChart.ts、useCostCalculations.ts 等檔案

2. **修復 useCareFilters.ts**
   - 添加 `CareItem` 介面定義
   - 添加 `ActiveFilters` 介面定義  
   - 添加 `CareFiltersState` 介面定義
   - 修復 `applyFilter` 函數的類型處理邏輯
   - 修復 Set 展開運算符的相容性問題

3. **修復 useChart.ts**
   - 添加 `SelectedItem` 介面定義
   - 添加 `ChartCalculations` 介面定義
   - 修復 Chart.js 的 tooltip 回調函數類型
   - 修復可能為 undefined 的值的處理

4. **修復 useCostCalculations.ts**
   - 添加 `CostItem` 介面定義
   - 添加 `CostCalculationsState` 介面定義
   - 為所有函數參數添加型別註解

5. **修復 useApiService.ts**
   - 導入必要的類型定義
   - 替換所有 `any` 類型為具體的介面類型
   - 使用 `Omit` 工具類型排除自動生成的欄位

6. **修復 useBookingFilters.ts**
   - 導入 `Caregiver` 類型
   - 修復與 Caregiver 介面不匹配的屬性引用
   - 註解掉不存在的 `experience_years` 欄位引用

7. **修復 useParticleEffects.ts**
   - 添加參數和狀態的介面定義
   - 為函數參數添加適當的型別註解

### 相關檔案：
- `/Users/troye/code/troye/new-care/composables/useCareFilters.ts`
- `/Users/troye/code/troye/new-care/composables/useChart.ts`
- `/Users/troye/code/troye/new-care/composables/useCostCalculations.ts`
- `/Users/troye/code/troye/new-care/composables/useApiService.ts`
- `/Users/troye/code/troye/new-care/composables/useBookingFilters.ts`
- `/Users/troye/code/troye/new-care/composables/useParticleEffects.ts`

### 學習重點：

1. **介面設計原則**
   - 確保不同 composables 之間的介面一致性
   - 使用共享的類型定義避免重複

2. **TypeScript 最佳實踐**
   - 優先使用具體類型而非 `any`
   - 適當使用工具類型如 `Omit`、`Partial`
   - 處理可能為 undefined 的值

3. **相容性考量**
   - 使用 `Array.from(new Set())` 代替展開運算符以提高相容性
   - 注意不同版本 TypeScript 的差異

4. **漸進式修復策略**
   - 先修復核心檔案，再處理依賴檔案
   - 使用編譯器錯誤作為修復指南

5. **類型安全的好處**
   - 提前發現潛在的運行時錯誤
   - 改善開發體驗和代碼維護性
   - 確保 API 合約的一致性