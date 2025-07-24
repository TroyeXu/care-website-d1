export default defineNuxtPlugin(async () => {
  // 只在客戶端執行
  if (process.client) {
    const { autoConfigureForEnvironment, smartApiSelection } = useApiConfig()
    
    // 根據環境自動配置 API
    autoConfigureForEnvironment()
    
    // 智能選擇 API（檢查 Supabase 可用性）
    await smartApiSelection()
    
    console.log('🚀 API 配置已初始化')
  }
})