<template>
  <div class="dashboard">
    <div v-if="authStore.isAuthenticated" class="dashboard-content">
      <!-- 用戶歡迎區塊 -->
      <div class="welcome-section">
        <div class="user-info">
          <img 
            :src="authStore.currentUser?.avatar || '/images/default-avatar.jpg'" 
            :alt="authStore.currentUser?.name"
            class="user-avatar"
            @error="handleAvatarError"
          />
          <div class="user-details">
            <h1>歡迎回來，{{ authStore.currentUser?.name }}</h1>
            <p class="user-role">{{ userRoleText }} | {{ authStore.currentUser?.email }}</p>
            <div class="user-stats">
              <div class="stat-item">
                <span class="stat-number">{{ userBookings.length }}</span>
                <span class="stat-label">總預約數</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ completedBookings.length }}</span>
                <span class="stat-label">已完成</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ pendingBookings.length }}</span>
                <span class="stat-label">待確認</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速操作 -->
      <div class="quick-actions">
        <div class="section-header">
          <h2>快速操作</h2>
          <p class="section-subtitle">選擇您需要的服務</p>
        </div>
        <div class="action-grid">
          <button 
            class="action-card" 
            @click="navigateTo('/caregivers/search')"
            aria-label="搜尋看護師服務"
          >
            <div class="action-icon" aria-hidden="true">🔍</div>
            <div class="action-text">
              <h3>搜尋看護</h3>
              <p>找到最適合的看護師</p>
            </div>
          </button>
          
          <button 
            class="action-card" 
            @click="navigateTo('/booking/calculator')"
            aria-label="計算照護服務費用"
          >
            <div class="action-icon" aria-hidden="true">💰</div>
            <div class="action-text">
              <h3>費用計算</h3>
              <p>估算照護服務費用</p>
            </div>
          </button>
          
          <button 
            class="action-card" 
            @click="navigateTo('/booking/match')"
            aria-label="使用AI智能媒合推薦看護"
          >
            <div class="action-icon" aria-hidden="true">🎯</div>
            <div class="action-text">
              <h3>智能媒合</h3>
              <p>AI 推薦最佳看護</p>
            </div>
          </button>
          
          <button 
            class="action-card" 
            @click="navigateTo('/booking/schedule')"
            aria-label="管理預約排程"
          >
            <div class="action-icon" aria-hidden="true">📅</div>
            <div class="action-text">
              <h3>排程管理</h3>
              <p>查看預約時程</p>
            </div>
          </button>
        </div>
      </div>

      <!-- 個人化推薦 -->
      <div class="recommendations-section">
        <div class="section-header">
          <h2>為您推薦</h2>
          <p class="section-subtitle">根據您的需求精選的專業看護師</p>
        </div>
        <div v-if="recommendedCaregivers.length > 0" class="caregivers-grid">
          <CaregiverCard 
            v-for="caregiver in recommendedCaregivers" 
            :key="caregiver.id"
            :caregiver="caregiver"
            @book="handleBookCaregiver"
          />
        </div>
        <div v-else class="empty-state">
          <p>暫無推薦看護師，請先完善您的個人資料和偏好設定</p>
          <button 
            class="btn-primary" 
            @click="navigateTo('/profile')"
            aria-label="前往個人資料頁面完善資料"
          >
            完善資料
          </button>
        </div>
      </div>

      <!-- 即將到來的預約 -->
      <div class="upcoming-section">
        <div class="section-header">
          <h2>即將到來的預約</h2>
          <p class="section-subtitle">管理您的預約時程</p>
        </div>
        <div v-if="upcomingBookings.length > 0" class="bookings-list">
          <div 
            v-for="booking in upcomingBookings" 
            :key="booking.id"
            class="booking-card"
          >
            <div class="booking-info">
              <div class="booking-caregiver">
                <strong>{{ getCaregiverName(booking.caregiver_id) }}</strong>
              </div>
              <div class="booking-details">
                <span class="booking-date">{{ formatDate(booking.start_date) }}</span>
                <span class="booking-time">{{ booking.start_time }}</span>
                <span class="booking-type">{{ serviceTypeText(booking.service_type) }}</span>
              </div>
              <div class="booking-status" :class="`status-${booking.status}`">
                {{ statusText(booking.status) }}
              </div>
            </div>
            <div class="booking-actions">
              <button 
                class="btn-secondary btn-sm" 
                @click="viewBookingDetails(booking)"
                :aria-label="`查看 ${getCaregiverName(booking.caregiver_id)} 的預約詳情`"
              >
                查看詳情
              </button>
              <button 
                v-if="booking.status === 'pending'" 
                class="btn-danger btn-sm"
                @click="cancelBooking(booking)"
                :aria-label="`取消與 ${getCaregiverName(booking.caregiver_id)} 的預約`"
              >
                取消預約
              </button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>目前沒有即將到來的預約</p>
          <button 
            class="btn-primary" 
            @click="navigateTo('/caregivers/search')"
            aria-label="前往搜尋頁面立即預約看護"
          >
            立即預約
          </button>
        </div>
      </div>

      <!-- 服務歷史 -->
      <div class="history-section">
        <div class="section-header">
          <h2>服務歷史</h2>
          <p class="section-subtitle">查看過往的服務記錄</p>
        </div>
        <div v-if="recentBookings.length > 0" class="history-list">
          <div 
            v-for="booking in recentBookings.slice(0, 5)" 
            :key="booking.id"
            class="history-item"
          >
            <div class="history-info">
              <span class="history-caregiver">{{ getCaregiverName(booking.caregiver_id) }}</span>
              <span class="history-date">{{ formatDate(booking.start_date) }}</span>
              <span class="history-status" :class="`status-${booking.status}`">
                {{ statusText(booking.status) }}
              </span>
            </div>
            <div class="history-cost">
              NT$ {{ booking.total_cost.toLocaleString() }}
            </div>
          </div>
          <button 
            class="btn-link" 
            @click="navigateTo('/bookings')"
            aria-label="查看所有服務歷史記錄"
          >
            查看完整歷史記錄
          </button>
        </div>
        <div v-else class="empty-state">
          <p>尚無服務歷史記錄</p>
        </div>
      </div>
    </div>
    
    <!-- 未登入狀態 -->
    <div v-else class="login-prompt">
      <div class="login-card">
        <h2>請先登入</h2>
        <p>登入後即可查看個人儀表板、預約記錄和推薦服務</p>
        <div class="login-actions">
          <button 
            class="btn-primary" 
            @click="navigateTo('/auth/login')"
            aria-label="前往登入頁面"
          >
            立即登入
          </button>
          <button 
            class="btn-secondary" 
            @click="navigateTo('/auth/register')"
            aria-label="前往註冊頁面建立新帳號"
          >
            註冊帳號
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useApiService } from '~/composables/useApiService'
import { useMatchingAlgorithm } from '~/composables/useMatchingAlgorithm'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('個人儀表板 - 護理服務平台', '快速查看推薦看護及即將到來的排程')

definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const apiService = useApiService()
const { findMatches } = useMatchingAlgorithm()

// 響應式資料
const dashboardStats = ref(null)
const recommendedCaregivers = ref([])
const upcomingBookings = ref([])
const recentBookings = ref([])
const caregivers = ref([])

// 載入資料
onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    if (authStore.currentUser) {
      // 載入儀表板統計
      dashboardStats.value = await apiService.getDashboardStats(authStore.currentUser.id)
      
      // 載入推薦看護師
      const caregiversResponse = await apiService.getFeaturedCaregivers()
      recommendedCaregivers.value = caregiversResponse.data || caregiversResponse
      caregivers.value = recommendedCaregivers.value
      
      // 載入用戶預約
      const bookingsResponse = await apiService.getBookingsByUser(authStore.currentUser.id)
      const userBookings = bookingsResponse || []
      
      // 處理即將到來的預約
      const now = new Date()
      upcomingBookings.value = userBookings
        .filter(booking => {
          const bookingDate = new Date(booking.start_date)
          return bookingDate >= now && ['confirmed', 'pending'].includes(booking.status)
        })
        .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
        .slice(0, 3)
      
      // 處理最近的預約
      recentBookings.value = userBookings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    }
  } catch (error) {
    console.error('載入儀表板資料失敗:', error)
  }
}

// 計算屬性
const userRoleText = computed(() => {
  switch (authStore.currentUser?.role) {
    case 'patient': return '照護需求者'
    case 'caregiver': return '看護人員'
    case 'admin': return '管理員'
    default: return '用戶'
  }
})

const userBookings = computed(() => {
  return [...upcomingBookings.value, ...recentBookings.value]
})

const completedBookings = computed(() => {
  return userBookings.value.filter(booking => booking.status === 'completed')
})

const pendingBookings = computed(() => {
  return userBookings.value.filter(booking => booking.status === 'pending')
})

// 方法
const handleAvatarError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/default-avatar.jpg'
}

