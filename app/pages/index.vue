<template>
  <q-page>
    <!-- Hero Section -->
    <div class="hero-section">
      <q-parallax
        :height="600"
        src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1200"
      >
        <div class="absolute-full flex flex-center">
          <div
            class="hero-content text-white text-center q-pa-md animate-fade-in"
          >
            <div class="hero-badge q-mb-md">
              <q-chip
                color="white"
                text-color="primary"
                icon="verified_user"
                class="text-weight-medium"
              >
                政府認證平台
              </q-chip>
            </div>
            <h1 class="text-h1 text-weight-bold q-mb-md hero-title">
              專業看護媒合平台
            </h1>
            <p class="text-h5 q-mb-xl hero-subtitle">
              為您和家人找到最適合的照護服務
            </p>
            <div class="q-gutter-md hero-actions">
              <q-btn
                label="立即尋找看護"
                color="primary"
                size="xl"
                rounded
                unelevated
                class="hero-btn-primary"
                @click="$router.push('/caregivers')"
              >
                <q-icon name="search" class="q-ml-sm" />
              </q-btn>
              <q-btn
                label="了解更多"
                color="white"
                text-color="primary"
                size="xl"
                rounded
                flat
                class="hero-btn-secondary"
                @click="scrollToSection('services')"
              >
                <q-icon name="expand_more" class="q-ml-sm" />
              </q-btn>
            </div>
            <div class="hero-features q-mt-xl">
              <div class="hero-feature">
                <q-icon name="speed" size="24px" />
                <span>快速媒合</span>
              </div>
              <div class="hero-feature">
                <q-icon name="security" size="24px" />
                <span>安全保障</span>
              </div>
              <div class="hero-feature">
                <q-icon name="support_agent" size="24px" />
                <span>全天候服務</span>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-overlay"></div>
      </q-parallax>
    </div>

    <!-- Quick Stats -->
    <div class="stats-section q-py-xl">
      <div class="container q-py-lg">
        <div class="row q-col-gutter-md text-center">
          <div class="col-12 col-md-3">
            <div class="stat-item animate-scale">
              <div class="stat-icon-wrapper">
                <q-icon name="groups" size="40px" />
              </div>
              <div class="stat-number" data-value="1500">
                <span class="counter">1,500</span>+
              </div>
              <div class="stat-label">專業看護</div>
              <div class="stat-description">經過嚴格認證的專業人員</div>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="stat-item animate-scale" style="animation-delay: 0.1s">
              <div class="stat-icon-wrapper">
                <q-icon name="thumb_up" size="40px" />
              </div>
              <div class="stat-number" data-value="98">
                <span class="counter">98</span>%
              </div>
              <div class="stat-label">客戶滿意度</div>
              <div class="stat-description">服務品質深受肯定</div>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="stat-item animate-scale" style="animation-delay: 0.2s">
              <div class="stat-icon-wrapper">
                <q-icon name="schedule" size="40px" />
              </div>
              <div class="stat-number">24/7</div>
              <div class="stat-label">全天候服務</div>
              <div class="stat-description">隨時為您提供協助</div>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="stat-item animate-scale" style="animation-delay: 0.3s">
              <div class="stat-icon-wrapper">
                <q-icon name="verified_user" size="40px" />
              </div>
              <div class="stat-number" data-value="100">
                <span class="counter">100</span>%
              </div>
              <div class="stat-label">認證看護</div>
              <div class="stat-description">全部持有專業證照</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div id="services" class="services-section q-py-xl bg-grey-1">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">我們的服務</h2>
          <p class="text-h6 text-grey-7">提供全方位的專業照護服務</p>
        </div>

        <div class="row q-col-gutter-lg">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            class="col-12 col-md-4"
          >
            <q-card
              class="service-card full-height animate-fade-up"
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <div class="service-card-header">
                <div class="service-icon-bg">
                  <q-icon :name="service.icon" size="48px" color="white" />
                </div>
              </div>
              <q-card-section class="text-center q-pa-lg">
                <h4 class="text-h5 q-mb-sm text-weight-bold">
                  {{ service.title }}
                </h4>
                <p class="text-body1 text-grey-7 q-mb-lg service-description">
                  {{ service.description }}
                </p>
                <div class="service-features">
                  <div
                    v-for="feature in service.features"
                    :key="feature"
                    class="service-feature"
                  >
                    <q-icon name="check_circle" color="positive" size="20px" />
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions class="q-pa-md">
                <q-btn
                  label="了解更多"
                  color="primary"
                  unelevated
                  rounded
                  class="full-width service-btn"
                  @click="$router.push(service.link)"
                >
                  <q-icon name="arrow_forward" class="q-ml-sm" />
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="how-it-works-section q-py-xl">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">如何使用</h2>
          <p class="text-h6 text-grey-7">簡單三步驟，快速找到合適看護</p>
        </div>

        <q-timeline color="primary" layout="comfortable">
          <q-timeline-entry
            v-for="step in steps"
            :key="step.id"
            :title="step.title"
            :subtitle="step.subtitle"
            :icon="step.icon"
          >
            <div class="text-body1">{{ step.description }}</div>
          </q-timeline-entry>
        </q-timeline>
      </div>
    </div>

    <!-- Featured Caregivers -->
    <div class="featured-section q-py-xl bg-grey-1">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">推薦看護</h2>
          <p class="text-h6 text-grey-7">專業認證的優質看護人員</p>
        </div>

        <div class="row q-col-gutter-md">
          <div
            v-for="(caregiver, index) in featuredCaregivers"
            :key="caregiver.id"
            class="col-12 col-md-6 col-lg-3"
          >
            <q-card
              class="caregiver-card cursor-pointer animate-fade-up"
              :style="`animation-delay: ${index * 0.1}s`"
              @click="$router.push(`/caregivers/caregiver-${caregiver.id}`)"
            >
              <div class="caregiver-image-wrapper">
                <q-img
                  :src="caregiver.photo"
                  :ratio="1"
                  spinner-color="primary"
                  class="caregiver-image"
                >
                  <div class="caregiver-overlay">
                    <q-btn round icon="visibility" color="white" flat />
                  </div>
                </q-img>
                <q-chip
                  v-if="caregiver.available"
                  color="positive"
                  text-color="white"
                  class="caregiver-status"
                  size="sm"
                >
                  可預約
                </q-chip>
              </div>

              <q-card-section class="q-pb-xs">
                <div class="text-h6 text-weight-medium q-mb-xs">
                  {{ caregiver.name }}
                </div>
                <div class="row items-center q-mb-sm">
                  <q-rating
                    v-model="caregiver.rating"
                    readonly
                    size="sm"
                    color="amber"
                  />
                  <span class="text-caption text-grey-6 q-ml-sm"
                    >({{ caregiver.review_count }})</span
                  >
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="caregiver-info">
                  <div class="info-item">
                    <q-icon name="work" size="16px" color="grey-6" />
                    <span>{{ caregiver.experience }}</span>
                  </div>
                  <div class="info-item">
                    <q-icon name="place" size="16px" color="grey-6" />
                    <span>{{ caregiver.location }}</span>
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-section class="row items-center justify-between">
                <div class="price-info">
                  <div class="text-h6 text-primary text-weight-bold">
                    NT$ {{ caregiver.hourly_rate }}
                  </div>
                  <div class="text-caption text-grey-6">每小時</div>
                </div>
                <q-btn
                  round
                  flat
                  icon="arrow_forward"
                  color="primary"
                  size="sm"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>

        <div class="text-center q-mt-lg">
          <q-btn
            label="查看所有看護"
            color="primary"
            size="lg"
            rounded
            @click="$router.push('/caregivers')"
          />
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="testimonials-section q-py-xl">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-weight-bold q-mb-md">客戶評價</h2>
          <p class="text-h6 text-grey-7">聽聽他們怎麼說</p>
        </div>

        <q-carousel
          v-model="testimonialSlide"
          animated
          swipeable
          navigation
          padding
          height="300px"
          class="bg-transparent"
        >
          <q-carousel-slide
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            :name="testimonial.id"
          >
            <div class="row flex-center">
              <div class="col-12 col-md-8 text-center">
                <q-icon
                  name="format_quote"
                  size="48px"
                  color="primary"
                  class="q-mb-md"
                />
                <p class="text-h6 q-mb-md">{{ testimonial.content }}</p>
                <q-avatar size="64px" class="q-mb-sm">
                  <img :src="testimonial.avatar" />
                </q-avatar>
                <div class="text-subtitle1 text-weight-medium">
                  {{ testimonial.name }}
                </div>
                <div class="text-caption text-grey-7">
                  {{ testimonial.role }}
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="cta-section bg-primary text-white q-py-xl">
      <div class="container text-center">
        <h2 class="text-h3 text-weight-bold q-mb-md">準備好開始了嗎？</h2>
        <p class="text-h6 q-mb-lg">立即註冊，找到最適合的照護服務</p>
        <div class="q-gutter-md">
          <q-btn
            label="註冊成為會員"
            color="white"
            text-color="primary"
            size="lg"
            rounded
            @click="$router.push('/auth/register')"
          />
          <q-btn
            label="成為看護夥伴"
            color="white"
            text-color="primary"
            size="lg"
            rounded
            outline
            @click="$router.push('/join')"
          />
        </div>
      </div>
    </div>

    <!-- Quick Contact -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab v-model="fabOpen" icon="chat" direction="up" color="primary">
        <q-fab-action
          label="聯絡我們"
          icon="email"
          color="primary"
          @click="$router.push('/support/contact')"
        />
        <q-fab-action
          label="電話諮詢"
          icon="phone"
          color="positive"
          @click="makePhoneCall"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

