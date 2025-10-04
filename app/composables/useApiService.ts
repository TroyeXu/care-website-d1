/* eslint-disable require-await */
import { ref, computed } from 'vue'
import type { CaregiverFilter } from '~/stores/caregivers'

// 定義本地的型別
interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'user' | 'caregiver' | 'admin' | 'patient'
  avatar_url?: string
  email_verified?: boolean
  phone_verified?: boolean
  created_at: string
  updated_at: string
  profile?: any
}

interface Booking {
  id: string
  caregiver_id: number | string
  user_id: string
  service_type: 'hourly' | 'shift'
  service_date?: string
  start_date?: string
  end_date?: string
  start_time: string
  end_time?: string
  special_requests?: string
  total_cost?: number
  total_amount?: number
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  patient_info?: any
  created_at: string
  updated_at: string
}

interface Payment {
  id: string
  booking_id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  updated_at: string
}

interface Review {
  id: string
  caregiver_id: string | number
  user_id: string
  booking_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

export const useApiService = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // 錯誤處理
  const handleError = (err: any) => {
    error.value = err.data?.message || err.message || '發生錯誤'
    throw new Error(error.value)
  }

  const clearError = () => {
    error.value = null
  }

  // ===============================
  // 認證相關 API
  // ===============================

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const register = async (
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: userData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true
      await $fetch('/api/auth/logout', {
        method: 'POST',
      })
      return { success: true }
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 用戶相關 API
  // ===============================

  const getUserProfile = async (userId: string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/users/${userId}`)
      return response
    } catch (err) {
      // 如果 API 不存在，返回 null
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (
    userId: string,
    profileData: Partial<User['profile']>,
  ) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: profileData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 看護師相關 API
  // ===============================

  const getCaregivers = async (page: number = 1, limit: number = 10) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/caregivers', {
        query: { page, limit },
      })
      return {
        data: response.caregivers,
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
      }
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const searchCaregivers = async (query: string) => {
    try {
      isLoading.value = true
      // 使用篩選 API 進行搜尋
      const response = await $fetch('/api/caregivers', {
        query: {
          specialty: query,
          limit: 50,
        },
      })
      return response.caregivers
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getCaregiverById = async (id: number | string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/caregivers/${id}`)
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const filterCaregivers = async (filters: CaregiverFilter) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/caregivers', {
        query: {
          city: filters.location,
          specialty: filters.specialty,
          minRate: filters.minPrice,
          maxRate: filters.maxPrice,
          minRating: filters.minRating,
          experienceYears: filters.experienceYears,
          gender: filters.gender,
          sortBy: filters.sortBy,
          page: filters.page || 1,
          limit: filters.limit || 20,
        },
      })
      return response.caregivers
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getFeaturedCaregivers = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/caregivers', {
        query: {
          page: 1,
          limit: 6,
          sortBy: 'rating',
        },
      })
      return response.caregivers.slice(0, 6)
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getTopRatedCaregivers = async () => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/caregivers', {
        query: {
          page: 1,
          limit: 5,
          sortBy: 'rating',
          minRating: 4.5,
        },
      })
      return response.caregivers.slice(0, 5)
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 預約相關 API
  // ===============================

  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/bookings', {
        method: 'POST',
        body: bookingData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getBookingsByUser = async (userId: string) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/bookings', {
        query: { userId },
      })
      return response.bookings
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getBookingById = async (bookingId: string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/bookings/${bookingId}`)
      return response
    } catch (err) {
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PUT',
        body: { status },
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const cancelBooking = async (bookingId: string) => {
    return updateBookingStatus(bookingId, 'cancelled')
  }

  const confirmBooking = async (bookingId: string) => {
    return updateBookingStatus(bookingId, 'confirmed')
  }

  // ===============================
  // 支付相關 API
  // ===============================

  const processPayment = async (
    paymentData: Omit<Payment, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    try {
      isLoading.value = true
      const response = await $fetch<any>('/api/payments', {
        method: 'post',
        body: paymentData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getPaymentHistory = async (userId: string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/payments/history/${userId}`)
      return response
    } catch (err) {
      return []
    } finally {
      isLoading.value = false
    }
  }

  const getPaymentById = async (paymentId: string) => {
    return null
  }

  // ===============================
  // 評價相關 API
  // ===============================

  const createReview = async (
    reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/reviews', {
        method: 'POST',
        body: reviewData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getReviewsByCaregiver = async (caregiverId: number | string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/reviews/caregiver/${caregiverId}`)
      return response
    } catch (err) {
      return []
    } finally {
      isLoading.value = false
    }
  }

  const getReviewsByUser = async (userId: string) => {
    return []
  }

  // ===============================
  // 儀表板相關 API
  // ===============================

  const getDashboardStats = async (userId: string) => {
    try {
      isLoading.value = true
      const response = await $fetch(`/api/dashboard/stats/${userId}`)
      return response
    } catch (err) {
      return {
        totalBookings: 0,
        activeBookings: 0,
        completedBookings: 0,
        totalSpent: 0,
      }
    } finally {
      isLoading.value = false
    }
  }

  const getRecentActivity = async (userId: string) => {
    return []
  }

  const getNotifications = async (userId: string) => {
    return []
  }

  // ===============================
  // 搜尋相關 API
  // ===============================

  const getSearchSuggestions = async (query: string) => {
    return []
  }

  const getPopularSearchTerms = () => {
    return ['專業照護', '失智症', '復健', '夜間照護', '居家照護', '陪伴服務']
  }

  // ===============================
  // 媒合相關 API
  // ===============================

  const findMatches = async (criteria: CaregiverFilter) => {
    try {
      isLoading.value = true
      // 使用篩選 API 來媒合
      const response = await $fetch('/api/caregivers', {
        query: {
          city: criteria.location,
          specialty: criteria.specialty,
          minRate: criteria.minPrice,
          maxRate: criteria.maxPrice,
          minRating: criteria.minRating,
          experienceYears: criteria.experienceYears,
          gender: criteria.gender,
          sortBy: 'rating',
          limit: 10,
        },
      })
      return response.caregivers
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  const getRecommendations = async (userId: string) => {
    try {
      isLoading.value = true
      // 獲取推薦的看護師（高評分）
      const response = await $fetch('/api/caregivers', {
        query: {
          page: 1,
          limit: 3,
          sortBy: 'rating',
          minRating: 4.0,
        },
      })
      return response.caregivers
    } catch (err) {
      return []
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 聯絡表單相關 API
  // ===============================

  const submitContactForm = async (contactData: {
    name: string
    email: string
    phone?: string
    message: string
  }) => {
    try {
      isLoading.value = true
      const response = await $fetch('/api/contact', {
        method: 'POST',
        body: contactData,
      })
      return response
    } catch (err) {
      handleError(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    // 狀態
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // 認證
    login,
    register,
    logout,

    // 用戶
    getUserProfile,
    updateUserProfile,

    // 看護師
    getCaregivers,
    searchCaregivers,
    getCaregiverById,
    filterCaregivers,
    getFeaturedCaregivers,
    getTopRatedCaregivers,

    // 預約
    createBooking,
    getBookingsByUser,
    getBookingById,
    updateBookingStatus,
    cancelBooking,
    confirmBooking,

    // 支付
    processPayment,
    getPaymentHistory,
    getPaymentById,

    // 評價
    createReview,
    getReviewsByCaregiver,
    getReviewsByUser,

    // 儀表板
    getDashboardStats,
    getRecentActivity,
    getNotifications,

    // 搜尋
    getSearchSuggestions,
    getPopularSearchTerms,

    // 媒合
    findMatches,
    getRecommendations,

    // 聯絡表單
    submitContactForm,

    // 工具
    clearError,
  }
}
