<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 標題區域 -->
        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h5 text-primary">
            <q-icon name="calendar_today" size="md" class="q-mr-sm" />
            排程管理
          </div>
          <div class="row q-gutter-sm">
            <q-btn
              flat
              icon="view_week"
              @click="currentView = 'week'"
              :color="currentView === 'week' ? 'primary' : 'grey'"
            >
              週視圖
            </q-btn>
            <q-btn
              flat
              icon="view_module"
              @click="currentView = 'month'"
              :color="currentView === 'month' ? 'primary' : 'grey'"
            >
              月視圖
            </q-btn>
            <q-btn
              color="primary"
              icon="add"
              @click="showCreateBooking = true"
            >
              新增預約
            </q-btn>
          </div>
        </div>
        
        <!-- 篩選器 -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section class="q-pa-md">
            <div class="row q-gutter-md items-center">
              <div class="col-auto">
                <q-btn-group>
                  <q-btn
                    icon="chevron_left"
                    @click="previousPeriod"
                    flat
                  />
                  <q-btn
                    :label="currentPeriodLabel"
                    flat
                    @click="showDatePicker = true"
                  />
                  <q-btn
                    icon="chevron_right"
                    @click="nextPeriod"
                    flat
                  />
                </q-btn-group>
              </div>
              
              <div class="col">
                <q-select
                  v-model="statusFilter"
                  :options="statusOptions"
                  label="狀態篩選"
                  outlined
                  dense
                  clearable
                  emit-value
                  map-options
                  class="q-ml-md"
                  style="max-width: 200px"
                />
              </div>
              
              <div class="col-auto">
                <q-btn
                  flat
                  icon="refresh"
                  @click="loadBookings"
                  :loading="isLoading"
                >
                  更新
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
        
        <!-- 載入狀態 -->
        <div v-if="isLoading" class="text-center q-pa-lg">
          <q-spinner-grid size="50px" color="primary" />
          <div class="text-body2 q-mt-md">載入中...</div>
        </div>
        
        <!-- 排程表 -->
        <div v-else>
          <!-- 週視圖 -->
          <div v-if="currentView === 'week'">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">週排程表</div>
                
                <!-- 時間表標題 -->
                <div class="row q-mb-md">
                  <div class="col-2 text-center text-weight-medium">時間</div>
                  <div
                    v-for="day in weekDays"
                    :key="day.date"
                    class="col text-center text-weight-medium"
                  >
                    <div>{{ day.name }}</div>
                    <div class="text-caption text-grey-6">{{ day.date }}</div>
                  </div>
                </div>
                
                <!-- 時間格 -->
                <div class="schedule-grid">
                  <div
                    v-for="hour in workingHours"
                    :key="hour"
                    class="row q-mb-xs"
                  >
                    <div class="col-2 text-center text-caption q-pa-xs">
                      {{ hour }}:00
                    </div>
                    <div
                      v-for="day in weekDays"
                      :key="day.date + hour"
                      class="col q-pa-xs"
                    >
                      <div
                        class="schedule-slot"
                        :class="getSlotClass(day.date, hour)"
                        @click="handleSlotClick(day.date, hour)"
                      >
                        <div
                          v-for="booking in getBookingsForSlot(day.date, hour)"
                          :key="booking.id"
                          class="booking-item"
                          :class="`booking-${booking.status}`"
                          @click.stop="showBookingDetails(booking)"
                        >
                          <div class="text-caption text-weight-medium">
                            {{ getBookingTitle(booking) }}
                          </div>
                          <div class="text-caption">
                            {{ booking.start_time }} - {{ booking.end_time }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          
          <!-- 月視圖 -->
          <div v-else>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">月排程表</div>
                
                <!-- 月曆標題 -->
                <div class="row q-mb-sm">
                  <div
                    v-for="dayName in dayNames"
                    :key="dayName"
                    class="col text-center text-weight-medium q-pa-xs"
                  >
                    {{ dayName }}
                  </div>
                </div>
                
                <!-- 月曆日期 -->
                <div class="calendar-grid">
                  <div
                    v-for="week in monthWeeks"
                    :key="week[0].date"
                    class="row"
                  >
                    <div
                      v-for="day in week"
                      :key="day.date"
                      class="col calendar-day"
                      :class="{
                        'other-month': !day.isCurrentMonth,
                        'today': day.isToday
                      }"
                      @click="selectDate(day.date)"
                    >
                      <div class="day-number">{{ day.day }}</div>
                      <div class="day-bookings">
                        <div
                          v-for="booking in getBookingsForDay(day.date)"
                          :key="booking.id"
                          class="booking-dot"
                          :class="`booking-${booking.status}`"
                          @click.stop="showBookingDetails(booking)"
                        >
                          <q-tooltip>{{ getBookingTitle(booking) }}</q-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          
          <!-- 統計資訊 -->
          <div class="row q-gutter-md q-mt-lg">
            <div class="col">
              <q-card flat class="bg-blue-1">
                <q-card-section class="text-center">
                  <div class="text-h6 text-blue-8">{{ todayBookings }}</div>
                  <div class="text-caption text-blue-6">今日預約</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card flat class="bg-green-1">
                <q-card-section class="text-center">
                  <div class="text-h6 text-green-8">{{ weekBookings }}</div>
                  <div class="text-caption text-green-6">本週預約</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card flat class="bg-orange-1">
                <q-card-section class="text-center">
                  <div class="text-h6 text-orange-8">{{ monthBookings }}</div>
                  <div class="text-caption text-orange-6">本月預約</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col">
              <q-card flat class="bg-purple-1">
                <q-card-section class="text-center">
                  <div class="text-h6 text-purple-8">{{ pendingBookings }}</div>
                  <div class="text-caption text-purple-6">待確認</div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 日期選擇器 -->
    <q-dialog v-model="showDatePicker">
      <q-date
        v-model="currentDate"
        @update:model-value="onDateChange"
        mask="YYYY-MM-DD"
      />
    </q-dialog>
    
    <!-- 預約詳情 -->
    <q-dialog v-model="showBookingDetailsDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">預約詳情</div>
        </q-card-section>
        
        <q-card-section v-if="selectedBooking">
          <div class="row q-gutter-md">
            <div class="col-12">
              <div class="text-subtitle2">服務對象</div>
              <div>{{ selectedBooking.patient_name || '未提供' }}</div>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">服務時間</div>
              <div>{{ formatBookingTime(selectedBooking) }}</div>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">服務類型</div>
              <div>{{ selectedBooking.service_type || '一般照護' }}</div>
            </div>
            <div class="col-12">
              <div class="text-subtitle2">狀態</div>
              <q-chip
                :color="getStatusColor(selectedBooking.status)"
                text-color="white"
                size="sm"
              >
                {{ getStatusName(selectedBooking.status) }}
              </q-chip>
            </div>
            <div class="col-12" v-if="selectedBooking.notes">
              <div class="text-subtitle2">備註</div>
              <div>{{ selectedBooking.notes }}</div>
            </div>
          </div>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn
            v-if="selectedBooking?.status === 'pending'"
            color="positive"
            @click="confirmBooking(selectedBooking)"
          >
            確認預約
          </q-btn>
          <q-btn
            v-if="['pending', 'confirmed'].includes(selectedBooking?.status || '')"
            color="negative"
            @click="cancelBooking(selectedBooking)"
          >
            取消預約
          </q-btn>
          <q-btn
            flat
            color="grey"
            @click="showBookingDetailsDialog = false"
          >
            關閉
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
    
    <!-- 廚廚新增預約 -->
    <q-dialog v-model="showCreateBooking">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">新增預約</div>
        </q-card-section>
        
        <q-card-section>
          <div class="text-body2 text-grey-6 q-mb-md">
            請前往預約頁面建立新的預約
          </div>
          <q-btn
            color="primary"
            @click="navigateTo('/booking/create')"
            class="full-width"
          >
            前往預約頁面
          </q-btn>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn
            flat
            color="grey"
            @click="showCreateBooking = false"
          >
            取消
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import type { Booking } from '~/utils/mockData'

