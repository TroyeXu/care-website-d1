import { defineStore } from 'pinia'

export interface Caregiver {
  id: string
  name: string
  avatar: string
  gender: 'male' | 'female'
  age: number
  rating: number
  reviews_count: number
  hourly_rate: number
  experience_years: number
  bio: string
  description: string
  skills: string[]
  certifications: string[]
  languages: string[]
  service_areas: string[]
  availability: {
    weekdays: boolean
    weekends: boolean
    nights: boolean
    holidays: boolean
  }
  is_available: boolean
  total_service_hours: number
  response_rate: number
  response_time: string
  created_at: string
  updated_at: string
  reviews?: {
    id: string
    rating: number
    comment: string
    user_name: string
    created_at: string
  }[]
}

export interface CaregiverFilter {
  area?: string
  gender?: 'male' | 'female' | 'all'
  skills?: string[]
  languages?: string[]
  certifications?: string[]
  minRating?: number
  minRate?: number
  maxRate?: number
  minExperience?: number
  availability?: {
    weekdays?: boolean
    weekends?: boolean
    nights?: boolean
    holidays?: boolean
  }
  onlyAvailable?: boolean
}

export const useCaregiverStore = defineStore('caregivers', {
  state: () => ({
    caregivers: [] as Caregiver[],
    selectedCaregiver: null as Caregiver | null,
    currentFilter: null as CaregiverFilter | null,
    loading: false,
    error: null as string | null,
    searchQuery: '',
  }),

  getters: {
    getCaregiverById: (state) => (id: string) =>
      state.caregivers.find((c) => c.id === id),

    featuredCaregivers: (state) =>
      state.caregivers.filter((c) => c.rating >= 4.5),

    topRatedCaregivers: (state) =>
      state.caregivers.sort((a, b) => b.rating - a.rating).slice(0, 5),

    caregiversByArea: (state) => (area: string) =>
      state.caregivers.filter((c) => c.service_areas.includes(area)),

    caregiversByRating: (state) => (minRating: number) =>
      state.caregivers.filter((c) => c.rating >= minRating),

    caregiversByPriceRange: (state) => (minRate?: number, maxRate?: number) =>
      state.caregivers.filter((c) => {
        const minOk = !minRate || c.hourly_rate >= minRate
        const maxOk = !maxRate || c.hourly_rate <= maxRate
        return minOk && maxOk
      }),

    searchResults: (state) => {
      if (!state.searchQuery) return state.caregivers
      const query = state.searchQuery.toLowerCase()
      return state.caregivers.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.bio.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.skills.some((s) => s.toLowerCase().includes(query)) ||
          c.service_areas.some((a) => a.toLowerCase().includes(query)) ||
          c.certifications.some((cert) => cert.toLowerCase().includes(query)),
      )
    },

    getFilteredCaregivers: (state) => {
      let result = state.caregivers

      if (state.currentFilter) {
        const filter = state.currentFilter

        // 地區篩選
        if (filter.area) {
          result = result.filter((c) => c.service_areas.includes(filter.area!))
        }
        
        // 性別篩選
        if (filter.gender && filter.gender !== 'all') {
          result = result.filter((c) => c.gender === filter.gender)
        }
        
        // 技能篩選
        if (filter.skills && filter.skills.length > 0) {
          result = result.filter((c) =>
            filter.skills!.some(skill => c.skills.includes(skill))
          )
        }
        
        // 語言篩選
        if (filter.languages && filter.languages.length > 0) {
          result = result.filter((c) =>
            filter.languages!.some(lang => c.languages.includes(lang))
          )
        }
        
        // 證照篩選
        if (filter.certifications && filter.certifications.length > 0) {
          result = result.filter((c) =>
            filter.certifications!.some(cert => c.certifications.includes(cert))
          )
        }
        
        // 評分篩選
        if (filter.minRating) {
          result = result.filter((c) => c.rating >= filter.minRating!)
        }
        
        // 價格篩選
        if (filter.minRate) {
          result = result.filter((c) => c.hourly_rate >= filter.minRate!)
        }
        if (filter.maxRate) {
          result = result.filter((c) => c.hourly_rate <= filter.maxRate!)
        }
        
        // 經驗年數篩選
        if (filter.minExperience) {
          result = result.filter((c) => c.experience_years >= filter.minExperience!)
        }
        
        // 可用時段篩選
        if (filter.availability) {
          if (filter.availability.weekdays !== undefined) {
            result = result.filter((c) => c.availability.weekdays === filter.availability!.weekdays)
          }
          if (filter.availability.weekends !== undefined) {
            result = result.filter((c) => c.availability.weekends === filter.availability!.weekends)
          }
          if (filter.availability.nights !== undefined) {
            result = result.filter((c) => c.availability.nights === filter.availability!.nights)
          }
          if (filter.availability.holidays !== undefined) {
            result = result.filter((c) => c.availability.holidays === filter.availability!.holidays)
          }
        }
        
        // 只顯示可預約
        if (filter.onlyAvailable) {
          result = result.filter((c) => c.is_available)
        }
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.bio.toLowerCase().includes(query) ||
            c.description?.toLowerCase().includes(query) ||
            c.skills.some((s) => s.toLowerCase().includes(query)) ||
            c.service_areas.some((a) => a.toLowerCase().includes(query)) ||
            c.certifications.some((cert) => cert.toLowerCase().includes(query)),
        )
      }

      return result.sort((a, b) => b.rating - a.rating)
    },
  },

  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    setFilter(filter: CaregiverFilter | null) {
      this.currentFilter = filter
    },

    clearFilter() {
      this.currentFilter = null
      this.searchQuery = ''
    },

    async fetchCaregivers(filter?: CaregiverFilter) {
      this.loading = true
      this.error = null

      try {
        // 暫時使用模擬資料
        const { mockCaregivers } = await import('~/utils/mockData')
        
        // 模擬 API 延遲
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.caregivers = mockCaregivers
        
        // 如果有篩選條件，設定篩選器
        if (filter) {
          this.currentFilter = filter
        }
      } catch (err: unknown) {
        this.error = '載入照護員資料失敗'
        console.error('Error fetching caregivers:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchCaregiverById(id: string) {
      this.loading = true
      this.error = null

      try {
        const caregiver = await $fetch<Caregiver>(`/api/caregivers/${id}`)
        this.selectedCaregiver = caregiver
        return caregiver
      } catch (err: unknown) {
        this.error = err.data?.message || err.message || '載入照護員資料失敗'
        console.error('Error fetching caregiver:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    getRecommendedCaregivers(preferences?: {
      area?: string
      specialties?: string[]
      maxRate?: number
    }) {
      let candidates = [...this.caregivers]

      if (preferences) {
        if (preferences.area) {
          candidates = candidates.filter((c) =>
            c.service_areas.includes(preferences.area!),
          )
        }

        if (preferences.specialties && preferences.specialties.length > 0) {
          candidates = candidates.filter((c) =>
            preferences.specialties!.some((specialty) =>
              c.specialties.includes(specialty),
            ),
          )
        }

        if (preferences.maxRate) {
          candidates = candidates.filter(
            (c) => c.hourly_rate <= preferences.maxRate!,
          )
        }
      }

      return candidates
        .sort((a, b) => {
          // 優先評分，其次評價數
          if (b.rating !== a.rating) return b.rating - a.rating
          return b.reviews_count - a.reviews_count
        })
        .slice(0, 3)
    },
  },
})