// Composables
const router = useRouter()

// Data
const testimonialSlide = ref(1)
const fabOpen = ref(false)

// 使用 server 端資料
const { data: caregiversData } = await useFetch('/api/caregivers', {
  query: {
    limit: 4,
    sortBy: 'rating',
    sortOrder: 'desc',
  },
})

const featuredCaregivers = computed(() => {
  if (!caregiversData.value) return []

  // 轉換資料格式以符合頁面使用
  return caregiversData.value.caregivers.map((caregiver) => ({
    id: parseInt(caregiver.id.replace('caregiver-', '')),
    name: caregiver.name,
    photo: caregiver.avatar,
    rating: caregiver.rating,
    review_count: caregiver.reviews_count,
    experience: `${caregiver.experience_years}年經驗`,
    location: caregiver.service_areas[0],
    hourly_rate: caregiver.hourly_rate,
    available: true, // 根據 availability 判斷
  }))
})

// Services data
const services = [
  {
    id: 1,
    icon: 'home',
    title: '居家照護',
    description: '提供專業的到府看護服務，協助日常生活起居',
    features: ['24小時照護', '專業護理', '生活協助', '陪伴服務'],
    link: '/info/services',
  },
  {
    id: 2,
    icon: 'local_hospital',
    title: '醫院看護',
    description: '醫院住院期間的專業照護，減輕家屬負擔',
    features: ['醫療協助', '復健陪同', '用藥提醒', '緊急應變'],
    link: '/info/services',
  },
  {
    id: 3,
    icon: 'elderly',
    title: '長期照護',
    description: '為需要長期照護的長者提供專業服務',
    features: ['失智照護', '臥床照護', '慢性病管理', '營養管理'],
    link: '/info/services',
  },
]

