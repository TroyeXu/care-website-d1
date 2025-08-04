import { defineNuxtPlugin } from '#app'
import { useApiConfig } from '~/composables/useApiConfig'

export default defineNuxtPlugin(async () => {
  // 只在客戶端執行
  if (process.client) {
    const { resetToDefaults, config } = useApiConfig()

    // 根據環境自動配置（使用預設值）
    resetToDefaults()

    console.log('🚀 API 配置已初始化', config.value)
  }
})
