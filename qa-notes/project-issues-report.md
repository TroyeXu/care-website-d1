# 專案問題報告

## 執行日期

2025-08-02

## 總覽

- **TypeScript 錯誤**：234 個
- **ESLint 錯誤和警告**：2,712 個
- **需要立即修復的重點問題**：多個

## TypeScript 主要錯誤類型

### 1. 缺少型別定義 (約 60% 的錯誤)

- `mockData` 模組缺少導出的型別
- `useApiConfig` composable 缺少屬性
- 隱式 `any` 型別
- 缺少函數參數型別

### 2. 型別不匹配 (約 30% 的錯誤)

- 元件 props 型別與使用不符
- API 回傳值與預期型別不符
- Store 狀態型別定義不一致

### 3. 缺少導入或模組 (約 10% 的錯誤)

- 找不到模組聲明
- 缺少型別導入

## ESLint 主要問題類型

### 1. Prettier 格式化問題 (約 80% 的警告)

- 縮排不一致
- 行尾空格
- 換行問題
- 引號使用不一致

### 2. Vue 規範問題 (約 15% 的警告)

- 屬性順序不符合規範 (`vue/attributes-order`)
- 組件命名規範
- 模板語法問題

### 3. TypeScript ESLint 問題 (約 5% 的警告)

- 未使用的變數
- 使用 `any` 型別的警告

## 需要立即修復的問題

### 1. 尚未完成 Server 端改造的頁面

- `/pages/user/dashboard.vue`
- `/pages/booking/match.vue`
- `/pages/booking/schedule.vue`
- `/pages/caregivers/search.vue`
- `/pages/support/contact.vue`

### 2. 型別定義檔案

需要建立或更新以下型別定義：

- `/types/mockData.d.ts`
- `/types/api.d.ts`
- `/types/components.d.ts`

### 3. Composables 問題

- `useApiConfig` 缺少多個屬性
- `useApiService` 型別定義不完整

## 修復建議優先順序

### 高優先級

1. 修復所有 TypeScript 型別錯誤
2. 完成剩餘頁面的 Server 端改造
3. 建立完整的型別定義檔案

### 中優先級

1. 執行 Prettier 自動格式化修復大部分格式問題
2. 修復 Vue 屬性順序警告
3. 處理未使用的變數

### 低優先級

1. 優化 `any` 型別的使用
2. 改善程式碼組織結構
3. 增加單元測試

## 快速修復命令

```bash
# 自動修復大部分 ESLint 和格式化問題
npm run lint:fix
npm run format

# 檢查修復後的狀態
npm run check-all

# 單獨檢查各項
npm run type-check
npm run lint
npm run format:check
```

## 下一步行動建議

1. **立即執行自動修復**

   ```bash
   npm run format && npm run lint:fix
   ```

2. **修復 TypeScript 錯誤**

   - 從型別定義檔案開始
   - 逐步修復每個檔案的型別問題

3. **完成 Server 端改造**

   - 按照已完成頁面的模式
   - 建立對應的 API 路由
   - 更新頁面使用 `useFetch`

4. **建立測試**
   - 為關鍵功能撰寫單元測試
   - 確保改動不會破壞現有功能

## 預估工時

- 自動修復格式問題：10 分鐘
- 修復 TypeScript 錯誤：2-3 小時
- 完成 Server 端改造：1-2 小時
- 手動修復剩餘問題：1 小時
- **總計**：約 4-6 小時
