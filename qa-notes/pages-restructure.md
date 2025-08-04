# Pages 目錄結構優化 Q&A

## Q: 如何優化 pages 目錄的結構，讓平坦的檔案結構變得更有組織性？

## A: 根據功能分類建立分層的目錄結構，讓頁面更好管理與維護

### 解決步驟：

1. **分析現有目錄結構**

   - 使用 LS 工具檢視現有的 pages 目錄
   - 識別所有的頁面檔案和現有的子目錄

2. **規劃新的目錄結構**

   - auth/: 認證相關頁面 (login, register)
   - user/: 使用者功能頁面 (dashboard, profile, settings)
   - caregivers/: 照護者相關頁面 (index, [id], search)
   - booking/: 預訂相關頁面 (calculator, match, schedule, payments)
   - info/: 資訊頁面 (about, advantages, guide, pricing, services, safety, subsidy)
   - content/: 內容頁面 (blog, resources)
   - support/: 支援頁面 (contact, reviews)
   - demo/: 示範頁面 (api-demo)

3. **建立新目錄並移動檔案**

   ```bash
   mkdir -p auth user/profile user/settings booking info content support demo
   mv login.vue register.vue auth/
   mv dashboard.vue user/
   mv search.vue caregivers/
   mv calculator.vue match.vue schedule.vue payments.vue booking/
   mv about.vue advantages.vue guide.vue pricing.vue services.vue safety.vue subsidy.vue info/
   mv blog.vue resources.vue content/
   mv contact.vue reviews.vue support/
   mv api-demo.vue demo/
   ```

4. **更新所有路由引用**
   - 搜尋專案中所有對舊路徑的引用
   - 更新導航選單 (app.vue, layouts/default.vue)
   - 更新程式碼中的路由跳轉 (dashboard.vue, middleware 等)

### 相關檔案：

- pages/ 目錄的完整重新組織
- app.vue:17-23, 78-84 (導航選單更新)
- layouts/default.vue (導航選單更新)
- pages/user/dashboard.vue (功能連結更新)
- middleware/\*.ts (認證重導向更新)

### 學習重點：

- Nuxt.js 的檔案路由系統會自動對應目錄結構
- 移動頁面檔案後需要更新所有對該路由的引用
- 良好的目錄結構有助於程式碼維護和協作開發
- 使用功能分類來組織頁面比平坦結構更容易理解和維護

### 新的目錄結構優點：

- **更清晰的功能分組**：相關功能的頁面放在同一目錄下
- **更容易維護**：修改特定功能時可快速找到相關檔案
- **更好的擴展性**：新增頁面時有明確的歸類標準
- **團隊協作友善**：其他開發者能快速理解專案結構
