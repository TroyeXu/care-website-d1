import { ref } from 'vue'

export default function useCareState() {
  const careItems = ref([
    { code: 'HR01', name: '基本照護(必選)', price: 200, category: '鐘點制', subCategory: '基本服務', selectedByDefault: true, icon: 'favorite', color: 'deep-orange' },
    { code: 'HR02', name: '抽痰需求', price: 50, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'light-blue' },
    { code: 'HR03', name: '鼻胃管或其他管灌', price: 60, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'teal' },
    { code: 'HR04', name: '導尿管或其它引流管', price: 50, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'cyan' },
    { code: 'HR05', name: '氣切or氣管內管', price: 60, category: '鐘點制', subCategory: '醫療照護', icon: 'medical_services', color: 'indigo' },
    { code: 'HR06', name: '體重>50公斤並需協助上下床', price: 70, category: '鐘點制', subCategory: '特殊需求', icon: 'bed', color: 'deep-purple' },
    { code: 'HR07', name: '意識不清或無法配合', price: 70, category: '鐘點制', subCategory: '特殊需求', icon: 'psychology', color: 'purple' },
    { code: 'HR08', name: '有任何傳染病或需要隔離病人', price: 80, category: '鐘點制', subCategory: '特殊需求', icon: 'coronavirus', color: 'red' },
    { code: 'HR09', name: '夜間:2200-0800', price: 20, category: '鐘點制', subCategory: '時段加價', icon: 'bedtime', color: 'blue-grey' },
    { code: 'HR10', name: '加價急徵', price: 30, category: '鐘點制', subCategory: '時段加價', icon: 'priority_high', color: 'amber' },
    { code: 'HR11', name: '二次加價急徵', price: 30, category: '鐘點制', subCategory: '時段加價', icon: 'bolt', color: 'orange' },
    { code: 'SH01', name: '12小時/班', price: 3000, category: '包班制', subCategory: '基本班次', icon: 'schedule', color: 'primary' },
    { code: 'SH02', name: '24小時/班', price: 5500, category: '包班制', subCategory: '基本班次', icon: 'access_time_filled', color: 'secondary' },
    { code: 'SH03', name: '體重>50公斤並需協助上下床', price: 200, category: '包班制', subCategory: '特殊需求', icon: 'bed', color: 'deep-purple' },
    { code: 'SH04', name: '意識不清或無法配合', price: 200, category: '包班制', subCategory: '特殊需求', icon: 'psychology', color: 'purple' },
    { code: 'SH05', name: '有任何傳染病或需要隔離病人', price: 300, category: '包班制', subCategory: '特殊需求', icon: 'coronavirus', color: 'red' }
  ])

  const selectedHourlyItems = ref(careItems.value.filter(item => item.selectedByDefault && item.category === '鐘點制'))
  const selectedShiftItems = ref([])
  const selectedCategory = ref('鐘點制')
  const selectedShiftType = ref('SH01')

  const searchText = ref('')
  const showHelp = ref(false)
  const previousTotalCost = ref(0)
  const totalCostElement = ref(null)
  const particleContainer = ref(null)
  const tipAmount = ref(0)
  const hourCount = ref(1)
  const dayCount = ref(1)
  const shiftDayCount = ref(1)

  const showFilters = ref(false)
  const showCalculator = ref(false)
  const showShiftCalculator = ref(false)
  const showAdditionalItems = ref(true)

  const isNightShift = ref(false)
  const isUrgent = ref(false)
  const isDoubleUrgent = ref(false)

  const activeFilters = ref({ price: 0, subCategory: null })

  return {
    careItems,
    selectedHourlyItems,
    selectedShiftItems,
    selectedCategory,
    selectedShiftType,
    searchText,
    showHelp,
    previousTotalCost,
    totalCostElement,
    particleContainer,
    tipAmount,
    hourCount,
    dayCount,
    shiftDayCount,
    showFilters,
    showCalculator,
    showShiftCalculator,
    showAdditionalItems,
    isNightShift,
    isUrgent,
    isDoubleUrgent,
    activeFilters
  }
}
