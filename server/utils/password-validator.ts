// 密碼驗證工具

export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * 驗證密碼強度
 * 要求：
 * - 至少 8 個字元
 * - 至少包含一個大寫字母
 * - 至少包含一個小寫字母
 * - 至少包含一個數字
 * - 至少包含一個特殊字元 (!@#$%^&*()_+-=[]{}|;:,.<>?)
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []

  // 檢查長度
  if (!password || password.length < 8) {
    errors.push('密碼長度至少需要 8 個字元')
  }

  // 檢查是否包含大寫字母
  if (!/[A-Z]/.test(password)) {
    errors.push('密碼需包含至少一個大寫字母')
  }

  // 檢查是否包含小寫字母
  if (!/[a-z]/.test(password)) {
    errors.push('密碼需包含至少一個小寫字母')
  }

  // 檢查是否包含數字
  if (!/[0-9]/.test(password)) {
    errors.push('密碼需包含至少一個數字')
  }

  // 檢查是否包含特殊字元
  if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
    errors.push('密碼需包含至少一個特殊字元 (!@#$%^&*等)')
  }

  // 檢查是否包含空白字元
  if (/\s/.test(password)) {
    errors.push('密碼不可包含空白字元')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * 驗證密碼（簡化版）
 * 要求：
 * - 至少 6 個字元
 * - 至少包含一個字母和一個數字
 */
export function validatePasswordSimple(
  password: string,
): PasswordValidationResult {
  const errors: string[] = []

  // 檢查長度
  if (!password || password.length < 6) {
    errors.push('密碼長度至少需要 6 個字元')
  }

  // 檢查是否包含字母
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('密碼需包含至少一個字母')
  }

  // 檢查是否包含數字
  if (!/[0-9]/.test(password)) {
    errors.push('密碼需包含至少一個數字')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * 檢查密碼強度等級
 * @returns 強度等級: weak, medium, strong
 */
export function getPasswordStrength(
  password: string,
): 'weak' | 'medium' | 'strong' {
  if (!password) return 'weak'

  let score = 0

  // 長度評分
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++

  // 字元類型評分
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) score++

  // 判斷強度
  if (score >= 6) return 'strong'
  if (score >= 4) return 'medium'
  return 'weak'
}

/**
 * 產生隨機強密碼
 * @param length 密碼長度，預設 16
 */
export function generateStrongPassword(length: number = 16): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  const allChars = uppercase + lowercase + numbers + special

  let password = ''

  // 確保至少包含每種字元類型
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]

  // 填充剩餘長度
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // 打亂順序
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}
