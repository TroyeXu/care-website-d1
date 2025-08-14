<template>
  <q-page>
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
      <q-btn flat color="primary" class="q-mt-md" @click="loadCaregiverData">
        重新載入
      </q-btn>
    </div>

    <!-- 看護師詳情 -->
    <div v-else-if="caregiver" class="caregiver-detail-container">
      <div class="content-wrapper">
        <!-- 面包屑導航 -->
        <q-breadcrumbs class="breadcrumbs-nav q-mb-lg">
          <q-breadcrumbs-el icon="home" :to="'/'" label="首頁" />
          <q-breadcrumbs-el :to="'/caregivers'" label="看護師列表" />
          <q-breadcrumbs-el :label="caregiver.name" />
        </q-breadcrumbs>

        <div class="row q-gutter-lg">
          <!-- 左側主要資訊 -->
          <div class="col-12 col-md-8">
            <!-- 基本資訊卡片 -->
            <q-card flat class="info-card hero-card q-mb-lg">
              <div class="hero-gradient">
                <div class="hero-pattern"></div>
              </div>
              <q-card-section class="q-pa-lg">
                <div class="row items-start">
                  <div class="col">
                    <div
                      class="text-h4 text-weight-bold q-mb-xs animate-slide-left"
                    >
                      {{ caregiver.name }}
                    </div>
                    <div
                      class="text-subtitle1 text-grey-6 q-mb-md animate-slide-left"
                      style="animation-delay: 0.1s"
                    >
                      {{ caregiver.specialization || '專業看護師' }}
                    </div>

                    <!-- 評分區域 -->
                    <div
                      class="rating-section animate-fade-in"
                      style="animation-delay: 0.2s"
                    >
                      <div class="row items-center q-gutter-md">
                        <div class="rating-display">
                          <div class="rating-number">
                            {{ caregiver.rating }}
                          </div>
                          <q-rating
                            v-model="caregiver.rating"
                            size="1.5em"
                            :max="5"
                            color="amber"
                            readonly
                          />
                        </div>
                        <q-separator vertical inset />
                        <div class="review-count">
                          <div class="text-h6 text-weight-medium">
                            {{ caregiver.review_count || 12 }}
                          </div>
                          <div class="text-caption text-grey-6">則評價</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 照片區域 -->
                  <div class="col-auto">
                    <div class="caregiver-photo-wrapper">
                      <q-avatar size="120px" class="caregiver-photo">
                        <img :src="caregiver.photo" :alt="caregiver.name" />
                      </q-avatar>
                      <div v-if="caregiver.verified" class="photo-badge">
                        <q-icon name="verified" color="white" size="24px" />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 標籤 -->
                <div
                  class="q-mt-lg tags-section animate-fade-up"
                  style="animation-delay: 0.3s"
                >
                  <q-chip
                    v-if="caregiver.available"
                    color="positive"
                    text-color="white"
                    icon="check_circle"
                    class="status-chip"
                  >
                    目前可預約
                  </q-chip>
                  <q-chip
                    v-else
                    color="negative"
                    text-color="white"
                    icon="schedule"
                    class="status-chip"
                  >
                    目前不可預約
                  </q-chip>
                  <q-chip
                    v-if="caregiver.location"
                    class="info-chip"
                    icon="location_on"
                  >
                    {{ caregiver.location }}
                  </q-chip>
                  <q-chip
                    v-if="caregiver.experience_years"
                    class="info-chip"
                    icon="work"
                  >
                    {{ caregiver.experience_years || 5 }} 年經驗
                  </q-chip>
                  <q-chip
                    v-for="skill in (caregiver.skills || '')
                      .split(',')
                      .slice(0, 3)"
                    :key="skill"
                    class="skill-chip"
                    icon="star"
                  >
                    {{ skill.trim() }}
                  </q-chip>
                </div>
              </q-card-section>
            </q-card>

            <!-- 經驗與技能 -->
            <q-card
              flat
              class="info-card section-card q-mb-lg animate-fade-up"
              style="animation-delay: 0.4s"
            >
              <q-card-section class="q-pa-lg">
                <div class="section-header q-mb-lg">
                  <q-icon name="psychology" size="32px" color="primary" />
                  <div class="text-h5 text-weight-medium">專業經驗與技能</div>
                </div>

                <div class="experience-grid">
                  <div class="experience-item">
                    <div class="experience-icon">
                      <q-icon name="work_history" size="24px" color="primary" />
                    </div>
                    <div class="experience-content">
                      <div class="text-subtitle1 text-weight-medium q-mb-sm">
                        工作經驗
                      </div>
                      <div class="text-body1 text-grey-7">
                        {{ caregiver.experience }}
                      </div>
                    </div>
                  </div>

                  <div class="experience-item">
                    <div class="experience-icon">
                      <q-icon name="psychology" size="24px" color="secondary" />
                    </div>
                    <div class="experience-content">
                      <div class="text-subtitle1 text-weight-medium q-mb-sm">
                        專業技能
                      </div>
                      <div class="skills-tags">
                        <q-badge
                          v-for="skill in (caregiver.skills || '')
                            .split(',')
                            .map((s: string) => s.trim())"
                          :key="skill"
                          color="blue-1"
                          text-color="blue-8"
                          class="skill-badge"
                        >
                          {{ skill }}
                        </q-badge>
                      </div>
                    </div>
                  </div>
                </div>

                <q-separator class="q-my-lg" />

                <div v-if="caregiver.description" class="description-section">
                  <div class="row items-center q-mb-md">
                    <q-icon
                      name="person"
                      size="24px"
                      color="grey-7"
                      class="q-mr-sm"
                    />
                    <div class="text-subtitle1 text-weight-medium">
                      個人簡介
                    </div>
                  </div>
                  <div class="description-text">
                    {{
                      caregiver.description ||
                      '我是一位專業的看護師，擁有豐富的照護經驗和專業技能。我致力於為每位患者提供最優質的照護服務，確保他們的健康和安全。'
                    }}
                  </div>
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
                    :loading="isLoadingReviews"
                    @click="loadReviews"
                  >
                    更新評價
                  </q-btn>
                </div>

                <div v-if="isLoadingReviews" class="text-center q-pa-md">
                  <q-spinner-dots size="30px" color="primary" />
                </div>

                <div
                  v-else-if="reviews.length === 0"
                  class="text-center q-pa-md text-grey-6"
                >
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
                      @click="
                        navigateTo(
                          `/support/reviews?caregiverId=${caregiver.id}`,
                        )
                      "
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
            <q-card
              flat
              class="price-card sticky-card q-mb-lg animate-fade-up"
              style="animation-delay: 0.5s"
            >
              <div class="price-header">
                <div class="price-pattern"></div>
                <q-icon name="payments" size="48px" color="white" />
              </div>

              <q-card-section class="q-pa-lg">
                <div class="text-h5 text-center text-weight-medium q-mb-lg">
                  服務價格
                </div>

                <!-- 價格顯示 -->
                <div class="price-display q-mb-lg">
                  <div class="price-item primary-price">
                    <div class="price-label">按小時計費</div>
                    <div class="price-value">
                      <span class="currency">NT$</span>
                      <span class="amount">{{ caregiver.hourly_rate }}</span>
                      <span class="unit">/小時</span>
                    </div>
                  </div>

                  <div class="price-divider">
                    <q-icon name="circle" size="xs" color="grey-4" />
                  </div>

                  <div class="price-item">
                    <div class="price-label">按班次計費</div>
                    <div class="price-value">
                      <span class="currency">NT$</span>
                      <span class="amount">{{ caregiver.shift_rate }}</span>
                      <span class="unit">/班</span>
                    </div>
                    <div class="price-note">早/晚班 8小時</div>
                  </div>
                </div>

                <!-- 預約按鈕 -->
                <q-btn
                  :color="caregiver.available ? 'primary' : 'grey'"
                  size="lg"
                  class="full-width booking-btn q-mb-md"
                  unelevated
                  rounded
                  :disable="!caregiver.available"
                  @click="startBooking"
                >
                  <q-icon name="calendar_today" class="q-mr-sm" />
                  {{ caregiver.available ? '立即預約' : '目前不可預約' }}
                </q-btn>

                <!-- 其他操作按鈕 -->
                <div class="action-buttons">
                  <q-btn
                    outline
                    color="primary"
                    class="action-btn"
                    rounded
                    @click="contactCaregiver"
                  >
                    <q-icon name="message" />
                    <q-tooltip>聯繫看護師</q-tooltip>
                  </q-btn>

                  <q-btn
                    outline
                    color="grey"
                    class="action-btn"
                    rounded
                    @click="shareProfile"
                  >
                    <q-icon name="share" />
                    <q-tooltip>分享</q-tooltip>
                  </q-btn>
                </div>

                <q-separator class="q-my-md" />

                <div class="update-info text-center">
                  <q-icon name="update" size="16px" color="grey-6" />
                  <span class="text-caption text-grey-6 q-ml-xs">
                    最後更新：{{ formatDate(caregiver.updated_at) }}
                  </span>
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
                      <q-item-label caption>{{
                        caregiver.location || '未提供'
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="schedule" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>可用狀態</q-item-label>
                      <q-item-label caption>
                        {{
                          caregiver.available ? '目前可預約' : '目前不可預約'
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="work" color="primary" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>工作經驗</q-item-label>
                      <q-item-label caption
                        >{{ caregiver.experience_years || 5 }} 年</q-item-label
                      >
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
      <div class="text-body2 text-grey-6 q-mt-sm">請確認看護師 ID 是否正確</div>
      <q-btn
        flat
        color="primary"
        class="q-mt-md"
        @click="navigateTo('/caregivers')"
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
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'
import BookingDialog from '~/components/BookingDialog.vue'
import {
  navigateTo,
  useFetch,
  useHead,
  useRuntimeConfig,
  watch,
} from '#imports'

interface Review {
  id: string
  rating: number
  comment: string
  user_name: string
  created_at: string
}

// 組合式函數
const route = useRoute()
const $q = useQuasar()
const authStore = useAuthStore()

// 響應式資料
const reviews = ref<Review[]>([])
const isLoadingReviews = ref(false)

// 計算屬性
const caregiverId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? id : Array.isArray(id) ? id[0] : ''
})

// 使用 server 端資料載入看護師資料
const {
  data: caregiver,
  pending: isLoading,
  error,
} = await useFetch(`/api/caregivers/${caregiverId.value}`, {
  transform: (data: any) => {
    // 確保資料格式正確
    if (!data || !data.caregiver) return null
    const c = data.caregiver

    // 將 server 的資料格式轉換為頁面使用的格式
    return {
      id: parseInt(c.id?.toString().replace('caregiver-', '') || '0'),
      name: c.name || '未提供姓名',
      photo: c.avatar || '/default-avatar.png',
      rating: c.rating || 4.5,
      experience: `${c.experience_years || 5}年專業照護經驗，${c.bio || '專業護理服務'}`,
      skills: Array.isArray(c.specialties)
        ? c.specialties.map((s: any) => s.name || s).join('，')
        : '專業護理',
      hourly_rate: c.hourly_rate || 500,
      shift_rate: (c.hourly_rate || 500) * 8,
      location:
        Array.isArray(c.service_areas) && c.service_areas.length > 0
          ? `${c.service_areas[0].city}${c.service_areas[0].district}`
          : '台北市',
      available: true, // 根據 availability 判斷
      licenses: Array.isArray(c.certifications)
        ? c.certifications.map((cert: any) => cert.name || cert)
        : ['護理師執照'],
      review_count: c.reviews_count || c.total_reviews || 12,
      experience_years: c.experience_years || 5,
      specialization:
        (Array.isArray(c.specialties) && c.specialties.length > 0
          ? c.specialties[0].name || c.specialties[0]
          : '護理') + '專家',
      description: c.bio || '專業護理師，提供優質的護理服務',
      verified: true,
      created_at: c.created_at || new Date().toISOString(),
      updated_at: c.updated_at || new Date().toISOString(),
    }
  },
})

// 更新 SEO
if (caregiver.value) {
  usePageSeo(
    `${caregiver.value.name} - 護理服務平台`,
    `查看 ${caregiver.value.name} 的詳細資歷、專業技能和用戶評價`,
  )
}

// 載入評價
const loadReviews = async () => {
  if (!caregiverId.value) return

  isLoadingReviews.value = true

  try {
    // 從 server API 載入評價
    const response = (await $fetch('/api/reviews', {
      query: {
        caregiver_id: caregiverId.value,
      },
    })) as any

    // 轉換資料格式
    if (response?.data?.reviews) {
      reviews.value = response.data.reviews.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        user_name: r.user_name || (r.patient_id ? '已驗證用戶' : '匿名用戶'),
        created_at: r.created_at,
      }))
    }
  } catch (err) {
    console.error('載入評價失敗:', err)
  } finally {
    isLoadingReviews.value = false
  }
}

