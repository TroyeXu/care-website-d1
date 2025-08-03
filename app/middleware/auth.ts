export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return navigateTo('/auth/login', {
      replace: true,
      redirectCode: 302,
      external: false,
    })
  }
})
