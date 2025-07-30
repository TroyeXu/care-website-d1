<template>
  <div class="match-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg-pattern"></div>
      <div class="hero-content">
        <div class="container">
          <div class="hero-text-center">
            <div class="hero-icon-wrapper">
              <q-icon name="psychology" class="hero-icon" />
            </div>
            <h1 class="hero-title">智能媒合推薦</h1>
            <p class="hero-subtitle">使用AI技術，為您智能配對最適合的專業護理師</p>
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">98%</div>
                <div class="stat-label">満意度</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">成功媒合</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">即時媒合</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,208C960,235,1056,245,1152,224C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        
        <!-- 媒合偏好設定 -->
        <div class="preferences-section" v-if="showPreferences || !hasSearched">
          <div class="section-header">
            <h2 class="section-title">
              <q-icon name="tune" class="title-icon" />
              媒合偏好設定
            </h2>
            <p class="section-subtitle">請告訴我們您的需求，我們將為您找到最合適的護理師</p>
          </div>
          
          <q-card class="preferences-card modern-card" flat>
            <q-card-section class="preferences-form">
        
              <div class="form-grid">
                <div class="form-field">
                  <label class="field-label">希望服務地區</label>
                  <q-select
                    v-model="preferences.location"
                    :options="locationOptions"
                    outlined
                    clearable
                    emit-value
                    map-options
                    class="modern-input"
                  />
                </div>
                
                <div class="form-field">
                  <label class="field-label">最高時薪預算</label>
                  <q-input
                    v-model.number="preferences.maxHourlyRate"
                    type="number"
                    suffix="元/小時"
                    outlined
                    min="0"
                    class="modern-input"
                  />
                </div>
                
                <div class="form-field">
                  <label class="field-label">最低評分要求</label>
                  <q-input
                    v-model.number="preferences.minRating"
                    type="number"
                    outlined
                    min="1"
                    max="5"
                    step="0.1"
                    class="modern-input"
                  />
                </div>
                
                <div class="form-field full-width">
                  <label class="field-label">需要的專業技能</label>
                  <q-select
                    v-model="preferences.requiredSkills"
                    :options="skillOptions"
                    outlined
                    multiple
                    use-chips
                    clearable
                    class="modern-input"
                  />
                </div>
              </div>
              
              <div class="form-actions">
                <q-btn 
                  color="primary" 
                  size="lg"
                  @click="findMatches"
                  :loading="isMatching"
                  class="action-btn primary-btn"
                >
                  <q-icon name="search" class="q-mr-sm" />
                  開始智能媒合
                </q-btn>
                <q-btn 
                  flat 
                  color="grey-6"
                  @click="clearPreferences"
                  class="action-btn secondary-btn"
                >
                  <q-icon name="refresh" class="q-mr-sm" />
                  重設條件
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <!-- 媒合加載狀態 -->
        <div v-if="isMatching" class="loading-section">
          <div class="loading-card">
            <div class="loading-animation">
              <div class="brain-icon">
                <q-icon name="psychology" />
              </div>
              <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </div>
            </div>
            <h3 class="loading-title">AI 智能分析中</h3>
            <p class="loading-subtitle">正在根據您的需求進行精確媒合...</p>
          </div>
        </div>
        
        <!-- 空狀態 -->
        <div v-else-if="matchedCaregivers.length === 0 && hasSearched" class="empty-section">
          <div class="empty-card">
            <div class="empty-icon">
              <q-icon name="search_off" />
            </div>
            <h3 class="empty-title">沒有找到符合條件的護理師</h3>
            <p class="empty-subtitle">請嘗試調整您的媒合偏好或擴大搜尋範圍</p>
            <q-btn 
              color="primary" 
              @click="clearPreferences"
              class="empty-action-btn"
            >
              <q-icon name="refresh" class="q-mr-sm" />
              重設條件
            </q-btn>
          </div>
        </div>
        
        <!-- 媒合結果 -->
        <div v-else-if="matchedCaregivers.length > 0" class="results-section">
          <!-- 結果統計 -->
          <div class="results-header">
            <div class="results-stats">
              <div class="stat-card">
                <div class="stat-icon">
                  <q-icon name="group" />
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ matchedCaregivers.length }}</div>
                  <div class="stat-label">符合條件</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon success">
                  <q-icon name="verified" />
                </div>
                <div class="stat-content">
                  <div class="stat-number">{{ Math.round((matchedCaregivers.filter(c => (c.matchScore || 0) >= 0.8).length / matchedCaregivers.length) * 100) }}%</div>
                  <div class="stat-label">高匹配度</div>
                </div>
              </div>
            </div>
            <div class="results-title">
              <h2>為您精心推薦的專業護理師</h2>
              <p>根據您的需求和偏好，我們進行了精確的AI匹配</p>
            </div>
          </div>
          
          <!-- 匹配結果列表 -->
          <div class="matches-grid">
            <div v-for="(caregiver, index) in matchedCaregivers" :key="caregiver.id" class="match-card">
              <q-card class="caregiver-match-card modern-card" flat>
                <div class="match-header">
                  <div class="match-badges">
                    <div class="match-score" :class="getMatchScoreClass(caregiver.matchScore || 0)">
                      <div class="score-circle">
                        <span class="score-number">{{ Math.round((caregiver.matchScore || 0) * 100) }}</span>
                        <span class="score-unit">%</span>
                      </div>
                      <div class="score-label">匹配度</div>
                    </div>
                    <div class="ranking-badge" v-if="index < 3">
                      <q-icon name="star" />
                      <span>第{{ index + 1 }}推薦</span>
                    </div>
                  </div>
                </div>
                
                <q-card-section class="caregiver-content">
                  
                  <div class="caregiver-profile">
                    <div class="profile-avatar">
                      <q-avatar size="60px">
                        <img :src="caregiver.avatar || '/images/default-avatar.png'" :alt="caregiver.name" />
                      </q-avatar>
                      <div class="online-status" v-if="caregiver.isOnline"></div>
                    </div>
                    <div class="profile-info">
                      <h4 class="caregiver-name">{{ caregiver.name }}</h4>
                      <div class="caregiver-meta">
                        <div class="meta-item">
                          <q-icon name="star" class="rating-icon" />
                          <span>{{ caregiver.rating }}</span>
                        </div>
                        <div class="meta-item">
                          <q-icon name="location_on" class="location-icon" />
                          <span>{{ caregiver.location }}</span>
                        </div>
                        <div class="meta-item">
                          <q-icon name="monetization_on" class="price-icon" />
                          <span>NT$ {{ caregiver.hourly_rate }}/小時</span>
                        </div>
                      </div>
                      <div class="experience-tag">
                        {{ caregiver.experience }}
                      </div>
                    </div>
                  </div>
                  
                  
                  <div class="match-reasons">
                    <div class="reasons-header">
                      <q-icon name="psychology" class="ai-icon" />
                      <span>推薦原因</span>
                    </div>
                    <div class="reasons-list">
                      <div 
                        v-for="reason in getMatchReasons(caregiver)"
                        :key="reason"
                        class="reason-tag"
                      >
                        <q-icon name="check_circle" />
                        <span>{{ reason }}</span>
                      </div>
                    </div>
                  </div>
                </q-card-section>
                
                
                <div class="card-actions">
                  <q-btn 
                    flat 
                    color="primary"
                    @click="navigateTo(`/caregivers/${caregiver.id}`)"
                    class="details-btn"
                  >
                    <q-icon name="visibility" class="q-mr-sm" />
                    查看詳情
                  </q-btn>
                  <q-btn 
                    color="primary"
                    @click="startBooking(caregiver)"
                    class="booking-btn"
                  >
                    <q-icon name="calendar_month" class="q-mr-sm" />
                    立即預約
                  </q-btn>
                </div>
              </q-card>
            </div>
          </div>
        </div>
        
        <!-- 歡迎卡片 -->
        <div v-if="!hasSearched && !showPreferences" class="welcome-section">
          <div class="welcome-card">
            <div class="welcome-content">
              <div class="welcome-icon">
                <q-icon name="psychology" />
              </div>
              <h2 class="welcome-title">歡迎使用AI智能媒合</h2>
              <p class="welcome-subtitle">告訴我們您的需求，讓我們為您找到最適合的護理師</p>
              <q-btn 
                color="primary" 
                size="lg"
                @click="showPreferences = true"
                class="welcome-btn"
              >
                <q-icon name="auto_awesome" class="q-mr-sm" />
                開始媒合
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import CaregiverCard from '~/components/CaregiverCard.vue'
import type { Caregiver } from '~/utils/mockData'

