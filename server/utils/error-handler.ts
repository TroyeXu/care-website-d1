// 統一的錯誤處理工具
import { H3Error, createError } from 'h3'

/**
 * 錯誤類型
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  DATABASE = 'DATABASE_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
}

/**
 * 錯誤詳情介面
 */
export interface ErrorDetails {
  type: ErrorType
  message: string
  field?: string
  details?: any
}

/**
 * 建立驗證錯誤
 */
export function createValidationError(
  message: string,
  field?: string,
  details?: any,
): H3Error {
  return createError({
    statusCode: 400,
    statusMessage: message,
    data: {
      type: ErrorType.VALIDATION,
      field,
      details,
    },
  })
}

/**
 * 建立認證錯誤
 */
export function createAuthenticationError(message: string = '未授權'): H3Error {
  return createError({
    statusCode: 401,
    statusMessage: message,
    data: {
      type: ErrorType.AUTHENTICATION,
    },
  })
}

/**
 * 建立權限錯誤
 */
export function createAuthorizationError(
  message: string = '權限不足',
): H3Error {
  return createError({
    statusCode: 403,
    statusMessage: message,
    data: {
      type: ErrorType.AUTHORIZATION,
    },
  })
}

/**
 * 建立未找到錯誤
 */
export function createNotFoundError(
  resource: string = '資源',
  id?: string,
): H3Error {
  const message = id ? `找不到 ${resource} (ID: ${id})` : `找不到${resource}`
  return createError({
    statusCode: 404,
    statusMessage: message,
    data: {
      type: ErrorType.NOT_FOUND,
      resource,
      id,
    },
  })
}

/**
 * 建立衝突錯誤
 */
export function createConflictError(message: string, details?: any): H3Error {
  return createError({
    statusCode: 409,
    statusMessage: message,
    data: {
      type: ErrorType.CONFLICT,
      details,
    },
  })
}

/**
 * 建立資料庫錯誤
 */
export function createDatabaseError(
  operation: string,
  originalError?: any,
): H3Error {
  console.error(`資料庫${operation}錯誤:`, originalError)

  return createError({
    statusCode: 500,
    statusMessage: `資料庫${operation}失敗`,
    data: {
      type: ErrorType.DATABASE,
      operation,
    },
  })
}

/**
 * 建立內部錯誤
 */
export function createInternalError(
  message: string = '內部伺服器錯誤',
  originalError?: any,
): H3Error {
  if (originalError) {
    console.error('內部錯誤:', originalError)
  }

  return createError({
    statusCode: 500,
    statusMessage: message,
    data: {
      type: ErrorType.INTERNAL,
    },
  })
}

/**
 * 處理已知錯誤
 * 如果是 H3Error 則直接拋出,否則記錄並拋出內部錯誤
 */
export function handleError(error: any, context?: string): never {
  // 如果已經是 H3Error,直接拋出
  if (error.statusCode) {
    throw error
  }

  // 否則記錄並建立內部錯誤
  const errorMessage = context
    ? `${context}錯誤: ${error.message || '未知錯誤'}`
    : error.message || '未知錯誤'

  console.error(errorMessage, error)

  throw createInternalError(context ? `${context}失敗` : '操作失敗', error)
}

/**
 * 安全執行非同步操作
 * 自動處理錯誤
 */
export async function tryCatch<T>(
  operation: () => Promise<T>,
  context?: string,
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    handleError(error, context)
  }
}