// SEO
usePageSeo('排程管理 - 護理服務平台', '查看並管理您的照護排程和預約')

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()
const authStore = useAuthStore()

// 響應式資料
const bookings = ref<Booking[]>([])
const isLoading = ref(false)
const currentView = ref<'week' | 'month'>('week')
const currentDate = ref(new Date().toISOString().split('T')[0])
const statusFilter = ref('')
const selectedBooking = ref<Booking | null>(null)
const showBookingDetailsDialog = ref(false)
const showCreateBooking = ref(false)
const showDatePicker = ref(false)

// 狀態選項
const statusOptions = [
  { label: '全部', value: '' },
  { label: '待確認', value: 'pending' },
  { label: '已確認', value: 'confirmed' },
  { label: '進行中', value: 'in_progress' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
]

// 日期相關計算
const dayNames = ['日', '一', '二', '三', '四', '五', '六']
const workingHours = Array.from({ length: 12 }, (_, i) => i + 8) // 8:00 - 19:00

// 週視圖日期
const weekDays = computed(() => {
  const startOfWeek = getStartOfWeek(new Date(currentDate.value))
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(date.getDate() + i)
    return {
      name: dayNames[date.getDay()],
      date: date.toISOString().split('T')[0],
      day: date.getDate()
    }
  })
})