// SEO
usePageSeo('智能媒合 - 護理服務平台', '根據您的需求智能推薦最適合的看護師')

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()
const authStore = useAuthStore()

// 響應式資料
const matchedCaregivers = ref<(Caregiver & { matchScore?: number })[]>([])
const isMatching = ref(false)
const hasSearched = ref(false)
const showPreferences = ref(false)

// 媒合偏好
const preferences = ref({
  location: '',
  maxHourlyRate: null as number | null,
  minRating: null as number | null,
  requiredSkills: [] as string[]
})

// 選項資料
const locationOptions = [
  { label: '台北市', value: '台北' },
  { label: '新北市', value: '新北' },
  { label: '桃園市', value: '桃園' },
  { label: '台中市', value: '台中' },
  { label: '台南市', value: '台南' },
  { label: '高雄市', value: '高雄' }
]

const skillOptions = [
  '專業照護',
  '失智症照護',
  '復健協助',
  '夜間照護',
  '用藥管理',
  '營養調理',
  '心理支持',
  '物理治療',
  '語言治療',
  '職能治療'
]

// 計算屬性
const hasPreferences = computed(() => {
  return preferences.value.location ||
         preferences.value.maxHourlyRate !== null ||
         preferences.value.minRating !== null ||
         preferences.value.requiredSkills.length > 0
})

