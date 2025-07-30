<template>
  <q-page class="q-pa-md">
    <!-- 載入狀態 -->
    <div v-if="isLoading" class="text-center q-pa-lg">
      <q-spinner-grid size="50px" color="primary" />
      <div class="text-body2 q-mt-md">載入中...</div>
    </div>
    
    <!-- 錯誤狀態 -->
    <div v-else-if="error" class="text-center q-pa-lg">
      <q-icon name="error_outline" size="80px" color="negative" />
      <div class="text-h6 q-mt-md text-negative">載入失敗</div>
      <div class="text-body2 text-grey-6 q-mt-sm">{{ error }}</div>
      <q-btn
        flat
        color="primary"
        @click="loadCaregiverData"
        class="q-mt-md"
      >
        重新載入
      </q-btn>
    </div>
    
    <!-- 看護師詳情 -->
    <div v-else-if="caregiver" class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 面包屑導航 -->
        <q-breadcrumbs class="q-mb-lg">
          <q-breadcrumbs-el
            icon="home"
            :to="'/'"
            label="首頁"
          />
          <q-breadcrumbs-el
            :to="'/caregivers'"
            label="看護師列表"
          />
          <q-breadcrumbs-el
            :label="caregiver.name"
          />
        </q-breadcrumbs>
        
        <div class="row q-gutter-lg">
          <!-- 左側主要資訊 -->
          <div class="col-12 col-md-8">
            <!-- 基本資訊卡片 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="row items-center">
                  <div class="col">
                    <div class="text-h5 text-primary q-mb-xs">{{ caregiver.name }}</div>
                    <div class="text-subtitle1 text-grey-7">{{ caregiver.specialization || '專業看護師' }}</div>
                  </div>
                  <div class="col-auto">
                    <q-rating
                      v-model="caregiver.rating"
                      size="2em"
                      :max="5"
                      color="orange"
                      readonly
                    />
                    <div class="text-center text-caption q-mt-xs">
                      {{ caregiver.rating }}/5 (基於 {{ caregiver.review_count || 12 }} 則評價)
                    </div>
                  </div>
                </div>
                
                <!-- 標籤 -->
                <div class="q-mt-md">
                  <q-chip
                    v-if="caregiver.available"
                    color="positive"
                    text-color="white"
                    icon="check_circle"
                    size="sm"
                  >
                    目前可預約
                  </q-chip>
                  <q-chip
                    v-else
                    color="negative"
                    text-color="white"
                    icon="schedule"
                    size="sm"
                  >
                    目前不可預約
                  </q-chip>
                  <q-chip
                    v-if="caregiver.location"
                    outline
                    color="primary"
                    icon="location_on"
                    size="sm"
                  >
                    {{ caregiver.location }}
                  </q-chip>
                  <q-chip
                    v-if="caregiver.experience_years"
                    outline
                    color="secondary"
                    icon="work"
                    size="sm"
                  >
                    {{ caregiver.experience_years || 5 }} 年經驗
                  </q-chip>
                </div>
              </q-card-section>
            </q-card>
            
            <!-- 經驗與技能 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="text-h6 q-mb-md">
                  <q-icon name="psychology" class="q-mr-sm" />
                  專業經驗與技能
                </div>
                
                <div class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">工作經驗</div>
                  <div class="text-body2">{{ caregiver.experience }}</div>
                </div>
                
                <div class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">專業技能</div>
                  <div class="text-body2">{{ caregiver.skills }}</div>
                </div>
                
                <div v-if="caregiver.description" class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">個人簡介</div>
                  <div class="text-body2">{{ caregiver.description || '我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。' }}</div>
                </div>
              </q-card-section>
            </q-card>
            
            <!-- 證照資格 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="text-h6 q-mb-md">
                  <q-icon name="verified" class="q-mr-sm" />
                  證照資格
                </div>
                <div class="row q-gutter-sm">
                  <q-chip
                    v-for="license in caregiver.licenses"
                    :key="license"
                    color="blue-1"
                    text-color="blue-8"
                    icon="verified_user"
                  >
                    {{ license }}
                  </q-chip>
                </div>
              </q-card-section>
            </q-card>
            
            <!-- 評價列表 -->
            <q-card flat bordered class="q-mb-lg">
              <q-card-section>
                <div class="row items-center justify-between q-mb-md">
                  <div class="text-h6">
                    <q-icon name="rate_review" class="q-mr-sm" />
                    用戶評價
                  </div>
                  <q-btn
                    flat
                    color="primary"
                    @click="loadReviews"
                    :loading="isLoadingReviews"
                  >
                    更新評價
                  </q-btn>
                </div>
                
                <div v-if="isLoadingReviews" class="text-center q-pa-md">
                  <q-spinner-dots size="30px" color="primary" />
                </div>
                
                <div v-else-if="reviews.length === 0" class="text-center q-pa-md text-grey-6">
                  尚無評價
                </div>
                
                <div v-else>
                  <q-list>
                    <q-item
                      v-for="review in reviews.slice(0, 3)"
                      :key="review.id"
                      class="q-pa-md"
                    >
                      <q-item-section>
                        <q-item-label class="row items-center q-mb-xs">
                          <q-rating
                            :model-value="review.rating"
                            size="1em"
                            :max="5"
                            color="orange"
                            readonly
                            class="q-mr-sm"
                          />
                          <span class="text-caption text-grey-6">
                            {{ formatDate(review.created_at) }}
                          </span>
                        </q-item-label>
                        <q-item-label class="text-body2">
                          {{ review.comment }}
                        </q-item-label>
                        <q-item-label caption class="text-grey-6">
                          由 {{ review.user_name || '匯名用戶' }} 提供
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  
                  <div v-if="reviews.length > 3" class="text-center q-mt-md">
                    <q-btn
                      flat
                      color="primary"
                      @click="navigateTo(`/support/reviews?caregiverId=${caregiver.id}`)"
                    >
                      查看全部 {{ reviews.length }} 則評價
                    </q-btn>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          
          <!-- 右側預約資訊 -->
          <div class="col-12 col-md-4">
            <!-- 價格資訊 -->
            <q-card flat bordered class="q-mb-lg sticky-card">
              <q-card-section>
                <div class="text-h6 q-mb-md text-center">服務價格</div>
                
                <div class="text-center q-mb-md">
                  <div class="text-h4 text-primary">
                    NT$ {{ caregiver.hourly_rate }}
                  </div>
                  <div class="text-caption text-grey-6">每小時</div>
                </div>
                
                <div class="text-center q-mb-lg">
                  <div class="text-h5 text-secondary">
                    NT$ {{ caregiver.shift_rate }}
                  </div>
                  <div class="text-caption text-grey-6">每班 (早/晚班 8小時)</div>
                </div>
                
                <q-separator class="q-mb-md" />
                
                <!-- 預約按鈕 -->
                <q-btn
                  color="primary"
                  size="lg"
                  class="full-width q-mb-sm"
                  icon="calendar_today"
                  :disable="!caregiver.available"
                  @click="startBooking"
                >
                  {{ caregiver.available ? '立即預約' : '目前不可預約' }}
                </q-btn>
                
                <q-btn
                  flat
                  color="secondary"
                  class="full-width q-mb-sm"
                  icon="message"
                  @click="contactCaregiver"
                >
                  聯繫看護師
                </q-btn>
                
                <q-btn
                  flat
                  color="grey"
                  class="full-width"
                  icon="favorite_border"
                  @click="toggleFavorite"
                >
                  {{ isFavorite ? '取消收藏' : '收藏看護師' }}
                </q-btn>
                
                <div class="text-caption text-grey-6 text-center q-mt-md">
                  最後更新：{{ formatDate(caregiver.updated_at) }}
                </div>
              </q-card-section>
            </q-card>
            
            <!-- 快速資訊 -->
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">快速資訊</div>
                
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="location_on" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>服務地區</q-item-label>
                      <q-item-label caption>{{ caregiver.location || '未提供' }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="schedule" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>可用狀態</q-item-label>
                      <q-item-label caption>
                        {{ caregiver.available ? '目前可預約' : '目前不可預約' }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="work" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>工作經驗</q-item-label>
                      <q-item-label caption>{{ caregiver.experience_years || 5 }} 年</q-item-label>
                    </q-item-section>
                  </q-item>
                  
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="language" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>語言能力</q-item-label>
                      <q-item-label caption>中文、台語</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 找不到看護師 -->
    <div v-else class="text-center q-pa-lg">
      <q-icon name="person_search" size="80px" color="grey-5" />
      <div class="text-h6 q-mt-md text-grey-7">找不到看護師資訊</div>
      <div class="text-body2 text-grey-6 q-mt-sm">
        請確認看護師 ID 是否正確
      </div>
      <q-btn
        flat
        color="primary"
        @click="navigateTo('/caregivers')"
        class="q-mt-md"
      >
        返回看護師列表
      </q-btn>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import type { Caregiver, Review } from '~/utils/mockData'

// 組合式函數
const route = useRoute()
const $q = useQuasar()
const apiService = useApiService()
const authStore = useAuthStore()

// 響應式資料
const caregiver = ref<Caregiver | null>(null)
const reviews = ref<Review[]>([])
const isLoading = ref(false)
const isLoadingReviews = ref(false)
const error = ref<string | null>(null)
const isFavorite = ref(false)

// 計算屬性
const caregiverId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : 0
})

