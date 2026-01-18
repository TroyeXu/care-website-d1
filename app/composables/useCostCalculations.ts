import { computed, type Ref } from 'vue'
import {
  useCostCalculator,
  type CostCalculationParams,
} from './useCostCalculator'
import type { CaregiverDisplay } from '~/types/caregiver'

interface CostItem {
  code: string
  name: string
  price: number
  category: string
  subCategory: string
}

interface CostCalculationsState {
  selectedCategory: Ref<string>
  selectedHourlyItems: Ref<CostItem[]>
  selectedShiftItems: Ref<CostItem[]>
  selectedShiftType: Ref<string>
  hourCount: Ref<number>
  dayCount: Ref<number>
  shiftDayCount: Ref<number>
}

export default function useCostCalculations(state: CostCalculationsState) {
  const { calculateCostBreakdown, formatCurrency: formatCurrencyNew } =
    useCostCalculator()
  const {
    selectedCategory,
    selectedHourlyItems,
    selectedShiftItems,
    selectedShiftType,
    hourCount,
    dayCount,
    shiftDayCount,
  } = state

  const selectedItems = computed(() =>
    selectedCategory.value === '鐘點制'
      ? selectedHourlyItems.value
      : selectedShiftItems.value,
  )

  const hourlyRate = computed(() => {
    if (selectedCategory.value !== '鐘點制') return 0
    return selectedHourlyItems.value.reduce((sum, item) => {
      return item.subCategory === '時段加價' ? sum : sum + item.price
    }, 0)
  })

  const hourlyRateReachedLimit = computed(() => hourlyRate.value >= 500)

  function wouldExceedLimit(item: CostItem): boolean {
    return false
  }

  const costBreakdown = computed(() => {
    const isHourly = selectedCategory.value === '鐘點制'

    // Construct virtual caregiver
    const virtualCaregiver: CaregiverDisplay = {
      id: 'virtual',
      user_id: 'virtual',
      name: 'Virtual',
      hourly_rate: isHourly ? hourlyRate.value : 0,
      shift_rate: !isHourly
        ? selectedShiftType.value === 'SH01'
          ? 3000
          : 5500
        : 0,
      rating: 5,
      reviews_count: 0,
      experience_years: 0,
      is_verified: true,
      bio: '',
      avatar_url: '',
      phone: '',
      email: '',
    }

    // Prepare Extra Items
    const extraItems: CostCalculationParams['extraItems'] = []

    if (isHourly) {
      selectedHourlyItems.value
        .filter((item) => item.subCategory === '時段加價')
        .forEach((item) => {
          extraItems.push({
            name: item.name,
            price: item.price,
            type: 'daily', // Multiplied by days
          })
        })
    } else {
      // Shift mode additional services are added to daily rate in original logic
      selectedShiftItems.value.forEach((item) => {
        extraItems.push({
          name: item.name,
          price: item.price,
          type: 'daily',
        })
      })
    }

    // Hack dates to match dayCount
    // We start from today
    const startDate = new Date()
    const endDate = new Date(startDate)
    const targetDays = isHourly ? dayCount.value : shiftDayCount.value
    endDate.setDate(startDate.getDate() + Math.max(0, targetDays - 1))

    // Calculate End Time for Hourly
    // If start is 08:00, and we want X hours.
    // If X <= 24, we can just set end time.
    // calculateCostBreakdown uses hours calculation if provided.
    // But since we provided hourly_rate, it multiplies (hours * days).
    // Let's set start/end time to match hourCount.
    const startTimeStr = '08:00'
    let endTimeStr

    if (isHourly) {
      // Simple hour addition
      const endHour = 8 + hourCount.value
      // format to HH:MM
      const h = Math.floor(endHour) % 24
      const m = (endHour % 1) * 60
      endTimeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
      // If it crosses day boundary, calculateCostBreakdown logic might be tricky if we don't adjust dates.
      // But calculateBaseCost uses calculateHours which handles overnight.
    }

    const params: CostCalculationParams = {
      caregiver: virtualCaregiver,
      serviceType: isHourly ? 'hourly' : 'shift',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      startTime: startTimeStr,
      endTime: endTimeStr,
      extraItems,
    }

    return calculateCostBreakdown(params)
  })

  const totalCost = computed(() => costBreakdown.value.total)

  // Backwards compatibility
  const hourlyTotalWithTime = computed(() =>
    selectedCategory.value === '鐘點制' ? totalCost.value : 0,
  )
  const shiftTotalWithDays = computed(() =>
    selectedCategory.value === '包班制' ? totalCost.value : 0,
  )

  function calculatePreviewCost(item: CostItem): number {
    // Fixed bug: include dayCount in preview calculation
    if (selectedCategory.value === '鐘點制') {
      if (item.subCategory !== '時段加價') {
        return totalCost.value + item.price * hourCount.value * dayCount.value
      } else {
        return totalCost.value + item.price * dayCount.value
      }
    } else {
      // Shift
      return totalCost.value + item.price * shiftDayCount.value
    }
  }

  function formatCurrency(value: number): string {
    return formatCurrencyNew(value)
  }

  return {
    selectedItems,
    hourlyRate,
    hourlyRateReachedLimit,
    wouldExceedLimit,
    hourlyTotalWithTime,
    shiftTotalWithDays,
    totalCost,
    calculatePreviewCost,
    formatCurrency,
  }
}
