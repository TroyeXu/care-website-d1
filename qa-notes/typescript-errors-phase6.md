# TypeScript 錯誤修復 - 第六階段

## Q: 如何持續修復剩餘的 TypeScript 錯誤？

## A: 繼續系統性地修復各類錯誤

### 修復進度

**開始時**: 127 個錯誤  
**結束時**: 93 個錯誤  
**修復數量**: 34 個錯誤 (26.8% 減少)

### 主要修復內容

#### 1. 頁面檔案修復
- **auth/login.vue**: 修復 definePageMeta 和 useSeoMeta import
- **booking/schedule.vue**: 修復 undefined 相關錯誤
- **caregivers/[id].vue**: 修復資料轉換和屬性檢查
- **caregivers/index.vue**: 修復 import 和型別定義

#### 2. Composables 修復
- **useMatchingAlgorithm.ts**: 修復 parseInt 和可能為 undefined 的值
- **useCostCalculator.ts**: 修復 parseInt 缺少基數參數
- **useChart.ts**: 移除不必要的 undefined 檢查
- **useMockApi.ts**: 修復型別比較和陣列存取

#### 3. 其他元件修復
- **BookingForm.vue**: 修復 unknown 型別處理
- **error.vue**: 修復 window 物件存取
- **booking/match.vue**: 修復 null 值檢查和型別斷言

### 修復技巧

1. **處理 undefined 值**:
   ```typescript
   // 錯誤
   const value = currentDate.value
   
   // 正確
   const value = currentDate.value || ''
   ```

2. **正確使用 parseInt**:
   ```typescript
   // 錯誤
   parseInt(value)
   
   // 正確
   parseInt(value, 10)
   ```

3. **處理可能的 null 值**:
   ```typescript
   // 錯誤
   minRating: number | null
   
   // 正確 - 檢查不是 null
   ...(value !== null && { minRating: value })
   ```

4. **處理 window 物件**:
   ```typescript
   // 錯誤
   window.history.back()
   
   // 正確
   if (typeof window !== 'undefined') {
     window.history.back()
   }
   ```

### 學習重點

1. **Task 工具的效率**: 使用 Task 工具批次修復多個檔案可以大幅提升效率
2. **型別斷言謹慎使用**: 只在確定型別時使用 `as any`
3. **防禦性編程**: 總是檢查可能的 undefined 或 null 值
4. **保持程式碼一致性**: 使用統一的錯誤處理模式

### 剩餘工作

還有 93 個錯誤需要修復，主要集中在：
- 其他頁面檔案
- 更多 composables
- 複雜的型別推斷問題

繼續按照相同的策略進行修復。