import { ref, computed } from 'vue'

export interface ApiConfig {
  useMockApi: boolean
  baseUrl: string
  timeout: number
  retryCount: number
  debug: boolean
}

// 全局 API 配置
const apiConfig = ref<ApiConfig>({
  useMockApi: true, // 預設使用 Mock API
  baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retryCount: 3,
  debug: true
})

export const useApiConfig = () => {
  const isUsingMockApi = computed(() => apiConfig.value.useMockApi)
  const isProduction = computed(() => process.env.NODE_ENV === 'production')
  
  // 更新配置
  const updateConfig = (newConfig: Partial<ApiConfig>) => {
    apiConfig.value = { ...apiConfig.value, ...newConfig }
    
    // 在開發模式下記錄配置變更
    if (apiConfig.value.debug && !isProduction.value) {
      console.log('🔧 API 配置已更新:', apiConfig.value)
    }
  }
  
  // 切換到 Mock API
  const switchToMockApi = () => {
    updateConfig({ useMockApi: true })
    if (apiConfig.value.debug) {
      console.log('🎭 已切換到 Mock API 模式')
    }
  }
  
  // 切換到真實 API
  const switchToRealApi = () => {
    updateConfig({ useMockApi: false })
    if (apiConfig.value.debug) {
      console.log('🌐 已切換到真實 API 模式')
    }
  }
  
  // 根據環境自動配置
  const autoConfigureForEnvironment = () => {
    if (isProduction.value) {
      // 生產環境預設使用真實 API，但可以透過環境變數覆蓋
      const forceMock = process.env.NUXT_PUBLIC_FORCE_MOCK_API === 'true'
      updateConfig({ 
        useMockApi: forceMock,
        debug: false 
      })
    } else {
      // 開發環境預設使用 Mock API
      updateConfig({ 
        useMockApi: true,
        debug: true 
      })
    }
  }
  
  // 重設為預設配置
  const resetToDefaults = () => {
    apiConfig.value = {
      useMockApi: true,
      baseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
      timeout: 10000,
      retryCount: 3,
      debug: !isProduction.value
    }
  }
  
  // 檢查 Supabase 可用性
  const checkSupabaseAvailability = async (): Promise<boolean> => {
    try {
      const { supabase } = useSupabase()
      const { data, error } = await supabase.auth.getSession()
      return !error
    } catch {
      return false
    }
  }
  
  // 智能 API 選擇（如果 Supabase 不可用則自動使用 Mock）
  const smartApiSelection = async () => {
    if (!isUsingMockApi.value) {
      const supabaseAvailable = await checkSupabaseAvailability()
      if (!supabaseAvailable) {
        console.warn('⚠️ Supabase 不可用，自動切換到 Mock API')
        switchToMockApi()
      }
    }
  }
  
  return {
    // 配置狀態
    config: computed(() => apiConfig.value),
    isUsingMockApi,
    isProduction,
    
    // 配置方法
    updateConfig,
    switchToMockApi,
    switchToRealApi,
    autoConfigureForEnvironment,
    resetToDefaults,
    
    // 智能功能
    checkSupabaseAvailability,
    smartApiSelection
  }
}