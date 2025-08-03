export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  if (!authStore.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  
  if (!authStore.isCaregiver) {
    throw createError({
      statusCode: 403,
      statusMessage: '此頁面僅限看護人員使用'
    })
  }
})