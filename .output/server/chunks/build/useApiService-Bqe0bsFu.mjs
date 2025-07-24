import { ref, computed, readonly } from 'vue';
import { aL as mockBookings, aM as mockPayments, aN as mockCaregivers, aO as mockReviews, aP as mockUsers } from './server.mjs';
import { u as useApiConfig } from './useApiConfig-D0iRs2xG.mjs';

const useApiRoutes = () => {
  const baseUrl = "/api";
  const routes = {
    // 認證相關
    auth: {
      login: `${baseUrl}/auth/login`,
      register: `${baseUrl}/auth/register`,
      logout: `${baseUrl}/auth/logout`,
      refresh: `${baseUrl}/auth/refresh`,
      resetPassword: `${baseUrl}/auth/reset-password`,
      verifyEmail: `${baseUrl}/auth/verify-email`
    },
    // 用戶相關
    users: {
      profile: `${baseUrl}/users/profile`,
      updateProfile: `${baseUrl}/users/profile`,
      avatar: `${baseUrl}/users/avatar`,
      preferences: `${baseUrl}/users/preferences`,
      byId: (id) => `${baseUrl}/users/${id}`
    },
    // 看護師相關
    caregivers: {
      list: `${baseUrl}/caregivers`,
      search: `${baseUrl}/caregivers/search`,
      filter: `${baseUrl}/caregivers/filter`,
      featured: `${baseUrl}/caregivers/featured`,
      topRated: `${baseUrl}/caregivers/top-rated`,
      byId: (id) => `${baseUrl}/caregivers/${id}`,
      reviews: (id) => `${baseUrl}/caregivers/${id}/reviews`,
      availability: (id) => `${baseUrl}/caregivers/${id}/availability`,
      schedule: (id) => `${baseUrl}/caregivers/${id}/schedule`
    },
    // 預約相關
    bookings: {
      create: `${baseUrl}/bookings`,
      list: `${baseUrl}/bookings`,
      userBookings: (userId) => `${baseUrl}/bookings/user/${userId}`,
      caregiverBookings: (caregiverId) => `${baseUrl}/bookings/caregiver/${caregiverId}`,
      byId: (id) => `${baseUrl}/bookings/${id}`,
      cancel: (id) => `${baseUrl}/bookings/${id}/cancel`,
      confirm: (id) => `${baseUrl}/bookings/${id}/confirm`,
      complete: (id) => `${baseUrl}/bookings/${id}/complete`,
      reschedule: (id) => `${baseUrl}/bookings/${id}/reschedule`
    },
    // 支付相關
    payments: {
      process: `${baseUrl}/payments/process`,
      history: `${baseUrl}/payments/history`,
      byId: (id) => `${baseUrl}/payments/${id}`,
      refund: (id) => `${baseUrl}/payments/${id}/refund`,
      receipt: (id) => `${baseUrl}/payments/${id}/receipt`
    },
    // 評價相關
    reviews: {
      create: `${baseUrl}/reviews`,
      byCaregiver: (caregiverId) => `${baseUrl}/reviews/caregiver/${caregiverId}`,
      byUser: (userId) => `${baseUrl}/reviews/user/${userId}`,
      byId: (id) => `${baseUrl}/reviews/${id}`,
      update: (id) => `${baseUrl}/reviews/${id}`,
      delete: (id) => `${baseUrl}/reviews/${id}`
    },
    // 搜尋相關
    search: {
      caregivers: `${baseUrl}/search/caregivers`,
      suggestions: `${baseUrl}/search/suggestions`,
      popular: `${baseUrl}/search/popular-terms`,
      history: `${baseUrl}/search/history`
    },
    // 媒合相關
    matching: {
      findMatches: `${baseUrl}/matching/find`,
      savePreferences: `${baseUrl}/matching/preferences`,
      getRecommendations: `${baseUrl}/matching/recommendations`
    },
    // 費用計算
    calculator: {
      estimate: `${baseUrl}/calculator/estimate`,
      breakdown: `${baseUrl}/calculator/breakdown`,
      modifiers: `${baseUrl}/calculator/modifiers`
    },
    // 儀表板統計
    dashboard: {
      stats: `${baseUrl}/dashboard/stats`,
      recentActivity: `${baseUrl}/dashboard/recent`,
      notifications: `${baseUrl}/dashboard/notifications`
    },
    // 通知相關
    notifications: {
      list: `${baseUrl}/notifications`,
      markRead: (id) => `${baseUrl}/notifications/${id}/read`,
      markAllRead: `${baseUrl}/notifications/read-all`,
      preferences: `${baseUrl}/notifications/preferences`
    },
    // 檔案上傳
    uploads: {
      avatar: `${baseUrl}/uploads/avatar`,
      documents: `${baseUrl}/uploads/documents`,
      certificates: `${baseUrl}/uploads/certificates`
    },
    // 地理位置
    locations: {
      search: `${baseUrl}/locations/search`,
      nearby: `${baseUrl}/locations/nearby`,
      districts: `${baseUrl}/locations/districts`
    },
    // 系統相關
    system: {
      health: `${baseUrl}/system/health`,
      status: `${baseUrl}/system/status`,
      version: `${baseUrl}/system/version`
    }
  };
  const methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
  };
  const createApiConfig = (method, data, options) => {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers
      }
    };
    if (data && ["POST", "PUT", "PATCH"].includes(method)) {
      config.body = JSON.stringify(data);
    }
    return config;
  };
  const errorMessages = {
    400: "請求參數錯誤",
    401: "未授權，請重新登入",
    403: "權限不足",
    404: "資源不存在",
    409: "資源衝突",
    422: "資料驗證失敗",
    429: "請求過於頻繁",
    500: "伺服器內部錯誤",
    502: "服務暫時無法使用",
    503: "服務維護中"
  };
  const isSuccessStatus = (status) => status >= 200 && status < 300;
  const isClientError = (status) => status >= 400 && status < 500;
  const isServerError = (status) => status >= 500;
  return {
    routes,
    methods,
    createApiConfig,
    errorMessages,
    isSuccessStatus,
    isClientError,
    isServerError,
    baseUrl
  };
};
const useHttpClient = () => {
  const { errorMessages, isSuccessStatus } = useApiRoutes();
  const isLoading = ref(false);
  const error = ref(null);
  const abortController = ref(null);
  const createQueryString = (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, item.toString()));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });
    return searchParams.toString();
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const mockResponse = async (data, config) => {
    if (config.mockDelay) {
      await delay(config.mockDelay);
    }
    if (Math.random() < 0.05) {
      throw new Error("Mock API error");
    }
    return data;
  };
  const handleError = (error2, url) => {
    console.error(`API Error [${url}]:`, error2);
    if (error2.name === "AbortError") {
      return {
        status: 0,
        message: "請求已取消",
        code: "ABORTED"
      };
    }
    if (error2.name === "TypeError" && error2.message.includes("fetch")) {
      return {
        status: 0,
        message: "網路連線錯誤",
        code: "NETWORK_ERROR"
      };
    }
    const status = error2.status || 500;
    const message = errorMessages[status] || error2.message || "未知錯誤";
    return {
      status,
      message,
      code: error2.code,
      details: error2.details
    };
  };
  const request = async (config) => {
    isLoading.value = true;
    error.value = null;
    try {
      abortController.value = new AbortController();
      let fullUrl = config.url;
      if (config.params) {
        const queryString = createQueryString(config.params);
        fullUrl += queryString ? `?${queryString}` : "";
      }
      const requestConfig = {
        method: config.method,
        signal: abortController.value.signal,
        headers: {
          "Content-Type": "application/json",
          ...config.headers
        }
      };
      if (config.data && ["POST", "PUT", "PATCH"].includes(config.method)) {
        requestConfig.body = JSON.stringify(config.data);
      }
      const timeout = config.timeout || 1e4;
      const timeoutId = setTimeout(() => {
        abortController.value?.abort();
      }, timeout);
      try {
        const response = await fetch(fullUrl, requestConfig);
        clearTimeout(timeoutId);
        if (!isSuccessStatus(response.status)) {
          const errorData = await response.json().catch(() => ({}));
          throw {
            status: response.status,
            message: errorData.message || errorMessages[response.status] || "API 請求失敗",
            code: errorData.code,
            details: errorData.details
          };
        }
        const data = await response.json();
        return data;
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (err) {
      error.value = handleError(err, config.url);
      throw error.value;
    } finally {
      isLoading.value = false;
      abortController.value = null;
    }
  };
  const get = (url, params, options) => {
    return request({
      method: "GET",
      url,
      params,
      ...options
    });
  };
  const post = (url, data, options) => {
    return request({
      method: "POST",
      url,
      data,
      ...options
    });
  };
  const put = (url, data, options) => {
    return request({
      method: "PUT",
      url,
      data,
      ...options
    });
  };
  const patch = (url, data, options) => {
    return request({
      method: "PATCH",
      url,
      data,
      ...options
    });
  };
  const del = (url, options) => {
    return request({
      method: "DELETE",
      url,
      ...options
    });
  };
  const cancel = () => {
    abortController.value?.abort();
  };
  const clearError = () => {
    error.value = null;
  };
  const retry = async (config, maxRetries = 3) => {
    let lastError = null;
    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await request(config);
      } catch (err) {
        lastError = err;
        if (lastError.status >= 400 && lastError.status < 500) {
          break;
        }
        if (i === maxRetries) {
          break;
        }
        await delay(Math.pow(2, i) * 1e3);
      }
    }
    throw lastError;
  };
  return {
    // 狀態
    isLoading: readonly(isLoading),
    error: readonly(error),
    // 方法
    request,
    get,
    post,
    put,
    patch,
    delete: del,
    cancel,
    clearError,
    retry,
    // 工具
    mockResponse
  };
};
const useMockApi = () => {
  const isLoading = ref(false);
  const error = ref(null);
  const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
  const shouldSimulateError = () => Math.random() < 0.05;
  const loginUser = async (email, password) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("網路連線異常，請稍後再試");
      }
      const user = mockUsers.find((u) => u.email === email);
      if (!user) {
        return {
          success: false,
          error: "用戶不存在"
        };
      }
      if (password.length < 6) {
        return {
          success: false,
          error: "密碼錯誤"
        };
      }
      return {
        success: true,
        data: user,
        message: "登入成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const registerUser = async (userData) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("註冊服務暫時無法使用");
      }
      if (mockUsers.find((u) => u.email === userData.email)) {
        return {
          success: false,
          error: "此電子郵件已被註冊"
        };
      }
      const newUser = {
        ...userData,
        id: `user-${Date.now()}`,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockUsers.push(newUser);
      return {
        success: true,
        data: newUser,
        message: "註冊成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const updateUserProfile = async (userId, profileData) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("更新失敗，請稍後再試");
      }
      const userIndex = mockUsers.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        return {
          success: false,
          error: "用戶不存在"
        };
      }
      mockUsers[userIndex].profile = {
        ...mockUsers[userIndex].profile,
        ...profileData
      };
      mockUsers[userIndex].updated_at = (/* @__PURE__ */ new Date()).toISOString();
      return {
        success: true,
        data: mockUsers[userIndex],
        message: "個人資料更新成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getCaregivers = async (page = 1, limit = 10) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入看護師列表");
      }
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = mockCaregivers.slice(startIndex, endIndex);
      return {
        success: true,
        data: {
          data: paginatedData,
          total: mockCaregivers.length,
          page,
          limit,
          hasNext: endIndex < mockCaregivers.length,
          hasPrev: page > 1
        }
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const searchCaregivers = async (query) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("搜尋服務暫時無法使用");
      }
      const lowercaseQuery = query.toLowerCase();
      const results = mockCaregivers.filter(
        (caregiver) => caregiver.name.toLowerCase().includes(lowercaseQuery) || caregiver.skills.toLowerCase().includes(lowercaseQuery) || caregiver.experience.toLowerCase().includes(lowercaseQuery) || caregiver.location?.toLowerCase().includes(lowercaseQuery) || caregiver.licenses.some((license) => license.toLowerCase().includes(lowercaseQuery))
      );
      return {
        success: true,
        data: results,
        message: `找到 ${results.length} 位相關看護師`
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getCaregiverById = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入看護師詳細資料");
      }
      const caregiver = mockCaregivers.find((c) => c.id === id);
      if (!caregiver) {
        return {
          success: false,
          error: "看護師不存在"
        };
      }
      return {
        success: true,
        data: caregiver
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const filterCaregivers = async (filters) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("篩選服務暫時無法使用");
      }
      let results = [...mockCaregivers];
      if (filters.location) {
        results = results.filter((c) => c.location?.includes(filters.location));
      }
      if (filters.minRating) {
        results = results.filter((c) => c.rating >= filters.minRating);
      }
      if (filters.maxHourlyRate) {
        results = results.filter((c) => c.hourly_rate <= filters.maxHourlyRate);
      }
      if (filters.maxShiftRate) {
        results = results.filter((c) => c.shift_rate <= filters.maxShiftRate);
      }
      if (filters.skills && filters.skills.length > 0) {
        results = results.filter(
          (c) => filters.skills.some(
            (skill) => c.skills.toLowerCase().includes(skill.toLowerCase())
          )
        );
      }
      return {
        success: true,
        data: results,
        message: `找到 ${results.length} 位符合條件的看護師`
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const createBooking = async (bookingData) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("預約失敗，請稍後再試");
      }
      const newBooking = {
        ...bookingData,
        id: `booking-${Date.now()}`,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockBookings.push(newBooking);
      return {
        success: true,
        data: newBooking,
        message: "預約成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getBookingsByUser = async (userId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入預約記錄");
      }
      const userBookings = mockBookings.filter((b) => b.user_id === userId);
      return {
        success: true,
        data: userBookings
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const updateBookingStatus = async (bookingId, status) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("更新預約狀態失敗");
      }
      const bookingIndex = mockBookings.findIndex((b) => b.id === bookingId);
      if (bookingIndex === -1) {
        return {
          success: false,
          error: "預約不存在"
        };
      }
      mockBookings[bookingIndex].status = status;
      mockBookings[bookingIndex].updated_at = (/* @__PURE__ */ new Date()).toISOString();
      return {
        success: true,
        data: mockBookings[bookingIndex],
        message: "預約狀態更新成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const processPayment = async (paymentData) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay(1e3);
      if (shouldSimulateError()) {
        throw new Error("支付處理失敗，請檢查支付資訊");
      }
      if (paymentData.method === "credit_card") {
        if (!paymentData.cardDetails?.number || paymentData.cardDetails.number.length < 16) {
          return {
            success: false,
            error: "信用卡號碼無效"
          };
        }
      }
      const payment = {
        id: `payment-${Date.now()}`,
        booking_id: paymentData.bookingId,
        amount: paymentData.amount,
        method: paymentData.method,
        status: "completed",
        transaction_id: `txn-${Math.random().toString(36).substr(2, 9)}`,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockPayments.push(payment);
      return {
        success: true,
        data: payment,
        message: "支付成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getPaymentHistory = async (userId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入支付記錄");
      }
      const userBookingIds = mockBookings.filter((b) => b.user_id === userId).map((b) => b.id);
      const userPayments = mockPayments.filter((p) => userBookingIds.includes(p.booking_id));
      return {
        success: true,
        data: userPayments
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const createReview = async (reviewData) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("提交評價失敗");
      }
      const newReview = {
        ...reviewData,
        id: `review-${Date.now()}`,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      };
      mockReviews.push(newReview);
      return {
        success: true,
        data: newReview,
        message: "評價提交成功"
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getReviewsByCaregiver = async (caregiverId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入評價");
      }
      const caregiverReviews = mockReviews.filter((r) => r.caregiver_id === caregiverId);
      return {
        success: true,
        data: caregiverReviews
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
  const getDashboardStats = async (userId) => {
    isLoading.value = true;
    error.value = null;
    try {
      await delay();
      if (shouldSimulateError()) {
        throw new Error("無法載入統計資料");
      }
      const userBookings = mockBookings.filter((b) => b.user_id === userId);
      const userPayments = mockPayments.filter(
        (p) => userBookings.some((b) => b.id === p.booking_id)
      );
      const totalSpent = userPayments.reduce((sum, p) => sum + p.amount, 0);
      const now = /* @__PURE__ */ new Date();
      const upcomingBookings = userBookings.filter((b) => {
        const bookingDate = new Date(b.start_date);
        return bookingDate >= now && ["confirmed", "pending"].includes(b.status);
      });
      const recentBookings = userBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
      const caregiverBookingCounts = userBookings.reduce((acc, booking) => {
        acc[booking.caregiver_id] = (acc[booking.caregiver_id] || 0) + 1;
        return acc;
      }, {});
      const favoriteCaregiver = Object.keys(caregiverBookingCounts).length > 0 ? mockCaregivers.find((c) => c.id === parseInt(
        Object.keys(caregiverBookingCounts).reduce(
          (a, b) => caregiverBookingCounts[parseInt(a)] > caregiverBookingCounts[parseInt(b)] ? a : b
        )
      )) : void 0;
      return {
        success: true,
        data: {
          totalBookings: userBookings.length,
          completedBookings: userBookings.filter((b) => b.status === "completed").length,
          pendingBookings: userBookings.filter((b) => b.status === "pending").length,
          totalSpent,
          favoriteCaregiver,
          recentBookings,
          upcomingBookings
        }
      };
    } catch (err) {
      error.value = err.message;
      return {
        success: false,
        error: err.message
      };
    } finally {
      isLoading.value = false;
    }
  };
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
      error.value = null;
    }
  };
};
const useApiService = (config) => {
  const httpClient = useHttpClient();
  const mockApi = useMockApi();
  const { routes } = useApiRoutes();
  const { config: globalConfig, isUsingMockApi: globalIsUsingMockApi } = useApiConfig();
  const serviceConfig = ref(config ? { ...globalConfig.value, ...config } : globalConfig.value);
  const isUsingMockApi = computed(() => config ? serviceConfig.value.useMockApi : globalIsUsingMockApi.value);
  const callApi = async (mockMethod, realApiCall, fallbackToMock = true) => {
    if (isUsingMockApi.value) {
      const mockResponse = await mockMethod();
      if (mockResponse.success) {
        return mockResponse.data;
      } else {
        throw new Error(mockResponse.error || "Mock API 錯誤");
      }
    }
    try {
      return await realApiCall();
    } catch (error) {
      if (fallbackToMock) {
        console.warn("Real API failed, falling back to mock API:", error);
        const mockResponse = await mockMethod();
        if (mockResponse.success) {
          return mockResponse.data;
        } else {
          throw new Error(mockResponse.error || "Mock API 錯誤");
        }
      }
      throw error;
    }
  };
  const login = async (email, password) => {
    return callApi(
      () => mockApi.loginUser(email, password),
      () => httpClient.post(routes.auth.login, { email, password })
    );
  };
  const register = async (userData) => {
    return callApi(
      () => mockApi.registerUser(userData),
      () => httpClient.post(routes.auth.register, userData)
    );
  };
  const logout = async () => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.post(routes.auth.logout)
    );
  };
  const getUserProfile = async (userId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.users.byId(userId))
    );
  };
  const updateUserProfile = async (userId, profileData) => {
    return callApi(
      () => mockApi.updateUserProfile(userId, profileData),
      () => httpClient.put(routes.users.updateProfile, profileData)
    );
  };
  const getCaregivers = async (page = 1, limit = 10) => {
    return callApi(
      () => mockApi.getCaregivers(page, limit),
      () => httpClient.get(routes.caregivers.list, { page, limit })
    );
  };
  const searchCaregivers = async (query) => {
    return callApi(
      () => mockApi.searchCaregivers(query),
      () => httpClient.get(routes.caregivers.search, { q: query })
    );
  };
  const getCaregiverById = async (id) => {
    return callApi(
      () => mockApi.getCaregiverById(id),
      () => httpClient.get(routes.caregivers.byId(id))
    );
  };
  const filterCaregivers = async (filters) => {
    return callApi(
      () => mockApi.filterCaregivers(filters),
      () => httpClient.post(routes.caregivers.filter, filters)
    );
  };
  const getFeaturedCaregivers = async () => {
    return callApi(
      () => mockApi.getCaregivers(1, 6),
      () => httpClient.get(routes.caregivers.featured)
    );
  };
  const getTopRatedCaregivers = async () => {
    return callApi(
      () => mockApi.getCaregivers(1, 5),
      () => httpClient.get(routes.caregivers.topRated)
    );
  };
  const createBooking = async (bookingData) => {
    return callApi(
      () => mockApi.createBooking(bookingData),
      () => httpClient.post(routes.bookings.create, bookingData)
    );
  };
  const getBookingsByUser = async (userId) => {
    return callApi(
      () => mockApi.getBookingsByUser(userId),
      () => httpClient.get(routes.bookings.userBookings(userId))
    );
  };
  const getBookingById = async (bookingId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.bookings.byId(bookingId))
    );
  };
  const updateBookingStatus = async (bookingId, status) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, status),
      () => httpClient.patch(routes.bookings.byId(bookingId), { status })
    );
  };
  const cancelBooking = async (bookingId) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, "cancelled"),
      () => httpClient.post(routes.bookings.cancel(bookingId))
    );
  };
  const confirmBooking = async (bookingId) => {
    return callApi(
      () => mockApi.updateBookingStatus(bookingId, "confirmed"),
      () => httpClient.post(routes.bookings.confirm(bookingId))
    );
  };
  const processPayment = async (paymentData) => {
    return callApi(
      () => mockApi.processPayment(paymentData),
      () => httpClient.post(routes.payments.process, paymentData)
    );
  };
  const getPaymentHistory = async (userId) => {
    return callApi(
      () => mockApi.getPaymentHistory(userId),
      () => httpClient.get(routes.payments.history, { userId })
    );
  };
  const getPaymentById = async (paymentId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: null }),
      () => httpClient.get(routes.payments.byId(paymentId))
    );
  };
  const createReview = async (reviewData) => {
    return callApi(
      () => mockApi.createReview(reviewData),
      () => httpClient.post(routes.reviews.create, reviewData)
    );
  };
  const getReviewsByCaregiver = async (caregiverId) => {
    return callApi(
      () => mockApi.getReviewsByCaregiver(caregiverId),
      () => httpClient.get(routes.reviews.byCaregiver(caregiverId))
    );
  };
  const getReviewsByUser = async (userId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.reviews.byUser(userId))
    );
  };
  const getDashboardStats = async (userId) => {
    return callApi(
      () => mockApi.getDashboardStats(userId),
      () => httpClient.get(routes.dashboard.stats, { userId })
    );
  };
  const getRecentActivity = async (userId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.dashboard.recentActivity, { userId })
    );
  };
  const getNotifications = async (userId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.notifications.list, { userId })
    );
  };
  const getSearchSuggestions = async (query) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.search.suggestions, { q: query })
    );
  };
  const getPopularSearchTerms = async () => {
    return callApi(
      () => Promise.resolve({ success: true, data: ["專業照護", "失智症", "復健", "夜間照護"] }),
      () => httpClient.get(routes.search.popular)
    );
  };
  const findMatches = async (criteria) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.post(routes.matching.findMatches, criteria)
    );
  };
  const getRecommendations = async (userId) => {
    return callApi(
      () => Promise.resolve({ success: true, data: [] }),
      () => httpClient.get(routes.matching.getRecommendations, { userId })
    );
  };
  const submitContactForm = async (contactData) => {
    return callApi(
      () => Promise.resolve({
        success: true,
        data: { id: `contact-${Date.now()}`, ...contactData, created_at: (/* @__PURE__ */ new Date()).toISOString() },
        message: "您的訊息已成功送出，我們會盡快回覆您"
      }),
      () => httpClient.post("/api/contact", contactData)
    );
  };
  const switchToMockApi = () => {
    serviceConfig.value.useMockApi = true;
  };
  const switchToRealApi = () => {
    serviceConfig.value.useMockApi = false;
  };
  const updateConfig = (newConfig) => {
    serviceConfig.value = { ...serviceConfig.value, ...newConfig };
  };
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
      httpClient.clearError();
      mockApi.clearError();
    }
  };
};

export { useApiService as u };
//# sourceMappingURL=useApiService-Bqe0bsFu.mjs.map
