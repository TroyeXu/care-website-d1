import { computed, type Ref } from 'vue'
import type { CareItem } from '../types/care'

interface ActiveFilters {
  price: number
  subCategory: string | null
}

interface CareFiltersState {
  searchText: Ref<string>
  activeFilters: Ref<ActiveFilters>
  careItems: Ref<CareItem[]>
  selectedCategory: Ref<string>
}

export default function useCareFilters(state: CareFiltersState) {
  const { searchText, activeFilters, careItems, selectedCategory } = state

  const isAnyFilterActive = computed(
    () =>
      activeFilters.value.price > 0 || activeFilters.value.subCategory !== null,
  )

  const availableSubCategories = computed(() => {
    const subCategories = careItems.value
      .filter(
        (item) =>
          item.category === selectedCategory.value &&
          (item.subCategory === '醫療照護' || item.subCategory === '特殊需求'),
      )
      .map((item) => item.subCategory)
    return Array.from(new Set(subCategories))
  })

  const filteredItems = computed(() => {
    return careItems.value.filter((item) => {
      const matchCategory = item.category === selectedCategory.value
      let matchSearch = true
      let matchPrice = true
      let matchSubCategory = true

      if (
        selectedCategory.value === '包班制' &&
        item.subCategory === '基本班次'
      ) {
        return false
      }

      if (searchText.value) {
        matchSearch = item.name
          .toLowerCase()
          .includes(searchText.value.toLowerCase())
      }

      if (activeFilters.value.price > 0) {
        matchPrice = item.price > activeFilters.value.price
      }

      if (activeFilters.value.subCategory) {
        matchSubCategory = item.subCategory === activeFilters.value.subCategory
      }

      return matchCategory && matchSearch && matchPrice && matchSubCategory
    })
  })

  function applyFilter(
    filterType: keyof ActiveFilters | 'search',
    value: string | number | null,
  ) {
    if (filterType !== 'search') {
      searchText.value = ''
    }
    if (filterType === 'search') {
      // 搜尋類型不處理 activeFilters
      return
    }
    if (filterType === 'price') {
      if (activeFilters.value.price === value) {
        activeFilters.value.price = 0
      } else {
        activeFilters.value.price = value as number
      }
    } else if (filterType === 'subCategory') {
      if (activeFilters.value.subCategory === value) {
        activeFilters.value.subCategory = null
      } else {
        activeFilters.value.subCategory = value as string
      }
    }
  }

  function resetAllFilters() {
    activeFilters.value = { price: 0, subCategory: null }
  }

  return {
    isAnyFilterActive,
    availableSubCategories,
    filteredItems,
    applyFilter,
    resetAllFilters,
  }
}
