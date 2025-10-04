// 管理後台 Store
import { defineStore } from 'pinia'
import type {
  AdminUser,
  AdminLoginResponse,
  AdminMeResponse,
} from '~/types/admin'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface AdminState {
  currentAdmin: AdminUser | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  sidebarOpen: boolean
  notifications: Notification[]
}

export const useAdminStore = defineStore('admin', {
  state: (): AdminState => ({
    currentAdmin: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    sidebarOpen: true,
    notifications: [],
  }),

  getters: {
    isSuper: (state) => state.currentAdmin?.is_super || false,

    hasPermission: (state) => (permission: string) => {
      if (!state.currentAdmin) return false
      if (state.currentAdmin.is_super) return true

      const permissions = state.currentAdmin.permissions || []

      // 檢查完全匹配
      if (permissions.includes(permission)) return true

      // 檢查萬用字元權限
      const [resource, action] = permission.split('.')
      if (permissions.includes(`${resource}.*`)) return true
      if (permissions.includes('*')) return true

      return false
    },

    unreadNotifications: (state) =>
      state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await $fetch<AdminLoginResponse>(
          '/api/admin/auth/login',
          {
            method: 'POST',
            body: { email, password },
          },
        )

        if (response?.admin) {
          this.currentAdmin = response.admin
          this.isAuthenticated = true

          // 導航到管理後台
          await navigateTo('/admin/dashboard')

          return { success: true }
        }

        throw new Error('登入失敗')
      } catch (err: any) {
        this.error = err.data?.message || err.message || '登入失敗'
        this.isAuthenticated = false
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/admin/auth/logout', {
          method: 'POST',
        })
      } catch (err) {
        console.error('登出錯誤:', err)
      } finally {
        this.currentAdmin = null
        this.isAuthenticated = false
        await navigateTo('/admin/login')
      }
    },

    async checkAuth() {
      try {
        const response = await $fetch<AdminMeResponse>('/api/admin/auth/me')

        if (response?.admin) {
          this.currentAdmin = response.admin
          this.isAuthenticated = true
          return true
        }
      } catch {
        this.isAuthenticated = false
      }

      return false
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    addNotification(
      notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
    ) {
      this.notifications.unshift({
        ...notification,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
      })
    },

    markNotificationRead(id: string) {
      const notification = this.notifications.find((n) => n.id === id)
      if (notification) {
        notification.read = true
      }
    },

    markAllNotificationsRead() {
      this.notifications.forEach((n) => (n.read = true))
    },

    clearNotifications() {
      this.notifications = []
    },
  },
})
