// 統一的 API 回應格式工具

/**
 * 成功回應格式
 */
export interface SuccessResponse<T = any> {
  success: true
  data?: T
  message?: string
  meta?: {
    pagination?: PaginationMeta
    [key: string]: any
  }
}

/**
 * 分頁資訊格式
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * 建立成功回應
 */
export function createSuccessResponse<T = any>(
  data?: T,
  message?: string,
  meta?: SuccessResponse['meta'],
): SuccessResponse<T> {
  const response: SuccessResponse<T> = {
    success: true,
  }

  if (data !== undefined) {
    response.data = data
  }

  if (message) {
    response.message = message
  }

  if (meta) {
    response.meta = meta
  }

  return response
}

/**
 * 建立分頁回應
 */
export function createPaginatedResponse<T = any>(
  items: T[],
  pagination: PaginationMeta,
  message?: string,
): SuccessResponse<T[]> {
  return createSuccessResponse(items, message, { pagination })
}

/**
 * 計算分頁資訊
 */
export function calculatePagination(
  total: number,
  page: number = 1,
  limit: number = 20,
): PaginationMeta {
  return {
    page: Number(page),
    limit: Number(limit),
    total: Number(total),
    totalPages: Math.ceil(Number(total) / Number(limit)),
  }
}

/**
 * 計算偏移量
 */
export function calculateOffset(page: number = 1, limit: number = 20): number {
  return (Number(page) - 1) * Number(limit)
}
