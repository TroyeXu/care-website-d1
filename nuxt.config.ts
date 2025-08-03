import { defineNuxtConfig } from 'nuxt/config'

// 導入語言文件

export default defineNuxtConfig({
  // 添加相容性日期
  compatibilityDate: '2025-06-14',
  
  // Nuxt 4 新配置：啟用新的目錄結構
  future: {
    compatibilityVersion: 4,
  },

  // Cloudflare Workers 配置（支援 SSR）
  nitro: {
    preset: 'cloudflare-module',
    // 不預渲染，使用完整 SSR
    prerender: false,
    // 設定公共資源路徑
    publicAssets: [{
      baseURL: '/',
      dir: '.output/public',
      maxAge: 31536000 // 1 年快取
    }],
    // Workers 額外配置
    cloudflare: {
      wrangler: {
        configPath: './wrangler.toml'
      }
    }
  },

  // SSR 設定
  ssr: true,

  site: {
    url: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3333',
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3333',
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
    // Nuxt 4：更新 i18n 檔案路徑
    langDir: 'locales/',
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