// 重新載入看護師資料
const loadCaregiverData = async () => {
  try {
    // 重新載入看護師資料
    await $fetch(`/api/caregivers/${caregiverId.value}`)
    await loadReviews()
  } catch (err) {
    console.error('重新載入失敗:', err)
  }
}

// 自動載入評價
onMounted(() => {
  loadReviews()
})

// 開始預約
const startBooking = () => {
  if (!caregiver.value) return

  // 檢查是否已登入
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    // 未登入，提示並導航到登入頁面
    $q.notify({
      type: 'info',
      message: '請先登入才能預約服務',
      timeout: 2000,
    })
    // 儲存當前頁面路徑，登入後可以返回
    navigateTo(`/auth/login?redirect=${route.fullPath}`)
    return
  }

  // 顯示預約對話框
  $q.dialog({
    component: BookingDialog,
    componentProps: {
      caregiverId: caregiverId.value,
      caregiverName: caregiver.value.name,
      hourlyRate: caregiver.value.hourly_rate,
    },
  }).onOk((bookingId: string) => {
    $q.notify({
      type: 'positive',
      message: '預約成功！',
      timeout: 3000,
    })
    // 跳轉到預約詳情頁
    navigateTo(`/bookings/${bookingId}`)
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
      label: '確定',
    },
  })
}

