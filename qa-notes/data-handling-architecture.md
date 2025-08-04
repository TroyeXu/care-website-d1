## Q: 這套專案的資料處理架構是如何運作的？

## A: 專案採用了分層的資料處理架構，透過 Pinia 狀態管理、API Service 層和 Mock API 實現完整的資料流程。

### 解決步驟：

1. **狀態管理層 (Pinia Stores)**

   - 使用 Pinia 作為中央狀態管理
   - 每個業務模組都有獨立的 store
   - 所有 stores 位於 `/stores` 目錄下

2. **API 服務層 (Composables)**

   - `useApiService`: 統一的 API 呼叫介面
   - `useHttpClient`: 底層 HTTP 請求處理
   - `useMockApi`: Mock 資料模擬
   - `useApiConfig`: API 配置管理

3. **資料流程模式**
   - 支援 Mock API 和真實 API 自動切換
   - 當真實 API 失敗時自動回退到 Mock API
   - 提供重試機制和錯誤處理

### 相關檔案：

#### Stores (狀態管理)

- `stores/auth.ts:33-210` - 認證狀態管理
- `stores/bookings.ts:27-147` - 預約狀態管理
- `stores/caregivers.ts:32-246` - 照護員狀態管理
- `stores/payments.ts:11-30` - 支付狀態管理
- `stores/reviews.ts:9-30` - 評價狀態管理

#### API 服務層

- `composables/useApiService.ts:15-404` - API 服務統一介面
- `composables/useHttpClient.ts:22-262` - HTTP 客戶端
- `composables/useMockApi.ts:20-718` - Mock API 實現
- `composables/useApiConfig.ts:20-118` - API 配置管理

### 資料處理特點：

1. **雙模式支援**

   ```typescript
   // 自動判斷使用 Mock 或真實 API
   const callApi = async <T>(
     mockMethod: () => Promise<ApiResponse<T>>,
     realApiCall: () => Promise<T>,
     fallbackToMock: boolean = true
   ): Promise<T>
   ```

2. **統一的錯誤處理**

   - HTTP 客戶端提供標準化錯誤格式
   - 支援網路錯誤、超時、取消請求
   - 自動重試機制

3. **狀態管理模式**

   - Getters 提供計算屬性和過濾功能
   - Actions 處理非同步操作
   - 本地儲存整合（如 payments store）

4. **Mock API 特性**
   - 模擬真實 API 延遲（500ms）
   - 5% 機率模擬錯誤情況
   - 完整的 CRUD 操作支援

### 學習重點：

- **分層架構設計**: 清晰分離狀態管理、API 服務和業務邏輯
- **容錯機制**: 自動回退到 Mock API 確保開發不受阻
- **TypeScript 類型安全**: 完整的類型定義確保資料一致性
- **模組化設計**: 每個功能模組獨立管理，易於維護和擴展
