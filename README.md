# DogFriend 專業看護媒合平台 (Care Platform)

![Nuxt 3](https://img.shields.io/badge/Nuxt_3-00C58E?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Quasar](https://img.shields.io/badge/Quasar_2-1976D2?style=for-the-badge&logo=quasar&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Cloudflare D1](https://img.shields.io/badge/Cloudflare_D1-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

這是一個基於 **Nuxt 3 (Vue 3)** 與 **Cloudflare 全棧生態系** 打造的現代化照護媒合平台。專案結合了高效能的邊緣運算 (Edge Computing) 與細緻的 Material Design UI，旨在提供家庭與專業看護之間最流暢的媒合體驗。

## 🌟 核心價值與亮點 (Highlights)

*   **全棧 Serverless 架構**: 利用 Cloudflare Workers 與 D1 邊緣資料庫，實現零伺服器維護成本、低延遲與高擴展性。
*   **混合渲染優化 (Advanced Rendering)**: 
    *   **SEO 最佳化**: 針對列表頁使用 **SSR**，資訊頁使用 **SSG** 並自動生成 **Sitemap**。
    *   **極致互動**: 後台與費用試算器使用 **SPA** 提供流暢體驗。
    *   **快取策略**: 運用 **ISR** 定期更新動態資料，並對外部 API (如 Unsplash) 實施邊緣快取。
*   **智慧媒合演算法**: 內建基於權重 (Weighted Scoring) 的篩選邏輯 (`useMatchingAlgorithm.ts`)，快速匹配最合適的照護人員。
*   **動態試算系統**: 整合 GSAP 動態效果的即時費用計算器，支援多種服務時段與加成邏輯。
*   **PWA 支援**: 完整的離線快取機制與 Service Worker 配置，提供類原生 App 的安裝體驗。

## 🚀 核心功能 (Core Features)

### 👥 使用者端 (User Portal)
*   **智慧搜尋**: 多維度篩選看護（地區、證照、服務項目）。
*   **預約系統**: 完整的 O2O 預約流程、狀態追蹤與歷史紀錄。
*   **評價機制**: 真實的使用者回饋與評分系統。

### 🛡️ 看護端 (Caregiver Portal)
*   **個人品牌管理**: 自定義服務內容、薪資率與專業證照展示。
*   **排班控制台**: 即時接收預約請求與管理個人服務日曆。

### ⚙️ 管理後台 (Admin Dashboard)
*   **數據中心**: 使用 Chart.js 監控平台關鍵指標 (KPI)。
*   **權限體系**: 基於 JWT 的 RBAC 權限管理（管理員/看護/使用者）。
*   **系統維護**: 審核申請、處理爭議與全站配置管理。

## 🛠️ 技術棧 (Technical Stack)

| 領域 | 技術 |
| :--- | :--- |
| **核心框架** | Nuxt 4 (Future Mode), Vue 3 (Composition API) |
| **UI/UX** | Quasar Framework, SCSS, GSAP, Tsparticles |
| **狀態/驗證** | Pinia, Vee-Validate, Yup |
| **後端/資料庫** | Nitro Engine, Cloudflare D1 (SQLite) |
| **工程化** | TypeScript, ESLint, Prettier, Husky, Lint-staged |

## 📚 技術文檔 (Documentation)

*   [API 架構設計](docs/api-architecture.md)
*   [開發規範與指南](docs/development-guide.md)
*   [資料庫遷移紀錄 (Migrations)](database/migrations/)

## 📦 安裝與本地開發 (Setup)

```bash
# 1. 安裝依賴
npm install

# 2. 資料庫初始化 (Local D1)
npm run db:local && npm run db:seed

# 3. 執行資料庫遷移 (如有新變動)
npm run db:migrate

# 4. 建立管理員帳號
npx tsx scripts/create-admin.ts

# 5. 啟動開發環境
npm run dev
```

---
*Generated for Portfolio Showcase | 2026*