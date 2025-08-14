// 統一的照護項目類型定義
export interface CareItem {
  code: string
  name: string
  price: number
  category: string
  subCategory: string
  selectedByDefault?: boolean
  icon?: string
  color?: string
}

// 照護服務狀態
export interface CareState {
  careItems: CareItem[]
  selectedHourlyItems: CareItem[]
  selectedShiftItems: CareItem[]
  selectedCategory: string
  selectedShiftType: string
  searchText: string
  isNightShift: boolean
  isUrgent: boolean
  isDoubleUrgent: boolean
  hourCount: number
  dayCount: number
  shiftDayCount: number
}

// 照護服務篩選器
export interface ActiveFilters {
  price: number
  subCategory: string | null
}
