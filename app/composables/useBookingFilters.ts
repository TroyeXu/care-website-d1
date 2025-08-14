import {} from 'vue'
import type { CaregiverDisplay } from '~/types/caregiver'
// import type { Caregiver } from '~/stores/caregivers' // 已使用 CaregiverDisplay

// 篩選器配置介面
interface FilterConfig {
  location?: string[]
  skills?: string[]
  rating?: { min: number; max: number }
  hourlyRate?: { min: number; max: number }
  availability?: string[]
  experience?: { min: number; max: number }
  status?: string[]
  dateRange?: { start: string; end: string }
}

// 媒合偏好設定
interface MatchPreferences {
  location: string | null
  maxHourlyRate: number | null
  minRating: number | null
  requiredSkills: string[]
  preferredGender: string | null
  preferredExperience: number | null
}

export const useBookingFilters = () => {
  // 基礎篩選選項
  const locationOptions = [
    { label: '台北市', value: '台北市' },
    { label: '新北市', value: '新北市' },
    { label: '桃園市', value: '桃園市' },
    { label: '台中市', value: '台中市' },
    { label: '台南市', value: '台南市' },
    { label: '高雄市', value: '高雄市' },
  ]

  const skillOptions = [
    '基礎護理',
    '傷口照護',
    '管路照護',
    '復健協助',
    '失智照護',
    '慢性病照護',
    '術後照護',
    '居家護理',
    '用藥管理',
    '生活照護',
    '心理支持',
    '營養管理',
  ]

  const statusOptions = [
    { label: '全部狀態', value: null },
    { label: '待確認', value: 'pending' },
    { label: '已確認', value: 'confirmed' },
    { label: '進行中', value: 'in_progress' },
    { label: '已完成', value: 'completed' },
    { label: '已取消', value: 'cancelled' },
  ]

  const availabilityOptions = [
    { label: '立即可用', value: 'immediate' },
    { label: '本週可用', value: 'this_week' },
    { label: '本月可用', value: 'this_month' },
    { label: '未來可用', value: 'future' },
  ]

  // 媒合算分邏輯
  const calculateMatchScore = (
    caregiver: CaregiverDisplay,
    preferences: MatchPreferences,
  ): number => {
    let score = 0.5 // 基礎分

    // 評分加分 (30%)
    if (caregiver.rating) {
      score += (caregiver.rating / 5) * 0.3
    }

    // 地區匹配 (25%)
    if (
      preferences.location &&
      caregiver.location?.includes(preferences.location)
    ) {
      score += 0.25
    }

    // 技能匹配 (25%)
    if (preferences.requiredSkills.length > 0 && caregiver.skills) {
      const matchedSkills = preferences.requiredSkills.filter((skill) =>
        (caregiver.skills || '').toLowerCase().includes(skill.toLowerCase()),
      )
      score += (matchedSkills.length / preferences.requiredSkills.length) * 0.25
    }

    // 價格合理性 (20%)
    if (
      preferences.maxHourlyRate &&
      caregiver.hourly_rate <= preferences.maxHourlyRate
    ) {
      score += 0.2
    }

    return Math.min(score, 1)
  }

  // 獲取媒合原因
  const getMatchReasons = (
    caregiver: CaregiverDisplay,
    preferences: MatchPreferences,
  ): string[] => {
    const reasons: string[] = []

    if (caregiver.rating >= 4.5) {
      reasons.push('高評分推薦')
    }

    if (
      preferences.location &&
      caregiver.location?.includes(preferences.location)
    ) {
      reasons.push('地區匹配')
    }

    if (preferences.requiredSkills.length > 0) {
      const matchedSkills = preferences.requiredSkills.filter((skill) =>
        caregiver.skills?.toLowerCase().includes(skill.toLowerCase()),
      )
      if (matchedSkills.length > 0) {
        reasons.push(`專業技能: ${matchedSkills.join('、')}`)
      }
    }

    if (
      preferences.maxHourlyRate &&
      caregiver.hourly_rate <= preferences.maxHourlyRate
    ) {
      reasons.push('價格合理')
    }

    // Note: 使用 experience 字段而非 experience_years，因為 Caregiver 接口中沒有 experience_years
    // if (caregiver.experience_years >= 5) {
    //   reasons.push('經驗豐富')
    // }

    return reasons
  }

  // 篩選器邏輯
  const filterCaregivers = (
    caregivers: CaregiverDisplay[],
    filters: FilterConfig,
  ) => {
    return caregivers.filter((caregiver) => {
      // 地區篩選
      if (filters.location && filters.location.length > 0) {
        if (
          !filters.location.some((loc) => caregiver.location?.includes(loc))
        ) {
          return false
        }
      }

      // 技能篩選
      if (filters.skills && filters.skills.length > 0) {
        if (
          !filters.skills.some((skill) =>
            caregiver.skills?.toLowerCase().includes(skill.toLowerCase()),
          )
        ) {
          return false
        }
      }

      // 評分篩選
      if (filters.rating) {
        if (
          caregiver.rating < filters.rating.min ||
          caregiver.rating > filters.rating.max
        ) {
          return false
        }
      }

      // 時薪篩選
      if (filters.hourlyRate) {
        if (
          caregiver.hourly_rate < filters.hourlyRate.min ||
          caregiver.hourly_rate > filters.hourlyRate.max
        ) {
          return false
        }
      }

      // 經驗篩選 - 注意：Caregiver 接口中沒有 experience_years 字段
      // if (filters.experience) {
      //   if (caregiver.experience_years < filters.experience.min ||
      //       caregiver.experience_years > filters.experience.max) {
      //     return false
      //   }
      // }

      return true
    })
  }

  // 排序邏輯
  const sortCaregivers = (
    caregivers: CaregiverDisplay[],
    sortBy: string = 'match_score',
    order: 'asc' | 'desc' = 'desc',
  ) => {
    return [...caregivers].sort((a, b) => {
      let aValue = (a as any)[sortBy]
      let bValue = (b as any)[sortBy]

      // 處理不同類型的值
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (order === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
  }

  // 預設篩選器狀態
  const createDefaultFilters = (): FilterConfig => ({
    location: [],
    skills: [],
    rating: { min: 1, max: 5 },
    hourlyRate: { min: 0, max: 2000 },
    availability: [],
    experience: { min: 0, max: 20 },
    status: [],
  })

  // 預設媒合偏好
  const createDefaultPreferences = (): MatchPreferences => ({
    location: null,
    maxHourlyRate: null,
    minRating: null,
    requiredSkills: [],
    preferredGender: null,
    preferredExperience: null,
  })

  return {
    // 選項
    locationOptions,
    skillOptions,
    statusOptions,
    availabilityOptions,

    // 工具函數
    calculateMatchScore,
    getMatchReasons,
    filterCaregivers,
    sortCaregivers,

    // 預設值
    createDefaultFilters,
    createDefaultPreferences,
  }
}
