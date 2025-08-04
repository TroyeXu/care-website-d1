# 執行時錯誤修復筆記

## Q: 如何修復 "autoConfigureForEnvironment is not a function" 錯誤？

## A: 更新 plugin 使用正確的 composable 方法

### 錯誤原因：

`plugins/api-config.client.ts` 嘗試使用不存在的函數：

- `autoConfigureForEnvironment`
- `smartApiSelection`

但是 `useApiConfig` composable 實際上只提供了：

- `config`
- `updateConfig`
- `setMockDelay`
- `toggleDebug`
- `resetToDefaults`

### 解決步驟：

1. **修改 plugin 使用正確的方法**

   ```typescript
   // 原本的錯誤程式碼
   const { autoConfigureForEnvironment, smartApiSelection } = useApiConfig()
   autoConfigureForEnvironment()
   await smartApiSelection()

   // 修正後的程式碼
   const { resetToDefaults, config } = useApiConfig()
   resetToDefaults()
   ```

2. **修復 QTimeline 的 side prop 錯誤**

   ```vue
   <!-- 原本的錯誤程式碼 -->
   <q-timeline
     color="primary"
     layout="comfortable"
     side="alternate"
   ></q-timeline>
   ```

### 相關檔案：

- plugins/api-config.client.ts:4
- composables/useApiConfig.ts:14
- pages/index.vue:180

### 學習重點：

- 使用 composable 之前要先檢查它實際提供的方法
- Quasar 組件的 props 要符合文件規範
- plugin 中的錯誤會影響整個應用程式的初始化
- 錯誤訊息會告訴你問題發生的位置（如 `at api-config.client.ts:10:5`）

### 其他相關錯誤：

- **Hydration mismatch** - 通常是因為 server 和 client 渲染結果不一致
- **Invalid prop** - 組件使用了不支援的屬性
