export default defineNuxtRouteMiddleware((to) => {
  const { $auth } = useNuxtApp()
  
  if (!$auth.isAuthenticated) {
    return navigateTo('/auth/login')
  }
  
  if (!$auth.isPatient) {
    throw createError({
      statusCode: 403,
      statusMessage: '此頁面僅限照護需求者使用'
    })
  }
})