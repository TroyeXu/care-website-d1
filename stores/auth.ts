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
        const { supabase } = useSupabase()
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })

        if (error) throw error

        const user = this.users.find(u => u.email === credentials.email)
        if (user) {
          this.currentUser = user
          this.isAuthenticated = true
        } else {
          throw new Error('用戶資料不存在')
        }
      } catch (err: any) {
        this.error = err.message
        console.error('Login error:', err)
        
        const user = this.users.find(u => u.email === credentials.email)
        if (user) {
          this.currentUser = user
          this.isAuthenticated = true
        } else {
          throw new Error('無效的登入憑證')
        }
      } finally {
        this.loading = false
      }
    },

    async register(userData: RegisterData) {
      this.loading = true
      this.error = null

      try {
        if (this.users.find(u => u.email === userData.email)) {
          throw new Error('此電子郵件已被註冊')
        }

        const { supabase } = useSupabase()
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.name,
              phone: userData.phone,
              role: userData.role
            }
          }
        })

        if (error) throw error

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role,
          avatar: `/images/users/default-${userData.role}.jpg`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          profile: userData.profile
        }

        this.users.push(newUser)
        this.currentUser = newUser
        this.isAuthenticated = true

        return newUser
      } catch (err: any) {
        this.error = err.message
        console.error('Registration error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        const { supabase } = useSupabase()
        const { error } = await supabase.auth.signOut()
        
        if (error) throw error
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
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', this.currentUser.id)
          .select()
          .single()

        if (error) throw error

        this.currentUser.profile = {
          ...this.currentUser.profile,
          ...updates
        }
        this.currentUser.updated_at = new Date().toISOString()

        const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }

        return this.currentUser
      } catch (err: any) {
        this.error = err.message
        console.error('Profile update error:', err)
        
        this.currentUser.profile = {
          ...this.currentUser.profile,
          ...updates
        }
        this.currentUser.updated_at = new Date().toISOString()

        const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id)
        if (userIndex !== -1) {
          this.users[userIndex] = { ...this.currentUser }
        }

        return this.currentUser
      }
    },

    async resetPassword(email: string) {
      this.loading = true
      this.error = null

      try {
        const { supabase } = useSupabase()
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        
        if (error) throw error
        
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
        const { supabase } = useSupabase()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const localUser = this.users.find(u => u.email === user.email)
          if (localUser) {
            this.currentUser = localUser
            this.isAuthenticated = true
          }
        } else {
          this.currentUser = null
          this.isAuthenticated = false
        }
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
