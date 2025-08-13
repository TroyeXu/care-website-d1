import type { Caregiver as BaseCaregiver } from '~/stores/caregivers'

// 擴展的 Caregiver 類型，用於前端顯示
export interface CaregiverDisplay extends BaseCaregiver {
  // 舊版相容屬性
  photo?: string // avatar 的別名
  available?: string // availability 的別名
  location?: string // service_areas[0] 的別名
  shift_rate?: number // 班制費率
  experience?: string // experience_years 的文字描述
  licenses?: string[] // certifications 的別名
  description?: string // bio 的別名
  skills?: string // specialties 的文字描述
}

// 類型轉換函數
export function toCaregiverDisplay(caregiver: BaseCaregiver): CaregiverDisplay {
  return {
    ...caregiver,
    photo: caregiver.avatar,
    available: caregiver.availability?.[0] || '全天候',
    location: caregiver.service_areas?.[0] || '',
    shift_rate: caregiver.hourly_rate * 12, // 假設12小時班
    experience: `${caregiver.experience_years}年經驗`,
    licenses: caregiver.certifications,
    description: caregiver.bio,
    skills: caregiver.specialties?.join('、') || '',
  }
}