// 媒合方法
const findMatches = async () => {
  isMatching.value = true
  hasSearched.value = true
  
  try {
    // 使用篩選 API 取得候選看護師
    let candidates: Caregiver[] = []
    
    if (hasPreferences.value) {
      candidates = await apiService.filterCaregivers({
        ...preferences.value,
        // 將 null 值過濾掉
        ...(preferences.value.maxHourlyRate && { maxHourlyRate: preferences.value.maxHourlyRate }),
        ...(preferences.value.minRating && { minRating: preferences.value.minRating })
      })
    } else {
      // 無偏好時使用推薦 API
      const result = await apiService.getFeaturedCaregivers()
      candidates = Array.isArray(result) ? result : result.data || []
    }
    
    // 計算媒合度並排序
    const scoredCaregivers = candidates.map(caregiver => ({
      ...caregiver,
      matchScore: calculateMatchScore(caregiver)
    }))
    
    matchedCaregivers.value = scoredCaregivers
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 8) // 最多顯示 8 位
    
    if (matchedCaregivers.value.length === 0) {
      $q.notify({
        type: 'info',
        message: '沒有找到符合條件的看護師，請調整媒合條件',
        timeout: 3000
      })
    } else {
      $q.notify({
        type: 'positive',
        message: `媒合成功！找到 ${matchedCaregivers.value.length} 位推薦看護師`,
        timeout: 2000
      })
    }
    
  } catch (error: any) {
    console.error('媒合失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '媒合失敗，請稍後再試',
      timeout: 3000
    })
  } finally {
    isMatching.value = false
  }
}

// 計算媒合度
const calculateMatchScore = (caregiver: Caregiver): number => {
  let score = 0.5 // 基本分數
  
  // 評分加分 (30%)
  score += (caregiver.rating / 5) * 0.3
  
  // 地區匹配 (25%)
  if (preferences.value.location && caregiver.location?.includes(preferences.value.location)) {
    score += 0.25
  }
  
  // 技能匹配 (25%)
  if (preferences.value.requiredSkills.length > 0) {
    const matchedSkills = preferences.value.requiredSkills.filter(skill =>
      caregiver.skills.toLowerCase().includes(skill.toLowerCase())
    )
    score += (matchedSkills.length / preferences.value.requiredSkills.length) * 0.25
  }
  
  // 價格合理性 (20%)
  if (preferences.value.maxHourlyRate && caregiver.hourly_rate <= preferences.value.maxHourlyRate) {
    score += 0.2
  }
  
  return Math.min(score, 1) // 最高 1.0
}

