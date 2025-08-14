import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore()
  const authToken = useCookie('auth-token')

  // 如果有 token 但還沒有 currentUser，嘗試獲取用戶資訊
  if (authToken.value && !authStore.currentUser) {
    try {
      await authStore.checkAuthStatus()
    } catch (error) {
      console.error('Failed to verify auth status:', error)
      // 清除無效的 token
      authToken.value = null
    }
  }

  // 檢查是否已認證
  if (!authStore.isAuthenticated || !authToken.value) {
    // 保存要訪問的頁面路徑
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
