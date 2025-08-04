import { computed } from 'vue'
import { useMockApi } from './useMockApi'
import type { User, Review, Payment, Booking } from '~/utils/mockData'
import type { CaregiverFilter } from '~/stores/caregivers'

export const useApiService = () => {
  const mockApi = useMockApi()

  // ===============================
  // 認證相關 API
  // ===============================

  const login = async (email: string, password: string) => {
    const response = await mockApi.loginUser(email, password)
    if (!response.success) {
      throw new Error(response.error || '登入失敗')
    }
    return response.data!
  }

  const register = async (
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    const response = await mockApi.registerUser(userData)
    if (!response.success) {
      throw new Error(response.error || '註冊失敗')
    }
    return response.data!
  }

  const logout = () => {
    return { success: true }
  }

  // ===============================
  // 用戶相關 API
  // ===============================

  const getUserProfile = (_userId: string) => {
    // Mock API 中暫無此功能，返回空資料
    return null
  }

  const updateUserProfile = async (
    userId: string,
    profileData: Partial<User['profile']>,
  ) => {
    const response = await mockApi.updateUserProfile(userId, profileData)
    if (!response.success) {
      throw new Error(response.error || '更新失敗')
    }
    return response.data!
  }

  // ===============================
  // 看護師相關 API
  // ===============================

  const getCaregivers = async (page: number = 1, limit: number = 10) => {
    const response = await mockApi.getCaregivers(page, limit)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const searchCaregivers = async (query: string) => {
    const response = await mockApi.searchCaregivers(query)
    if (!response.success) {
      throw new Error(response.error || '搜尋失敗')
    }
    return response.data!
  }

  const getCaregiverById = async (id: number) => {
    const response = await mockApi.getCaregiverById(id)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const filterCaregivers = async (filters: CaregiverFilter) => {
    const response = await mockApi.filterCaregivers(filters)
    if (!response.success) {
      throw new Error(response.error || '篩選失敗')
    }
    return response.data!
  }

  const getFeaturedCaregivers = async () => {
    const response = await mockApi.getCaregivers(1, 6)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!.data
  }

  const getTopRatedCaregivers = async () => {
    const response = await mockApi.getCaregivers(1, 5)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!.data.sort((a, b) => b.rating - a.rating)
  }

  // ===============================
  // 預約相關 API
  // ===============================

  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    const response = await mockApi.createBooking(bookingData)
    if (!response.success) {
      throw new Error(response.error || '預約失敗')
    }
    return response.data!
  }

  const getBookingsByUser = async (userId: string) => {
    const response = await mockApi.getBookingsByUser(userId)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const getBookingById = (_bookingId: string) => {
    // Mock API 中暫無此功能
    return null
  }

  const updateBookingStatus = async (bookingId: string, status: string) => {
    const response = await mockApi.updateBookingStatus(bookingId, status as any)
    if (!response.success) {
      throw new Error(response.error || '更新失敗')
    }
    return response.data!
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
    // 轉換為 mockApi 期望的格式
    const apiPaymentData = {
      bookingId: paymentData.booking_id,
      amount: paymentData.amount,
      method: paymentData.method,
      ...(paymentData.method === 'credit_card' && {
        cardDetails: (paymentData as any).cardDetails,
      }),
    }

    const response = await mockApi.processPayment(apiPaymentData)
    if (!response.success) {
      throw new Error(response.error || '支付失敗')
    }
    return response.data!
  }

  const getPaymentHistory = async (userId: string) => {
    const response = await mockApi.getPaymentHistory(userId)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const getPaymentById = (_paymentId: string) => {
    // Mock API 中暫無此功能
    return null
  }

  // ===============================
  // 評價相關 API
  // ===============================

  const createReview = async (
    reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>,
  ) => {
    const response = await mockApi.createReview(reviewData)
    if (!response.success) {
      throw new Error(response.error || '提交失敗')
    }
    return response.data!
  }

  const getReviewsByCaregiver = async (caregiverId: number) => {
    const response = await mockApi.getReviewsByCaregiver(caregiverId)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const getReviewsByUser = (_userId: string) => {
    // Mock API 中暫無此功能
    return []
  }

  // ===============================
  // 儀表板相關 API
  // ===============================

  const getDashboardStats = async (userId: string) => {
    const response = await mockApi.getDashboardStats(userId)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!
  }

  const getRecentActivity = (_userId: string) => {
    // Mock API 中暫無此功能
    return []
  }

  const getNotifications = (_userId: string) => {
    // Mock API 中暫無此功能
    return []
  }

  // ===============================
  // 搜尋相關 API
  // ===============================

  const getSearchSuggestions = (_query: string) => {
    // 返回搜尋建議
    return []
  }

  const getPopularSearchTerms = () => {
    return ['專業照護', '失智症', '復健', '夜間照護', '居家照護', '陪伴服務']
  }

  // ===============================
  // 媒合相關 API
  // ===============================

  const findMatches = async (criteria: CaregiverFilter) => {
    // 使用篩選功能來媒合
    const response = await mockApi.filterCaregivers(criteria)
    if (!response.success) {
      throw new Error(response.error || '媒合失敗')
    }
    return response.data!
  }

  const getRecommendations = async (_userId: string) => {
    // 獲取推薦的看護師
    const response = await mockApi.getCaregivers(1, 3)
    if (!response.success) {
      throw new Error(response.error || '載入失敗')
    }
    return response.data!.data
  }

  // ===============================
  // 聯絡表單相關 API
  // ===============================

  const submitContactForm = (contactData: {
    name: string
    email: string
    phone?: string
    message: string
  }) => {
    // 模擬提交聯絡表單
    return {
      id: `contact-${Date.now()}`,
      ...contactData,
      created_at: new Date().toISOString(),
      message: '您的訊息已成功送出，我們會盡快回覆您',
    }
  }

  return {
    // 狀態
    isLoading: computed(() => mockApi.isLoading.value),
    error: computed(() => mockApi.error.value),

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
    clearError: () => mockApi.clearError(),
  }
}