// 獲取媒合原因
const getMatchReasons = (caregiver: Caregiver): string[] => {
  const reasons: string[] = []
  
  if (caregiver.rating >= 4.5) {
    reasons.push('高評分')
  }
  
  if (preferences.value.location && caregiver.location?.includes(preferences.value.location)) {
    reasons.push('地區匹配')
  }
  
  if (preferences.value.requiredSkills.length > 0) {
    const matchedSkills = preferences.value.requiredSkills.filter(skill =>
      caregiver.skills.toLowerCase().includes(skill.toLowerCase())
    )
    if (matchedSkills.length > 0) {
      reasons.push(`具備${matchedSkills.length}項所需技能`)
    }
  }
  
  if (preferences.value.maxHourlyRate && caregiver.hourly_rate <= preferences.value.maxHourlyRate) {
    reasons.push('價格合理')
  }
  
  if (caregiver.experience.includes('專業')) {
    reasons.push('專業經驗')
  }
  
  return reasons.length > 0 ? reasons : ['推薦看護師']
}

// 獲取媒合度顏色
const getMatchScoreColor = (score: number): string => {
  if (score >= 0.8) return 'positive'
  if (score >= 0.6) return 'warning'
  return 'info'
}

// 獲取媒合度樣式類別
const getMatchScoreClass = (score: number): string => {
  if (score >= 0.8) return 'high-match'
  if (score >= 0.6) return 'medium-match'
  return 'low-match'
}

// 清除偏好
const clearPreferences = () => {
  preferences.value = {
    location: '',
    maxHourlyRate: null,
    minRating: null,
    requiredSkills: []
  }
  matchedCaregivers.value = []
  hasSearched.value = false
}

// 開始預約
const startBooking = (caregiver: Caregiver) => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能進行預約',
      timeout: 3000
    })
    navigateTo('/auth/login')
    return
  }
  
  // 將看護師資訊傳遞給預約頁面
  navigateTo({
    path: '/booking/create',
    query: { caregiverId: caregiver.id }
  })
}

// 生命週期
onMounted(() => {
  // 初始載入推薦看護師
  findMatches()
})

// 頁面結構化資料
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SearchResultsPage',
        name: '智能媒合 - 護理服務平台',
        url: baseUrl + (route?.fullPath || '/booking/match'),
        description: '根據您的需求智能推薦最適合的看護師',
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
/* ===============================
   全局頁面樣式
   =============================== */
.match-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow-x: hidden;
}

/* ===============================
   Hero Section 設計
   =============================== */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  overflow: hidden;
}

.hero-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px);
  background-size: 60px 60px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(1deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-text-center {
  text-align: center;
  color: white;
}

.hero-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

.hero-icon {
  font-size: 2.5rem;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  display: block;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.hero-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  line-height: 0;
}

.hero-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 100px;
}

/* ===============================
   Main Content 區域
   =============================== */
.main-content {
  background: #f8fafc;
  min-height: 40vh;
  position: relative;
  z-index: 1;
  padding: 3rem 0;
}

