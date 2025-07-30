import { defineStore } from 'pinia'
import { mockUsers, type User } from '~/utils/mockData'

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
    error: null
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
      state.users.find(user => user.id === id),
      
    getUsersByRole: (state) => (role: 'patient' | 'caregiver' | 'admin') =>
      state.users.filter(user => user.role === role)
  },

  actions: {
    loadMockData() {
      this.users = mockUsers
      this.currentUser = mockUsers[0]
      this.isAuthenticated = true
    },

    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        const { data } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })

        this.currentUser = data.user
        this.isAuthenticated = true
        
        // 更新本地用戶列表
        const userIndex = this.users.findIndex(u => u.id === data.user.id)
        if (userIndex !== -1) {
          this.users[userIndex] = data.user
        } else {
          this.users.push(data.user)
        }
      } catch (err: any) {
        this.error = err.data?.message || err.message || '登入失敗'
        console.error('Login error:', err)
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async register(userData: RegisterData) {
      this.loading = true
      this.error = null

      try {
        const { data } = await $fetch('/api/auth/register', {
          method: 'POST',
          body: userData
        })

        this.currentUser = data.user
        this.isAuthenticated = true
        this.users.push(data.user)

        return data.user
      } catch (err: any) {
        this.error = err.data?.message || err.message || '註冊失敗'
        console.error('Registration error:', err)
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        await $fetch('/api/auth/logout', {
          method: 'POST'
        })
      } catch (err: any) {
        console.error('Logout error:', err)
      } finally {
        this.currentUser = null
        this.isAuthenticated = false
        this.loading = false
        this.error = null
      }
    },

    async updateProfile(updates: Partial<User['profile']>) {
      if (!this.currentUser) {
        throw new Error('用戶未登入')
      }

      try {
        const updatedUser = await $fetch(`/api/users/${this.currentUser.id}`, {
          method: 'PUT',
          body: { profile: updates }
        })

        this.currentUser = updatedUser
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }

        return this.currentUser
      } catch (err: any) {
        this.error = err.data?.message || err.message || '更新失敗'
        console.error('Profile update error:', err)
        throw new Error(this.error)
      }
    },

    async resetPassword(email: string) {
      this.loading = true
      this.error = null

      try {
        // 模擬密碼重設功能
        return { message: '密碼重設信件已寄出' }
      } catch (err: any) {
        this.error = err.message
        console.error('Password reset error:', err)
        throw err
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
      } catch (err: any) {
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
        
        const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }
      }
    }
  }
})
