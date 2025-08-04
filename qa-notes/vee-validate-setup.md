# VeeValidate 表單驗證設定 Q&A

## Q: 如何在 Nuxt.js 專案中設定 VeeValidate 進行完整的表單驗證？

## A: 建立完整的表單驗證架構，包含 VeeValidate + Yup，提供強大的表單驗證功能

### 解決步驟：

1. **安裝和配置 VeeValidate**

   ```bash
   npm install @vee-validate/nuxt @vee-validate/yup yup
   ```

   在 `nuxt.config.ts` 中添加模組：

   ```typescript
   modules: [
     '@vee-validate/nuxt',
     // ... 其他模組
   ]
   ```

2. **建立驗證規則庫**

   ```typescript
   // utils/validationSchemas.ts
   import * as yup from 'yup'

   export const commonValidations = {
     email: yup
       .string()
       .required('電子郵件是必填的')
       .email('請輸入有效的電子郵件格式'),
     password: yup
       .string()
       .required('密碼是必填的')
       .min(8, '密碼至少需要 8 個字符')
       .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
         '密碼必須包含大小寫字母和數字',
       ),
     // ... 更多驗證規則
   }
   ```

3. **實作登入頁面表單驗證**

   - 使用 VeeValidate 的 `<Form>` 和 `<Field>` 元件
   - 整合 Quasar UI 組件
   - 提供測試帳號快速填入功能
   - 密碼顯示/隱藏切換
   - 忘記密碼功能

4. **實作註冊頁面表單驗證**

   - 多步驟表單設計（基本資訊、密碼、用戶類型、個人資料）
   - 密碼確認驗證
   - 可展開的選填個人資料區塊
   - 服務條款同意驗證
   - 醫療史和偏好多選功能

5. **建立測試頁面**
   - 專門的表單驗證測試頁面
   - 展示各種表單驗證功能
   - 即時驗證結果顯示
   - 驗證規則說明文件

### 相關檔案：

- utils/validationSchemas.ts (新建：完整的驗證規則庫)
- pages/auth/login.vue (重建：完整的登入頁面)
- pages/auth/register.vue (重建：完整的註冊頁面)
- pages/demo/form-validation.vue (新建：表單驗證測試頁面)
- nuxt.config.ts:21 (更新：添加 VeeValidate 模組)

### 學習重點：

#### 1. VeeValidate 整合

- **Form 元件**：提供表單層級的驗證狀態管理
- **Field 元件**：包裝輸入元件，提供驗證功能
- **Schema 驗證**：使用 Yup schema 進行聲明式驗證
- **TypeScript 支援**：完整的型別推斷和安全性

#### 2. 驗證規則設計

- **通用驗證**：可重用的驗證規則函數
- **複合驗證**：組合多個驗證規則
- **條件驗證**：根據其他欄位值進行驗證
- **自定義錯誤訊息**：中文錯誤訊息提升用戶體驗

#### 3. UI/UX 增強

- **即時驗證**：用戶輸入時即時顯示驗證結果
- **視覺回饋**：錯誤狀態的視覺化顯示
- **輔助功能**：密碼顯示切換、測試帳號填入
- **響應式設計**：適配不同螢幕尺寸

#### 4. 使用者體驗優化

- **分階段表單**：複雜表單的分段式設計
- **選填資訊**：可展開的非必填區塊
- **快速測試**：提供測試帳號快速體驗
- **錯誤處理**：友善的錯誤訊息和處理流程

### 驗證規則涵蓋範圍：

#### 基本驗證

- **必填欄位**：確保重要資訊不遺漏
- **格式驗證**：電子郵件、電話號碼格式
- **長度限制**：最小/最大字符數限制
- **類型驗證**：數字、字串、布林值驗證

#### 進階驗證

- **密碼強度**：複雜密碼規則
- **密碼確認**：確保密碼輸入一致
- **正則表達式**：自定義格式驗證
- **條件驗證**：根據其他欄位動態驗證

#### 業務邏輯驗證

- **年齡範圍**：符合服務對象要求
- **電話格式**：台灣手機/市話格式
- **地址格式**：完整地址資訊
- **緊急聯絡人**：重要安全資訊

### 表單設計特色：

#### 登入表單

- **簡潔設計**：專注核心登入功能
- **測試便利**：一鍵填入測試帳號
- **密碼找回**：完整的密碼重設流程
- **記住登入**：提升使用便利性

#### 註冊表單

- **分段設計**：降低表單複雜度
- **角色選擇**：患者/照護員不同註冊流程
- **個人資料**：可選的詳細資訊收集
- **條款同意**：法律要求的同意機制

#### 驗證測試

- **即時測試**：開發過程中的驗證工具
- **規則展示**：清楚的驗證規則說明
- **結果回饋**：視覺化的驗證結果
- **多表單測試**：涵蓋各種表單類型

### 開發建議：

#### 1. 驗證規則管理

```typescript
// 集中管理驗證規則
export const commonValidations = {
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
}

// 組合成完整的 schema
export const loginSchema = yup.object({
  email: commonValidations.email,
  password: commonValidations.password,
})
```

#### 2. 表單元件使用

```vue
<template>
  <Form :validation-schema="schema" @submit="handleSubmit">
    <Field name="email" v-slot="{ field, errorMessage }">
      <q-input
        v-bind="field"
        :error="!!errorMessage"
        :error-message="errorMessage"
      />
    </Field>
  </Form>
</template>
```

#### 3. 錯誤處理

```typescript
const handleSubmit = async (values) => {
  try {
    await submitForm(values)
  } catch (error) {
    // 統一的錯誤處理
    $q.notify({ type: 'negative', message: error.message })
  }
}
```

### 優勢特點：

1. **開發效率**：聲明式驗證減少重複程式碼
2. **使用者體驗**：即時驗證提供即時回饋
3. **維護性**：集中管理的驗證規則
4. **可擴展性**：模組化的驗證架構
5. **型別安全**：完整的 TypeScript 支援

這個表單驗證架構提供了企業級的驗證功能，確保資料完整性和使用者體驗的最佳平衡。
