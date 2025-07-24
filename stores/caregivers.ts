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
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('caregivers')
          .select('*')
          .order('rating', { ascending: false })
        
        if (error) throw error
        this.caregivers = data || mockCaregivers
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching caregivers:', err)
        this.caregivers = mockCaregivers
      } finally {
        this.loading = false
      }
    },

    async fetchCaregiverById(id: number) {
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('caregivers')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error) throw error
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error fetching caregiver:', err)
        return this.getCaregiverById(id)
      }
    },

    async createCaregiver(caregiverData: Omit<Caregiver, 'id' | 'created_at' | 'updated_at'>) {
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('caregivers')
          .insert([caregiverData])
          .select()
          .single()
        
        if (error) throw error
        
        this.caregivers.push(data)
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error creating caregiver:', err)
        
        const newCaregiver = {
          ...caregiverData,
          id: Math.max(...this.caregivers.map(c => c.id)) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        this.caregivers.push(newCaregiver)
        return newCaregiver
      }
    },

    async updateCaregiver(id: number, updates: Partial<Caregiver>) {
      try {
        const { supabase } = useSupabase()
        const { data, error } = await supabase
          .from('caregivers')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        
        if (error) throw error
        
        const index = this.caregivers.findIndex(c => c.id === id)
        if (index !== -1) {
          this.caregivers[index] = data
        }
        
        return data
      } catch (err: any) {
        this.error = err.message
        console.error('Error updating caregiver:', err)
        
        const index = this.caregivers.findIndex(c => c.id === id)
        if (index !== -1) {
          this.caregivers[index] = {
            ...this.caregivers[index],
            ...updates,
            updated_at: new Date().toISOString()
          }
          return this.caregivers[index]
        }
        throw err
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
