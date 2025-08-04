export const useApiRoutes = () => {
  const baseUrl = '/api'

  // API 端點配置
  const routes = {
    // 認證相關
    auth: {
      login: `${baseUrl}/auth/login`,
      register: `${baseUrl}/auth/register`,
      logout: `${baseUrl}/auth/logout`,
      refresh: `${baseUrl}/auth/refresh`,
      resetPassword: `${baseUrl}/auth/reset-password`,
      verifyEmail: `${baseUrl}/auth/verify-email`,
    },

    // 用戶相關
    users: {
      profile: `${baseUrl}/users/profile`,
      updateProfile: `${baseUrl}/users/profile`,
      avatar: `${baseUrl}/users/avatar`,
      preferences: `${baseUrl}/users/preferences`,
      byId: (id: string) => `${baseUrl}/users/${id}`,
    },

    // 看護師相關
    caregivers: {
      list: `${baseUrl}/caregivers`,
      search: `${baseUrl}/caregivers/search`,
      filter: `${baseUrl}/caregivers/filter`,
      featured: `${baseUrl}/caregivers/featured`,
      topRated: `${baseUrl}/caregivers/top-rated`,
      byId: (id: number) => `${baseUrl}/caregivers/${id}`,
      reviews: (id: number) => `${baseUrl}/caregivers/${id}/reviews`,
      availability: (id: number) => `${baseUrl}/caregivers/${id}/availability`,
      schedule: (id: number) => `${baseUrl}/caregivers/${id}/schedule`,
    },

    // 預約相關
    bookings: {
      create: `${baseUrl}/bookings`,
      list: `${baseUrl}/bookings`,
      userBookings: (userId: string) => `${baseUrl}/bookings/user/${userId}`,
      caregiverBookings: (caregiverId: number) =>
        `${baseUrl}/bookings/caregiver/${caregiverId}`,
      byId: (id: string) => `${baseUrl}/bookings/${id}`,
      cancel: (id: string) => `${baseUrl}/bookings/${id}/cancel`,
      confirm: (id: string) => `${baseUrl}/bookings/${id}/confirm`,
      complete: (id: string) => `${baseUrl}/bookings/${id}/complete`,
      reschedule: (id: string) => `${baseUrl}/bookings/${id}/reschedule`,
    },

    // 支付相關
    payments: {
      process: `${baseUrl}/payments/process`,
      history: `${baseUrl}/payments/history`,
      byId: (id: string) => `${baseUrl}/payments/${id}`,
      refund: (id: string) => `${baseUrl}/payments/${id}/refund`,
      receipt: (id: string) => `${baseUrl}/payments/${id}/receipt`,
    },

    // 評價相關
    reviews: {
      create: `${baseUrl}/reviews`,
      byCaregiver: (caregiverId: number) =>
        `${baseUrl}/reviews/caregiver/${caregiverId}`,
      byUser: (userId: string) => `${baseUrl}/reviews/user/${userId}`,
      byId: (id: string) => `${baseUrl}/reviews/${id}`,
      update: (id: string) => `${baseUrl}/reviews/${id}`,
      delete: (id: string) => `${baseUrl}/reviews/${id}`,
    },

    // 搜尋相關
    search: {
      caregivers: `${baseUrl}/search/caregivers`,
      suggestions: `${baseUrl}/search/suggestions`,
      popular: `${baseUrl}/search/popular-terms`,
      history: `${baseUrl}/search/history`,
    },

    // 媒合相關
    matching: {
      findMatches: `${baseUrl}/matching/find`,
      savePreferences: `${baseUrl}/matching/preferences`,
      getRecommendations: `${baseUrl}/matching/recommendations`,
    },

    // 費用計算
    calculator: {
      estimate: `${baseUrl}/calculator/estimate`,
      breakdown: `${baseUrl}/calculator/breakdown`,
      modifiers: `${baseUrl}/calculator/modifiers`,
    },

    // 儀表板統計
    dashboard: {
      stats: `${baseUrl}/dashboard/stats`,
      recentActivity: `${baseUrl}/dashboard/recent`,
      notifications: `${baseUrl}/dashboard/notifications`,
    },

    // 通知相關
    notifications: {
      list: `${baseUrl}/notifications`,
      markRead: (id: string) => `${baseUrl}/notifications/${id}/read`,
      markAllRead: `${baseUrl}/notifications/read-all`,
      preferences: `${baseUrl}/notifications/preferences`,
    },

    // 檔案上傳
    uploads: {
      avatar: `${baseUrl}/uploads/avatar`,
      documents: `${baseUrl}/uploads/documents`,
      certificates: `${baseUrl}/uploads/certificates`,
    },

    // 地理位置
    locations: {
      search: `${baseUrl}/locations/search`,
      nearby: `${baseUrl}/locations/nearby`,
      districts: `${baseUrl}/locations/districts`,
    },

    // 系統相關
    system: {
      health: `${baseUrl}/system/health`,
      status: `${baseUrl}/system/status`,
      version: `${baseUrl}/system/version`,
    },
  }

  // HTTP 方法助手
  const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
  } as const

  // API 呼叫配置
  const createApiConfig = (
    method: string,
    data?: Record<string, unknown> | FormData,
    options?: { headers?: Record<string, string> },
  ) => {
    const config: {
      method: string
      headers: Record<string, string>
      body?: string
    } = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }

    if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
      config.body = JSON.stringify(data)
    }

    return config
  }

  // 錯誤碼對應
  const errorMessages = {
    400: '請求參數錯誤',
    401: '未授權，請重新登入',
    403: '權限不足',
    404: '資源不存在',
    409: '資源衝突',
    422: '資料驗證失敗',
    429: '請求過於頻繁',
    500: '伺服器內部錯誤',
    502: '服務暫時無法使用',
    503: '服務維護中',
  }

  // 狀態碼檢查
  const isSuccessStatus = (status: number) => status >= 200 && status < 300
  const isClientError = (status: number) => status >= 400 && status < 500
  const isServerError = (status: number) => status >= 500

  return {
    routes,
    methods,
    createApiConfig,
    errorMessages,
    isSuccessStatus,
    isClientError,
    isServerError,
    baseUrl,
  }
}
