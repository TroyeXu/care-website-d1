// Server-side type definitions

export interface ServerCaregiver {
  id: string
  user_id: string
  name: string
  avatar: string
  rating: number
  reviews_count: number
  hourly_rate: number
  experience_years: number
  certifications: string[]
  languages: string[]
  specialties: string[]
  service_areas: string[]
  availability: Record<string, any>
  bio: string
  created_at: string
  updated_at: string
}

// 定義伺服器端的型別
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: string
  status?: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  caregiver_id: string
  service_date: string
  start_time: string
  end_time?: string
  service_hours?: number
  service_location?: string
  service_type: string
  requirements?: string
  status: string
  total_amount: number
  payment_status?: string
  payment_method?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  booking_id: string
  amount: number
  status: string
  payment_method: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  booking_id: string
  caregiver_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}
