import { ref, readonly } from 'vue'
import {
  mockCaregivers,
  mockUsers,
  mockBookings,
  mockReviews,
  mockPayments,
  type Caregiver,
  type User,
  type Booking,
  type Review,
  type Payment,
} from '~/utils/mockData'
import { toCaregiverDisplay, type CaregiverDisplay } from '~/types/caregiver'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export const useMockApi = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Internal state for bookings with IDs
  const bookingsWithIds = ref<Booking[]>(
    mockBookings.map((booking, index) => ({
      ...booking,
      id: `booking-${String(index + 1).padStart(3, '0')}`,
    })),
  )

  // Helper function to convert Omit<Booking, 'id'>[] to Booking[]
  const addBookingIds = (bookings: Omit<Booking, 'id'>[]): Booking[] => {
    return bookings.map((booking, index) => ({
      ...booking,
      id: `booking-${String(index + 1).padStart(3, '0')}`,
    }))
  }

  // 模擬 API 延遲
  const delay = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  // 模擬網路錯誤
  const shouldSimulateError = () => Math.random() < 0.05 // 5% 機率模擬錯誤

  // ===============================
  // 用戶相關 API
  // ===============================

  const loginUser = async (
    email: string,
    password: string,
  ): Promise<ApiResponse<User>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('網路連線異常，請稍後再試')
      }

      const user = mockUsers.find((u) => u.email === email)

      if (!user) {
        return {
          success: false,
          error: '用戶不存在',
        }
      }

      // 簡單的密碼驗證（在真實應用中不應該這樣做）
      if (password.length < 6) {
        return {
          success: false,
          error: '密碼錯誤',
        }
      }

      return {
        success: true,
        data: user,
        message: '登入成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const registerUser = async (
    userData: Omit<User, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ApiResponse<User>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('註冊服務暫時無法使用')
      }

      // 檢查郵箱是否已存在
      if (mockUsers.find((u) => u.email === userData.email)) {
        return {
          success: false,
          error: '此電子郵件已被註冊',
        }
      }

      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockUsers.push(newUser)

      return {
        success: true,
        data: newUser,
        message: '註冊成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const updateUserProfile = async (
    userId: string,
    profileData: Partial<User['profile']>,
  ): Promise<ApiResponse<User>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('更新失敗，請稍後再試')
      }

      const userIndex = mockUsers.findIndex((u) => u.id === userId)
      if (userIndex === -1) {
        return {
          success: false,
          error: '用戶不存在',
        }
      }

      const user = mockUsers[userIndex]
      if (user) {
        user.profile = {
          ...user.profile,
          ...profileData,
        }
        user.updated_at = new Date().toISOString()
      }

      return {
        success: true,
        data: mockUsers[userIndex],
        message: '個人資料更新成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 看護師相關 API
  // ===============================

  const getCaregivers = async (
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<Caregiver>>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入看護師列表')
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedData = mockCaregivers.slice(startIndex, endIndex)

      return {
        success: true,
        data: {
          data: paginatedData,
          total: mockCaregivers.length,
          page,
          limit,
          hasNext: endIndex < mockCaregivers.length,
          hasPrev: page > 1,
        },
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const searchCaregivers = async (
    query: string,
  ): Promise<ApiResponse<Caregiver[]>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('搜尋服務暫時無法使用')
      }

      const lowercaseQuery = query.toLowerCase()
      const displayCaregivers = mockCaregivers.map(toCaregiverDisplay)
      const results = displayCaregivers.filter(
        (caregiver) =>
          caregiver.name.toLowerCase().includes(lowercaseQuery) ||
          (caregiver.skills || '').toLowerCase().includes(lowercaseQuery) ||
          (caregiver.experience || '').toLowerCase().includes(lowercaseQuery) ||
          (caregiver.location || '').toLowerCase().includes(lowercaseQuery) ||
          (caregiver.licenses || []).some((license) =>
            license.toLowerCase().includes(lowercaseQuery),
          ),
      )

      return {
        success: true,
        data: results,
        message: `找到 ${results.length} 位相關看護師`,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const getCaregiverById = async (
    id: number,
  ): Promise<ApiResponse<Caregiver>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入看護師詳細資料')
      }

      const caregiver = mockCaregivers.find(
        (c) => c.id === String(id) || c.id === `caregiver-${id}`,
      )

      if (!caregiver) {
        return {
          success: false,
          error: '看護師不存在',
        }
      }

      return {
        success: true,
        data: caregiver,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const filterCaregivers = async (filters: {
    location?: string
    minRating?: number
    maxHourlyRate?: number
    maxShiftRate?: number
    skills?: string[]
  }): Promise<ApiResponse<Caregiver[]>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('篩選服務暫時無法使用')
      }

      let results = mockCaregivers.map(toCaregiverDisplay)

      if (filters.location) {
        results = results.filter((c) => c.location?.includes(filters.location!))
      }

      if (filters.minRating) {
        results = results.filter((c) => c.rating >= filters.minRating!)
      }

      if (filters.maxHourlyRate) {
        results = results.filter((c) => c.hourly_rate <= filters.maxHourlyRate!)
      }

      if (filters.maxShiftRate) {
        results = results.filter(
          (c) => (c.shift_rate || c.hourly_rate * 12) <= filters.maxShiftRate!,
        )
      }

      if (filters.skills && filters.skills.length > 0) {
        results = results.filter((c) =>
          filters.skills!.some((skill) =>
            (c.skills || '').toLowerCase().includes(skill.toLowerCase()),
          ),
        )
      }

      return {
        success: true,
        data: results,
        message: `找到 ${results.length} 位符合條件的看護師`,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 預約相關 API
  // ===============================

  const createBooking = async (
    bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ApiResponse<Booking>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('預約失敗，請稍後再試')
      }

      const newBooking: Booking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockBookings.push(newBooking)

      return {
        success: true,
        data: newBooking,
        message: '預約成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const getBookingsByUser = async (
    userId: string,
  ): Promise<ApiResponse<Booking[]>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入預約記錄')
      }

      const userBookings = bookingsWithIds.value.filter(
        (b) => b.user_id === userId,
      )

      return {
        success: true,
        data: userBookings,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const updateBookingStatus = async (
    bookingId: string,
    status: Booking['status'],
  ): Promise<ApiResponse<Booking>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('更新預約狀態失敗')
      }

      const bookingIndex = bookingsWithIds.value.findIndex(
        (b) => b.id === bookingId,
      )

      if (bookingIndex === -1) {
        return {
          success: false,
          error: '預約不存在',
        }
      }

      const booking = bookingsWithIds.value[bookingIndex]
      if (booking) {
        booking.status = status
        booking.updated_at = new Date().toISOString()
      }

      return {
        success: true,
        data: booking,
        message: '預約狀態更新成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 支付相關 API
  // ===============================

  const processPayment = async (paymentData: {
    bookingId: string
    amount: number
    method: 'credit_card' | 'bank_transfer' | 'cash'
    cardDetails?: {
      number: string
      expiryMonth: string
      expiryYear: string
      cvv: string
    }
  }): Promise<ApiResponse<Payment>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay(1000) // 支付處理較慢

      if (shouldSimulateError()) {
        throw new Error('支付處理失敗，請檢查支付資訊')
      }

      // 模擬信用卡驗證
      if (paymentData.method === 'credit_card') {
        if (
          !paymentData.cardDetails?.number ||
          paymentData.cardDetails.number.length < 16
        ) {
          return {
            success: false,
            error: '信用卡號碼無效',
          }
        }
      }

      const payment: Payment = {
        id: `payment-${Date.now()}`,
        booking_id: paymentData.bookingId,
        amount: paymentData.amount,
        method: paymentData.method,
        status: 'completed',
        transaction_id: `txn-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockPayments.push(payment)

      return {
        success: true,
        data: payment,
        message: '支付成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const getPaymentHistory = async (
    userId: string,
  ): Promise<ApiResponse<Payment[]>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入支付記錄')
      }

      // 透過預約找到用戶的支付記錄
      const userBookingIds = bookingsWithIds.value
        .filter((b) => b.user_id === userId)
        .map((b) => b.id)

      const userPayments = mockPayments.filter((p) =>
        userBookingIds.includes(p.booking_id),
      )

      return {
        success: true,
        data: userPayments,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 評價相關 API
  // ===============================

  const createReview = async (
    reviewData: Omit<Review, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<ApiResponse<Review>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('提交評價失敗')
      }

      const newReview: Review = {
        ...reviewData,
        id: `review-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockReviews.push(newReview)

      return {
        success: true,
        data: newReview,
        message: '評價提交成功',
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  const getReviewsByCaregiver = async (
    caregiverId: number,
  ): Promise<ApiResponse<Review[]>> => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入評價')
      }

      const caregiverReviews = mockReviews.filter(
        (r) => r.caregiver_id === caregiverId,
      )

      return {
        success: true,
        data: caregiverReviews,
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  // ===============================
  // 儀表板統計 API
  // ===============================

  const getDashboardStats = async (
    userId: string,
  ): Promise<
    ApiResponse<{
      totalBookings: number
      completedBookings: number
      pendingBookings: number
      totalSpent: number
      favoriteCaregiver?: Caregiver
      recentBookings: Booking[]
      upcomingBookings: Booking[]
    }>
  > => {
    isLoading.value = true
    error.value = null

    try {
      await delay()

      if (shouldSimulateError()) {
        throw new Error('無法載入統計資料')
      }

      const userBookings = bookingsWithIds.value.filter(
        (b) => b.user_id === userId,
      )
      const userPayments = mockPayments.filter((p) =>
        userBookings.some((b) => b.id === p.booking_id),
      )

      const totalSpent = userPayments.reduce((sum, p) => sum + p.amount, 0)

      const now = new Date()
      const upcomingBookings: Booking[] = userBookings.filter((b) => {
        const bookingDate = new Date(b.start_date)
        return bookingDate >= now && ['confirmed', 'pending'].includes(b.status)
      })

      const recentBookings: Booking[] = userBookings
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 5)

      // 找出最常預約的看護師
      const caregiverBookingCounts = userBookings.reduce(
        (acc, booking) => {
          acc[booking.caregiver_id] = (acc[booking.caregiver_id] || 0) + 1
          return acc
        },
        {} as Record<number, number>,
      )

      const favoriteCaregiver =
        Object.keys(caregiverBookingCounts).length > 0
          ? mockCaregivers.find(
              (c) =>
                c.id ===
                `caregiver-${Object.keys(caregiverBookingCounts).reduce(
                  (a, b) => {
                    const countA = caregiverBookingCounts[parseInt(a, 10)]
                    const countB = caregiverBookingCounts[parseInt(b, 10)]
                    return (countA || 0) > (countB || 0) ? a : b
                  },
                )}`,
            )
          : undefined

      return {
        success: true,
        data: {
          totalBookings: userBookings.length,
          completedBookings: userBookings.filter(
            (b) => b.status === 'completed',
          ).length,
          pendingBookings: userBookings.filter((b) => b.status === 'pending')
            .length,
          totalSpent,
          favoriteCaregiver,
          recentBookings,
          upcomingBookings,
        },
      }
    } catch (err: unknown) {
      error.value = err.message
      return {
        success: false,
        error: err.message,
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // 狀態
    isLoading: readonly(isLoading),
    error: readonly(error),

    // 用戶相關
    loginUser,
    registerUser,
    updateUserProfile,

    // 看護師相關
    getCaregivers,
    searchCaregivers,
    getCaregiverById,
    filterCaregivers,

    // 預約相關
    createBooking,
    getBookingsByUser,
    updateBookingStatus,

    // 支付相關
    processPayment,
    getPaymentHistory,

    // 評價相關
    createReview,
    getReviewsByCaregiver,

    // 儀表板
    getDashboardStats,

    // 工具方法
    clearError: () => {
      error.value = null
    },
  }
}
