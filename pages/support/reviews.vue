<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <!-- 標題區域 -->
        <div class="row items-center justify-between q-mb-lg">
          <div class="text-h5 text-primary">
            <q-icon name="rate_review" size="md" class="q-mr-sm" />
            用戶評價
          </div>
          <div class="row q-gutter-sm">
            <q-select
              v-model="selectedCaregiverId"
              :options="caregiverOptions"
              label="選擇看護師"
              outlined
              dense
              clearable
              emit-value
              map-options
              style="min-width: 200px"
              @update:model-value="loadReviews"
            />
            <q-btn
              flat
              icon="refresh"
              @click="loadReviews"
              :loading="isLoading"
            >
              更新
            </q-btn>
          </div>
        </div>
        
        <!-- 評價統計 -->
        <q-card flat bordered class="q-mb-lg">
          <q-card-section>
            <div class="row items-center justify-center q-gutter-lg">
              <div class="text-center">
                <div class="text-h4 text-primary">{{ averageRating.toFixed(1) }}</div>
                <q-rating
                  :model-value="averageRating"
                  readonly
                  color="orange"
                  size="2em"
                  class="q-mt-xs"
                />
                <div class="text-caption text-grey-6 q-mt-xs">
                  平均評分 (基於 {{ reviews.length }} 則評價)
                </div>
              </div>
              
              <q-separator vertical />
              
              <div class="col">
                <div class="text-h6 q-mb-md">評價分佈</div>
                <div v-for="i in [5, 4, 3, 2, 1]" :key="i" class="row items-center q-mb-xs">
                  <div class="text-caption q-mr-sm">{{ i }} 星</div>
                  <q-linear-progress
                    :value="getRatingPercentage(i)"
                    color="orange"
                    size="md"
                    class="col q-mr-sm"
                  />
                  <div class="text-caption" style="min-width: 30px">
                    {{ getRatingCount(i) }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        
        <!-- 載入狀態 -->
        <div v-if="isLoading" class="text-center q-pa-lg">
          <q-spinner-dots size="50px" color="primary" />
          <div class="text-body2 q-mt-md">載入中...</div>
        </div>
        
        <!-- 評價列表 -->
        <div v-else-if="reviews.length > 0">
          <q-card flat bordered class="q-mb-lg">
            <q-card-section>
              <div class="text-h6 q-mb-md">所有評價</div>
              
              <q-list>
                <q-item
                  v-for="review in paginatedReviews"
                  :key="review.id"
                  class="q-pa-md"
                >
                  <q-item-section>
                    <q-item-label class="row items-center q-mb-sm">
                      <q-rating
                        :model-value="review.rating"
                        readonly
                        color="orange"
                        size="1em"
                        class="q-mr-sm"
                      />
                      <span class="text-caption text-grey-6">
                        {{ formatDate(review.created_at) }}
                      </span>
                      <q-space />
                      <q-chip
                        v-if="review.verified"
                        size="sm"
                        color="positive"
                        text-color="white"
                        icon="verified"
                      >
                        已驗證
                      </q-chip>
                    </q-item-label>
                    
                    <q-item-label class="text-body1 q-mb-sm">
                      {{ review.comment }}
                    </q-item-label>
                    
                    <q-item-label caption class="text-grey-6">
                      由 {{ review.user_name || '匯名用戶' }} 提供
                      <span v-if="review.service_type">
                        · {{ review.service_type }}
                      </span>
                    </q-item-label>
                    
                    <!-- 評價回覆 -->
                    <div v-if="review.reply" class="bg-grey-1 q-pa-md q-mt-sm rounded-borders">
                      <div class="text-caption text-grey-7 q-mb-xs">
                        <q-icon name="reply" size="xs" class="q-mr-xs" />
                        看護師回覆：
                      </div>
                      <div class="text-body2">{{ review.reply }}</div>
                    </div>
                  </q-item-section>
                  
                  <q-item-section side top>
                    <div class="text-right">
                      <q-btn
                        flat
                        dense
                        icon="thumb_up"
                        size="sm"
                        :color="review.liked ? 'primary' : 'grey'"
                        @click="toggleLike(review)"
                      >
                        {{ review.likes || 0 }}
                      </q-btn>
                    </div>
                  </q-item-section>
                  
                  <q-separator spaced inset="item" />
                </q-item>
              </q-list>
              
              <!-- 分頁 -->
              <div v-if="totalPages > 1" class="text-center q-mt-md">
                <q-pagination
                  v-model="currentPage"
                  :max="totalPages"
                  direction-links
                  boundary-links
                  icon-first="skip_previous"
                  icon-last="skip_next"
                  icon-prev="fast_rewind"
                  icon-next="fast_forward"
                  @update:model-value="onPageChange"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <!-- 無評價狀態 -->
        <div v-else class="text-center q-pa-lg">
          <q-icon name="rate_review" size="80px" color="grey-5" />
          <div class="text-h6 q-mt-md text-grey-7">尚無評價</div>
          <div class="text-body2 text-grey-6">
            {{ selectedCaregiverId ? '這位看護師還沒有收到評價' : '請選擇看護師查看評價' }}
          </div>
        </div>
        
        <!-- 新增評價表單 -->
        <q-card flat bordered v-if="authStore.currentUser">
          <q-card-section>
            <div class="text-h6 q-mb-md">
              <q-icon name="edit" class="q-mr-sm" />
              撰寫評價
            </div>
            
            <q-form @submit.prevent="submitReview" class="q-gutter-md">
              <div class="row q-gutter-md">
                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="reviewForm.caregiver_id"
                    :options="caregiverOptions"
                    label="選擇看護師 *"
                    outlined
                    dense
                    emit-value
                    map-options
                    :rules="[val => !!val || '請選擇看護師']"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <q-select
                    v-model="reviewForm.service_type"
                    :options="serviceTypeOptions"
                    label="服務類型"
                    outlined
                    dense
                  />
                </div>
              </div>
              
              <div class="row items-center q-gutter-md">
                <div class="text-subtitle2">評分 *</div>
                <q-rating
                  v-model="reviewForm.rating"
                  :max="5"
                  color="orange"
                  size="2em"
                />
                <div class="text-caption text-grey-6">
                  {{ getRatingLabel(reviewForm.rating) }}
                </div>
              </div>
              
              <q-input
                v-model="reviewForm.comment"
                label="評價內容 *"
                type="textarea"
                outlined
                rows="4"
                placeholder="請分享您的服務體驗..."
                :rules="[val => !!val || '請填寫評價內容']"
              />
              
              <div class="row q-gutter-sm">
                <q-btn
                  type="submit"
                  color="primary"
                  :loading="isSubmitting"
                  :disable="!reviewForm.caregiver_id || !reviewForm.rating || !reviewForm.comment"
                >
                  {{ isSubmitting ? '提交中...' : '提交評價' }}
                </q-btn>
                <q-btn
                  flat
                  color="grey"
                  @click="resetForm"
                  :disable="isSubmitting"
                >
                  清除
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
        
        <!-- 未登入提示 -->
        <q-card flat bordered v-else>
          <q-card-section class="text-center">
            <q-icon name="login" size="50px" color="grey-5" />
            <div class="text-h6 q-mt-md text-grey-7">登入後可撰寫評價</div>
            <div class="text-body2 text-grey-6 q-mb-md">
              請先登入您的帳戶以撰寫和提交評價
            </div>
            <q-btn
              color="primary"
              @click="navigateTo('/auth/login')"
            >
              立即登入
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import type { Review, Caregiver } from '~/utils/mockData'

// SEO
usePageSeo('用戶評價 - 護理服務平台', '查看其他用戶對護理服務的評價與回饋')

// 組合式函數
const route = useRoute()
const $q = useQuasar()
const apiService = useApiService()
const authStore = useAuthStore()

// 響應式資料
const reviews = ref<Review[]>([])
const caregivers = ref<Caregiver[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const currentPage = ref(1)
const itemsPerPage = 10
const selectedCaregiverId = ref<number | null>(null)

// 評價表單
const reviewForm = ref({
  caregiver_id: null as number | null,
  rating: 0,
  comment: '',
  service_type: ''
})

// 選項資料
const serviceTypeOptions = [
  '一般照護',
  '專業護理',
  '復健協助',
  '夜間照護',
  '失智症照護',
  '長期照護'
]

// 計算屬性
const caregiverOptions = computed(() => {
  return [{ label: '全部看護師', value: null }, ...caregivers.value.map(c => ({
    label: c.name,
    value: c.id
  }))]
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  return reviews.value.reduce((sum, r) => sum + r.rating, 0) / reviews.value.length
})

const totalPages = computed(() => {
  return Math.ceil(reviews.value.length / itemsPerPage)
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return reviews.value.slice(start, end)
})

// 方法
const loadCaregivers = async () => {
  try {
    const result = await apiService.getCaregivers(1, 100)
    caregivers.value = Array.isArray(result) ? result : result.data || []
  } catch (error) {
    console.error('載入看護師列表失敗:', error)
  }
}

const loadReviews = async () => {
  isLoading.value = true
  
  try {
    if (selectedCaregiverId.value) {
      reviews.value = await apiService.getReviewsByCaregiver(selectedCaregiverId.value)
    } else {
      // 載入所有評價（使用模擬資料）
      const allReviews: Review[] = []
      for (const caregiver of caregivers.value.slice(0, 5)) { // 只載入前5位的評價
        try {
          const caregiverReviews = await apiService.getReviewsByCaregiver(caregiver.id)
          allReviews.push(...caregiverReviews)
        } catch (error) {
          console.warn(`載入看護師 ${caregiver.id} 的評價失敗:`, error)
        }
      }
      reviews.value = allReviews.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    }
  } catch (error: any) {
    console.error('載入評價失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '載入評價失敗',
      timeout: 3000
    })
  } finally {
    isLoading.value = false
  }
}

const submitReview = async () => {
  if (!reviewForm.value.caregiver_id || !reviewForm.value.rating || !reviewForm.value.comment) {
    $q.notify({
      type: 'warning',
      message: '請填寫完整的評價資訊',
      timeout: 3000
    })
    return
  }
  
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能提交評價',
      timeout: 3000
    })
    return
  }
  
  isSubmitting.value = true
  
  try {
    const reviewData = {
      caregiver_id: reviewForm.value.caregiver_id,
      user_id: authStore.currentUser.id,
      rating: reviewForm.value.rating,
      comment: reviewForm.value.comment,
      service_type: reviewForm.value.service_type
    }
    
    const newReview = await apiService.createReview(reviewData)
    
    // 新增到本地列表
    reviews.value.unshift(newReview)
    
    $q.notify({
      type: 'positive',
      message: '評價提交成功！',
      timeout: 3000
    })
    
    resetForm()
    
  } catch (error: any) {
    console.error('提交評價失敗:', error)
    $q.notify({
      type: 'negative',
      message: error.message || '提交評價失敗',
      timeout: 3000
    })
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  reviewForm.value = {
    caregiver_id: null,
    rating: 0,
    comment: '',
    service_type: ''
  }
}

