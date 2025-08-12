import { ref, readonly } from 'vue'
import type { CaregiverDisplay } from '~/types/caregiver'

export interface CostModifier {
  id: string
  name: string
  type: 'fixed' | 'percentage'
  amount: number
  description: string
}

export interface CostCalculationParams {
  caregiver: CaregiverDisplay
  serviceType: 'hourly' | 'shift'
  startDate: string
  endDate: string
  startTime: string
  endTime?: string
  specialNeeds?: string[]
  isUrgent?: boolean
  isDoubleUrgent?: boolean
}

export interface CostBreakdown {
  basePrice: number
  modifiers: {
    name: string
    amount: number
    type: 'fixed' | 'percentage'
    description: string
  }[]
  subtotal: number
  total: number
  days: number
  hours?: number
}

export const useCostCalculator = () => {
  // 預設費用修改器
  const defaultCostModifiers: CostModifier[] = [
    {
      id: 'night-shift',
      name: '夜間加成',
      type: 'percentage',
      amount: 20,
      description: '夜間服務（22:00-08:00）加收 20%'
    },
    {
      id: 'weekend-premium',
      name: '假日加成',
      type: 'percentage',
      amount: 15,
      description: '週末及國定假日加收 15%'
    },
    {
      id: 'urgent-service',
      name: '緊急服務',
      type: 'percentage',
      amount: 30,
      description: '24小時內緊急服務加收 30%'
    },
    {
      id: 'double-urgent',
      name: '極緊急服務',
      type: 'percentage',
      amount: 50,
      description: '6小時內極緊急服務加收 50%'
    },
    {
      id: 'special-care',
      name: '特殊照護',
      type: 'fixed',
      amount: 100,
      description: '特殊照護需求每小時加收 NT$100'
    }
  ]
  
  const costModifiers = ref<CostModifier[]>(defaultCostModifiers)

  const isWeekend = (date: Date): boolean => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const isNightTime = (time?: string): boolean => {
    if (!time) return false
    const parts = time.split(':')
    const hourStr = parts[0]
    if (!hourStr) return false
    const hour = parseInt(hourStr, 10)
    return hour >= 22 || hour <= 8
  }

  const hasSpecialCareNeeds = (needs?: string[]): boolean => {
    if (!needs) return false
    const specialCareKeywords = ['失智症', '精神疾病', '重症', '呼吸器', '管路']
    return needs.some((need) =>
      specialCareKeywords.some((keyword) => need.includes(keyword)),
    )
  }

  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const calculateHours = (startTime: string, endTime: string): number => {
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)

    let hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

    // Handle overnight shifts
    if (hours < 0) {
      hours += 24
    }

    return Math.max(hours, 1) // Minimum 1 hour
  }

  const calculateBaseCost = (
    params: CostCalculationParams,
  ): { basePrice: number; days: number; hours?: number } => {
    const days = calculateDays(params.startDate, params.endDate)

    if (params.serviceType === 'hourly' && params.endTime) {
      const hours = calculateHours(params.startTime, params.endTime)
      const basePrice = params.caregiver.hourly_rate * hours * days
      return { basePrice, days, hours }
    } else if (params.serviceType === 'shift') {
      const basePrice =
        (params.caregiver.shift_rate || params.caregiver.hourly_rate * 12) *
        days
      return { basePrice, days }
    }

    return { basePrice: 0, days }
  }

  const getApplicableModifiers = (
    params: CostCalculationParams,
  ): CostModifier[] => {
    const applicable: CostModifier[] = []
    const startDate = new Date(params.startDate)

    // Night shift modifier
    if (isNightTime(params.startTime)) {
      const nightModifier = costModifiers.value.find(
        (m) => m.id === 'night-shift',
      )
      if (nightModifier) applicable.push(nightModifier)
    }

    // Weekend modifier
    if (isWeekend(startDate)) {
      const weekendModifier = costModifiers.value.find(
        (m) => m.id === 'weekend-premium',
      )
      if (weekendModifier) applicable.push(weekendModifier)
    }

    // Urgent service modifiers
    if (params.isDoubleUrgent) {
      const doubleUrgentModifier = costModifiers.value.find(
        (m) => m.id === 'double-urgent',
      )
      if (doubleUrgentModifier) applicable.push(doubleUrgentModifier)
    } else if (params.isUrgent) {
      const urgentModifier = costModifiers.value.find(
        (m) => m.id === 'urgent-service',
      )
      if (urgentModifier) applicable.push(urgentModifier)
    }

    // Special care modifier
    if (hasSpecialCareNeeds(params.specialNeeds)) {
      const specialCareModifier = costModifiers.value.find(
        (m) => m.id === 'special-care',
      )
      if (specialCareModifier) applicable.push(specialCareModifier)
    }

    return applicable
  }

  const calculateCostBreakdown = (
    params: CostCalculationParams,
  ): CostBreakdown => {
    const { basePrice, days, hours } = calculateBaseCost(params)
    const applicableModifiers = getApplicableModifiers(params)

    let runningTotal = basePrice
    const modifierDetails: CostBreakdown['modifiers'] = []

    // Apply fixed modifiers first
    const fixedModifiers = applicableModifiers.filter((m) => m.type === 'fixed')
    for (const modifier of fixedModifiers) {
      const amount = modifier.amount * days * (hours || 1)
      modifierDetails.push({
        name: modifier.name,
        amount,
        type: modifier.type,
        description: modifier.description,
      })
      runningTotal += amount
    }

    // Apply percentage modifiers
    const percentageModifiers = applicableModifiers.filter(
      (m) => m.type === 'percentage',
    )
    for (const modifier of percentageModifiers) {
      const amount = Math.round(runningTotal * (modifier.amount / 100))
      modifierDetails.push({
        name: modifier.name,
        amount,
        type: modifier.type,
        description: modifier.description,
      })
      runningTotal += amount
    }

    return {
      basePrice,
      modifiers: modifierDetails,
      subtotal:
        basePrice +
        modifierDetails
          .filter((m) => m.type === 'fixed')
          .reduce((sum, m) => sum + m.amount, 0),
      total: runningTotal,
      days,
      hours,
    }
  }

  const getQuickEstimate = (
    caregiver: CaregiverDisplay,
    serviceType: 'hourly' | 'shift',
    hours: number = 8,
    days: number = 1,
  ): number => {
    if (serviceType === 'hourly') {
      return caregiver.hourly_rate * hours * days
    } else {
      return (caregiver.shift_rate || caregiver.hourly_rate * 12) * days
    }
  }

  const formatCurrency = (amount: number): string => {
    return `NT$ ${amount.toLocaleString()}`
  }

  const getCostPerHour = (breakdown: CostBreakdown): number => {
    if (breakdown.hours) {
      return Math.round(breakdown.total / (breakdown.hours * breakdown.days))
    }
    return Math.round(breakdown.total / (24 * breakdown.days)) // Assume 24 hours for shift
  }

  const getCostPerDay = (breakdown: CostBreakdown): number => {
    return Math.round(breakdown.total / breakdown.days)
  }

  const isUrgentBooking = (
    startDate: string,
    startTime: string,
  ): { isUrgent: boolean; isDoubleUrgent: boolean } => {
    const now = new Date()
    const bookingTime = new Date(`${startDate}T${startTime}`)
    const timeDiff = bookingTime.getTime() - now.getTime()
    const hoursDiff = timeDiff / (1000 * 60 * 60)

    return {
      isUrgent: hoursDiff < 24,
      isDoubleUrgent: hoursDiff < 6,
    }
  }

  return {
    calculateCostBreakdown,
    getQuickEstimate,
    formatCurrency,
    getCostPerHour,
    getCostPerDay,
    isUrgentBooking,
    costModifiers: readonly(costModifiers),
  }
}
