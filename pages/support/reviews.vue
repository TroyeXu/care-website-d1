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
        <q-card flat bordered class="q-mb-lg stats-card">
          <q-card-section>
            <!-- 響應式佈局：大螢幕水平排列，小螢幕垂直排列 -->
            <div class="row q-col-gutter-lg">
              <!-- 平均評分區域 -->
              <div class="col-12 col-md-4">
                <div class="text-center q-pa-md rating-summary">
                  <div class="text-h3 text-primary q-mb-sm font-weight-bold">
                    {{ averageRating.toFixed(1) }}
                  </div>
                  <q-rating
                    :model-value="averageRating"
                    readonly
                    color="orange"
                    size="1.8em"
                    class="q-mb-sm"
                  />
                  <div class="text-body2 text-grey-7">
                    基於 <strong>{{ reviews.length }}</strong> 則評價
                  </div>
                  <div class="text-caption text-grey-5 q-mt-xs">
                    平均滿意度
                  </div>
                </div>
              </div>
              
              <!-- 分隔線 - 只在桌面版顯示 -->
              <q-separator vertical class="gt-sm" />
              <q-separator class="lt-md q-my-md" />
              
              <!-- 評價分佈區域 -->
              <div class="col-12 col-md-8">
                <div class="q-pa-md">
                  <div class="text-h6 q-mb-lg text-grey-8">
                    <q-icon name="bar_chart" class="q-mr-sm" />
                    評價分佈
                  </div>
                  <div class="rating-distribution">
                    <div v-for="i in [5, 4, 3, 2, 1]" :key="i" 
                         class="row items-center q-mb-sm rating-bar">
                      <div class="rating-label">
                        <span class="text-body2 text-grey-8">{{ i }}</span>
                        <q-icon name="star" size="sm" color="orange" class="q-ml-xs" />
                      </div>
                      <div class="col progress-container q-mx-md">
                        <q-linear-progress
                          :value="getRatingPercentage(i)"
                          color="orange"
                          size="12px"
                          rounded
                          class="progress-bar"
                          :animation-speed="200"
                        />
                      </div>
                      <div class="rating-count">
                        <q-chip 
                          size="sm" 
                          :color="getRatingCount(i) > 0 ? 'orange-2' : 'grey-3'"
                          :text-color="getRatingCount(i) > 0 ? 'orange-8' : 'grey-6'"
                          dense
                        >
                          {{ getRatingCount(i) }}
                        </q-chip>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 額外統計資訊 -->
            <q-separator class="q-my-lg" />
            <div class="row q-col-gutter-md text-center">
              <div class="col-4">
                <div class="text-h6 text-positive">{{ reviews.filter(r => r.verified).length }}</div>
                <div class="text-caption text-grey-6">已驗證評價</div>
              </div>
              <div class="col-4">
                <div class="text-h6 text-info">{{ reviews.filter(r => r.reply).length }}</div>
                <div class="text-caption text-grey-6">已回覆評價</div>
              </div>
              <div class="col-4">
                <div class="text-h6 text-secondary">
                  {{ Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) || 0 }}%
                </div>
                <div class="text-caption text-grey-6">推薦率</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        
        <!-- 載入狀態 -->
        <div v-if="isLoading" class="loading-container">
          <q-card flat bordered class="loading-card">
            <q-card-section class="text-center q-pa-xl">
              <div class="loading-animation">
                <q-spinner-orbit size="60px" color="primary" />
              </div>
              <div class="text-h6 text-primary q-mt-lg">載入評價中</div>
              <div class="text-body2 text-grey-6 q-mt-sm">
                正在為您整理最新的評價資訊...
              </div>
              <!-- 載入骨架屏 -->
              <div class="skeleton-container q-mt-lg">
                <div v-for="i in 3" :key="i" class="skeleton-item">
                  <q-skeleton type="rect" height="120px" class="q-mb-md" />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <!-- 評價列表 -->
        <div v-else-if="reviews.length > 0">
          <q-card flat bordered class="q-mb-lg reviews-container">
            <q-card-section>
              <div class="row items-center justify-between q-mb-lg">
                <div class="text-h6 text-grey-8">
                  <q-icon name="chat_bubble_outline" class="q-mr-sm" />
                  所有評價 ({{ reviews.length }})
                </div>
                <!-- 排序選項 -->
                <q-select
                  v-model="sortBy"
                  :options="sortOptions"
                  outlined
                  dense
                  label="排序方式"
                  style="min-width: 120px"
                  @update:model-value="sortReviews"
                />
              </div>
              
              <!-- 評價卡片列表 -->
              <div class="review-cards">
                <q-card
                  v-for="review in paginatedReviews"
                  :key="review.id"
                  flat
                  bordered
                  class="review-card q-mb-md"
                >
                  <q-card-section class="q-pa-lg">
                    <!-- 評價標題欄 -->
                    <div class="row items-start q-mb-md">
                      <div class="col">
                        <div class="row items-center q-mb-xs">
                          <q-rating
                            :model-value="review.rating"
                            readonly
                            color="orange"
                            size="1.2em"
                            class="q-mr-sm"
                          />
                          <q-chip
                            v-if="review.verified"
                            size="sm"
                            color="positive"
                            text-color="white"
                            icon="verified_user"
                            class="q-mr-sm"
                          >
                            已驗證
                          </q-chip>
                          <q-chip
                            v-if="review.service_type"
                            size="sm"
                            color="blue-2"
                            text-color="blue-8"
                            icon="medical_services"
                          >
                            {{ review.service_type }}
                          </q-chip>
                        </div>
                        <div class="text-caption text-grey-6">
                          <q-icon name="person" size="xs" class="q-mr-xs" />
                          {{ review.user_name || '匿名用戶' }}
                          <q-separator vertical class="q-mx-sm" />
                          <q-icon name="schedule" size="xs" class="q-mr-xs" />
                          {{ formatDate(review.created_at) }}
                        </div>
                      </div>
                      
                      <!-- 互動按鈕 -->
                      <div class="row q-gutter-xs">
                        <q-btn
                          flat
                          round
                          dense
                          :icon="review.liked ? 'thumb_up' : 'thumb_up_off_alt'"
                          :color="review.liked ? 'primary' : 'grey-6'"
                          size="sm"
                          @click="toggleLike(review)"
                          class="like-btn"
                        >
                          <q-tooltip>{{ review.liked ? '取消按讚' : '按讚' }}</q-tooltip>
                        </q-btn>
                        <div class="text-caption text-grey-6 self-center q-ml-xs">
                          {{ review.likes || 0 }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- 評價內容 -->
                    <div class="review-content q-mb-md">
                      <q-icon name="format_quote" class="quote-icon text-grey-4" />
                      <div class="text-body1 q-pl-md review-text">
                        {{ review.comment }}
                      </div>
                    </div>
                    
                    <!-- 看護師回覆 -->
                    <div v-if="review.reply" class="reply-section">
                      <q-separator class="q-mb-md" />
                      <div class="bg-blue-1 q-pa-md rounded-borders reply-card">
                        <div class="row items-center q-mb-sm">
                          <q-icon name="support_agent" color="blue-7" class="q-mr-sm" />
                          <span class="text-subtitle2 text-blue-8">看護師回覆</span>
                        </div>
                        <div class="text-body2 text-grey-8 q-pl-lg">
                          {{ review.reply }}
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              
              <!-- 分頁 -->
              <div v-if="totalPages > 1" class="text-center q-mt-lg">
                <q-pagination
                  v-model="currentPage"
                  :max="totalPages"
                  direction-links
                  boundary-links
                  color="primary"
                  @update:model-value="onPageChange"
                />
                <div class="text-caption text-grey-6 q-mt-sm">
                  顯示第 {{ (currentPage - 1) * itemsPerPage + 1 }} - 
                  {{ Math.min(currentPage * itemsPerPage, reviews.length) }} 
                  項，共 {{ reviews.length }} 項評價
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <!-- 無評價狀態 -->
        <div v-else class="empty-state-container">
          <q-card flat bordered class="empty-state-card">
            <q-card-section class="text-center q-pa-xl">
              <div class="empty-state-animation">
                <q-icon name="chat_bubble_outline" size="100px" color="grey-4" />
                <div class="floating-dots">
                  <div class="dot dot-1"></div>
                  <div class="dot dot-2"></div>
                  <div class="dot dot-3"></div>
                </div>
              </div>
              
              <div class="text-h5 text-grey-7 q-mt-lg q-mb-md">
                {{ selectedCaregiverId ? '暫無評價' : '選擇看護師查看評價' }}
              </div>
              
              <div class="text-body1 text-grey-6 q-mb-lg" style="max-width: 400px; margin: 0 auto;">
                <span v-if="selectedCaregiverId">
                  這位看護師還沒有收到評價，您可以成為第一個分享體驗的用戶！
                </span>
                <span v-else>
                  請在上方選擇特定看護師查看相關評價，或查看所有評價。
                </span>
              </div>
              
              <!-- 建議操作 -->
              <div class="row justify-center q-gutter-sm">
                <q-btn
                  v-if="!selectedCaregiverId"
                  color="primary"
                  outline
                  @click="selectedCaregiverId = caregivers[0]?.id || null; loadReviews()"
                  :disable="caregivers.length === 0"
                >
                  <q-icon name="visibility" class="q-mr-sm" />
                  查看所有評價
                </q-btn>
                
                <q-btn
                  v-if="authStore.currentUser && selectedCaregiverId"
                  color="positive"
                  @click="showReviewForm = true; reviewForm.caregiver_id = selectedCaregiverId"
                >
                  <q-icon name="edit" class="q-mr-sm" />
                  撰寫評價
                </q-btn>
                
                <q-btn
                  v-else-if="!authStore.currentUser"
                  color="secondary"
                  outline
                  @click="navigateTo('/auth/login')"
                >
                  <q-icon name="login" class="q-mr-sm" />
                  登入撰寫評價
                </q-btn>
              </div>
              
              <!-- 提示資訊 -->
              <div class="q-mt-lg">
                <q-chip
                  color="blue-1"
                  text-color="blue-8"
                  icon="info"
                  size="sm"
                >
                  評價幫助其他用戶做出更好的選擇
                </q-chip>
              </div>
            </q-card-section>
          </q-card>
        </div>
        
        <!-- 新增評價表單 -->
        <q-card flat bordered v-if="authStore.currentUser" class="review-form-card">
          <q-card-section>
            <div class="row items-center justify-between q-mb-lg">
              <div class="text-h6 text-grey-8">
                <q-icon name="rate_review" class="q-mr-sm" />
                撰寫評價
              </div>
              <q-btn
                flat
                round
                icon="expand_less"
                v-if="showReviewForm"
                @click="showReviewForm = false"
                class="text-grey-6"
              >
                <q-tooltip>收起表單</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                icon="expand_more"
                v-else
                @click="showReviewForm = true"
                class="text-grey-6"
              >
                <q-tooltip>展開表單</q-tooltip>
              </q-btn>
            </div>
            
            <!-- 簡潔提示 -->
            <div v-if="!showReviewForm" class="text-center q-pa-md">
              <q-icon name="edit_note" size="2em" color="grey-5" />
              <div class="text-body2 text-grey-6 q-mt-sm">
                分享您的服務體驗，幫助其他用戶做出更好的選擇
              </div>
              <q-btn
                color="primary"
                outline
                @click="showReviewForm = true"
                class="q-mt-md"
              >
                開始撰寫評價
              </q-btn>
            </div>
            
            <!-- 展開的表單 -->
            <div v-if="showReviewForm">
              <q-stepper
                v-model="reviewStep"
                color="primary"
                animated
                flat
                class="review-stepper"
              >
                <!-- 步驟 1: 基本資訊 -->
                <q-step
                  :name="1"
                  title="選擇看護師"
                  icon="person"
                  :done="reviewStep > 1"
                  class="q-pa-md"
                >
                  <div class="q-gutter-md">
                    <q-select
                      v-model="reviewForm.caregiver_id"
                      :options="caregiverOptions.filter(opt => opt.value !== null)"
                      label="請選擇您要評價的看護師"
                      outlined
                      emit-value
                      map-options
                      :rules="[val => !!val || '請選擇看護師']"
                      class="q-mb-md"
                    >
                      <template v-slot:before>
                        <q-icon name="person" />
                      </template>
                    </q-select>
                    
                    <q-select
                      v-model="reviewForm.service_type"
                      :options="serviceTypeOptions"
                      label="服務類型 (選填)"
                      outlined
                      clearable
                      class="q-mb-md"
                    >
                      <template v-slot:before>
                        <q-icon name="medical_services" />
                      </template>
                    </q-select>
                  </div>
                  
                  <q-stepper-navigation>
                    <q-btn
                      @click="reviewStep = 2"
                      color="primary"
                      label="下一步"
                      :disable="!reviewForm.caregiver_id"
                    />
                  </q-stepper-navigation>
                </q-step>
                
                <!-- 步驟 2: 評分 -->
                <q-step
                  :name="2"
                  title="評分"
                  icon="star"
                  :done="reviewStep > 2"
                  class="q-pa-md"
                >
                  <div class="text-center q-pa-lg">
                    <div class="text-h6 q-mb-md text-grey-8">
                      請為服務品質評分
                    </div>
                    <q-rating
                      v-model="reviewForm.rating"
                      :max="5"
                      color="orange"
                      size="3em"
                      class="q-mb-md"
                      @update:model-value="onRatingChange"
                    />
                    <div class="text-h6 text-primary q-mb-sm">
                      {{ getRatingLabel(reviewForm.rating) }}
                    </div>
                    <div class="text-caption text-grey-6">
                      點擊星星來評分，1星最低，5星最高
                    </div>
                  </div>
                  
                  <q-stepper-navigation>
                    <q-btn
                      flat
                      @click="reviewStep = 1"
                      color="primary"
                      label="上一步"
                      class="q-mr-sm"
                    />
                    <q-btn
                      @click="reviewStep = 3"
                      color="primary"
                      label="下一步"
                      :disable="!reviewForm.rating"
                    />
                  </q-stepper-navigation>
                </q-step>
                
                <!-- 步驟 3: 撰寫評價 -->
                <q-step
                  :name="3"
                  title="撰寫評價"
                  icon="edit"
                  class="q-pa-md"
                >
                  <q-form @submit.prevent="submitReview">
                    <q-input
                      v-model="reviewForm.comment"
                      label="請詳細描述您的服務體驗"
                      type="textarea"
                      outlined
                      rows="6"
                      :placeholder="`分享您對${getCaregiverName()}服務的感受...\n\n例如：\n• 服務態度如何？\n• 專業技能表現？\n• 溝通是否順暢？\n• 是否會推薦給他人？`"
                      :rules="[val => !!val || '請填寫評價內容', val => val.length >= 10 || '評價內容至少需要10個字']"
                      counter
                      maxlength="500"
                      class="q-mb-md"
                    >
                      <template v-slot:before>
                        <q-icon name="chat" />
                      </template>
                    </q-input>
                    
                    <!-- 評價預覽 -->
                    <q-card flat bordered class="bg-grey-1 q-mb-md" v-if="reviewForm.comment">
                      <q-card-section>
                        <div class="text-subtitle2 q-mb-sm">
                          <q-icon name="preview" class="q-mr-sm" />
                          評價預覽
                        </div>
                        <div class="row items-center q-mb-sm">
                          <q-rating
                            :model-value="reviewForm.rating"
                            readonly
                            color="orange"
                            size="1.2em"
                            class="q-mr-sm"
                          />
                          <span class="text-caption text-grey-6">
                            {{ formatDate(new Date().toISOString()) }}
                          </span>
                        </div>
                        <div class="text-body1">{{ reviewForm.comment }}</div>
                        <div class="text-caption text-grey-6 q-mt-sm">
                          由 {{ authStore.currentUser?.name || '您' }} 提供
                          <span v-if="reviewForm.service_type">
                            · {{ reviewForm.service_type }}
                          </span>
                        </div>
                      </q-card-section>
                    </q-card>
                    
                    <q-stepper-navigation>
                      <q-btn
                        flat
                        @click="reviewStep = 2"
                        color="primary"
                        label="上一步"
                        class="q-mr-sm"
                      />
                      <q-btn
                        type="submit"
                        color="primary"
                        :loading="isSubmitting"
                        :disable="!reviewForm.comment || reviewForm.comment.length < 10"
                      >
                        <q-icon name="send" class="q-mr-sm" />
                        {{ isSubmitting ? '提交中...' : '提交評價' }}
                      </q-btn>
                      <q-btn
                        flat
                        color="grey"
                        @click="resetForm"
                        :disable="isSubmitting"
                        class="q-ml-sm"
                      >
                        重新填寫
                      </q-btn>
                    </q-stepper-navigation>
                  </q-form>
                </q-step>
              </q-stepper>
            </div>
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
const sortBy = ref('latest')
const showReviewForm = ref(false)
const reviewStep = ref(1)

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

const sortOptions = [
  { label: '最新評價', value: 'latest' },
  { label: '最舊評價', value: 'oldest' },
  { label: '評分最高', value: 'highest' },
  { label: '評分最低', value: 'lowest' },
  { label: '最多按讚', value: 'most_liked' }
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

const sortedReviews = computed(() => {
  const sorted = [...reviews.value]
  
  switch (sortBy.value) {
    case 'latest':
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    case 'highest':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'lowest':
      return sorted.sort((a, b) => a.rating - b.rating)
    case 'most_liked':
      return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    default:
      return sorted
  }
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return sortedReviews.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(sortedReviews.value.length / itemsPerPage)
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
  reviewStep.value = 1
  showReviewForm.value = false
}

const onRatingChange = (rating: number) => {
  if (rating > 0) {
    // 自動進入下一步
    setTimeout(() => {
      reviewStep.value = 3
    }, 500)
  }
}

const getCaregiverName = () => {
  if (!reviewForm.value.caregiver_id) return ''
  const caregiver = caregivers.value.find(c => c.id === reviewForm.value.caregiver_id)
  return caregiver?.name || ''
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

const sortReviews = () => {
  currentPage.value = 1 // 重置到第一頁
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

<style scoped>
/* 統計卡片樣式 */
.stats-card {
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
}

.rating-summary {
  background: rgba(255, 152, 0, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.rating-distribution .rating-bar {
  padding: 8px 0;
  transition: all 0.2s ease;
}

.rating-distribution .rating-bar:hover {
  background: rgba(255, 152, 0, 0.05);
  border-radius: 6px;
  transform: translateX(4px);
}

.rating-label {
  min-width: 50px;
  display: flex;
  align-items: center;
}

.progress-container {
  height: 12px;
}

.progress-bar {
  transition: all 0.3s ease;
}

.rating-count {
  min-width: 50px;
  text-align: center;
}

/* 評價列表樣式 */
.reviews-container {
  border-radius: 12px;
  overflow: hidden;
}

.review-cards {
  gap: 16px;
}

.review-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #e1e5e9;
}

.review-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #d1d5db;
}

.review-content {
  position: relative;
}

.quote-icon {
  position: absolute;
  left: -8px;
  top: -4px;
  font-size: 24px;
}

.review-text {
  line-height: 1.6;
  color: #374151;
}

.reply-section {
  margin-top: 16px;
}

.reply-card {
  border-left: 4px solid #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%);
}

.like-btn {
  transition: all 0.2s ease;
}

.like-btn:hover {
  transform: scale(1.1);
}

/* 載入狀態樣式 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  width: 100%;
}

.loading-animation {
  position: relative;
  display: inline-block;
}

.skeleton-container {
  max-width: 300px;
  margin: 0 auto;
}

.skeleton-item {
  opacity: 0.6;
  animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-item:nth-child(2) {
  animation-delay: 0.2s;
}

.skeleton-item:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

/* 空狀態樣式 */
.empty-state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.empty-state-card {
  border-radius: 16px;
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 100%;
}

.empty-state-animation {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.floating-dots {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
  position: absolute;
  animation: float 2s ease-in-out infinite;
}

.dot-1 {
  left: -20px;
  animation-delay: 0s;
}

.dot-2 {
  left: 0;
  animation-delay: 0.3s;
}

.dot-3 {
  left: 20px;
  animation-delay: 0.6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* 評價表單樣式 */
.review-form-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
  border: 2px solid #e9ecef;
}

.review-stepper {
  background: transparent;
}

/* 響應式設計 */
@media (max-width: 1023px) {
  .stats-card .row {
    flex-direction: column;
  }
  
  .rating-summary {
    margin-bottom: 16px;
  }
  
  .rating-distribution {
    padding-top: 16px;
  }
}

@media (max-width: 767px) {
  .q-pa-md {
    padding: 12px !important;
  }
  
  .review-card {
    margin-bottom: 12px;
  }
  
  .review-card .q-card-section {
    padding: 16px !important;
  }
  
  .rating-summary {
    padding: 16px !important;
  }
  
  .rating-distribution .rating-bar {
    padding: 6px 0;
  }
  
  .rating-label {
    min-width: 40px;
  }
  
  .rating-count {
    min-width: 40px;
  }
  
  /* 行動裝置上隱藏部分元素 */
  .quote-icon {
    display: none;
  }
  
  .review-text {
    padding-left: 0 !important;
  }
  
  /* 表單在手機上的優化 */
  .review-stepper .q-stepper__step-content {
    padding: 16px 12px !important;
  }
  
  .review-stepper .q-stepper__nav {
    padding: 12px !important;
  }
}

@media (max-width: 599px) {
  .col-lg-10 {
    padding: 0 8px;
  }
  
  .q-mb-lg {
    margin-bottom: 16px !important;
  }
  
  .stats-card .text-h3 {
    font-size: 2rem !important;
  }
  
  .rating-distribution .rating-bar:hover {
    transform: none;
  }
  
  .review-card:hover {
    transform: none;
  }
  
  /* 簡化統計區域 */
  .rating-distribution .text-h6 {
    font-size: 1rem !important;
    margin-bottom: 12px !important;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .stats-card {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-color: #404040;
  }
  
  .rating-summary {
    background: rgba(255, 152, 0, 0.1);
  }
  
  .review-card {
    background: #1e1e1e;
    border-color: #404040;
  }
  
  .reply-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-left-color: #60a5fa;
  }
  
  .review-form-card {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    border-color: #404040;
  }
}

/* 動畫效果 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.review-card {
  animation: slideInUp 0.3s ease-out;
}

.review-card:nth-child(even) {
  animation-delay: 0.1s;
}

.review-card:nth-child(odd) {
  animation-delay: 0.05s;
}

/* 無障礙設計 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .review-card:hover,
  .rating-bar:hover,
  .like-btn:hover {
    transform: none !important;
  }
}

/* 高對比度模式 */
@media (prefers-contrast: high) {
  .stats-card,
  .review-card,
  .review-form-card {
    border-width: 2px;
    border-color: #000;
  }
  
  .review-text {
    color: #000;
    font-weight: 500;
  }
}
</style>
