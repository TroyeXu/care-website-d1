<template>
  <q-page class="bookings-page">
    <!-- 頁面標題 -->
    <div class="page-header">
      <h1 class="text-h4 text-weight-bold">我的預約</h1>
      <p class="text-grey-6">管理您的看護服務預約</p>
    </div>

    <!-- 篩選標籤 -->
    <div class="filter-tabs q-mb-lg">
      <q-tabs
        v-model="activeTab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <q-tab name="all" label="全部" />
        <q-tab name="pending" label="待確認">
          <q-badge v-if="pendingCount > 0" color="orange" floating>
            {{ pendingCount }}
          </q-badge>
        </q-tab>
        <q-tab name="confirmed" label="已確認" />
        <q-tab name="in_progress" label="進行中" />
        <q-tab name="completed" label="已完成" />
        <q-tab name="cancelled" label="已取消" />
      </q-tabs>
    </div>

    <!-- 載入狀態 -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-grey-6 q-mt-md">載入中...</div>
    </div>

    <!-- 空狀態 -->
    <div v-else-if="filteredBookings.length === 0" class="empty-state">
      <q-icon name="event_busy" size="80px" color="grey-5" />
      <div class="text-h6 text-grey-7 q-mt-md">
        {{ emptyMessage }}
      </div>
      <q-btn
        v-if="activeTab === 'all'"
        flat
        color="primary"
        label="瀏覽看護師"
        class="q-mt-md"
        to="/caregivers"
      />
    </div>

    <!-- 預約列表 -->
    <div v-else class="bookings-list">
      <transition-group name="list" tag="div">
        <q-card
          v-for="booking in filteredBookings"
          :key="booking.id"
          flat
          bordered
          class="booking-card q-mb-md"
        >
          <q-card-section>
            <div class="row items-start">
              <!-- 左側：看護師資訊 -->
              <div class="col-12 col-md-4">
                <div class="caregiver-info">
                  <q-avatar size="60px" class="q-mr-md">
                    <img :src="getCaregiverAvatar(booking.caregiver_id)" />
                  </q-avatar>
                  <div>
                    <div class="text-h6">
                      {{ getCaregiverName(booking.caregiver_id) }}
                    </div>
                    <div class="text-caption text-grey-6">
                      看護師 ID: {{ booking.caregiver_id }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 中間：預約資訊 -->
              <div class="col-12 col-md-5 q-mt-md q-mt-md-none">
                <div class="booking-details">
                  <div class="detail-item">
                    <q-icon name="event" size="20px" color="grey-7" />
                    <span>
                      {{ formatDate(booking.start_date) }} -
                      {{ formatDate(booking.end_date) }}
                    </span>
                  </div>
                  <div class="detail-item">
                    <q-icon name="schedule" size="20px" color="grey-7" />
                    <span>
                      {{ booking.start_time }}
                      {{ booking.end_time ? `- ${booking.end_time}` : '' }}
                    </span>
                  </div>
                  <div class="detail-item">
                    <q-icon name="person" size="20px" color="grey-7" />
                    <span>病患：{{ booking.patient_info.name }}</span>
                  </div>
                  <div class="detail-item">
                    <q-icon name="category" size="20px" color="grey-7" />
                    <span>
                      {{
                        booking.service_type === 'hourly'
                          ? '按小時計費'
                          : '按班次計費'
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- 右側：狀態和操作 -->
              <div class="col-12 col-md-3 q-mt-md q-mt-md-none text-right">
                <q-chip
                  :color="getStatusColor(booking.status)"
                  text-color="white"
                  class="q-mb-sm"
                >
                  {{ getStatusLabel(booking.status) }}
                </q-chip>

                <div class="price-display q-mb-md">
                  <div class="text-h6 text-primary">
                    NT$ {{ booking.total_cost.toLocaleString() }}
                  </div>
                </div>

                <div class="action-buttons">
                  <q-btn
                    flat
                    dense
                    color="primary"
                    label="查看詳情"
                    :to="`/bookings/${booking.id}`"
                    class="full-width q-mb-xs"
                  />

                  <q-btn
                    v-if="booking.status === 'pending'"
                    flat
                    dense
                    color="negative"
                    label="取消預約"
                    class="full-width"
                    @click="cancelBooking(booking.id)"
                  />

                  <q-btn
                    v-if="booking.status === 'confirmed'"
                    flat
                    dense
                    color="grey"
                    label="聯絡看護師"
                    class="full-width"
                    @click="contactCaregiver(booking.caregiver_id)"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </transition-group>
    </div>

    <!-- 建立新預約按鈕 -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" to="/caregivers">
        <q-tooltip>建立新預約</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useBookingStore } from '~/stores/bookings'
import { useCaregiverStore } from '~/stores/caregivers'

const $q = useQuasar()
const bookingStore = useBookingStore()
const caregiverStore = useCaregiverStore()

// 響應式資料
const activeTab = ref('all')
const loading = ref(false)

// 載入資料
onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([
      bookingStore.fetchBookings(),
      caregiverStore.fetchCaregivers(),
    ])
    // 如果 API 失敗，保持空陣列
  } finally {
    loading.value = false
  }
})

