import { ref, computed } from 'vue'

export interface ApiConfig {
  mockDelay: number
  debug: boolean
  baseUrl: string
  timeout: number
  retryCount: number
}

// 全局 API 配置
const apiConfig = ref<ApiConfig>({
  mockDelay: 300, // Mock API 延遲時間
  debug: true,
  baseUrl: '/api',
  timeout: 30000,
  retryCount: 3
})

// 使用 Mock API 的狀態
const isUsingMockApi = ref(true)

export const useApiConfig = () => {
  const isProduction = computed(() => process.env.NODE_ENV === 'production')
  
  // 更新配置
  const updateConfig = (newConfig: Partial<ApiConfig>) => {
    apiConfig.value = { ...apiConfig.value, ...newConfig }
    
    // 在開發模式下記錄配置變更
    if (apiConfig.value.debug && !isProduction.value) {
      console.log('🔧 Mock API 配置已更新:', apiConfig.value)
    }
  }
  
  // 設定 Mock 延遲
  const setMockDelay = (delay: number) => {
    updateConfig({ mockDelay: delay })
  }
  
  // 切換除錯模式
  const toggleDebug = () => {
    updateConfig({ debug: !apiConfig.value.debug })
  }
  
  // 重設為預設配置
  const resetToDefaults = () => {
    apiConfig.value = {
      mockDelay: 300,
      debug: !isProduction.value,
      baseUrl: '/api',
      timeout: 30000,
      retryCount: 3
    }
    isUsingMockApi.value = true
  }
  
  // 切換到 Mock API
  const switchToMockApi = () => {
    isUsingMockApi.value = true
    updateConfig({ baseUrl: '/api' })
    if (apiConfig.value.debug) {
      console.log('🔄 已切換到 Mock API 模式')
    }
  }
  
  // 切換到真實 API
  const switchToRealApi = () => {
    isUsingMockApi.value = false
    updateConfig({ baseUrl: process.env.SUPABASE_URL || '/api' })
    if (apiConfig.value.debug) {
      console.log('☁️ 已切換到真實 API 模式')
    }
  }
  
  // 智慧 API 選擇
  const smartApiSelection = async () => {
    if (isProduction.value) {
      // 生產環境優先使用真實 API
      switchToRealApi()
    } else {
      // 開發環境預設使用 Mock API
      switchToMockApi()
    }
  }
  
  return {
    // 配置狀態
    config: computed(() => apiConfig.value),
    isProduction,
    isUsingMockApi: computed(() => isUsingMockApi.value),
    
    // 配置方法
    updateConfig,
    setMockDelay,
    toggleDebug,
    resetToDefaults,
    switchToMockApi,
    switchToRealApi,
    smartApiSelection
  }
}