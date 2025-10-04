import type { User } from '../../shared/types'

export interface AuthState {
  currentUser: User | null
  users: User[]
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  role: 'patient' | 'caregiver'
  profile?: {
    age?: number
    gender?: string
    address?: string
    emergencyContact?: string
    medicalHistory?: string[]
    preferences?: string[]
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    currentUser: null,
    users: [],
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    userRole: (state) => state.currentUser?.role,
    isPatient: (state) =>
      state.currentUser?.role === 'patient' ||
      state.currentUser?.role === 'user',
    isCaregiver: (state) => state.currentUser?.role === 'caregiver',
    isAdmin: (state) => state.currentUser?.role === 'admin',
    userProfile: (state) => (state.currentUser as any)?.profile,
    userName: (state) => state.currentUser?.name,
    userEmail: (state) => state.currentUser?.email,

    getUserById: (state) => (id: string) =>
      state.users.find((user) => user.id === id),

    getUsersByRole: (state) => (role: 'patient' | 'caregiver' | 'admin') =>
      state.users.filter((user) => user.role === role),
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        // 呼叫登入 API
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        })

        if (response && response.data?.user) {
          this.currentUser = response.data.user
          this.isAuthenticated = true

          // 儲存 token 到 cookie 或 localStorage
          if (response.data.token) {
            const cookie = useCookie('auth-token')
            cookie.value = response.data.token
          }
        } else {
          throw new Error('登入失敗')
        }
      } catch (err: any) {
        this.error = err.data?.message || err.message || '登入失敗'
        console.error('Login error:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
      }
    },

    async register(userData: RegisterData) {
      this.loading = true
      this.error = null

      try {
        // 呼叫註冊 API
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData,
        })

        if (response && response.data?.user) {
          this.currentUser = response.data.user
          this.isAuthenticated = true

          // 儲存 token
          if (response.data.token) {
            const cookie = useCookie('auth-token')
            cookie.value = response.data.token
          }

          return response.data.user
        } else {
          throw new Error('註冊失敗')
        }
      } catch (err: any) {
        this.error = err.data?.message || err.message || '註冊失敗'
        console.error('Registration error:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        // 呼叫登出 API
        await $fetch('/api/auth/logout', {
          method: 'POST',
        })

        // 清除本地狀態
        this.currentUser = null
        this.isAuthenticated = false
        this.error = null

        // 清除 token
        const cookie = useCookie('auth-token')
        cookie.value = null
      } catch (err: any) {
        console.error('Logout error:', err)
      } finally {
        this.loading = false
      }
    },

    updateProfile(updates: Partial<any>) {
      if (!this.currentUser) {
        throw new Error('用戶未登入')
      }

      try {
        // 直接更新本地資料
        ;(this.currentUser as any).profile = {
          ...(this.currentUser as any).profile,
          ...updates,
        }
        this.currentUser.updated_at = new Date().toISOString()

        const userIndex = this.users.findIndex(
          (u) => u.id === this.currentUser!.id,
        )
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }

        return this.currentUser
      } catch (err: any) {
        this.error = err.message || '更新失敗'
        console.error('Profile update error:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    async resetPassword(email: string) {
      this.loading = true
      this.error = null

      try {
        // 呼叫 API 發送重設密碼郵件
        const response = await $fetch<{ message?: string }>(
          '/api/auth/reset-password',
          {
            method: 'POST',
            body: { email },
          },
        )

        return {
          success: true,
          message: response?.message || '重設密碼郵件已發送',
        }
      } catch (err: any) {
        this.error = err.data?.message || err.message || '重設密碼失敗'
        console.error('Password reset error:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
      }
    },

    async checkAuthStatus() {
      try {
        // 呼叫 API 檢查認證狀態
        const response = await $fetch('/api/auth/me')

        if (response && response.user) {
          this.currentUser = response.user
          this.isAuthenticated = true
        } else {
          this.currentUser = null
          this.isAuthenticated = false
        }
      } catch (err: unknown) {
        console.error('Auth status check error:', err)
        this.currentUser = null
        this.isAuthenticated = false
      }
    },

    clearError() {
      this.error = null
    },

    switchRole(newRole: 'patient' | 'caregiver') {
      if (this.currentUser) {
        this.currentUser.role = newRole as any
        this.currentUser.updated_at = new Date().toISOString()

        const userIndex = this.users.findIndex(
          (u) => u.id === this.currentUser!.id,
        )
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }
      }
    },
  },
})