const toggleLike = (review: Review) => {
  if (!authStore.currentUser) {
    $q.notify({
      type: 'warning',
      message: '請先登入才能按讚',
      timeout: 2000
    })
    return
  }
  
  review.liked = !review.liked
  review.likes = (review.likes || 0) + (review.liked ? 1 : -1)
  
  $q.notify({
    type: 'positive',
    message: review.liked ? '已按讚' : '已取消按讚',
    timeout: 1000
  })
}

const getRatingCount = (rating: number) => {
  return reviews.value.filter(r => Math.floor(r.rating) === rating).length
}

const getRatingPercentage = (rating: number) => {
  if (reviews.value.length === 0) return 0
  return getRatingCount(rating) / reviews.value.length
}

const getRatingLabel = (rating: number) => {
  const labels = ['', '非常不滿意', '不滿意', '一般', '滿意', '非常滿意']
  return labels[rating] || ''
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const onPageChange = (page: number) => {
  currentPage.value = page
  // 滾動到頁面頂部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 監聽 URL 參數
watch(() => route.query.caregiverId, (newId) => {
  if (newId) {
    selectedCaregiverId.value = parseInt(newId as string)
  }
}, { immediate: true })

// 生命週期
onMounted(async () => {
  await loadCaregivers()
  await loadReviews()
})

// 頁面結構化資料
const { $route } = useNuxtApp()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

// 動態更新 SEO
watch([reviews, averageRating], ([newReviews, newAverage]) => {
  if (newReviews.length > 0) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: '護理服務平台',
            url: baseUrl + $route.fullPath,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: newAverage,
              reviewCount: newReviews.length,
              bestRating: 5,
              worstRating: 1
            },
            review: newReviews.slice(0, 10).map((r) => ({
              '@type': 'Review',
              reviewRating: { '@type': 'Rating', ratingValue: r.rating },
              author: { '@type': 'Person', name: r.user_name || '匯名用戶' },
              reviewBody: r.comment,
              datePublished: r.created_at
            }))
          })
        }
      ]
    })
  }
})
</script>
