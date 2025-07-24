import { ref, computed } from 'vue'
import { useHttpClient } from './useHttpClient'
import { useApiRoutes } from './useApiRoutes'
import { useMockApi } from './useMockApi'
import { useApiConfig } from './useApiConfig'
import type { ApiResponse } from './useMockApi'

export interface ApiServiceConfig {
  useMockApi: boolean
  baseUrl?: string
  timeout?: number
  retryCount?: number
}

export const useApiService = (config?: Partial<ApiServiceConfig>) => {
  const httpClient = useHttpClient()
  const mockApi = useMockApi()
  const { routes } = useApiRoutes()
  const { config: globalConfig, isUsingMockApi: globalIsUsingMockApi } = useApiConfig()
  
  // 如果提供了局部配置，則使用局部配置，否則使用全局配置
  const serviceConfig = ref(config ? { ...globalConfig.value, ...config } : globalConfig.value)
  const isUsingMockApi = computed(() => config ? serviceConfig.value.useMockApi : globalIsUsingMockApi.value)

  // 統一的 API 呼叫方法
  const callApi = async <T>(
    mockMethod: () => Promise<ApiResponse<T>>,
    realApiCall: () => Promise<T>,
    fallbackToMock: boolean = true
  ): Promise<T> => {
    if (isUsingMockApi.value) {
      const mockResponse = await mockMethod()
      
      if (mockResponse.success) {
        return mockResponse.data!
      } else {
        throw new Error(mockResponse.error || 'Mock API 錯誤')
      }
    }

    try {
      return await realApiCall()
    } catch (error) {
      if (fallbackToMock) {
        console.warn('Real API failed, falling back to mock API:', error)
        const mockResponse = await mockMethod()
        
        if (mockResponse.success) {
          return mockResponse.data!
        } else {
          throw new Error(mockResponse.error || 'Mock API 錯誤')
        }
      }
      
      throw error
    }
  }

  // ===============================
  // 認證相關 API
  // ===============================

  const login = async (email: string, password: string) => {
    return callApi(
      () => mockApi.loginUser(email, password),
      () => httpClient.post(routes.auth.login, { email, password })
    )
  }

  const register = async (userData: any) => {
    return callApi(
      () => mockApi.registerUser(userData),
      () => httpClient.post(routes.auth.register, userData)
    )
  }

  const logout = async () => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.post(routes.auth.logout)
    )
  }

  // ===============================
  // 用戶相關 API
  // ===============================

  const getUserProfile = async (userId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.users.byId(userId))
    )
  }

  const updateUserProfile = async (userId: string, profileData: any) => {
    return callApi(
      () => mockApi.updateUserProfile(userId, profileData),
      () => httpClient.put(routes.users.updateProfile, profileData)
    )
  }

  // ===============================
  // 看護師相關 API
  // ===============================

  const getCaregivers = async (page: number = 1, limit: number = 10) => {
    return callApi(
      () => mockApi.getCaregivers(page, limit),
      () => httpClient.get(routes.caregivers.list, { page, limit })
    )
  }

  const searchCaregivers = async (query: string) => {
    return callApi(
      () => mockApi.searchCaregivers(query),
      () => httpClient.get(routes.caregivers.search, { q: query })
    )
  }

  const getCaregiverById = async (id: number) => {
    return callApi(
      () => mockApi.getCaregiverById(id),
      () => httpClient.get(routes.caregivers.byId(id))
    )
  }

  const filterCaregivers = async (filters: any) => {
    return callApi(
      () => mockApi.filterCaregivers(filters),
      () => httpClient.post(routes.caregivers.filter, filters)
    )
  }

  const getFeaturedCaregivers = async () => {
    return callApi(
      () => mockApi.getCaregivers(1, 6),
      () => httpClient.get(routes.caregivers.featured)
    )
  }

  const getTopRatedCaregivers = async () => {
    return callApi(
      () => mockApi.getCaregivers(1, 5),
      () => httpClient.get(routes.caregivers.topRated)
    )
  }

  // ===============================
  // 預約相關 API
  // ===============================

  const createBooking = async (bookingData: any) => {
    return callApi(
      () => mockApi.createBooking(bookingData),
      () => httpClient.post(routes.bookings.create, bookingData)
    )
  }

  const getBookingsByUser = async (userId: string) => {
    return callApi(
      () => mockApi.getBookingsByUser(userId),
      () => httpClient.get(routes.bookings.userBookings(userId))
    )
  }

  const getBookingById = async (bookingId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.bookings.byId(bookingId))
    )
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, status as any),
      () => httpClient.patch(routes.bookings.byId(bookingId), { status })
    )
  }

  const cancelBooking = async (bookingId: string) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, 'cancelled'),
      () => httpClient.post(routes.bookings.cancel(bookingId))
    )
  }

  const confirmBooking = async (bookingId: string) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, 'confirmed'),
      () => httpClient.post(routes.bookings.confirm(bookingId))
    )
  }

  // ===============================
  // 支付相關 API
  // ===============================

  const processPayment = async (paymentData: any) => {
    return callApi(
      () => mockApi.processPayment(paymentData),
      () => httpClient.post(routes.payments.process, paymentData)
    )
  }

  const getPaymentHistory = async (userId: string) => {
    return callApi(
      () => mockApi.getPaymentHistory(userId),
      () => httpClient.get(routes.payments.history, { userId })
    )
  }

  const getPaymentById = async (paymentId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.payments.byId(paymentId))
    )
  }

  // ===============================
  // 評價相關 API
  // ===============================

  const createReview = async (reviewData: any) => {
    return callApi(
      () => mockApi.createReview(reviewData),
      () => httpClient.post(routes.reviews.create, reviewData)
    )
  }

  const getReviewsByCaregiver = async (caregiverId: number) => {
    return callApi(
      () => mockApi.getReviewsByCaregiver(caregiverId),
      () => httpClient.get(routes.reviews.byCaregiver(caregiverId))
    )
  }

  const getReviewsByUser = async (userId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.reviews.byUser(userId))
    )
  }

  // ===============================
  // 儀表板相關 API
  // ===============================

  const getDashboardStats = async (userId: string) => {
    return callApi(
      () => mockApi.getDashboardStats(userId),
      () => httpClient.get(routes.dashboard.stats, { userId })
    )
  }

  const getRecentActivity = async (userId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.dashboard.recentActivity, { userId })
    )
  }

  const getNotifications = async (userId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.notifications.list, { userId })
    )
  }

  // ===============================
  // 搜尋相關 API
  // ===============================

  const getSearchSuggestions = async (query: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.search.suggestions, { q: query })
    )
  }

  const getPopularSearchTerms = async () => {
    return callApi(
      () => Promise.resolve({ success: true, data: ['專業照護', '失智症', '復健', '夜間照護'] }),
      () => httpClient.get(routes.search.popular)
    )
  }

  // ===============================
  // 媒合相關 API
  // ===============================

  const findMatches = async (criteria: any) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.post(routes.matching.findMatches, criteria)
    )
  }

  const getRecommendations = async (userId: string) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.matching.getRecommendations, { userId })
    )
  }

  // ===============================
  // 聯絡表單相關 API
  // ===============================

  const submitContactForm = async (contactData: any) => {
    return callApi(
      () => Promise.resolve({ 
        success: true, 
        data: { id: `contact-${Date.now()}`, ...contactData, created_at: new Date().toISOString() },
        message: '您的訊息已成功送出，我們會盡快回覆您' 
      }),
      () => httpClient.post('/api/contact', contactData)
    )
  }

  // ===============================
  // 設定相關
  // ===============================

  const switchToMockApi = () => {
    serviceConfig.value.useMockApi = true
  }

  const switchToRealApi = () => {
    serviceConfig.value.useMockApi = false
  }

  const updateConfig = (newConfig: Partial<ApiServiceConfig>) => {
    serviceConfig.value = { ...serviceConfig.value, ...newConfig }
  }

  return {
    // 狀態
    isLoading: computed(() => httpClient.isLoading.value || mockApi.isLoading.value),
    error: computed(() => httpClient.error.value || mockApi.error.value),
    isUsingMockApi,
    
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
    
    // 設定
    switchToMockApi,
    switchToRealApi,
    updateConfig,
    
    // 工具
    clearError: () => {
      httpClient.clearError()
      mockApi.clearError()
    }
  }
}