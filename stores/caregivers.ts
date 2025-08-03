import { defineStore } from 'pinia'

export interface Caregiver {
  id: string
  name: string
  avatar: string
  rating: number
  reviews_count: number
  hourly_rate: number
  experience_years: number
  bio: string
  certifications: string[]
  languages: string[]
  specialties: string[]
  service_areas: string[]
  created_at?: string
  updated_at?: string
  reviews?: any[]
}

export interface CaregiverFilter {
  area?: string
  specialty?: string
  minRating?: number
  minRate?: number
  maxRate?: number
}

export const useCaregiverStore = defineStore('caregivers', {
  state: () => ({
    caregivers: [] as Caregiver[],
    selectedCaregiver: null as Caregiver | null,
    currentFilter: null as CaregiverFilter | null,
    loading: false,
    error: null as string | null,
    searchQuery: ''
  }),

  getters: {
    getCaregiverById: (state) => (id: string) => 
      state.caregivers.find(c => c.id === id),
    
    featuredCaregivers: (state) => 
      state.caregivers.filter(c => c.rating >= 4.5),
    
    topRatedCaregivers: (state) => 
      state.caregivers.sort((a, b) => b.rating - a.rating).slice(0, 5),

    caregiversByArea: (state) => (area: string) =>
      state.caregivers.filter(c => c.service_areas.includes(area)),

    caregiversByRating: (state) => (minRating: number) =>
      state.caregivers.filter(c => c.rating >= minRating),

    caregiversByPriceRange: (state) => (minRate?: number, maxRate?: number) =>
      state.caregivers.filter(c => {
        const minOk = !minRate || c.hourly_rate >= minRate
        const maxOk = !maxRate || c.hourly_rate <= maxRate
        return minOk && maxOk
      }),

    searchResults: (state) => {
      if (!state.searchQuery) return state.caregivers
      const query = state.searchQuery.toLowerCase()
      return state.caregivers.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.bio.toLowerCase().includes(query) ||
        c.specialties.some(s => s.toLowerCase().includes(query)) ||
        c.service_areas.some(a => a.toLowerCase().includes(query)) ||
        c.certifications.some(cert => cert.toLowerCase().includes(query))
      )
    },

    getFilteredCaregivers: (state) => {
      let result = state.caregivers

      if (state.currentFilter) {
        const filter = state.currentFilter

        if (filter.area) {
          result = result.filter(c => c.service_areas.includes(filter.area!))
        }
        if (filter.minRating) {
          result = result.filter(c => c.rating >= filter.minRating!)
        }
        if (filter.minRate) {
          result = result.filter(c => c.hourly_rate >= filter.minRate!)
        }
        if (filter.maxRate) {
          result = result.filter(c => c.hourly_rate <= filter.maxRate!)
        }
        if (filter.specialty) {
          result = result.filter(c => 
            c.specialties.includes(filter.specialty!)
          )
        }
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.bio.toLowerCase().includes(query) ||
          c.specialties.some(s => s.toLowerCase().includes(query)) ||
          c.service_areas.some(a => a.toLowerCase().includes(query)) ||
          c.certifications.some(cert => cert.toLowerCase().includes(query))
        )
      }

      return result.sort((a, b) => b.rating - a.rating)
    }
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
        const query = new URLSearchParams()
        if (filter?.area) query.append('area', filter.area)
        if (filter?.specialty) query.append('specialty', filter.specialty)
        if (filter?.minRate) query.append('minRate', filter.minRate.toString())
        if (filter?.maxRate) query.append('maxRate', filter.maxRate.toString())
        
        const { caregivers } = await $fetch(`/api/caregivers?${query}`)
        this.caregivers = caregivers || []
      } catch (err: any) {
        this.error = err.data?.message || err.message || '載入照護員資料失敗'
        console.error('Error fetching caregivers:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchCaregiverById(id: string) {
      this.loading = true
      this.error = null
      
      try {
        const caregiver = await $fetch(`/api/caregivers/${id}`)
        this.selectedCaregiver = caregiver
        return caregiver
      } catch (err: any) {
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
          candidates = candidates.filter(c => 
            c.service_areas.includes(preferences.area!)
          )
        }
        
        if (preferences.specialties && preferences.specialties.length > 0) {
          candidates = candidates.filter(c =>
            preferences.specialties!.some(specialty =>
              c.specialties.includes(specialty)
            )
          )
        }

        if (preferences.maxRate) {
          candidates = candidates.filter(c => 
            c.hourly_rate <= preferences.maxRate!
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
    }
  }
})
