# Mock API 設定與使用 Q&A

## Q: 如何設定所有頁面優先使用 Mock API，並建立便於切換到 Supabase 的機制？

## A: 建立完整的 Mock API 架構，包含全局配置、智能切換和統一服務層

### 解決步驟：

1. **分析現有 API 架構**
   - 檢查現有的 Mock API 實作 (useMockApi.ts)
   - 確認統一服務層 (useApiService.ts) 的設計
   - 分析 stores 中的 API 調用模式

2. **建立全局 API 配置系統**
   ```typescript
   // composables/useApiConfig.ts
   const apiConfig = ref<ApiConfig>({
     useMockApi: true, // 預設使用 Mock API
     baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
     timeout: 10000,
     retryCount: 3,
     debug: true
   })
   ```

3. **整合配置到服務層**
   - 更新 useApiService 使用全局配置
   - 保持向後兼容的局部配置選項
   - 實作智能 API 選擇機制

4. **建立自動初始化插件**
   ```typescript
   // plugins/api-config.client.ts
   export default defineNuxtPlugin(async () => {
     const { autoConfigureForEnvironment, smartApiSelection } = useApiConfig()
     autoConfigureForEnvironment()
     await smartApiSelection()
   })
   ```

5. **開發 API 模式切換元件**
   - 建立 ApiModeToggle.vue 元件
   - 提供視覺化的切換介面
   - 包含配置資訊顯示和狀態回饋

### 相關檔案：
- composables/useApiConfig.ts (新建：全局 API 配置)
- composables/useApiService.ts:15-23 (更新：整合全局配置)
- plugins/api-config.client.ts (新建：自動初始化)
- components/ApiModeToggle.vue (新建：切換元件)
- pages/demo/api-demo.vue:7 (更新：使用新的切換元件)

### 學習重點：

#### 1. 全局配置管理
- 使用 composable 建立全局狀態
- 支援環境變數覆蓋預設配置
- 提供開發和生產環境的不同預設值

#### 2. 智能 API 選擇
- 自動檢測 Supabase 可用性
- 失敗時自動降級到 Mock API
- 提供詳細的狀態回饋給開發者

#### 3. 統一服務介面
- 所有 API 調用都通過 useApiService
- 透明切換 Mock 和真實 API
- 一致的錯誤處理和載入狀態

#### 4. 開發者體驗優化
- 即時 API 模式切換
- 詳細的配置資訊顯示
- 完整的 API 測試介面

### 使用方式：

#### 基本使用（使用全局配置）
```typescript
const apiService = useApiService() // 自動使用全局配置
```

#### 局部覆蓋配置
```typescript
const apiService = useApiService({ useMockApi: false }) // 強制使用真實 API
```

#### 動態切換 API 模式
```typescript
const { switchToMockApi, switchToRealApi } = useApiConfig()
switchToMockApi() // 切換到 Mock API
switchToRealApi() // 切換到真實 API
```

### 優勢特點：

1. **開發友善**：預設使用 Mock API，無需等待後端開發
2. **無縫切換**：一鍵切換 Mock 和真實 API，無需修改程式碼
3. **容錯機制**：真實 API 失敗時自動降級使用 Mock API
4. **配置靈活**：支援環境變數、全局配置和局部覆蓋
5. **除錯便利**：提供詳細的狀態資訊和操作回饋

### 環境變數設定：
```bash
# .env 檔案
NUXT_PUBLIC_API_BASE_URL=https://your-api.supabase.co
NUXT_PUBLIC_FORCE_MOCK_API=false  # 生產環境可設為 true 進行測試
```

這個設計確保了開發團隊可以在不依賴後端服務的情況下進行前端開發，同時也提供了平滑過渡到真實 API 的能力。