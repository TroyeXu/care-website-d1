import { defineStore } from 'pinia'
import type { Caregiver } from '~/types/caregiver'
import { transformCaregiver } from '~/utils/transformers'

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
    loading: false,
    error: null as string | null,
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
  },

  actions: {
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
        this.caregivers = response.caregivers.map(transformCaregiver)

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
        const caregiver = transformCaregiver(response)

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
