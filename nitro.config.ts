import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'cloudflare-module',
  // 靜態資源處理
  publicAssets: [
    {
      baseURL: '/',
      dir: '.output/public',
    },
  ],
  // Cloudflare Workers 特定配置
  cloudflare: {
    pages: false,
    wrangler: {
      configPath: './wrangler.toml',
    },
  },
  // 確保正確處理路由
  routeRules: {
    '/**': { cors: true },
  },
})
