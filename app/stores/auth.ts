import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'user' | 'caregiver' | 'admin'
  avatar_url?: string
  email_verified: boolean
  phone_verified: boolean
  created_at: string
  updated_at: string
}

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
    users: mockUsers,
    isAuthenticated: false,
    loading: false,
    error: null,
  }),

  getters: {
    userRole: (state) => state.currentUser?.role,
    isPatient: (state) => state.currentUser?.role === 'patient',
    isCaregiver: (state) => state.currentUser?.role === 'caregiver',
    isAdmin: (state) => state.currentUser?.role === 'admin',
    userProfile: (state) => state.currentUser?.profile,
    userName: (state) => state.currentUser?.name,
    userEmail: (state) => state.currentUser?.email,

    getUserById: (state) => (id: string) =>
      state.users.find((user) => user.id === id),

    getUsersByRole: (state) => (role: 'patient' | 'caregiver' | 'admin') =>
      state.users.filter((user) => user.role === role),
  },

  actions: {
    loadMockData() {
      // 暫時移除 mock 資料，使用 API
      this.users = []
      this.currentUser = null
      this.isAuthenticated = false
    },

    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        // 呼叫登入 API
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })

        if (response.success && response.data) {
          this.currentUser = response.data.user
          this.isAuthenticated = true
        } else {
          throw new Error(response.error || '登入失敗')
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
        // 檢查 email 是否已存在
        if (this.users.find((u) => u.email === userData.email)) {
          throw new Error('此電子郵件已被註冊')
        }

        // 建立新用戶
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          role: userData.role,
          profile: userData.profile || {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        this.users.push(newUser)
        this.currentUser = newUser
        this.isAuthenticated = true

        return newUser
      } catch (err: any) {
        this.error = err.message || '註冊失敗'
        console.error('Registration error:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        // 直接清除本地狀態
        this.currentUser = null
        this.isAuthenticated = false
        this.error = null
      } finally {
        this.loading = false
      }
    },

    async updateProfile(updates: Partial<User['profile']>) {
      if (!this.currentUser) {
        throw new Error('用戶未登入')
      }

      try {
        // 直接更新本地資料
        this.currentUser.profile = {
          ...this.currentUser.profile,
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
        // 檢查 email 是否存在
        const user = this.users.find((u) => u.email === email)
        if (!user) {
          throw new Error('找不到此電子郵件帳號')
        }

        // 模擬發送重設密碼郵件
        console.log(`已發送重設密碼郵件至: ${email}`)
        return { success: true, message: '重設密碼郵件已發送' }
      } catch (err: any) {
        this.error = err.message || '重設密碼失敗'
        console.error('Password reset error:', err)
        throw new Error(this.error || '未知錯誤')
      } finally {
        this.loading = false
      }
    },

    async checkAuthStatus() {
      try {
        // 在 mock 環境中，簡單檢查本地狀態
        if (this.currentUser && this.isAuthenticated) {
          // 可以在這裡添加 token 驗證邏輯
          return
        }

        this.currentUser = null
        this.isAuthenticated = false
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
        this.currentUser.role = newRole
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
