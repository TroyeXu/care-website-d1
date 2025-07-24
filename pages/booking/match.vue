<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 標題區域 -->
        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h5 text-primary">
            <q-icon name="psychology" size="md" class="q-mr-sm" />
            智能媒合推薦
          </div>
          <q-btn
            flat
            icon="tune"
            @click="showPreferences = !showPreferences"
            :color="hasPreferences ? 'primary' : 'grey'"
          >
            偏好設定
          </q-btn>
        </div>
        
        <!-- 偏好設定 -->
        <q-slide-transition>
          <q-card v-show="showPreferences" flat bordered class="q-mb-lg">
            <q-card-section>
              <div class="text-h6 q-mb-md">媒合偏好</div>
              <div class="row q-gutter-md">
                <div class="col-12 col-sm-6 col-md-4">
                  <q-select
                    v-model="preferences.location"
                    :options="locationOptions"
                    label="希望服務地區"
                    outlined
                    dense
                    clearable
                    emit-value
                    map-options
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <q-input
                    v-model.number="preferences.maxHourlyRate"
                    type="number"
                    label="最高時薪預算"
                    outlined
                    dense
                    min="0"
                    suffix="元/小時"
                  />
                </div>
                <div class="col-12 col-sm-6 col-md-4">
                  <q-input
                    v-model.number="preferences.minRating"
                    type="number"
                    label="最低評分要求"
                    outlined
                    dense
                    min="1"
                    max="5"
                    step="0.1"
                  />
                </div>
              </div>
              <div class="row q-gutter-md q-mt-md">
                <div class="col-12">
                  <q-select
                    v-model="preferences.requiredSkills"
                    :options="skillOptions"
                    label="需要的專業技能"
                    outlined
                    dense
                    multiple
                    use-chips
                    clearable
                  />
                </div>
              </div>
              <div class="row q-gutter-md q-mt-md">
                <div class="col">
                  <q-btn
                    flat
                    color="grey"
                    @click="clearPreferences"
                  >
                    清除偏好
                  </q-btn>
                </div>
                <div class="col-auto">
                  <q-btn
                    color="primary"
                    @click="findMatches"
                    :loading="isMatching"
                  >
                    重新媒合
                  </q-btn>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-slide-transition>
        
        <!-- 媒合結果 -->
        <div v-if="isMatching" class="text-center q-pa-lg">
          <q-spinner-orbit size="50px" color="primary" />
          <div class="text-body2 q-mt-md">智能媒合中...</div>
        </div>
        
        <div v-else-if="matchedCaregivers.length === 0 && hasSearched" class="text-center q-pa-lg">
          <q-icon name="search_off" size="80px" color="grey-5" />
          <div class="text-h6 q-mt-md text-grey-7">沒有找到符合條件的看護師</div>
          <div class="text-body2 text-grey-6 q-mt-sm">
            請嘗試調整您的媒合偏好或擴大搜尋範圍
          </div>
          <q-btn
            flat
            color="primary"
            @click="clearPreferences"
            class="q-mt-md"
          >
            重設條件
          </q-btn>
        </div>
        
        <div v-else-if="matchedCaregivers.length > 0">
          <!-- 媒合統計 -->
          <q-card flat bordered class="q-mb-md">
            <q-card-section class="text-center">
              <div class="text-h6 text-primary">
                找到 {{ matchedCaregivers.length }} 位符合條件的看護師
              </div>
              <div class="text-body2 text-grey-6">
                以下是根據您的需求精心篩選的推薦
              </div>
            </q-card-section>
          </q-card>
          
          <!-- 看護師列表 -->
          <div class="caregiver-list">
            <div v-for="(caregiver, index) in matchedCaregivers" :key="caregiver.id" class="match-card">
              <q-card flat bordered class="full-height cursor-pointer" @click="navigateTo(`/caregivers/${caregiver.id}`)">
                <q-card-section>
                  <!-- 媒合指數 -->
                  <div class="row items-center justify-between q-mb-sm">
                    <q-chip
                      :color="getMatchScoreColor(caregiver.matchScore || 0)"
                      text-color="white"
                      size="sm"
                    >
                      媒合度 {{ Math.round((caregiver.matchScore || 0) * 100) }}%
                    </q-chip>
                    <q-chip
                      color="orange"
                      text-color="white"
                      size="sm"
                      v-if="index < 3"
                    >
                      第 {{ index + 1 }} 推薦
                    </q-chip>
                  </div>
                  
                  <CaregiverCard :caregiver="caregiver" />
                  
                  <!-- 媒合原因 -->
                  <div class="q-mt-md">
                    <div class="text-caption text-grey-6 q-mb-xs">推薦原因：</div>
                    <div class="text-body2">
                      <q-chip
                        v-for="reason in getMatchReasons(caregiver)"
                        :key="reason"
                        size="sm"
                        outline
                        color="primary"
                        class="q-mr-xs q-mb-xs"
                      >
                        {{ reason }}
                      </q-chip>
                    </div>
                  </div>
                </q-card-section>
                
                <q-card-actions align="right">
                  <q-btn
                    flat
                    color="primary"
                    @click.stop="navigateTo(`/caregivers/${caregiver.id}`)"
                  >
                    查看詳情
                  </q-btn>
                  <q-btn
                    color="primary"
                    @click.stop="startBooking(caregiver)"
                  >
                    立即預約
                  </q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
        
        <!-- 預設推薦 -->
        <div v-else>
          <q-card flat bordered>
            <q-card-section class="text-center">
              <div class="text-h6 q-mb-md">歡迎使用智能媒合服務</div>
              <div class="text-body2 text-grey-6 q-mb-md">
                設定您的偏好條件，我們將為您推薦最適合的看護師
              </div>
              <q-btn
                color="primary"
                icon="psychology"
                @click="showPreferences = true"
              >
                開始媒合
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
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
const { $route } = useNuxtApp()
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
        url: baseUrl + $route.fullPath,
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
.caregiver-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
