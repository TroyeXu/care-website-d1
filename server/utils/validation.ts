// 統一的驗證工具
import { createValidationError } from './error-handler'

/**
 * 驗證必填欄位
 */
export function validateRequired(
  value: any,
  fieldName: string,
  displayName?: string,
): void {
  if (value === undefined || value === null || value === '') {
    throw createValidationError(
      `請提供${displayName || fieldName}`,
      fieldName,
    )
  }
}

/**
 * 驗證多個必填欄位
 */
export function validateRequiredFields(
  data: Record<string, any>,
  fields: Array<{ name: string; display?: string }>,
): void {
  for (const field of fields) {
    validateRequired(data[field.name], field.name, field.display)
  }
}

/**
 * 驗證 Email 格式
 */
export function validateEmail(email: string, fieldName: string = 'email'): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createValidationError('Email 格式不正確', fieldName)
  }
}

/**
 * 驗證電話號碼 (台灣手機)
 */
export function validatePhone(
  phone: string,
  fieldName: string = 'phone',
): void {
  const phoneRegex = /^09\d{8}$/
  if (!phoneRegex.test(phone)) {
    throw createValidationError('電話號碼格式不正確 (09開頭共10碼)', fieldName)
  }
}

/**
 * 驗證數字範圍
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number,
  fieldName: string,
  displayName?: string,
): void {
  const num = Number(value)
  if (isNaN(num) || num < min || num > max) {
    throw createValidationError(
      `${displayName || fieldName}必須在 ${min} 到 ${max} 之間`,
      fieldName,
    )
  }
}

/**
 * 驗證字串長度
 */
export function validateStringLength(
  value: string,
  min: number,
  max: number,
  fieldName: string,
  displayName?: string,
): void {
  if (value.length < min || value.length > max) {
    throw createValidationError(
      `${displayName || fieldName}長度必須在 ${min} 到 ${max} 個字元之間`,
      fieldName,
    )
  }
}

/**
 * 驗證列舉值
 */
export function validateEnum(
  value: string,
  allowedValues: string[],
  fieldName: string,
  displayName?: string,
): void {
  if (!allowedValues.includes(value)) {
    throw createValidationError(
      `${displayName || fieldName}必須是以下其中之一: ${allowedValues.join(', ')}`,
      fieldName,
      { allowedValues },
    )
  }
}

/**
 * 驗證正整數
 */
export function validatePositiveInteger(
  value: any,
  fieldName: string,
  displayName?: string,
): void {
  const num = Number(value)
  if (!Number.isInteger(num) || num <= 0) {
    throw createValidationError(
      `${displayName || fieldName}必須是正整數`,
      fieldName,
    )
  }
}

/**
 * 驗證日期格式 (YYYY-MM-DD)
 */
export function validateDateFormat(
  date: string,
  fieldName: string = 'date',
): void {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) {
    throw createValidationError(
      '日期格式不正確 (請使用 YYYY-MM-DD)',
      fieldName,
    )
  }

  // 驗證日期是否有效
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) {
    throw createValidationError('無效的日期', fieldName)
  }
}

/**
 * 驗證時間格式 (HH:MM)
 */
export function validateTimeFormat(
  time: string,
  fieldName: string = 'time',
): void {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  if (!timeRegex.test(time)) {
    throw createValidationError('時間格式不正確 (請使用 HH:MM)', fieldName)
  }
}

/**
 * 驗證 ID 格式 (非空字串)
 */
export function validateId(id: any, fieldName: string = 'id'): void {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw createValidationError('無效的 ID', fieldName)
  }
}

/**
 * 驗證分頁參數
 */
export function validatePaginationParams(page: number, limit?: number): void {
  if (page < 1 || !Number.isInteger(page)) {
    throw createValidationError('頁碼必須是大於 0 的整數', 'page')
  }

  if (limit !== undefined && (limit < 1 || limit > 100 || !Number.isInteger(limit))) {
    throw createValidationError('每頁筆數必須在 1 到 100 之間的整數', 'limit')
  }
}
