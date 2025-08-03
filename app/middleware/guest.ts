export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuthStore()
  
  if (isAuthenticated) {
    return navigateTo('/user/dashboard', {
      replace: true,
      redirectCode: 302,
      external: false
    })
  }
})