// 月視圖日期
const monthWeeks = computed(() => {
  const year = new Date(currentDate.value).getFullYear()
  const month = new Date(currentDate.value).getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = getStartOfWeek(firstDay)
  const weeks: any[][] = []
  
  let currentWeekDate = new Date(startDate)
  
  while (currentWeekDate <= lastDay || weeks.length < 6) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekDate)
      week.push({
        date: date.toISOString().split('T')[0],
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
      })
      currentWeekDate.setDate(currentWeekDate.getDate() + 1)
    }
    weeks.push(week)
    
    if (weeks.length >= 6) break
  }
  
  return weeks
})

// 目前時期標籤
const currentPeriodLabel = computed(() => {
  const date = new Date(currentDate.value)
  if (currentView.value === 'week') {
    const startOfWeek = getStartOfWeek(date)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(endOfWeek.getDate() + 6)
    return `${startOfWeek.getMonth() + 1}/${startOfWeek.getDate()} - ${endOfWeek.getMonth() + 1}/${endOfWeek.getDate()}`
  } else {
    return `${date.getFullYear()}年${date.getMonth() + 1}月`
  }
})

// 統計資料
const todayBookings = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return bookings.value.filter(b => b.start_date.startsWith(today)).length
})

const weekBookings = computed(() => {
  const startOfWeek = getStartOfWeek(new Date())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  
  return bookings.value.filter(b => {
    const bookingDate = new Date(b.start_date)
    return bookingDate >= startOfWeek && bookingDate <= endOfWeek
  }).length
})

const monthBookings = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  
  return bookings.value.filter(b => {
    const bookingDate = new Date(b.start_date)
    return bookingDate >= startOfMonth && bookingDate <= endOfMonth
  }).length
})

const pendingBookings = computed(() => {
  return bookings.value.filter(b => b.status === 'pending').length
})

// 過濾後的預約
const filteredBookings = computed(() => {
  if (!statusFilter.value) return bookings.value
  return bookings.value.filter(b => b.status === statusFilter.value)
})

// 方法
const getStartOfWeek = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day
  return new Date(d.setDate(diff))
}

const loadBookings = async () => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能查看排程',
      timeout: 3000
    })
    return
  }
  
  isLoading.value = true
  
  try {
    bookings.value = await apiService.getBookingsByUser(authStore.currentUser.id)
  } catch (error: any) {
    console.error('載入預約失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '載入預約失敗',
      timeout: 3000
    })
  } finally {
    isLoading.value = false
  }
}

const previousPeriod = () => {
  const date = new Date(currentDate.value)
  if (currentView.value === 'week') {
    date.setDate(date.getDate() - 7)
  } else {
    date.setMonth(date.getMonth() - 1)
  }
  currentDate.value = date.toISOString().split('T')[0]
}

const nextPeriod = () => {
  const date = new Date(currentDate.value)
  if (currentView.value === 'week') {
    date.setDate(date.getDate() + 7)
  } else {
    date.setMonth(date.getMonth() + 1)
  }
  currentDate.value = date.toISOString().split('T')[0]
}

const onDateChange = (newDate: string) => {
  currentDate.value = newDate
  showDatePicker.value = false
}

const selectDate = (date: string) => {
  currentDate.value = date
  currentView.value = 'week'
}

const getBookingsForSlot = (date: string, hour: number) => {
  return filteredBookings.value.filter(booking => {
    const bookingDate = booking.start_date.split('T')[0]
    const bookingHour = parseInt(booking.start_time.split(':')[0])
    return bookingDate === date && bookingHour <= hour && bookingHour + (booking.duration || 1) > hour
  })
}

const getBookingsForDay = (date: string) => {
  return filteredBookings.value.filter(booking => {
    return booking.start_date.startsWith(date)
  })
}

const getSlotClass = (date: string, hour: number) => {
  const bookings = getBookingsForSlot(date, hour)
  if (bookings.length === 0) return 'slot-empty'
  
  const hasConfirmed = bookings.some(b => b.status === 'confirmed')
  const hasPending = bookings.some(b => b.status === 'pending')
  
  if (hasConfirmed) return 'slot-confirmed'
  if (hasPending) return 'slot-pending'
  return 'slot-occupied'
}

const handleSlotClick = (date: string, hour: number) => {
  const bookingsInSlot = getBookingsForSlot(date, hour)
  if (bookingsInSlot.length === 1) {
    showBookingDetails(bookingsInSlot[0])
  } else if (bookingsInSlot.length > 1) {
    // 顯示多個預約的選擇
    $q.notify({
      type: 'info',
      message: `此時段有 ${bookingsInSlot.length} 個預約`,
      timeout: 2000
    })
  }
}