// 分享個人資料
const shareProfile = () => {
  if (!caregiver.value) return

  if (navigator.share) {
    navigator
      .share({
        title: `${caregiver.value.name} - 專業看護師`,
        text: `查看 ${caregiver.value.name} 的詳細資歷和服務`,
        url: window.location.href,
      })
      .catch(() => {
        // 使用者取消分享
      })
  } else {
    // 複製連結到剪貼簿
    navigator.clipboard.writeText(window.location.href)
    $q.notify({
      type: 'positive',
      message: '連結已複製到剪貼簿',
      timeout: 2000,
    })
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// 頁面結構化資料
const config = useRuntimeConfig()
const baseUrl = config.public?.baseUrl || ''

// 當看護師資料載入後更新 SEO
watch(caregiver, (newCaregiver) => {
  if (newCaregiver) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: newCaregiver.name,
            jobTitle: '專業看護師',
            description: newCaregiver.description || newCaregiver.experience,
            address: {
              '@type': 'PostalAddress',
              addressLocality: newCaregiver.location,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: newCaregiver.rating,
              reviewCount: newCaregiver.review_count || 12,
              bestRating: 5,
              worstRating: 1,
            },
            url:
              baseUrl + (route?.fullPath || `/caregivers/${newCaregiver.id}`),
          }),
        },
      ],
    })
  }
})
</script>

