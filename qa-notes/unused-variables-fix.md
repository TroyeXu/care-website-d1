# 未使用變數錯誤修復

## Q: 如何修復 Vue 組件和 TypeScript 檔案中的未使用變數錯誤？

## A: 根據變數類型採用不同的修復策略

### 解決步驟：

1. **檢查變數實際使用情況**
   - 分析程式碼確認變數是否真的未使用
   - 區分 template 中的使用和 script 中的使用

2. **修復策略**
   - **完全未使用的變數**: 直接刪除 import 和宣告
   - **函數參數未使用**: 在參數名前加上下劃線 (_)
   - **解構賦值未使用**: 使用下劃線重新命名
   - **emit 但實際有使用**: 檢查 template 中的 $emit 使用

3. **具體修復**
   - `app/components/PaymentForm.vue`: 刪除未使用的 `authStore` import
   - `app/components/common/StatCard.vue`: 恢復 `handleClick` 函數並在 template 中使用
   - `app/composables/useApiService.ts`: 將未使用參數重新命名為 `_paramName`

### 相關檔案：

- `/Users/troye/code/troye/new-care/app/components/PaymentForm.vue:176`
- `/Users/troye/code/troye/new-care/app/components/common/StatCard.vue:78-82`
- `/Users/troye/code/troye/new-care/app/composables/useApiService.ts:9,41,131,184,211,227,233,241,264`

### 學習重點：

- **emit 變數檢查**: Vue 中的 `defineEmits` 返回的 emit 函數如果在 template 中使用 `$emit` 則不算未使用
- **參數命名約定**: TypeScript 中未使用的參數應該以下劃線開頭
- **組件功能完整性**: 如果組件有 `clickable` 屬性，應該實際實現點擊功能
- **批量修復**: 使用 MultiEdit 工具可以高效修復多個檔案中的相似問題