const showBookingDetails = (booking: Booking) => {
  selectedBooking.value = booking
  showBookingDetailsDialog.value = true
}

const getBookingTitle = (booking: Booking) => {
  return booking.patient_name || `預約 #${booking.id.slice(-4)}`
}

const formatBookingTime = (booking: Booking) => {
  const date = new Date(booking.start_date).toLocaleDateString('zh-TW')
  return `${date} ${booking.start_time} - ${booking.end_time}`
}

const getStatusName = (status: string) => {
  const statusMap: Record<string, string> = {
    'pending': '待確認',
    'confirmed': '已確認',
    'in_progress': '進行中',
    'completed': '已完成',
    'cancelled': '已取消'
  }
  return statusMap[status] || status
}

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    'pending': 'warning',
    'confirmed': 'positive',
    'in_progress': 'info',
    'completed': 'grey',
    'cancelled': 'negative'
  }
  return colorMap[status] || 'grey'
}

const confirmBooking = async (booking: Booking | null) => {
  if (!booking) return
  
  try {
    await apiService.confirmBooking(booking.id)
    booking.status = 'confirmed'
    
    $q.notify({
      type: 'positive',
      message: '預約已確認',
      timeout: 2000
    })
    
    showBookingDetailsDialog.value = false
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || '確認預約失敗',
      timeout: 3000
    })
  }
}

const cancelBooking = async (booking: Booking | null) => {
  if (!booking) return
  
  $q.dialog({
    title: '確認取消',
    message: '您確定要取消這個預約嗎？',
    ok: {
      color: 'negative',
      label: '確認取消'
    },
    cancel: {
      color: 'grey',
      label: '不取消'
    }
  }).onOk(async () => {
    try {
      await apiService.cancelBooking(booking.id)
      booking.status = 'cancelled'
      
      $q.notify({
        type: 'positive',
        message: '預約已取消',
        timeout: 2000
      })
      
      showBookingDetailsDialog.value = false
    } catch (error: any) {
      $q.notify({
        type: 'negative',
        message: error.message || '取消預約失敗',
        timeout: 3000
      })
    }
  })
}

// 生命週期
onMounted(() => {
  loadBookings()
})

// 頁面結構化資料
const { $route } = useNuxtApp()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '排程管理 - 護理服務平台',
        url: baseUrl + $route.fullPath,
        description: '查看並管理您的照護排程和預約',
        provider: {
          '@type': 'Organization',
          name: '護理服務平台'
        }
      })
    }
  ]
})
</script>

<style scoped>
.schedule-grid {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.schedule-slot {
  min-height: 60px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.slot-empty {
  background-color: #fafafa;
}

.slot-empty:hover {
  background-color: #f0f0f0;
}

.slot-pending {
  background-color: #fff3cd;
  border-color: #ffeaa7;
}

.slot-confirmed {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

.slot-occupied {
  background-color: #f8d7da;
  border-color: #f5c6cb;
}

.booking-item {
  background: white;
  border-radius: 4px;
  padding: 4px 6px;
  margin: 2px;
  border-left: 3px solid #ddd;
  cursor: pointer;
}

.booking-pending {
  border-left-color: #ffc107;
  background-color: #fff8e1;
}

.booking-confirmed {
  border-left-color: #28a745;
  background-color: #f1f8e9;
}

.booking-in_progress {
  border-left-color: #17a2b8;
  background-color: #e6f7ff;
}

.booking-completed {
  border-left-color: #6c757d;
  background-color: #f8f9fa;
}

.booking-cancelled {
  border-left-color: #dc3545;
  background-color: #ffeaea;
}

.calendar-grid {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-day {
  border: 1px solid #f0f0f0;
  min-height: 100px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.calendar-day:hover {
  background-color: #f5f5f5;
}

.calendar-day.other-month {
  color: #ccc;
  background-color: #fafafa;
}

.calendar-day.today {
  background-color: #e3f2fd;
  font-weight: bold;
}

.day-number {
  font-size: 14px;
  margin-bottom: 4px;
}

.day-bookings {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.booking-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
}

.booking-dot.booking-pending {
  background-color: #ffc107;
}

.booking-dot.booking-confirmed {
  background-color: #28a745;
}

.booking-dot.booking-in_progress {
  background-color: #17a2b8;
}

.booking-dot.booking-completed {
  background-color: #6c757d;
}

.booking-dot.booking-cancelled {
  background-color: #dc3545;
}
</style>
