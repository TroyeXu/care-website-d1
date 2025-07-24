
// @ts-nocheck


export const localeCodes =  [
  "en",
  "zh"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => import("../locales/en.json" /* webpackChunkName: "locale__Users_troye_code_troye_new_care_locales_en_json" */), cache: true }],
  "zh": [{ key: "../locales/zh.json", load: () => import("../locales/zh.json" /* webpackChunkName: "locale__Users_troye_code_troye_new_care_locales_zh_json" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "language": "en",
      "name": "English",
      "files": [
        "/Users/troye/code/troye/new-care/locales/en.json"
      ]
    },
    {
      "code": "zh",
      "language": "zh-TW",
      "name": "中文",
      "files": [
        "/Users/troye/code/troye/new-care/locales/zh.json"
      ]
    }
  ],
  "defaultLocale": "zh",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "language": "en",
    "name": "English",
    "files": [
      {
        "path": "/Users/troye/code/troye/new-care/locales/en.json"
      }
    ]
  },
  {
    "code": "zh",
    "language": "zh-TW",
    "name": "中文",
    "files": [
      {
        "path": "/Users/troye/code/troye/new-care/locales/zh.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
