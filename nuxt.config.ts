import { defineNuxtConfig } from 'nuxt/config'

// 導入語言文件

export default defineNuxtConfig({
  // 添加相容性日期
  compatibilityDate: '2025-06-14',

  // Nuxt 4 新配置：啟用新的目錄結構
  future: {
    compatibilityVersion: 4,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // TypeScript 設定
  typescript: {
    strict: false,
    typeCheck: false,
    shim: true,
  },

  // Cloudflare Workers 配置（支援混合渲染）
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare-module',
    // 預渲染靜態頁面
    prerender: {
      crawlLinks: true,
      routes: ['/', '/info/about', '/support/faq', '/support/contact', '/join'],
    },
    // 設定公共資源路徑
    publicAssets: [
      {
        baseURL: '/',
        dir: '.output/public',
        maxAge: 31536000, // 1 年快取
      },
    ],
    // Workers 額外配置
    cloudflare: {
      wrangler: {
        configPath: './wrangler.toml',
      },
    },
  },

  // 混合渲染設定
  ssr: true,

  // 路由規則設定
  routeRules: {
    // 靜態生成 (SSG) - 靜態內容頁面
    '/': { prerender: true },
    '/info/about': { prerender: true },
    '/support/faq': { prerender: true },
    '/support/contact': { prerender: true },
    '/join': { prerender: true },

    // 伺服器端渲染 (SSR) - 需要 SEO 的動態內容
    '/caregivers': { ssr: true, index: true },
    '/caregivers/**': { ssr: true, isr: 3600 }, // ISR: 每小時重新生成
    '/bookings': { ssr: true, index: true },
    '/bookings/**': { ssr: true },

    // 客戶端渲染 (SPA) - 需要高互動性的頁面
    '/auth/**': { ssr: false, prerender: false, index: false },
    '/booking/calculator': { ssr: false, prerender: false },
    '/user/**': { ssr: false, prerender: false, index: false },
    '/admin/**': { ssr: false, prerender: false, index: false },

    // API 路由不需要渲染
    '/api/**': { cors: true, headers: { 'cache-control': 's-maxage=60' } },
  },

  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3333',
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3333',
      bankAccount: {
        bankName: '台灣銀行',
        accountName: '護理服務平台有限公司',
        accountNumber: '123-456-789012',
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n',
    'nuxt-quasar-ui',
    '@nuxtjs/sitemap',
    '@vee-validate/nuxt',
  ],
  css: [
    'quasar/fonts',
    'quasar/animations',
    'quasar/icons',
    'quasar/css',
    '~/assets/global.scss',
  ],
  vite: {
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Care Calculator',
      short_name: 'CareCalc',
      description: 'Care service management and scheduling app',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: null,
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'start-page',
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'unsplash-images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'zh',
    locales: [
      {
        code: 'en',
        language: 'en',
        file: 'en.json',
        name: 'English',
        iso: 'en',
      },
      {
        code: 'zh',
        language: 'zh-TW',
        file: 'zh.json',
        name: '中文',
        iso: 'zh-TW',
      },
    ],
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    // Nuxt 4：更新 i18n 檔案路徑（相對於專案根目錄）
    langDir: '../i18n/locales/',
  },

  quasar: {
    // 啟用 Quasar 插件
    plugins: ['Notify', 'Dialog', 'Loading'],
    // 配置預設語言
    lang: 'zh-TW',
    // 配置圖標集
    iconSet: 'material-icons',
    // 配置預設組件屬性
    components: {
      defaults: {
        // 這裡可以設置 Quasar 組件的默認屬性
        QBtn: {
          dense: true,
          unelevated: true,
        },
        QInput: {
          outlined: true,
          dense: true,
        },
      },
    },
    // 品牌顏色配置
    config: {
      brand: {
        primary: '#1976D2',
        secondary: '#26A69A',
        accent: '#9C27B0',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
      },
      // 通知配置
      notify: {
        position: 'top-right',
        timeout: 3000,
      },
      // 加載配置
      loading: {
        delay: 400,
      },
    },
    // 導入額外的字體和圖標
    extras: {
      font: 'roboto-font',
      fontIcons: ['material-icons'],
      animations: 'all',
    },
    // 啟用 CSS 變量
    sassVariables: true,
  },

  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
})
