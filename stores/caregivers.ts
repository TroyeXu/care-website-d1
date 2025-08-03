import { defineStore } from 'pinia'
import { mockCaregivers } from '~/utils/mockData'

export interface Caregiver {
  id: number
  name: string
  experience: string
  skills: string
  licenses: string[]
  rating: number
  photo: string
  available: string
  hourly_rate: number
  shift_rate: number
  location?: string
  description?: string
  review_count?: number
  created_at: string
  updated_at: string
}

export interface CaregiverFilter {
  location?: string
  minRating?: number
  maxHourlyRate?: number
  maxShiftRate?: number
  licenses?: string[]
  availability?: string
  skills?: string[]
}

export const useCaregiverStore = defineStore('caregivers', {
  state: () => ({
    caregivers: mockCaregivers as Caregiver[],
    filteredCaregivers: [] as Caregiver[],
    currentFilter: null as CaregiverFilter | null,
    loading: false,
    error: null as string | null,
    searchQuery: ''
  }),

  getters: {
    getCaregiverById: (state) => (id: number) => 
      state.caregivers.find(c => c.id === id),
    
    availableCaregivers: (state) => 
      state.caregivers.filter(c => c.available),
    
    topRatedCaregivers: (state) => 
      state.caregivers.sort((a, b) => b.rating - a.rating).slice(0, 5),

    caregiversByLocation: (state) => (location: string) =>
      state.caregivers.filter(c => c.location?.includes(location)),

    caregiversByRating: (state) => (minRating: number) =>
      state.caregivers.filter(c => c.rating >= minRating),

    caregiversByPriceRange: (state) => (maxHourlyRate?: number, maxShiftRate?: number) =>
      state.caregivers.filter(c => {
        const hourlyOk = !maxHourlyRate || c.hourly_rate <= maxHourlyRate
        const shiftOk = !maxShiftRate || c.shift_rate <= maxShiftRate
        return hourlyOk && shiftOk
      }),

    searchResults: (state) => {
      if (!state.searchQuery) return state.caregivers
      const query = state.searchQuery.toLowerCase()
      return state.caregivers.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.skills.toLowerCase().includes(query) ||
        c.experience.toLowerCase().includes(query) ||
        c.location?.toLowerCase().includes(query) ||
        c.licenses.some(license => license.toLowerCase().includes(query))
      )
    },

    getFilteredCaregivers: (state) => {
      let result = state.caregivers

      if (state.currentFilter) {
        const filter = state.currentFilter

        if (filter.location) {
          result = result.filter(c => c.location?.includes(filter.location!))
        }
        if (filter.minRating) {
          result = result.filter(c => c.rating >= filter.minRating!)
        }
        if (filter.maxHourlyRate) {
          result = result.filter(c => c.hourly_rate <= filter.maxHourlyRate!)
        }
        if (filter.maxShiftRate) {
          result = result.filter(c => c.shift_rate <= filter.maxShiftRate!)
        }
        if (filter.licenses && filter.licenses.length > 0) {
          result = result.filter(c => 
            filter.licenses!.some(license => c.licenses.includes(license))
          )
        }
        if (filter.skills && filter.skills.length > 0) {
          result = result.filter(c =>
            filter.skills!.some(skill => 
              c.skills.toLowerCase().includes(skill.toLowerCase())
            )
          )
        }
        if (filter.availability) {
          result = result.filter(c => c.available.includes(filter.availability!))
        }
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(c => 
          c.name.toLowerCase().includes(query) ||
          c.skills.toLowerCase().includes(query) ||
          c.experience.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query) ||
          c.licenses.some(license => license.toLowerCase().includes(query))
        )
      }

      return result.sort((a, b) => b.rating - a.rating)
    }
  },

  actions: {
    loadMockData() {
      this.caregivers = mockCaregivers
    },

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

    async fetchCaregivers() {
      this.loading = true
      this.error = null
      
      try {
        const { caregivers } = await $fetch('/api/caregivers')
        this.caregivers = caregivers || mockCaregivers
      } catch (err: any) {
        this.error = err.data?.message || err.message || '載入照護員資料失敗'
        console.error('Error fetching caregivers:', err)
        this.caregivers = mockCaregivers
      } finally {
        this.loading = false
      }
    },

    async fetchCaregiverById(id: string) {
      try {
        const caregiver = await $fetch(`/api/caregivers/${id}`)
        return caregiver
      } catch (err: any) {
        this.error = err.data?.message || err.message || '載入照護員資料失敗'
        console.error('Error fetching caregiver:', err)
        return this.getCaregiverById(Number(id))
      }
    },

    async createCaregiver(caregiverData: Omit<Caregiver, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const newCaregiver = await $fetch<Caregiver>('/api/caregivers', {
          method: 'POST' as const,
          body: caregiverData
        })
        
        this.caregivers.push(newCaregiver)
        return newCaregiver
      } catch (err: any) {
        this.error = err.data?.message || err.message || '建立照護員資料失敗'
        console.error('Error creating caregiver:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    async updateCaregiver(id: string, updates: Partial<Caregiver>) {
      try {
        const updatedCaregiver = await $fetch<Caregiver>(`/api/caregivers/${id}`, {
          method: 'PUT' as const,
          body: updates
        })
        
        const index = this.caregivers.findIndex(c => c.id === Number(id))
        if (index !== -1) {
          this.caregivers[index] = updatedCaregiver
        }
        
        return updatedCaregiver
      } catch (err: any) {
        this.error = err.data?.message || err.message || '更新照護員資料失敗'
        console.error('Error updating caregiver:', err)
        throw new Error(this.error || '未知錯誤')
      }
    },

    getRecommendedCaregivers(userPreferences?: {
      location?: string
      skills?: string[]
      maxPrice?: number
      serviceType?: 'hourly' | 'shift'
    }) {
      let candidates = [...this.caregivers]

      if (userPreferences) {
        if (userPreferences.location) {
          candidates = candidates.filter(c => 
            c.location?.includes(userPreferences.location!)
          )
        }
        
        if (userPreferences.skills && userPreferences.skills.length > 0) {
          candidates = candidates.filter(c =>
            userPreferences.skills!.some(skill =>
              c.skills.toLowerCase().includes(skill.toLowerCase())
            )
          )
        }

        if (userPreferences.maxPrice) {
          candidates = candidates.filter(c => {
            const price = userPreferences.serviceType === 'shift' 
              ? c.shift_rate 
              : c.hourly_rate
            return price <= userPreferences.maxPrice!
          })
        }
      }

      return candidates
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
    }
  }
})
