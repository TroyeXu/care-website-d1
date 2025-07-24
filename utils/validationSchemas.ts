import * as yup from 'yup'

// 通用驗證規則
export const commonValidations = {
  email: yup
    .string()
    .required('電子郵件是必填的')
    .email('請輸入有效的電子郵件格式')
    .max(100, '電子郵件長度不能超過 100 個字符'),
    
  password: yup
    .string()
    .required('密碼是必填的')
    .min(8, '密碼至少需要 8 個字符')
    .max(50, '密碼長度不能超過 50 個字符')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      '密碼必須包含至少一個大寫字母、一個小寫字母和一個數字'
    ),
    
  confirmPassword: (passwordRef: string = 'password') =>
    yup
      .string()
      .required('請確認密碼')
      .oneOf([yup.ref(passwordRef)], '確認密碼不一致'),
      
  name: yup
    .string()
    .required('姓名是必填的')
    .min(2, '姓名至少需要 2 個字符')
    .max(50, '姓名長度不能超過 50 個字符')
    .matches(/^[a-zA-Z\u4e00-\u9fa5\s]+$/, '姓名只能包含中文、英文和空格'),
    
  phone: yup
    .string()
    .required('電話號碼是必填的')
    .matches(
      /^(09\d{8}|0[2-8]\d{7,8})$/,
      '請輸入有效的台灣電話號碼格式'
    ),
    
  age: yup
    .number()
    .positive('年齡必須是正數')
    .integer('年齡必須是整數')
    .min(18, '年齡不能小於 18 歲')
    .max(120, '年齡不能大於 120 歲')
    .nullable()
    .transform((value, originalValue) => originalValue === '' ? null : value),
    
  gender: yup
    .string()
    .oneOf(['男', '女', '其他'], '請選擇有效的性別')
    .nullable(),
    
  address: yup
    .string()
    .min(5, '地址至少需要 5 個字符')
    .max(200, '地址長度不能超過 200 個字符')
    .nullable(),
    
  emergencyContact: yup
    .string()
    .matches(
      /^(09\d{8}|0[2-8]\d{7,8})$/,
      '請輸入有效的緊急聯絡人電話號碼'
    )
    .nullable(),
}

// 登入表單驗證
export const loginSchema = yup.object({
  email: commonValidations.email,
  password: yup
    .string()
    .required('密碼是必填的')
    .min(1, '請輸入密碼'),
})

// 註冊表單驗證
export const registerSchema = yup.object({
  name: commonValidations.name,
  email: commonValidations.email,
  password: commonValidations.password,
  confirmPassword: commonValidations.confirmPassword(),
  phone: commonValidations.phone,
  role: yup
    .string()
    .required('請選擇用戶類型')
    .oneOf(['patient', 'caregiver'], '請選擇有效的用戶類型'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], '請同意服務條款和隱私政策'),
  
  // 個人資料部分（可選）
  profile: yup.object({
    age: commonValidations.age,
    gender: commonValidations.gender,
    address: commonValidations.address,
    emergencyContact: commonValidations.emergencyContact,
    medicalHistory: yup
      .array()
      .of(yup.string())
      .nullable(),
    preferences: yup
      .array()
      .of(yup.string())
      .nullable(),
  }).nullable(),
})

// 個人資料更新驗證
export const profileUpdateSchema = yup.object({
  name: commonValidations.name,
  phone: commonValidations.phone,
  profile: yup.object({
    age: commonValidations.age,
    gender: commonValidations.gender,
    address: commonValidations.address,
    emergencyContact: commonValidations.emergencyContact,
    medicalHistory: yup
      .array()
      .of(yup.string())
      .nullable(),
    preferences: yup
      .array()
      .of(yup.string())
      .nullable(),
  }).nullable(),
})

// 密碼重設驗證
export const passwordResetSchema = yup.object({
  email: commonValidations.email,
})

// 密碼變更驗證
export const passwordChangeSchema = yup.object({
  currentPassword: yup
    .string()
    .required('請輸入目前密碼'),
  newPassword: commonValidations.password,
  confirmNewPassword: commonValidations.confirmPassword('newPassword'),
})

// 聯絡表單驗證
export const contactSchema = yup.object({
  name: commonValidations.name,
  email: commonValidations.email,
  phone: commonValidations.phone,
  subject: yup
    .string()
    .required('主題是必填的')
    .min(5, '主題至少需要 5 個字符')
    .max(100, '主題長度不能超過 100 個字符'),
  message: yup
    .string()
    .required('訊息是必填的')
    .min(10, '訊息至少需要 10 個字符')
    .max(1000, '訊息長度不能超過 1000 個字符'),
})

