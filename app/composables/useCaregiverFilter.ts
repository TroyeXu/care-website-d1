import type { Ref } from 'vue'
import type { Caregiver } from '~/types/caregiver'
import type { CaregiverFilter } from '~/stores/caregivers'

export const useCaregiverFilter = (caregivers: Ref<Caregiver[]>) => {
  const filterState = ref<CaregiverFilter | null>(null)
  const searchQuery = ref('')

  const setFilter = (filter: CaregiverFilter | null) => {
    filterState.value = filter
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const clearFilter = () => {
    filterState.value = null
    searchQuery.value = ''
  }

  const filteredCaregivers = computed(() => {
    let result = caregivers.value

    if (filterState.value) {
      const filter = filterState.value

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
          filter.languages!.some((lang) => (c.languages || []).includes(lang)),
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

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
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
  })

  const searchResults = computed(() => {
    if (!searchQuery.value) return caregivers.value
    const query = searchQuery.value.toLowerCase()
    return caregivers.value.filter(
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
  })

  return {
    filterState,
    searchQuery,
    setFilter,
    setSearchQuery,
    clearFilter,
    filteredCaregivers,
    searchResults,
  }
}
