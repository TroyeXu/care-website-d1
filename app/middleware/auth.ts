export default defineNuxtRouteMiddleware((to, from) => {
  // 獲取 auth store
  const { isAuthenticated } = useAuthStore()

  // 如果未登入，重定向到登入頁面
  if (!isAuthenticated) {
    // 保存要訪問的頁面路徑
    return navigateTo(`/auth/login?redirect=${to.fullPath}`)
  }
})
