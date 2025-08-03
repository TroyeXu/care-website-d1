import { ref } from 'vue'
import { useApiRoutes } from './useApiRoutes'

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  data?: any
  params?: Record<string, any>
  headers?: Record<string, string>
  timeout?: number
  retry?: number
  mockDelay?: number
}

export interface ApiError {
  status: number
  message: string
  code?: string
  details?: any
}

export const useHttpClient = () => {
  const { errorMessages, isSuccessStatus } = useApiRoutes()
  
  const isLoading = ref(false)
  const error = ref<ApiError | null>(null)
  const abortController = ref<AbortController | null>(null)

  // 建立查詢參數字串
  const createQueryString = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(item => searchParams.append(key, item.toString()))
        } else {
          searchParams.append(key, value.toString())
        }
      }
    })
    
    return searchParams.toString()
  }

  // 模擬延遲
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // 模擬 API 響應
  const mockResponse = async <T>(data: T, config: RequestConfig): Promise<T> => {
    if (config.mockDelay) {
      await delay(config.mockDelay)
    }

    // 5% 機率模擬錯誤
    if (Math.random() < 0.05) {
      throw new Error('Mock API error')
    }

    return data
  }

  // 處理請求錯誤
  const handleError = (error: any, url: string): ApiError => {
    console.error(`API Error [${url}]:`, error)

    if (error.name === 'AbortError') {
      return {
        status: 0,
        message: '請求已取消',
        code: 'ABORTED'
      }
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        status: 0,
        message: '網路連線錯誤',
        code: 'NETWORK_ERROR'
      }
    }

    const status = error.status || 500
    const message = errorMessages[status as keyof typeof errorMessages] || error.message || '未知錯誤'

    return {
      status,
      message,
      code: error.code,
      details: error.details
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
          ...config.headers
        }
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
          throw {
            status: response.status,
            message: errorData.message || errorMessages[response.status as keyof typeof errorMessages] || 'API 請求失敗',
            code: errorData.code,
            details: errorData.details
          }
        }

        const data = await response.json()
        return data as T
      } catch (fetchError) {
        clearTimeout(timeoutId)
        throw fetchError
      }
    } catch (err: any) {
      error.value = handleError(err, config.url)
      throw error.value
    } finally {
      isLoading.value = false
      abortController.value = null
    }
  }

  // 便捷方法
  const get = <T>(url: string, params?: Record<string, any>, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'GET',
      url,
      params,
      ...options
    })
  }

  const post = <T>(url: string, data?: any, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'POST',
      url,
      data,
      ...options
    })
  }

  const put = <T>(url: string, data?: any, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'PUT',
      url,
      data,
      ...options
    })
  }

  const patch = <T>(url: string, data?: any, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'PATCH',
      url,
      data,
      ...options
    })
  }

  const del = <T>(url: string, options?: Partial<RequestConfig>) => {
    return request<T>({
      method: 'DELETE',
      url,
      ...options
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
  const retry = async <T>(config: RequestConfig, maxRetries: number = 3): Promise<T> => {
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
    
    // 工具
    mockResponse
  }
}