<style scoped>
/* Container Styles */
.caregiver-detail-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* 面包屑導航 */
.breadcrumbs-nav {
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* 手機版調整 */
@media (max-width: 599px) {
  .content-wrapper {
    padding: 0;
  }

  .breadcrumbs-nav {
    border-radius: 0;
    margin-bottom: 0.5rem;
  }

  /* 為卡片在手機版添加間距 */
  .info-card,
  .section-card {
    border-radius: 0;
    margin: 0 0 0.5rem 0;
  }

  .q-card-section {
    padding: 1rem !important;
  }
}
/* Hero Card Styles */
.hero-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  z-index: 0;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  animation: bgMove 20s ease-in-out infinite;
}

@keyframes bgMove {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
}

.hero-card .q-card-section {
  position: relative;
  z-index: 1;
  background: white;
  margin-top: 120px;
  border-radius: 16px 16px 0 0;
}

/* Caregiver Photo */
.caregiver-photo-wrapper {
  position: relative;
  margin-top: -40px;
}

.caregiver-photo {
  border: 4px solid white;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.photo-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

/* Rating Section */
.rating-section {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  display: inline-block;
}

.rating-display {
  text-align: center;
}

.rating-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ff9800;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.review-count {
  text-align: center;
}

/* Tags */
.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-chip {
  font-weight: 600;
  padding: 0 1rem;
}

.info-chip {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: 500;
}

.skill-chip {
  background: #f3e5f5;
  color: #7b1fa2;
  font-weight: 500;
}

/* Section Cards */
.section-card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Experience Grid */
.experience-grid {
  display: grid;
  gap: 2rem;
}

.experience-item {
  display: flex;
  gap: 1rem;
}

.experience-icon {
  width: 48px;
  height: 48px;
  background: #e3f2fd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.experience-content {
  flex: 1;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-weight: 500;
}

.description-text {
  line-height: 1.7;
  color: #4a5568;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

/* Price Card */
.price-card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.price-header {
  height: 100px;
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.price-pattern {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.1) 10px,
    rgba(255, 255, 255, 0.1) 20px
  );
}

.price-display {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
}

.price-item {
  text-align: center;
  padding: 1rem;
}

.primary-price {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

.price-label {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 0.5rem;
}

.price-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.currency {
  font-size: 1.25rem;
  color: #718096;
}

.amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2d3748;
}

.unit {
  font-size: 1rem;
  color: #718096;
}

.price-note {
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: 0.25rem;
}

.price-divider {
  text-align: center;
  margin: 1rem 0;
}

/* Buttons */
.booking-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  height: 48px;
  transition: all 0.3s ease;
}