const getCaregiverName = (caregiverId: number): string => {
  const caregiver = caregivers.value.find(c => c.id === caregiverId)
  return caregiver?.name || '未知看護師'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const serviceTypeText = (type: string): string => {
  return type === 'hourly' ? '按時計費' : '包班制'
}

const statusText = (status: string): string => {
  const statusMap = {
    pending: '待確認',
    confirmed: '已確認',
    in_progress: '進行中',
    completed: '已完成',
    cancelled: '已取消'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const handleBookCaregiver = (caregiver: any) => {
  navigateTo(`/caregivers/${caregiver.id}?action=book`)
}

const viewBookingDetails = (booking: any) => {
  navigateTo(`/bookings/${booking.id}`)
}

const cancelBooking = async (booking: any) => {
  if (confirm('確定要取消這個預約嗎？')) {
    try {
      await apiService.cancelBooking(booking.id)
      alert('預約已取消')
      // 重新載入資料
      await loadDashboardData()
    } catch (error) {
      alert('取消預約時發生錯誤')
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 歡迎區塊 */
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 32px;
  color: white;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.user-details h1 {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
}

.user-role {
  margin: 0 0 16px 0;
  opacity: 0.9;
}

.user-stats {
  display: flex;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* 快速操作 */
.quick-actions h2 {
  margin: 0 0 20px 0;
  color: #2d3748;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(49, 130, 206, 0.1), transparent);
  transition: left 0.5s;
}

.action-card:hover {
  border-color: #3182ce;
  box-shadow: 0 8px 25px rgba(49, 130, 206, 0.15);
  transform: translateY(-2px);
}

.action-card:hover::before {
  left: 100%;
}

.action-card:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.1);
}

.action-icon {
  font-size: 2rem;
  min-width: 60px;
  text-align: center;
}

.action-text h3 {
  margin: 0 0 4px 0;
  color: #2d3748;
  font-size: 1.125rem;
}

.action-text p {
  margin: 0;
  color: #718096;
  font-size: 0.875rem;
}

/* 區塊標題 */
.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  margin: 0 0 4px 0;
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
}

.section-subtitle {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
}

/* 快速操作標題 */
.quick-actions .section-header {
  margin-bottom: 20px;
}

.quick-actions .section-header h2 {
  color: #2d3748;
}

.caregivers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.bookings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.booking-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

.booking-info {
  flex: 1;
}

.booking-caregiver {
  margin-bottom: 8px;
  font-size: 1.125rem;
}

.booking-details {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #718096;
}

.booking-status {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pending { background: #fed7d7; color: #c53030; }
.status-confirmed { background: #c6f6d5; color: #2f855a; }
.status-in_progress { background: #bee3f8; color: #2b6cb0; }
.status-completed { background: #d4edda; color: #155724; }
.status-cancelled { background: #f8d7da; color: #721c24; }

.booking-actions {
  display: flex;
  gap: 8px;
}

/* 歷史記錄 */
.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f7fafc;
  border-radius: 12px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.history-item:hover {
  background: #edf2f7;
  border-color: #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.history-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.history-caregiver {
  font-weight: 600;
  color: #2d3748;
}

.history-date {
  color: #718096;
  font-size: 0.875rem;
}

.history-cost {
  font-weight: 700;
  color: #3182ce;
}

/* 按鈕樣式 */
.btn-primary, .btn-secondary, .btn-danger, .btn-link {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  font-size: 0.875rem;
}

.btn-primary, .btn-secondary, .btn-danger {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-primary:active, .btn-secondary:active, .btn-danger:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn-primary {
  background: #3182ce;
  color: white;
}

.btn-primary:hover {
  background: #2c5282;
  box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
}

.btn-secondary {
  background: white;
  border: 1px solid #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #f7fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e0;
}

.btn-danger {
  background: #e53e3e;
  color: white;
}

.btn-danger:hover {
  background: #c53030;
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.btn-link {
  background: none;
  color: #3182ce;
  padding: 8px 0;
}

.btn-link:hover {
  color: #2c5282;
  text-decoration: underline;
}

/* 空狀態 */
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

.empty-state button {
  margin-top: 16px;
}

/* 登入提示 */
.login-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}

.login-card h2 {
  margin: 0 0 16px 0;
  color: #2d3748;
}

.login-card p {
  margin: 0 0 24px 0;
  color: #718096;
}

.login-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* 響應式設計 */
@media (max-width: 1024px) {
  .dashboard {
    padding: 20px;
  }
  
  .caregivers-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  
  .action-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 16px;
  }
  
  .dashboard-content {
    gap: 24px;
  }
  
  .welcome-section {
    padding: 24px 20px;
  }
  
  .user-info {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .user-avatar {
    width: 64px;
    height: 64px;
  }
  
  .user-details h1 {
    font-size: 1.5rem;
  }
  
  .user-stats {
    justify-content: center;
    gap: 24px;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .action-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .action-card {
    padding: 16px;
  }
  
  .action-icon {
    font-size: 1.5rem;
    min-width: 48px;
  }
  
  .caregivers-grid {
    grid-template-columns: 1fr;
  }
  
  .booking-card {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
    padding: 16px;
  }
  
  .booking-actions {
    justify-content: stretch;
  }
  
  .booking-actions button {
    flex: 1;
  }
  
  .history-item {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
    padding: 12px;
  }
  
  .history-info {
    flex-direction: column;
    gap: 4px;
    align-items: flex-start;
  }
  
  .login-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 12px;
  }
  
  .dashboard-content {
    gap: 20px;
  }
  
  .welcome-section {
    padding: 20px 16px;
  }
  
  .user-stats {
    gap: 16px;
  }
  
  .stat-item {
    min-width: 60px;
  }
  
  .action-card {
    padding: 12px;
    gap: 12px;
  }
  
  .action-text h3 {
    font-size: 1rem;
  }
  
  .action-text p {
    font-size: 0.8rem;
  }
}
</style>
