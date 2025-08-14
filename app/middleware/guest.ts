import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
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

  // 如果已登入，重定向到適當的頁面
  if (authStore.isAuthenticated && authToken.value) {
    // 根據用戶角色重定向到不同的頁面
    const redirectPath =
      authStore.userRole === 'caregiver'
        ? '/caregivers'
        : authStore.userRole === 'admin'
          ? '/admin'
          : '/bookings'

    return navigateTo(redirectPath, {
      replace: true,
      redirectCode: 302,
      external: false,
    })
  }
})
