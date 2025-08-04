# 簡化登入系統設定

## Q: 如何設定簡單的測試登入系統，不需要第三方認證？

## A: 建立固定測試帳號並簡化登入流程

### 實作內容：

1. **移除第三方登入選項**
   - 刪除 Google 和 Facebook 登入按鈕
   - 簡化登入頁面，專注於帳號密碼登入

2. **設定測試帳號**
   ```javascript
   // 患者帳號
   email: test@example.com
   password: test123
   
   // 看護員帳號
   email: caregiver@example.com
   password: test123
   ```

3. **建立簡單的 API 端點**
   - `/api/auth/login.post.ts` - 處理登入驗證
   - `/api/auth/register.post.ts` - 處理註冊
   - `/api/auth/reset-password.post.ts` - 處理密碼重設

4. **優化使用者體驗**
   - 測試帳號資訊預設展開顯示
   - 點擊測試帳號可自動填入登入表單
   - 移除開發環境檢查，讓測試帳號永遠可見

### 相關檔案：

- app/pages/auth/login.vue:151 (測試帳號展示區塊)
- app/stores/auth.ts:70-183 (登入邏輯)
- server/api/auth/login.post.ts (登入 API)
- server/api/auth/register.post.ts (註冊 API)
- server/api/auth/reset-password.post.ts (密碼重設 API)

### 修復的其他問題：

1. **Footer 圖標排版**
   - 移除 `inline-label` 屬性
   - 確保圖標在上、文字在下的排版

2. **評價頁面 undefined 錯誤**
   - 使用可選鏈操作符處理可能為空的陣列
   - 提供預設值避免錯誤

### 學習重點：

- 測試環境可以使用硬編碼的帳號簡化開發流程
- 使用可選鏈操作符 `?.` 處理可能為 undefined 的資料
- 簡單的 API 端點可以模擬真實的認證流程
- 良好的錯誤處理可以提升使用者體驗