/* ===============================
   Section 通用樣式
   =============================== */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.title-icon {
  color: #4a90e2;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

/* ===============================
   現代化卡片設計
   =============================== */
.modern-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.modern-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* ===============================
   偏好設定表單
   =============================== */
.preferences-card {
  margin-bottom: 2rem;
}

.preferences-form {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-field.full-width {
  grid-column: 1 / -1;
}

.field-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.modern-input :deep(.q-field__control) {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.modern-input :deep(.q-field__control):hover {
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.15);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
}

.secondary-btn:hover {
  background: rgba(107, 114, 128, 0.1);
}

/* ===============================
   Loading 動畫設計
   =============================== */
.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  margin: 2rem 0;
}

.loading-card {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.loading-animation {
  margin-bottom: 2rem;
}

.brain-icon {
  display: inline-block;
  font-size: 4rem;
  color: #4a90e2;
  animation: brainPulse 2s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes brainPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  background: #4a90e2;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
  40% { transform: scale(1.2); opacity: 1; }
}

.loading-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.loading-subtitle {
  color: #64748b;
  font-size: 1rem;
}

/* ===============================
   空狀態設計
   =============================== */
.empty-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  margin: 2rem 0;
}

.empty-card {
  text-align: center;
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.empty-icon {
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.empty-subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-action-btn {
  border-radius: 12px;
  padding: 0.75rem 2rem;
  font-weight: 600;
}

/* ===============================
   結果統計區域
   =============================== */
.results-section {
  margin-top: 2rem;
}

.results-header {
  margin-bottom: 2rem;
}

.results-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  min-width: 160px;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.stat-icon.success {
  background: linear-gradient(135deg, #21ba45, #16a34a);
}

.stat-content .stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
}

.stat-content .stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

.results-title {
  text-align: center;
}

.results-title h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.results-title p {
  color: #64748b;
  font-size: 1.1rem;
}

/* ===============================
   媒合卡片網格
   =============================== */
.matches-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.match-card {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.match-card:nth-child(1) { animation-delay: 0.1s; }
.match-card:nth-child(2) { animation-delay: 0.2s; }
.match-card:nth-child(3) { animation-delay: 0.3s; }
.match-card:nth-child(4) { animation-delay: 0.4s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===============================
   護理師媒合卡片設計
   =============================== */
.caregiver-match-card {
  position: relative;
  overflow: visible;
}

.match-header {
  position: absolute;
  top: -10px;
  right: 1rem;
  z-index: 10;
  display: flex;
  gap: 0.5rem;
}

.match-score {
  background: white;
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.match-score.high-match {
  border-color: #21ba45;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
}

.match-score.medium-match {
  border-color: #f2c037;
  background: linear-gradient(135deg, #fffbeb, #fef3c7);
}

.match-score.low-match {
  border-color: #31ccec;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
}

.score-circle {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 0.25rem;
}

.score-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
}

.score-unit {
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
}

.score-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.ranking-badge {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
}

/* ===============================
   護理師個人資料區域
   =============================== */
.caregiver-content {
  padding: 2rem !important;
  padding-top: 2.5rem !important;
}

.caregiver-profile {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  position: relative;
}

.profile-avatar .q-avatar {
  border: 3px solid white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.online-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: #21ba45;
  border: 3px solid white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.profile-info {
  flex: 1;
}

.caregiver-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.caregiver-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #64748b;
}

.rating-icon {
  color: #fbbf24;
}

.location-icon {
  color: #64748b;
}

.price-icon {
  color: #21ba45;
}

.experience-tag {
  display: inline-block;
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* ===============================
   推薦原因區域
   =============================== */
.match-reasons {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
}

.reasons-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.ai-icon {
  color: #4a90e2;
}

.reasons-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.reason-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  color: #374151;
  transition: all 0.3s ease;
}

.reason-tag:hover {
  border-color: #4a90e2;
  background: #f0f8ff;
}

.reason-tag .q-icon {
  color: #21ba45;
  font-size: 0.9rem;
}

/* ===============================
   卡片操作按鈕
   =============================== */
.card-actions {
  padding: 1rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.details-btn {
  flex: 1;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 500;
  text-transform: none;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.details-btn:hover {
  border-color: #4a90e2;
  background: #f0f8ff;
}

.booking-btn {
  flex: 1;
  border-radius: 12px;
  padding: 0.75rem;
  font-weight: 600;
  text-transform: none;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  transition: all 0.3s ease;
}

.booking-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
}

/* ===============================
   歡迎卡片設計
   =============================== */
.welcome-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  margin: 2rem 0;
}

.welcome-card {
  background: white;
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  text-align: center;
}

.welcome-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 2.5rem;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.welcome-subtitle {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.welcome-btn {
  border-radius: 12px;
  padding: 1rem 2rem;
  font-weight: 600;
  text-transform: none;
  font-size: 1.1rem;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
  transition: all 0.3s ease;
}

.welcome-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.6);
}

/* ===============================
   響應式設計
   =============================== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .matches-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .results-stats {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .card-actions {
    flex-direction: column;
  }
  
  .caregiver-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }
  
  .hero-section {
    min-height: 50vh;
    padding: 1rem 0;
  }
  
  .main-content {
    padding: 2rem 0;
  }
  
  .preferences-form,
  .caregiver-content {
    padding: 1.5rem !important;
  }
  
  .match-header {
    position: static;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .caregiver-profile {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

/* ===============================
   匹配度顏色類別
   =============================== */
.high-match {
  /* 已在上面定義 */
}

.medium-match {
  /* 已在上面定義 */
}

.low-match {
  /* 已在上面定義 */
}
</style>
