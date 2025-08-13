/// <reference types="nuxt" />

// 擴充 CaregiverFilter 介面
declare module '~/stores/caregivers' {
  interface CaregiverFilter {
    location?: string
    specialty?: string
    minPrice?: number
    maxPrice?: number
    experienceYears?: number
    sortBy?: string
    page?: number
    limit?: number
  }
}

// 宣告全域可用的函數（Nuxt auto-imports）
declare global {
  const defineNuxtRouteMiddleware: typeof import('#app')['defineNuxtRouteMiddleware']
  const navigateTo: typeof import('#app')['navigateTo']
  const useAuthStore: typeof import('~/stores/auth')['useAuthStore']
  const useCookie: typeof import('#app')['useCookie']
  const useRoute: typeof import('#app')['useRoute']
  const useRouter: typeof import('#app')['useRouter']
  const useState: typeof import('#app')['useState']
  const useAsyncData: typeof import('#app')['useAsyncData']
  const useFetch: typeof import('#app')['useFetch']
  const useNuxtData: typeof import('#app')['useNuxtData']
  const readonly: typeof import('vue')['readonly']
  const computed: typeof import('vue')['computed']
  const ref: typeof import('vue')['ref']
  const reactive: typeof import('vue')['reactive']
}

export {}