// 載入看護師資料
const loadCaregiverData = async () => {
  if (!caregiverId.value) {
    error.value = '無效的看護師 ID'
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    caregiver.value = await apiService.getCaregiverById(caregiverId.value)
    
    // 更新 SEO
    if (caregiver.value) {
      usePageSeo(
        `${caregiver.value.name} - 護理服務平台`,
        `查看 ${caregiver.value.name} 的詳細資歷、專業技能和用戶評價`
      )
    }
    
    // 自動載入評價
    await loadReviews()
    
  } catch (err: any) {
    console.error('載入看護師資料失敗:', err)
    error.value = err.message || '載入失敗，請稍後再試'
  } finally {
    isLoading.value = false
  }
}

// 載入評價
const loadReviews = async () => {
  if (!caregiverId.value) return
  
  isLoadingReviews.value = true
  
  try {
    reviews.value = await apiService.getReviewsByCaregiver(caregiverId.value)
  } catch (err: any) {
    console.error('載入評價失敗:', err)
    // 評價載入失敗不阻擋頁面顯示
  } finally {
    isLoadingReviews.value = false
  }
}

// 開始預約
const startBooking = () => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能進行預約',
      timeout: 3000
    })
    navigateTo('/auth/login')
    return
  }
  
  if (!caregiver.value) return
  
  // 跳轉到預約頁面
  navigateTo({
    path: '/booking/create',
    query: { caregiverId: caregiver.value.id }
  })
}

