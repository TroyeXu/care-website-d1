import type { Caregiver } from '../../shared/types'

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

    caregiversByArea:
      (state) => (area: string | { city: string; district: string }) =>
        state.caregivers.filter((c) => {
          if (typeof area === 'string') {
            return c.service_areas.some((a) =>
              `${a.city}${a.district}`.includes(area),
            )
          } else {
            return c.service_areas.some(
              (a) => a.city === area.city && a.district === area.district,
            )
          }
        }),

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
          (Array.isArray(c.skills)
            ? c.skills.some((s) => s.toLowerCase().includes(query))
            : (c.skills as string)?.toLowerCase().includes(query)) ||
          c.service_areas.some((a) =>
            `${a.city}${a.district}`.toLowerCase().includes(query),
          ) ||
          c.certifications.some((cert) =>
            cert.name.toLowerCase().includes(query),
          ),
      )
    },

    getFilteredCaregivers: (state) => {
      let result = state.caregivers

      if (state.currentFilter) {
        const filter = state.currentFilter

        // 地區篩選
        if (filter.area) {
          result = result.filter((c) => {
            if (typeof filter.area === 'string') {
              return c.service_areas.some((a) =>
                `${a.city}${a.district}`.includes(filter.area as string),
              )
            } else if (filter.area) {
              return c.service_areas.some(
                (a) =>
                  a.city === (filter.area as any).city &&
                  a.district === (filter.area as any).district,
              )
            }
            return true
          })
        }

        // 性別篩選
        if (filter.gender && filter.gender !== 'all') {
          result = result.filter((c) => c.gender === filter.gender)
        }

        // 技能篩選
        if (filter.skills && filter.skills.length > 0) {
          result = result.filter((c) => {
            const skills = Array.isArray(c.skills)
              ? c.skills
              : typeof c.skills === 'string'
                ? [c.skills]
                : []
            return filter.skills!.some((skill) => skills.includes(skill))
          })
        }

        // 語言篩選
        if (filter.languages && filter.languages.length > 0) {
          result = result.filter((c) =>
            filter.languages!.some((lang) =>
              (c.languages || []).includes(lang),
            ),
          )
        }

        // 證照篩選
        if (filter.certifications && filter.certifications.length > 0) {
          result = result.filter((c) =>
            filter.certifications!.some((cert) =>
              c.certifications.some((c) => c.name === cert),
            ),
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
          result = result.filter(
            (c) => c.experience_years >= filter.minExperience!,
          )
        }

        // 可用時段篩選
        if (filter.availability) {
          if (filter.availability.weekdays !== undefined) {
            result = result.filter(
              (c) =>
                (c.availability as any)?.weekdays ===
                filter.availability!.weekdays,
            )
          }
          if (filter.availability.weekends !== undefined) {
            result = result.filter(
              (c) =>
                (c.availability as any)?.weekends ===
                filter.availability!.weekends,
            )
          }
          if (filter.availability.nights !== undefined) {
            result = result.filter(
              (c) =>
                (c.availability as any)?.nights === filter.availability!.nights,
            )
          }
          if (filter.availability.holidays !== undefined) {
            result = result.filter(
              (c) =>
                (c.availability as any)?.holidays ===
                filter.availability!.holidays,
            )
          }
        }

        // 只顯示可預約
        if (filter.onlyAvailable) {
          result = result.filter((c) => c.status === 'available')
        }
      }

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        result = result.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            c.bio.toLowerCase().includes(query) ||
            c.description?.toLowerCase().includes(query) ||
            (Array.isArray(c.skills)
              ? c.skills.some((s: string) => s.toLowerCase().includes(query))
              : typeof c.skills === 'string' &&
                c.skills.toLowerCase().includes(query)) ||
            c.service_areas.some((a) =>
              `${a.city}${a.district}`.toLowerCase().includes(query),
            ) ||
            c.certifications.some((cert) =>
              cert.name.toLowerCase().includes(query),
            ),
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
        // 使用真實 API
        const response = await $fetch('/api/caregivers', {
          query: {
            city: filter?.area,
            gender: filter?.gender !== 'all' ? filter?.gender : undefined,
            minRate: filter?.minRate,
            maxRate: filter?.maxRate,
            minRating: filter?.minRating,
            experienceYears: filter?.minExperience,
            page: 1,
            limit: 50,
          },
        })

        // 轉換資料格式
        this.caregivers = response.caregivers.map((c: any) => ({
          id: c.id,
          user_id: c.user_id || c.id,
          name: c.name,
          avatar: c.avatar || 'https://i.pravatar.cc/150',
          gender: c.gender || 'female',
          address: c.address || '',
          hourly_rate: c.hourly_rate || 300,
          experience_years: c.experience_years || 0,
          bio: c.bio || '',
          rating: c.rating || 0,
          total_reviews: c.total_reviews || 0,
          completion_rate: c.completion_rate || 95,
          response_rate: c.response_rate || 90,
          background_checked:
            c.background_checked !== undefined ? c.background_checked : true,
          drug_test_passed:
            c.drug_test_passed !== undefined ? c.drug_test_passed : true,
          certifications: c.certifications || [],
          specialties: c.specialties || [],
          service_areas: c.service_areas || [],
          recent_reviews: c.recent_reviews || [],
          status: c.status || 'active',
          created_at: c.created_at,
          updated_at: c.updated_at,
          // 舊版相容屬性
          description: c.bio || '',
          skills:
            c.specialties?.map((s: any) =>
              typeof s === 'string' ? s : s.name,
            ) || [],
          languages: ['中文', '台語'],
          availability: {
            weekday: true,
            weekend: true,
            overnight: false,
          },
          reviews_count: c.total_reviews || 0,
        }))

        // 如果有篩選條件，設定篩選器
        if (filter) {
          this.currentFilter = filter
        }
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
        const response = await $fetch(`/api/caregivers/${id}`)

        // 轉換資料格式
        const caregiver: any = {
          id: response.id,
          user_id: response.user_id || response.id,
          name: response.name,
          avatar: response.avatar || 'https://i.pravatar.cc/150',
          gender: response.gender || 'female',
          address: response.address || '',
          hourly_rate: response.hourly_rate || 300,
          experience_years: response.experience_years || 0,
          bio: response.bio || '',
          rating: response.rating || 0,
          total_reviews: response.total_reviews || 0,
          completion_rate: response.completion_rate || 95,
          response_rate: response.response_rate || 90,
          background_checked:
            response.background_checked !== undefined
              ? response.background_checked
              : true,
          drug_test_passed:
            response.drug_test_passed !== undefined
              ? response.drug_test_passed
              : true,
          certifications: response.certifications || [],
          specialties: response.specialties || [],
          service_areas: response.service_areas || [],
          recent_reviews: response.recent_reviews || [],
          status: response.status || 'active',
          created_at: response.created_at,
          updated_at: response.updated_at,
          // 舊版相容屬性
          description: response.bio || '',
          skills:
            response.specialties?.map((s: any) =>
              typeof s === 'string' ? s : s.name,
            ) || [],
          languages: ['中文', '台語'],
          availability: {
            weekday: true,
            weekend: true,
            overnight: false,
          },
          reviews_count: response.total_reviews || 0,
        }

        this.selectedCaregiver = caregiver

        // 也更新列表中的資料
        const index = this.caregivers.findIndex((c) => c.id === id)
        if (index !== -1) {
          this.caregivers[index] = caregiver
        } else {
          this.caregivers.push(caregiver)
        }

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
          candidates = candidates.filter((c) => {
            const area = preferences.area!
            return c.service_areas.some((a: any) => {
              if (typeof a === 'string') {
                return a.includes(area)
              } else {
                return `${a.city}${a.district}`.includes(area)
              }
            })
          })
        }

        if (preferences.specialties && preferences.specialties.length > 0) {
          candidates = candidates.filter((c) =>
            preferences.specialties!.some((specialty) =>
              c.specialties.some((s) => {
                if (typeof s === 'string') {
                  return s === specialty
                } else {
                  return s.name === specialty || s.category === specialty
                }
              }),
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