// 計算屬性
const filteredBookings = computed(() => {
  if (activeTab.value === 'all') {
    return bookingStore.bookings
  }
  return bookingStore.bookings.filter((b) => b.status === activeTab.value)
})

const pendingCount = computed(
  () => bookingStore.bookings.filter((b) => b.status === 'pending').length,
)

const emptyMessage = computed(() => {
  const messages = {
    all: '您還沒有任何預約',
    pending: '沒有待確認的預約',
    confirmed: '沒有已確認的預約',
    in_progress: '沒有進行中的預約',
    completed: '沒有已完成的預約',
    cancelled: '沒有已取消的預約',
  }
  return messages[activeTab.value as keyof typeof messages] || '沒有預約記錄'
})

// 輔助函數
const getCaregiverName = (caregiverId: number | string) => {
  // 從 caregiverStore 獲取看護師資訊
  const caregiver = caregiverStore.caregivers.find((c) => c.id === caregiverId)
  return caregiver?.name || `看護師 ${caregiverId}`
}

const getCaregiverAvatar = (caregiverId: number | string) => {
  return `https://i.pravatar.cc/150?img=${caregiverId}`
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    month: '2-digit',
    day: '2-digit',
  })
}

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'orange',
    confirmed: 'green',
    in_progress: 'blue',
    completed: 'grey',
    cancelled: 'red',
  }
  return colors[status as keyof typeof colors] || 'grey'
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending: '待確認',
    confirmed: '已確認',
    in_progress: '進行中',
    completed: '已完成',
    cancelled: '已取消',
  }
  return labels[status as keyof typeof labels] || status
}

// 操作方法
const cancelBooking = (bookingId: string) => {
  $q.dialog({
    title: '確認取消',
    message: '確定要取消這個預約嗎？',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await bookingStore.cancelBooking(bookingId)
      $q.notify({
        type: 'positive',
        message: '預約已取消',
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '取消失敗，請稍後再試',
      })
    }
  })
}

const contactCaregiver = (caregiverId: number | string) => {
  $q.dialog({
    title: '聯絡看護師',
    message: `看護師聯絡方式：\n電話：0987-654-321\n請在服務時間內聯繫`,
    ok: {
      label: '確定',
      color: 'primary',
    },
  })
}
</script>

<style scoped>
.bookings-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  margin: 0 0 8px 0;
}

.filter-tabs {
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.booking-card {
  transition: all 0.3s ease;
  border-radius: 8px;
}

.booking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.caregiver-info {
  display: flex;
  align-items: center;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4a5568;
}

.price-display {
  padding: 8px;
  background: #f0f9ff;
  border-radius: 6px;
  text-align: center;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* 動畫 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .bookings-page {
    padding: 12px;
  }

  .booking-card .row {
    flex-direction: column;
  }

  .booking-card .col-12 {
    margin-bottom: 12px;
  }

  .action-buttons {
    flex-direction: row;
    gap: 8px;
  }

  .action-buttons .q-btn {
    flex: 1;
  }
}
</style>
