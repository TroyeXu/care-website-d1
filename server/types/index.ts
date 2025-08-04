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

// Re-export common types
export type { User, Booking, Payment, Review } from '~/utils/mockData'
