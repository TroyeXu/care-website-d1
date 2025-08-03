import { defineAppConfig } from '#imports'

export default defineAppConfig({
  // 應用程式配置
  title: 'DogFriend 專業看護媒合平台',
  description: '連結需要照護服務的家庭與專業看護人員',

  // 主題配置
  theme: {
    primaryColor: '#1976D2',
    dark: false,
  },

  // 功能開關
  features: {
    pwa: true,
    i18n: true,
    analytics: false,
  },

  // API 配置
  api: {
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3333',
  },
})
