# Mock API 設定指南

## 🎯 概述

本專案已完整設定 Mock API 架構，讓您可以在不依賴後端服務的情況下進行前端開發。所有頁面預設使用 Mock API，並可以輕鬆切換到 Supabase。

## 🚀 快速開始

### 1. 啟動開發伺服器
```bash
npm run dev
```

### 2. 訪問 API 測試頁面
開啟瀏覽器訪問 `http://localhost:3000/demo/api-demo` 查看完整的 API 功能測試。

### 3. 切換 API 模式
在任何頁面使用 `<ApiModeToggle />` 元件或程式化切換：
```typescript
const { switchToMockApi, switchToRealApi } = useApiConfig()
```

## 📁 架構說明

### 核心檔案
- `composables/useApiConfig.ts` - 全局 API 配置管理
- `composables/useApiService.ts` - 統一 API 服務層
- `composables/useMockApi.ts` - Mock API 實作
- `utils/mockData.ts` - 模擬資料定義
- `plugins/api-config.client.ts` - 自動初始化插件

### 元件
- `components/ApiModeToggle.vue` - API 模式切換元件

### 頁面
- `pages/demo/api-demo.vue` - 完整的 API 測試介面

## 🔧 配置選項

### 環境變數
```bash
# .env
NUXT_PUBLIC_API_BASE_URL=https://your-api.supabase.co
NUXT_PUBLIC_FORCE_MOCK_API=false  # 強制使用 Mock API
```

### 程式化配置
```typescript
const { updateConfig } = useApiConfig()
updateConfig({
  useMockApi: true,
  timeout: 15000,
  retryCount: 3
})
```

## 🛠️ 使用方式

### 基本 API 調用
```typescript
// 在 Vue 元件中
const apiService = useApiService()

// 載入看護師列表
const caregivers = await apiService.getCaregivers()

// 建立預約
const booking = await apiService.createBooking(bookingData)

// 處理支付
const payment = await apiService.processPayment(paymentData)
```

### 在 Store 中使用
```typescript
// stores/caregivers.ts
export const useCaregiversStore = defineStore('caregivers', {
  actions: {
    async loadCaregivers() {
      const apiService = useApiService()
      const response = await apiService.getCaregivers()
      this.caregivers = response.data
    }
  }
})
```

## 📊 Mock 資料說明

### 看護師資料 (mockCaregivers)
- 6 位不同專長的看護師
- 完整的個人資料、技能、證照
- 真實的評分和定價資訊

### 用戶資料 (mockUsers)
- 3 個測試用戶帳號
- 不同的醫療背景和需求
- 完整的個人檔案資訊

### 預約資料 (mockBookings)
- 4 筆測試預約記錄
- 不同的服務類型和狀態
- 完整的患者資訊

### 評價資料 (mockReviews)
- 對應預約的評價記錄
- 真實的評分和評論內容

### 支付資料 (mockPayments)
- 對應預約的支付記錄
- 不同的支付方式和狀態

## 🔄 API 模式切換

### 自動模式
系統會自動檢測 Supabase 可用性：
- 如果 Supabase 可用且配置為使用真實 API → 使用真實 API
- 如果 Supabase 不可用或配置為使用 Mock → 使用 Mock API

### 手動切換
```typescript
// 切換到 Mock API
const { switchToMockApi } = useApiConfig()
switchToMockApi()

// 切換到真實 API
const { switchToRealApi } = useApiConfig()
switchToRealApi()
```

### 視覺化切換
使用 `<ApiModeToggle />` 元件提供使用者友善的切換介面。

## 🧪 測試功能

### API 測試工具
```typescript
import { testMockApiSetup, printTestResults } from '~/utils/testMockApi'

// 執行完整測試
const results = await testMockApiSetup()
printTestResults(results)
```

### 測試頁面
訪問 `/demo/api-demo` 查看：
- 認證功能測試
- 看護師資料操作
- 預約系統測試
- 支付流程測試
- 儀表板統計
- API 響應時間測試

## 🎯 開發建議

### 1. 開發階段
- 使用 Mock API 進行快速開發
- 利用 `/demo/api-demo` 測試 API 功能
- 使用 `ApiModeToggle` 元件驗證不同模式

### 2. 整合階段
- 逐步切換到真實 API
- 對比 Mock 和真實 API 的回應
- 確保資料格式一致性

### 3. 部署階段
- 根據環境自動選擇 API 模式
- 保留 Mock API 作為備援方案
- 監控 API 切換狀況

## 🔍 除錯技巧

### 檢查當前 API 模式
```typescript
const { isUsingMockApi, config } = useApiConfig()
console.log('使用 Mock API:', isUsingMockApi.value)
console.log('配置:', config.value)
```

### 查看 API 調用詳情
在開發模式下，所有 API 調用都會在控制台顯示詳細資訊。

### 錯誤處理
```typescript
try {
  const result = await apiService.getCaregivers()
} catch (error) {
  console.error('API 調用失敗:', error)
  // 系統會自動嘗試使用 Mock API
}
```

## 📝 注意事項

1. **資料持久性**: Mock API 的資料修改只在當前會話有效
2. **錯誤模擬**: Mock API 會隨機產生 5% 的錯誤來模擬真實環境
3. **延遲模擬**: 所有 Mock API 調用都有 500ms 的模擬延遲
4. **型別安全**: 所有 API 回應都有完整的 TypeScript 型別定義

## 🎉 總結

這個 Mock API 架構提供了：
- ✅ 獨立開發能力
- ✅ 無縫 API 切換
- ✅ 完整的測試工具
- ✅ 生產級的錯誤處理
- ✅ 優秀的開發者體驗

現在您可以專注於前端功能開發，無需等待後端 API 完成！