// Steps data
const steps = [
  {
    id: 1,
    title: '步驟一',
    subtitle: '填寫需求',
    icon: 'edit',
    description: '簡單填寫您的照護需求，包括時間、地點和特殊要求',
  },
  {
    id: 2,
    title: '步驟二',
    subtitle: '媒合看護',
    icon: 'people',
    description: '系統自動媒合適合的看護人員，您也可以主動瀏覽挑選',
  },
  {
    id: 3,
    title: '步驟三',
    subtitle: '開始服務',
    icon: 'verified_user',
    description: '確認看護人員後即可開始服務，全程保障雙方權益',
  },
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    content:
      '透過平台找到了非常專業的看護，照顧我的母親很用心，讓我可以安心工作。',
    name: '陳小姐',
    role: '台北市',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    content: '看護員很有耐心，對待長輩就像家人一樣，服務品質超出預期！',
    name: '林先生',
    role: '新北市',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    content: '平台的媒合速度很快，當天就找到合適的看護，解決了我的燃眉之急。',
    name: '王太太',
    role: '台中市',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
]

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const makePhoneCall = () => {
  window.location.href = 'tel:0800-123-456'
}

// Page meta
useHead({
  title: '專業看護媒合平台 - 找到最適合的照護服務',
  meta: [
    {
      name: 'description',
      content:
        '提供居家照護、醫院看護、長期照護等專業服務，1500+認證看護，98%客戶滿意度',
    },
  ],
})
</script>

