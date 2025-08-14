// 統一的使用者角色定義
export type UserRole = 'user' | 'caregiver' | 'admin' | 'patient'

// 統一的使用者型別
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  avatar_url?: string
  email_verified: boolean
  phone_verified: boolean
  created_at: string
  updated_at: string
  address?: string
  gender?: 'male' | 'female' | 'other'
}

// API 回應的標準格式
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 看護師型別
export interface Caregiver {
  id: string
  user_id: string
  name: string
  avatar?: string
  gender?: string
  address?: string
  hourly_rate: number
  experience_years: number
  bio: string
  rating: number
  total_reviews: number
  completion_rate: number
  response_rate: number
  background_checked: boolean
  drug_test_passed: boolean
  certifications: Array<{
    name: string
    issuer: string
    verified: boolean
  }>
  specialties: Array<{
    name: string
    category: string
  }>
  service_areas: Array<{
    city: string
    district: string
  }>
  recent_reviews: Array<{
    rating: number
    comment: string
    created_at: string
  }>
  status: string
  created_at: string
  updated_at?: string
  // 舊版相容屬性
  description?: string // bio 的別名
  skills?: string[] | string // specialties 的簡化版
  languages?: string[] // 語言能力
  availability?: {
    weekday?: boolean
    weekend?: boolean
    overnight?: boolean
  }
  reviews_count?: number // total_reviews 的別名
}

// 預約型別
export interface Booking {
  id: string
  user_id: string
  caregiver_id: string
  service_date: string
  start_time: string
  end_time: string
  total_hours: number
  hourly_rate: number
  total_amount: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
  caregiver?: Caregiver
  user?: User
  // 舊版相容屬性
  service_type?: string
  start_date?: string // service_date 的別名
  end_date?: string // 結束日期
  special_requests?: string // notes 的別名
  patient_info?: {
    name?: string
    age?: number
    gender?: string
    condition?: string
    special_needs?: string
    emergencyContact?: string
    medicalConditions?: string[]
  }
  total_cost?: number // total_amount 的別名
}

// 評價型別
export interface Review {
  id: string
  booking_id: string
  user_id: string
  caregiver_id: string
  rating: number
  comment: string
  created_at: string
  // 擴展屬性
  user_name?: string
  patient_id?: string
}

// 付款型別
export interface Payment {
  id: string
  booking_id: string
  user_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: string
  transaction_id?: string
  created_at: string
}
