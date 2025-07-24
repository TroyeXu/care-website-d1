export default defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp()
  
  if (!$auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  
  if (!$auth.isCaregiver) {
    throw createError({
      statusCode: 403,
      statusMessage: '此頁面僅限看護人員使用'
    })
  }
})