// 預約表單驗證
export const bookingSchema = yup.object({
  caregiverId: yup
    .number()
    .required('請選擇看護師')
    .positive('請選擇有效的看護師'),
  serviceType: yup
    .string()
    .required('請選擇服務類型')
    .oneOf(['hourly', 'shift'], '請選擇有效的服務類型'),
  startDate: yup
    .date()
    .required('請選擇開始日期')
    .min(new Date(), '開始日期不能早於今天'),
  endDate: yup
    .date()
    .required('請選擇結束日期')
    .min(yup.ref('startDate'), '結束日期不能早於開始日期'),
  startTime: yup
    .string()
    .required('請選擇開始時間')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, '請輸入有效的時間格式 (HH:MM)'),
  endTime: yup
    .string()
    .required('請選擇結束時間')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, '請輸入有效的時間格式 (HH:MM)')
    .test('end-time-after-start', '結束時間必須晚於開始時間', function(value) {
      const { startTime } = this.parent
      if (!startTime || !value) return true
      
      const start = new Date(`2000-01-01 ${startTime}`)
      const end = new Date(`2000-01-01 ${value}`)
      
      return end > start
    }),
  specialRequests: yup
    .string()
    .max(500, '特殊需求描述不能超過 500 個字符')
    .nullable(),
  patientInfo: yup.object({
    name: commonValidations.name,
    age: yup
      .number()
      .required('患者年齡是必填的')
      .positive('年齡必須是正數')
      .integer('年齡必須是整數')
      .min(1, '年齡不能小於 1 歲')
      .max(120, '年齡不能大於 120 歲'),
    gender: yup
      .string()
      .required('請選擇患者性別')
      .oneOf(['男', '女'], '請選擇有效的性別'),
    medicalConditions: yup
      .array()
      .of(yup.string())
      .min(1, '請至少填寫一項醫療狀況'),
    emergencyContact: commonValidations.emergencyContact.required('緊急聯絡人電話是必填的'),
  }),
})

// 支付表單驗證
export const paymentSchema = yup.object({
  method: yup
    .string()
    .required('請選擇支付方式')
    .oneOf(['credit_card', 'bank_transfer', 'cash'], '請選擇有效的支付方式'),
  amount: yup
    .number()
    .required('金額是必填的')
    .positive('金額必須大於 0')
    .min(1, '最小金額為 1 元'),
  cardDetails: yup.object().when('method', {
    is: 'credit_card',
    then: (schema) => schema.shape({
      number: yup
        .string()
        .required('信用卡號碼是必填的')
        .matches(/^\d{16}$/, '信用卡號碼必須是 16 位數字'),
      expiryMonth: yup
        .string()
        .required('到期月份是必填的')
        .matches(/^(0[1-9]|1[0-2])$/, '請輸入有效的月份 (01-12)'),
      expiryYear: yup
        .string()
        .required('到期年份是必填的')
        .matches(/^\d{4}$/, '請輸入有效的年份 (YYYY)')
        .test('not-expired', '信用卡已過期', function(value) {
          if (!value) return true
          const { expiryMonth } = this.parent
          if (!expiryMonth) return true
          
          const now = new Date()
          const expiry = new Date(parseInt(value), parseInt(expiryMonth) - 1)
          
          return expiry >= now
        }),
      cvv: yup
        .string()
        .required('CVV 是必填的')
        .matches(/^\d{3,4}$/, 'CVV 必須是 3 或 4 位數字'),
    }),
    otherwise: (schema) => schema.nullable(),
  }),
})

// 評價表單驗證
export const reviewSchema = yup.object({
  rating: yup
    .number()
    .required('請給予評分')
    .min(1, '最低評分為 1 星')
    .max(5, '最高評分為 5 星')
    .integer('評分必須是整數'),
  comment: yup
    .string()
    .required('評論內容是必填的')
    .min(10, '評論至少需要 10 個字符')
    .max(500, '評論長度不能超過 500 個字符'),
})

// 匯出所有驗證 schema 的類型
export type LoginFormData = yup.InferType<typeof loginSchema>
export type RegisterFormData = yup.InferType<typeof registerSchema>
export type ProfileUpdateFormData = yup.InferType<typeof profileUpdateSchema>
export type PasswordResetFormData = yup.InferType<typeof passwordResetSchema>
export type PasswordChangeFormData = yup.InferType<typeof passwordChangeSchema>
export type ContactFormData = yup.InferType<typeof contactSchema>
export type BookingFormData = yup.InferType<typeof bookingSchema>
export type PaymentFormData = yup.InferType<typeof paymentSchema>
export type ReviewFormData = yup.InferType<typeof reviewSchema>