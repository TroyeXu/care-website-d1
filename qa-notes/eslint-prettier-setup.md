# ESLint 和 Prettier 設置筆記

## Q: 如何為 Nuxt 3 + Vue 3 + TypeScript 專案設置 ESLint 和 Prettier？

## A: 建立完整的程式碼品質工具鏈

### 設置步驟：

1. **建立 ESLint 配置** (`.eslintrc.js`)

   - 使用 `@nuxtjs/eslint-config-typescript` 預設配置
   - 添加 Vue 3 推薦規則
   - 整合 Prettier
   - 設定 TypeScript 相關規則

2. **建立 Prettier 配置** (`.prettierrc.json`)

   - 設定單引號、無分號
   - 設定縮排為 2 空格
   - 針對不同檔案類型設定解析器

3. **更新忽略檔案**

   - `.eslintignore` - 排除建置目錄和自動生成的檔案
   - `.prettierignore` - 排除相同的檔案，加上 lock 檔案

4. **VS Code 設定** (`.vscode/settings.json`)

   - 儲存時自動格式化
   - 儲存時自動修復 ESLint 錯誤
   - 設定預設格式化工具為 Prettier

5. **新增 npm scripts**
   ```json
   {
     "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
     "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.vue --fix",
     "format": "prettier --write \"**/*.{js,jsx,ts,tsx,vue,html,css,scss,json,md}\"",
     "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,vue,html,css,scss,json,md}\"",
     "type-check": "nuxt typecheck",
     "check-all": "npm run type-check && npm run lint && npm run format:check"
   }
   ```

### 使用方式：

1. **檢查程式碼品質**

   ```bash
   npm run lint          # 檢查 ESLint 錯誤
   npm run format:check  # 檢查格式問題
   npm run type-check    # 檢查 TypeScript 類型
   npm run check-all     # 執行所有檢查
   ```

2. **修復問題**
   ```bash
   npm run lint:fix  # 自動修復 ESLint 錯誤
   npm run format    # 自動格式化所有檔案
   ```

### 主要規則設定：

1. **Vue 規則**

   - 元件名稱使用 PascalCase
   - 模板中的標籤順序：template → script → style
   - 關閉多字元件名稱限制（適用於頁面）

2. **TypeScript 規則**

   - 允許使用 `any`（但會警告）
   - 未使用變數會報錯（除了 `_` 開頭的參數）
   - 關閉明確的函數返回類型要求

3. **格式化規則**
   - 使用單引號
   - 不使用分號
   - 行尾逗號（trailing comma）
   - 縮排 2 空格
   - 行寬限制 80 字元

### VS Code 擴充套件需求：

- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
- Volar (`Vue.volar`)

### 相關檔案：

- .eslintrc.js - ESLint 主要配置
- .prettierrc.json - Prettier 格式化配置
- .editorconfig - 編輯器通用配置
- .vscode/settings.json - VS Code 專案設定
- package.json - npm scripts

### 學習重點：

- ESLint 負責程式碼品質檢查（錯誤、最佳實踐）
- Prettier 負責程式碼格式化（風格統一）
- 兩者可以很好地整合使用
- 使用 `eslint-config-prettier` 避免規則衝突
- 設定編輯器自動化可以大幅提升開發效率
