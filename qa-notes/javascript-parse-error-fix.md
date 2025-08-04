# 修復 JavaScript 解析錯誤問題

## Q: 首頁出現 500 錯誤 "Error parsing JavaScript expression: Unexpected token, expected ","" 如何解決？

## A: 修復多處語法錯誤，包括 TypeScript 類型定義順序和 Vue 模板多行表達式

### 問題原因：
1. 在 `mockData.ts` 檔案中，`OldCaregiver` 介面在函數使用後才定義，造成 TypeScript 編譯錯誤
2. 多個 Vue 檔案中的 `@click` 事件處理器使用了多行表達式，但沒有用分號分隔語句

### 解決步驟：

1. **修復 TypeScript 類型定義順序**
   - 發現 `convertToNewCaregiver` 函數在第5行使用了 `OldCaregiver` 類型
   - 但 `OldCaregiver` 介面定義在第47行，造成順序錯誤
   - 將 `OldCaregiver` 介面定義移到檔案開頭，在使用前定義
   - 保留 `export type { Caregiver, Booking }` 語句，因為其他檔案需要導入這些類型

2. **修復 Vue 模板多行表達式**
   - 將多行 `@click` 表達式改為單行，使用分號分隔語句
   - 例如：`@click="statement1; statement2"`
   - 修復檔案：
     - app/pages/support/reviews.vue (2處)
     - app/pages/caregivers/[id].vue (1處)
     - app/app.vue (3處)

### 相關檔案：

- app/utils/mockData.ts:5 (函數使用類型的位置)
- app/utils/mockData.ts:20-38 (介面定義的新位置)
- app/utils/mockData.ts:46 (類型重新導出)

### 學習重點：

- TypeScript 中類型定義必須在使用前宣告
- 介面和類型應該按照依賴順序排列
- 移除導出語句前要確認是否有其他檔案依賴
- Vue 模板中的多行表達式必須使用分號分隔語句，不能只用換行
- JavaScript 解析錯誤通常指向語法或類型定義問題
- 錯誤訊息中的 "(3:20)" 表示第3行第20個字符的位置
- 使用正則表達式 `@\w+="[^"]*\n[^"]*"` 可以快速找到多行屬性值