import { watch } from 'vue'
import { gsap } from 'gsap'
import type { Ref } from 'vue'

interface CareItem {
  code: string
  name: string
  price: number
  category: string
  color?: string
  icon?: string
  selectedByDefault?: boolean
}

interface State {
  careItems: Ref<CareItem[]>
  selectedHourlyItems: Ref<CareItem[]>
  selectedShiftItems: Ref<CareItem[]>
  selectedCategory: Ref<string>
  selectedShiftType: Ref<string>
  searchText: Ref<string>
  isNightShift: Ref<boolean>
  isUrgent: Ref<boolean>
  isDoubleUrgent: Ref<boolean>
  hourCount: Ref<number>
  dayCount: Ref<number>
  shiftDayCount: Ref<number>
}

interface Calculations {
  selectedItems: Ref<CareItem[]>
}

interface ParticleApi {
  createParticleExplosion: (x: number, y: number, color: string) => void
}

export default function useCareActions(state: State, calculations: Calculations, particleApi: ParticleApi) {
  const {
    careItems,
    selectedHourlyItems,
    selectedShiftItems,
    selectedCategory,
    selectedShiftType,
    searchText,
    isNightShift,
    isUrgent,
    isDoubleUrgent,
    hourCount,
    dayCount,
    shiftDayCount
  } = state

  const { createParticleExplosion } = particleApi

  function toggleItem(item: CareItem, event?: MouseEvent) {
    const targetArray = selectedCategory.value === '鐘點制' ? selectedHourlyItems : selectedShiftItems
    const index = targetArray.value.findIndex((i: CareItem) => i.code === item.code)
    
    if (process.client && event) {
      createParticleExplosion(event.clientX, event.clientY, item.color || 'primary')
    }
    if (index === -1) {
      targetArray.value.push(item)
      if (process.client) {
        const el = document.querySelector(`[data-code="${item.code}"]`)
        if (el) {
          gsap.fromTo(el, { scale: 1, backgroundColor: 'rgba(76, 175, 80, 0.2)' }, { scale: 1, backgroundColor: 'rgba(25, 118, 210, 0.08)', duration: 0.5, ease: 'power1.out' })
        }
      }
    } else if (item.code !== 'HR01') {
      targetArray.value.splice(index, 1)
      const el = document.querySelector(`[data-code="${item.code}"]`)
      if (el) {
        gsap.fromTo(el, { scale: 1, backgroundColor: 'rgba(255, 87, 34, 0.2)' }, { scale: 1, backgroundColor: 'transparent', duration: 0.5, ease: 'power1.out' })
      }
    }
  }

  function isSelected(item: CareItem) {
    return calculations.selectedItems.value.some((i: CareItem) => i.code === item.code)
  }

  function selectShiftType(item: CareItem) {
    selectedShiftType.value = item.code
  }

  function resetSelections() {
    selectedHourlyItems.value = careItems.value.filter((item: CareItem) => item.selectedByDefault && item.category === '鐘點制')
    selectedShiftItems.value = []
    selectedShiftType.value = 'SH01'
    searchText.value = ''
    isNightShift.value = false
    isUrgent.value = false
    isDoubleUrgent.value = false
    dayCount.value = 1
    hourCount.value = 1
    shiftDayCount.value = 1
  }

  function toggleAdditionalService(code: string) {
    const item = careItems.value.find((item: CareItem) => item.code === code)
    if (!item) return
    const index = selectedHourlyItems.value.findIndex((i: CareItem) => i.code === code)
    if (code === 'HR09') {
      if (isNightShift.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isNightShift.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    } else if (code === 'HR10') {
      if (isUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    } else if (code === 'HR11') {
      if (isDoubleUrgent.value && index === -1) {
        selectedHourlyItems.value.push(item)
      } else if (!isDoubleUrgent.value && index !== -1) {
        selectedHourlyItems.value.splice(index, 1)
      }
    }
  }

  function getItemIcon(item: CareItem) {
    return item.icon || 'help_outline'
  }

  function getItemColor(item: CareItem) {
    return item.color || 'primary'
  }

  watch(isNightShift, () => { toggleAdditionalService('HR09') })
  watch(isUrgent, () => { toggleAdditionalService('HR10') })
  watch(isDoubleUrgent, () => { toggleAdditionalService('HR11') })

  return {
    toggleItem,
    isSelected,
    selectShiftType,
    resetSelections,
    toggleAdditionalService,
    getItemIcon,
    getItemColor
  }
}
