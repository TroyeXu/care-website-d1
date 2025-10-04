// 管理員認證中介層
import { useAdminStore } from '~/stores/admin'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const adminStore = useAdminStore()

  // 如果是登入頁面，直接通過
  if (to.path === '/admin/login') {
    return
  }

  // 檢查是否已登入
  if (!adminStore.isAuthenticated) {
    // 嘗試從 cookie 恢復登入狀態
    const isAuthenticated = await adminStore.checkAuth()

    if (!isAuthenticated) {
      return navigateTo('/admin/login')
    }
  }

  // 檢查權限
  const requiredPermission = to.meta.permission as string
  if (requiredPermission && !adminStore.hasPermission(requiredPermission)) {
    throw createError({
      statusCode: 403,
      statusMessage: '您沒有權限訪問此頁面',
    })
  }
})
