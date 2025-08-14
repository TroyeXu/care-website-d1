import type { Caregiver } from '../../shared/types'

// 擴展的 Caregiver 類型，用於前端顯示
export interface CaregiverDisplay extends Caregiver {
  // 舊版相容屬性
  photo?: string // avatar 的別名
  available?: string // availability 的別名
  location?: string // service_areas[0] 的別名
  shift_rate?: number // 班制費率
  experience?: string // experience_years 的文字描述
  licenses?: string[] // certifications 的別名
  description?: string // bio 的別名
  skills?: string // specialties 的文字描述
  is_available?: boolean // 是否可用
  reviews_count?: number // 評價數量
}

// 類型轉換函數
export function toCaregiverDisplay(caregiver: Caregiver): CaregiverDisplay {
  return {
    ...caregiver,
    photo: caregiver.avatar,
    available: caregiver.status === 'available' ? '可預約' : '已滿檔',
    location: caregiver.service_areas?.[0]
      ? `${caregiver.service_areas[0].city}${caregiver.service_areas[0].district}`
      : '',
    shift_rate: caregiver.hourly_rate * 12, // 假設12小時班
    experience: `${caregiver.experience_years}年經驗`,
    licenses: caregiver.certifications?.map((c) => c.name) || [],
    description: caregiver.bio,
    skills: caregiver.specialties?.map((s) => s.name).join('、') || '',
    is_available: caregiver.status === 'available',
    reviews_count: caregiver.total_reviews || 0,
  }
}