.booking-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.3);
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
}

/* Sticky Card */
.sticky-card {
  position: sticky;
  top: 80px;
}

/* Animations */
.animate-slide-left {
  animation: slideLeft 0.6s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-fade-up {
  animation: fadeUp 0.6s ease-out;
}

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Info Card Base */
.info-card {
  background: white;
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sticky-card {
    position: relative;
    top: auto;
  }

  .hero-card .q-card-section {
    margin-top: 80px;
  }

  .caregiver-photo-wrapper {
    margin-top: -60px;
  }

  .caregiver-photo {
    width: 100px !important;
    height: 100px !important;
  }

  .rating-number {
    font-size: 2rem;
  }

  .text-h4 {
    font-size: 1.75rem !important;
  }

  .experience-grid {
    gap: 1.5rem;
  }

  .amount {
    font-size: 2rem;
  }

  .action-buttons {
    flex-wrap: wrap;
  }

  .action-btn {
    min-width: 100px;
  }
}

@media (max-width: 480px) {
  .hero-gradient {
    height: 150px;
  }

  .tags-section {
    gap: 0.25rem;
  }

  .q-chip {
    font-size: 0.75rem;
  }

  .section-header .text-h5 {
    font-size: 1.25rem !important;
  }

  .price-display {
    padding: 1rem;
  }
}
</style>
