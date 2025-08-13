<template>
  <q-page class="booking-detail-page">
    <!-- 載入狀態 -->
    <div v-if="loading" class="text-center q-pa-xl">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-grey-6 q-mt-md">載入中...</div>
    </div>

    <!-- 錯誤狀態 -->
    <div v-else-if="error" class="text-center q-pa-xl">
      <q-icon name="error_outline" size="80px" color="negative" />
      <div class="text-h6 text-negative q-mt-md">載入失敗</div>
      <div class="text-body2 text-grey-6 q-mt-sm">{{ error }}</div>
      <q-btn flat color="primary" label="返回預約列表" to="/bookings" class="q-mt-md" />
    </div>

    <!-- 預約詳情 -->
    <div v-else-if="booking" class="booking-detail">
      <!-- 狀態橫幅 -->
      <div class="status-banner" :class="`status-${booking.status}`">
        <q-icon :name="getStatusIcon(booking.status)" size="32px" />
        <div class="status-info">
          <div class="text-h6">{{ getStatusLabel(booking.status) }}</div>
          <div class="text-caption">
            預約編號：{{ booking.id }}
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="row q-gutter-lg">
          <!-- 左側主要資訊 -->
          <div class="col-12 col-md-7">
            <!-- 看護師資訊 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="section-title">
                  <q-icon name="person" size="24px" color="primary" />
                  <span>看護師資訊</span>
                </div>
                <div class="caregiver-card">
                  <q-avatar size="80px">
                    <img :src="getCaregiverAvatar(booking.caregiver_id)" />
                  </q-avatar>
                  <div class="caregiver-details">
                    <div class="text-h6">{{ getCaregiverName(booking.caregiver_id) }}</div>
                    <div class="text-body2 text-grey-6">專業看護師</div>
                    <div class="contact-info q-mt-sm">
                      <q-chip dense icon="phone" color="grey-2">
                        0987-654-321
                      </q-chip>
                      <q-chip dense icon="email" color="grey-2">
                        nurse@example.com
                      </q-chip>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- 服務資訊 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="section-title">
                  <q-icon name="event" size="24px" color="primary" />
                  <span>服務資訊</span>
                </div>
                
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="category" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>服務類型</q-item-label>
                      <q-item-label caption>
                        {{ booking.service_type === 'hourly' ? '按小時計費' : '按班次計費' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="date_range" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>服務日期</q-item-label>
                      <q-item-label caption>
                        {{ formatFullDate(booking.start_date) }} 至 
                        {{ formatFullDate(booking.end_date) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="schedule" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>服務時間</q-item-label>
                      <q-item-label caption>
                        {{ booking.start_time }}
                        {{ booking.end_time ? `- ${booking.end_time}` : '' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="booking.special_requests">
                    <q-item-section avatar>
                      <q-icon name="note" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>特殊需求</q-item-label>
                      <q-item-label caption>
                        {{ booking.special_requests }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>

            <!-- 病患資訊 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="section-title">
                  <q-icon name="accessible" size="24px" color="primary" />
                  <span>病患資訊</span>
                </div>
                
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="person" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>姓名</q-item-label>
                      <q-item-label caption>{{ booking.patient_info.name }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="cake" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>年齡</q-item-label>
                      <q-item-label caption>{{ booking.patient_info.age }} 歲</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="wc" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>性別</q-item-label>
                      <q-item-label caption>{{ booking.patient_info.gender }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="phone" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>緊急聯絡人</q-item-label>
                      <q-item-label caption>{{ booking.patient_info.emergencyContact }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="booking.patient_info.medicalConditions?.length">
                    <q-item-section avatar>
                      <q-icon name="medical_services" color="grey-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>疾病史/特殊需求</q-item-label>
                      <q-item-label caption>
                        <div v-for="condition in booking.patient_info.medicalConditions" :key="condition">
                          • {{ condition }}
                        </div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <!-- 右側費用和操作 -->
          <div class="col-12 col-md-4">
            <!-- 費用資訊 -->
            <q-card flat bordered class="q-mb-lg sticky-card">
              <q-card-section>
                <div class="section-title">
                  <q-icon name="payments" size="24px" color="primary" />
                  <span>費用資訊</span>
                </div>
                
                <div class="price-display">
                  <div class="text-caption text-grey-6">總費用</div>
                  <div class="text-h4 text-primary text-weight-bold">
                    NT$ {{ booking.total_cost.toLocaleString() }}
                  </div>
                </div>

                <q-separator class="q-my-md" />

                <!-- 操作按鈕 -->
                <div class="action-buttons">
                  <q-btn
                    v-if="booking.status === 'pending'"
                    unelevated
                    color="green"
                    label="確認預約"
                    icon="check_circle"
                    class="full-width q-mb-sm"
                    @click="confirmBooking"
                  />
                  
                  <q-btn
                    v-if="booking.status === 'pending'"
                    outline
                    color="negative"
                    label="取消預約"
                    icon="cancel"
                    class="full-width q-mb-sm"
                    @click="cancelBooking"
                  />

                  <q-btn
                    v-if="['confirmed', 'in_progress'].includes(booking.status)"
                    outline
                    color="primary"
                    label="聯絡看護師"
                    icon="message"
                    class="full-width q-mb-sm"
                    @click="contactCaregiver"
                  />

                  <q-btn
                    v-if="booking.status === 'completed'"
                    outline
                    color="amber"
                    label="評價服務"
                    icon="star"
                    class="full-width q-mb-sm"
                    @click="rateService"
                  />

                  <q-btn
                    flat
                    color="grey"
                    label="返回列表"
                    icon="arrow_back"
                    class="full-width"
                    to="/bookings"
                  />
                </div>
              </q-card-section>
            </q-card>

            <!-- 時間軸 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="section-title">
                  <q-icon name="timeline" size="24px" color="primary" />
                  <span>預約時間軸</span>
                </div>
                
                <q-timeline color="primary" layout="dense">
                  <q-timeline-entry
                    title="建立預約"
                    :subtitle="formatDateTime(booking.created_at)"
                    icon="add_circle"
                    :color="getTimelineColor('created')"
                  />
                  
                  <q-timeline-entry
                    v-if="['confirmed', 'in_progress', 'completed'].includes(booking.status)"
                    title="確認預約"
                    subtitle="看護師已確認"
                    icon="check_circle"
                    :color="getTimelineColor('confirmed')"
                  />
                  
                  <q-timeline-entry
                    v-if="['in_progress', 'completed'].includes(booking.status)"
                    title="服務開始"
                    :subtitle="formatFullDate(booking.start_date)"
                    icon="play_circle"
                    :color="getTimelineColor('in_progress')"
                  />
                  
                  <q-timeline-entry
                    v-if="booking.status === 'completed'"
                    title="服務完成"
                    :subtitle="formatFullDate(booking.end_date)"
                    icon="check_circle"
                    :color="getTimelineColor('completed')"
                  />
                  
                  <q-timeline-entry
                    v-if="booking.status === 'cancelled'"
                    title="預約取消"
                    :subtitle="formatDateTime(booking.updated_at)"
                    icon="cancel"
                    color="negative"
                  />
                </q-timeline>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- 找不到預約 -->
    <div v-else class="text-center q-pa-xl">
      <q-icon name="search_off" size="80px" color="grey-5" />
      <div class="text-h6 text-grey-7 q-mt-md">找不到預約資訊</div>
      <q-btn flat color="primary" label="返回預約列表" to="/bookings" class="q-mt-md" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useBookingStore } from '~/stores/bookings'

const route = useRoute()
const router = useRouter()
const $q = useQuasar()
const bookingStore = useBookingStore()

// 響應式資料
const loading = ref(false)
const error = ref('')

// 計算屬性
const bookingId = computed(() => route.params.id as string)
const booking = computed(() => bookingStore.getBookingById(bookingId.value))

// 載入資料
onMounted(async () => {
  loading.value = true
  try {
    // 如果 store 中沒有資料，先載入
    if (bookingStore.bookings.length === 0) {
      await bookingStore.fetchBookings()
      // 如果 API 失敗，保持空陣列
    }
    
    if (!booking.value) {
      error.value = '找不到預約資訊'
    }
  } catch (err) {
    error.value = '載入失敗，請稍後再試'
    console.error('載入預約失敗:', err)
  } finally {
    loading.value = false
  }
})

// 輔助函數
const getCaregiverName = (caregiverId: number) => {
  const names = ['張美玲', '陳淑芬', '王雅婷', '李秀蘭', '林惠珍']
  return names[caregiverId % names.length] || `看護師 ${caregiverId}`
}

const getCaregiverAvatar = (caregiverId: number) => {
  return `https://i.pravatar.cc/150?img=${caregiverId}`
}

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getStatusIcon = (status: string) => {
  const icons = {
    pending: 'hourglass_empty',
    confirmed: 'check_circle',
    in_progress: 'play_circle_filled',
    completed: 'task_alt',
    cancelled: 'cancel',
  }
  return icons[status as keyof typeof icons] || 'help'
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

const getTimelineColor = (status: string) => {
  if (booking.value?.status === 'cancelled') return 'grey'
  
  const colors = {
    created: 'blue',
    confirmed: 'green',
    in_progress: 'orange',
    completed: 'positive',
  }
  return colors[status as keyof typeof colors] || 'grey'
}

// 操作方法
const confirmBooking = () => {
  $q.dialog({
    title: '確認預約',
    message: '確定要確認這個預約嗎？',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await bookingStore.confirmBooking(bookingId.value)
      $q.notify({
        type: 'positive',
        message: '預約已確認',
      })
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '確認失敗，請稍後再試',
      })
    }
  })
}

const cancelBooking = () => {
  $q.dialog({
    title: '取消預約',
    message: '確定要取消這個預約嗎？此操作無法復原。',
    cancel: true,
    persistent: true,
    color: 'negative',
  }).onOk(async () => {
    try {
      await bookingStore.cancelBooking(bookingId.value)
      $q.notify({
        type: 'positive',
        message: '預約已取消',
      })
      router.push('/bookings')
    } catch (error) {
      $q.notify({
        type: 'negative',
        message: '取消失敗，請稍後再試',
      })
    }
  })
}

const contactCaregiver = () => {
  $q.dialog({
    title: '聯絡看護師',
    message: '看護師聯絡方式：\n電話：0987-654-321\nEmail：nurse@example.com',
    ok: {
      label: '確定',
      color: 'primary',
    },
  })
}

const rateService = () => {
  $q.notify({
    type: 'info',
    message: '評價功能開發中',
  })
}
</script>

<style scoped>
.booking-detail-page {
  background: #f5f7fa;
  min-height: 100vh;
}

.status-banner {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  color: white;
  margin-bottom: 24px;
}

.status-pending {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
}

.status-confirmed {
  background: linear-gradient(135deg, #4caf50, #66bb6a);
}

.status-in_progress {
  background: linear-gradient(135deg, #2196f3, #42a5f5);
}

.status-completed {
  background: linear-gradient(135deg, #607d8b, #78909c);
}

.status-cancelled {
  background: linear-gradient(135deg, #f44336, #ef5350);
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2c3e50;
}

.caregiver-card {
  display: flex;
  gap: 20px;
  align-items: start;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.caregiver-details {
  flex: 1;
}

.contact-info {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.price-display {
  text-align: center;
  padding: 24px;
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 12px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sticky-card {
  position: sticky;
  top: 20px;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 0 12px 20px;
  }

  .status-banner {
    padding: 16px;
  }

  .sticky-card {
    position: relative;
    top: 0;
  }
}
</style>