<style scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 100%
  );
  pointer-events: none;
}

.hero-content {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  padding: 4rem 3rem;
  border-radius: 2rem;
  max-width: 900px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 3.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
}

.hero-subtitle {
  font-weight: 300;
  opacity: 0.95;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.hero-badge {
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

.hero-btn-primary {
  padding: 0 3rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.3);
  transition: all 0.3s ease;
}

.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(33, 150, 243, 0.4);
}

.hero-btn-secondary {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.2) !important;
  border: 2px solid rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.hero-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3) !important;
  border-color: white;
}

.hero-features {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
}

/* Stats Section Styles */
.stats-section {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  animation: rotate 30s linear infinite;
}

.stat-item {
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-icon-wrapper {
  width: 60px;
  height: 60px;
  margin: 0 auto 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.stat-icon-wrapper::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stat-description {
  font-size: 0.8rem;
  opacity: 0.9;
  line-height: 1.3;
}

/* Service Card Styles */
.service-card {
  border: none;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.service-card:hover .service-icon-bg {
  transform: scale(1.1) rotate(5deg);
}

.service-card-header {
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.service-card:nth-child(2) .service-card-header {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.service-card:nth-child(3) .service-card-header {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.service-icon-bg {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-description {
  min-height: 60px;
  line-height: 1.6;
}

.service-features {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.service-feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.service-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.service-btn:hover {
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

/* Caregiver Card Styles */
.caregiver-card {
  border: none;
  border-radius: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
}

.caregiver-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.caregiver-card:hover .caregiver-image {
  transform: scale(1.05);
}

.caregiver-card:hover .caregiver-overlay {
  opacity: 1;
}

.caregiver-image-wrapper {
  position: relative;
  overflow: hidden;
}

.caregiver-image {
  transition: transform 0.3s ease;
}

.caregiver-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.caregiver-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.caregiver-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.8s ease-out forwards;
}

.animate-scale {
  opacity: 0;
  animation: scaleIn 0.6s ease-out forwards;
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
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    padding: 0 2rem;
    font-size: 0.9rem;
  }

  .hero-features {
    gap: 1rem;
  }

  .hero-feature {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .stat-item {
    padding: 1rem 0.5rem;
  }

  .stat-icon-wrapper {
    width: 50px;
    height: 50px;
    margin-bottom: 0.5rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .stat-label {
    font-size: 0.9rem;
  }

  .stat-description {
    font-size: 0.75rem;
  }

  .service-card-header {
    height: 100px;
  }

  .service-icon-bg {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .hero-btn-primary,
  .hero-btn-secondary {
    width: 100%;
  }

  .stats-section .row {
    gap: 1rem !important;
  }

  .stat-item {
    margin-bottom: 1rem;
  }
}
</style>
