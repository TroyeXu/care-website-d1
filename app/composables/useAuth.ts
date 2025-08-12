import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface User {
  id: string
  email: string
  name: string
  role: 'patient' | 'caregiver' | 'admin'
  created_at: string
}

interface AuthState {
  user: Ref<User | null>
  isAuthenticated: Ref<boolean>
  isLoading: Ref<boolean>
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
  role?: 'patient' | 'caregiver'
}

// 全域認證狀態
const user = ref<User | null>(null)
const isLoading = ref(false)
const isAuthenticated = computed(() => !!user.value)

export const useAuth = (): AuthState => {
  // 登入
  const login = async (email: string, password: string) => {
    isLoading.value = true
    try {
      const { data } = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      
      if (data?.user) {
        user.value = data.user
        // 導航到首頁或之前的頁面
        await navigateTo('/')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.data?.message || '登入失敗')
    } finally {
      isLoading.value = false
    }
  }

  // 註冊
  const register = async (data: RegisterData) => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: data,
      })
      
      if (response?.user) {
        user.value = response.user
        // 導航到首頁
        await navigateTo('/')
      }
    } catch (error: any) {
      console.error('Register error:', error)
      throw new Error(error.data?.message || '註冊失敗')
    } finally {
      isLoading.value = false
    }
  }

  // 登出
  const logout = async () => {
    isLoading.value = true
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
      user.value = null
      // 導航到首頁
      await navigateTo('/')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 獲取當前用戶
  const fetchUser = async () => {
    isLoading.value = true
    try {
      const { user: currentUser } = await $fetch('/api/auth/me')
      user.value = currentUser
    } catch (error) {
      console.error('Fetch user error:', error)
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    login,
    register,
    logout,
    fetchUser,
  }
}