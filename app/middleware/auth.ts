import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((_to, _from) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return navigateTo('/auth/login', {
      replace: true,
      redirectCode: 302,
      external: false,
    })
  }
})