// 聯繫看護師
const contactCaregiver = () => {
  if (!caregiver.value) return
  
  $q.dialog({
    title: '聯繫看護師',
    message: `您可以透過以下方式聯繫 ${caregiver.value.name}：\n\n電話：0987-654-321\n電子郵件：${caregiver.value.name.toLowerCase()}@care-platform.com`,
    ok: {
      color: 'primary',
      label: '確定'
    }
  })
}

// 切換收藏狀態
const toggleFavorite = () => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能收藏看護師',
      timeout: 3000
    })
    return
  }
  
  isFavorite.value = !isFavorite.value
  
  $q.notify({
    type: 'positive',
    message: isFavorite.value ? '已加入收藏' : '已取消收藏',
    timeout: 2000
  })
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 生命週期
onMounted(() => {
  loadCaregiverData()
})

// 頁面結構化資料
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

// 當看護師資料載入後更新 SEO
watch(caregiver, (newCaregiver) => {
  if (newCaregiver) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: newCaregiver.name,
            jobTitle: '專業看護師',
            description: newCaregiver.description || newCaregiver.experience,
            address: {
              '@type': 'PostalAddress',
              addressLocality: newCaregiver.location
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: newCaregiver.rating,
              reviewCount: newCaregiver.review_count || 12,
              bestRating: 5,
              worstRating: 1
            },
            url: baseUrl + (route?.fullPath || `/caregivers/${newCaregiver.id}`)
          })
        }
      ]
    })
  }
})
</script>

<style scoped>
.sticky-card {
  position: sticky;
  top: 20px;
}

@media (max-width: 768px) {
  .sticky-card {
    position: relative;
    top: auto;
  }
}

.q-rating {
  font-size: 1.2em;
}

.detail-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.info-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-chip {
  margin: 2px;
}
</style>
