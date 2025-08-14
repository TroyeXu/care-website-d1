import { ref, readonly } from 'vue'
import { useApiRoutes } from './useApiRoutes'

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: Record<string, unknown> | FormData
  params?: Record<string, string | number | boolean>
  headers?: Record<string, string>
  timeout?: number
  retry?: number
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: Record<string, unknown>
}

export const useHttpClient = () => {
  const { errorMessages, isSuccessStatus } = useApiRoutes()

  const isLoading = ref(false)
  const error = ref<ApiError | null>(null)
  const abortController = ref<AbortController | null>(null)

  // 建立查詢參數字串
  const createQueryString = (
    params: Record<string, string | number | boolean>,
  ): string => {
    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, item.toString()))
        } else {
          searchParams.append(key, value.toString())
        }
      }
    })

    return searchParams.toString()
  }

  // 延遲函數（用於重試機制）
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  // 處理請求錯誤
  const handleError = (error: unknown, url: string): ApiError => {
    console.error(`API Error [${url}]:`, error)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          status: 0,
          message: '請求已取消',
          code: 'ABORTED',
        }
      }

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return {
          status: 0,
          message: '網路連線錯誤',
          code: 'NETWORK_ERROR',
        }
      }
    }

    // 處理 HTTP 錯誤響應
    const errorObj = error as {
      status?: number
      message?: string
      code?: string
      details?: Record<string, unknown>
    }

    const status = errorObj.status || 500
    const message =
      errorMessages[status as keyof typeof errorMessages] ||
      errorObj.message ||
      (error instanceof Error ? error.message : '未知錯誤')

    return {
      status,
      message,
      code: errorObj.code,
      details: errorObj.details,
    }
  }

  // 執行 HTTP 請求
  const request = async <T>(config: RequestConfig): Promise<T> => {
    isLoading.value = true
    error.value = null

    try {
      // 建立取消控制器
      abortController.value = new AbortController()

      // 處理查詢參數
      let fullUrl = config.url
      if (config.params) {
        const queryString = createQueryString(config.params)
        fullUrl += queryString ? `?${queryString}` : ''
      }

      // 建立請求配置
      const requestConfig: RequestInit = {
        method: config.method,
        signal: abortController.value.signal,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      }

      // 添加請求體
      if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
        requestConfig.body = JSON.stringify(config.data)
      }

      // 設定超時
      const timeout = config.timeout || 10000
      const timeoutId = setTimeout(() => {
        abortController.value?.abort()
      }, timeout)

      try {
        const response = await fetch(fullUrl, requestConfig)
        clearTimeout(timeoutId)

        if (!isSuccessStatus(response.status)) {
          const errorData = await response.json().catch(() => ({}))
          const error = new Error(
            errorData.message ||
              errorMessages[response.status as keyof typeof errorMessages] ||
              'API 請求失敗',
          )
          ;(error as any).status = response.status
          ;(error as any).code = errorData.code
          ;(error as any).details = errorData.details
          throw error
        }

        const data = await response.json()
        return data as T
      } catch (fetchError) {
        clearTimeout(timeoutId)
        throw fetchError
      }
    } catch (err: unknown) {
      const apiError = handleError(err, config.url)
      error.value = apiError
      const errorObj = new Error(apiError.message)
      ;(errorObj as any).status = apiError.status
      ;(errorObj as any).code = apiError.code
      ;(errorObj as any).details = apiError.details
      throw errorObj
    } finally {
      isLoading.value = false
      abortController.value = null
    }
  }

  // 便捷方法
  const get = <T>(
    url: string,
    params?: Record<string, any>,
    options?: Partial<RequestConfig>,
  ) => {
    return request<T>({
      method: 'GET',
      url,
      params,
      ...options,
    })
  }

  const post = <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    options?: Partial<RequestConfig>,
  ) => {
    return request<T>({
      method: 'POST',
      url,
      data,
      ...options,
    })
  }

  const put = <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    options?: Partial<RequestConfig>,
  ) => {
    return request<T>({
      method: 'PUT',
      url,
      data,
      ...options,
    })
  }

  const patch = <T>(
    url: string,
    data?: Record<string, unknown> | FormData,
    options?: Partial<RequestConfig>,
  ) => {
    return request<T>({
      method: 'PATCH',
      url,
      data,
      ...options,
    })
  }

  const del = <T>(url: string, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'DELETE',
      url,
      ...options,
    })
  }

  // 取消請求
  const cancel = () => {
    abortController.value?.abort()
  }

  // 清除錯誤
  const clearError = () => {
    error.value = null
  }

  // 重試機制
  const retry = async <T>(
    config: RequestConfig,
    maxRetries: number = 3,
  ): Promise<T> => {
    let lastError: ApiError | null = null

    for (let i = 0; i <= maxRetries; i++) {
      try {
        return await request<T>(config)
      } catch (err) {
        lastError = err as ApiError

        // 不重試客戶端錯誤
        if (lastError.status >= 400 && lastError.status < 500) {
          break
        }

        // 最後一次嘗試
        if (i === maxRetries) {
          break
        }

        // 等待後重試
        await delay(Math.pow(2, i) * 1000)
      }
    }

    throw lastError
  }

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
  }
}
