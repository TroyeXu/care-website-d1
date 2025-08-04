<template>
  <q-page class="about-page">
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">關於我們</h1>
          <p class="hero-subtitle">
            DogFriend 成立於 2023 年，致力於打造專業又友善的照護媒合平台。
            我們秉持「以人為本」的心態，為家庭與照護人員提供最適宜的解決方案。
          </p>
        </div>
      </div>
    </div>

    <div class="content-section">
      <div class="container">
        <div class="missions-section q-mb-xl">
          <h2 class="section-title">願景與使命</h2>
          <div class="missions-grid">
            <div v-for="m in missions" :key="m.title" class="mission-card">
              <div class="mission-icon">
                <q-icon :name="m.icon" />
              </div>
              <h3 class="mission-title">{{ m.title }}</h3>
              <p class="mission-desc">{{ m.desc }}</p>
            </div>
          </div>
        </div>

        <div class="team-section">
          <q-card class="team-card" flat>
            <q-card-section class="text-center">
              <h2 class="section-title">專業團隊</h2>
              <p class="team-description">
                我們的團隊由資深護理師、居家照護專家與人資顧問等專業人士組成，
                為你提供 24 小時的指導與諮詢。
              </p>
              <div class="team-stats">
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">專業護理師</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">24/7</div>
                  <div class="stat-label">客服支援</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">1000+</div>
                  <div class="stat-label">成功媒合</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- 服務介紹區塊 -->
        <div class="services-section q-mb-xl">
          <h2 class="section-title">我們的服務</h2>
          <div class="services-grid">
            <div
              v-for="(service, index) in services"
              :key="index"
              class="service-card"
            >
              <div class="service-icon">
                <q-icon :name="service.icon" />
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <q-icon name="check_circle" size="1rem" color="positive" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 平台優勢區塊 -->
        <div class="advantages-section q-mb-xl">
          <h2 class="section-title">平台優勢</h2>
          <div class="advantages-grid">
            <div
              v-for="(adv, i) in advantages"
              :key="i"
              class="advantage-card"
            >
              <div class="advantage-icon">
                <q-icon :name="adv.icon" />
              </div>
              <h3 class="advantage-title">{{ adv.title }}</h3>
              <p class="advantage-desc">{{ adv.desc }}</p>
            </div>
          </div>

          <!-- 安全保障區域 -->
          <div class="safety-section">
            <h3 class="subsection-title">完善的安全保障</h3>
            <div class="safety-grid">
              <div
                v-for="(safety, index) in safeties"
                :key="index"
                class="safety-item"
              >
                <q-icon :name="safety.icon" size="2rem" :color="safety.color" />
                <h4>{{ safety.title }}</h4>
                <p>{{ safety.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-section text-center">
          <q-btn
            size="lg"
            color="primary"
            to="/caregivers"
            label="立即尋找看護師"
            rounded
            unelevated
            class="cta-button"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'
import { useRuntimeConfig, useRoute, useHead } from '#imports'

usePageSeo(
  '關於我們 - DogFriend 專業看護媒合平台',
  '認識 DogFriend 團隊與我們的使命',
)

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: '關於我們 - DogFriend',
        url: baseUrl + route.fullPath,
        description: '認識 DogFriend 團隊與我們的使命',
      }),
    },
  ],
})
const missions = [
  {
    title: '以人為本',
    desc: '以使用者需求為首要考量',
    icon: 'emoji_people',
  },
  {
    title: '專業可信',
    desc: '嚴格審核照護質量',
    icon: 'verified_user',
  },
  {
    title: '創新便利',
    desc: '使用科技提升媒合效率',
    icon: 'lightbulb',
  },
]

// 服務項目資料
const services = [
  {
    title: '居家照顧',
    description: '提供到府日常照料與生活協助，讓您在熟悉的環境中得到專業照護',
    icon: 'home',
    features: [
      '24小時專業照護',
      '日常生活協助',
      '藥物管理',
      '健康監測',
    ],
  },
  {
    title: '醫院看護',
    description: '協助住院期間的照護需求，提供專業的醫療照護支援',
    icon: 'local_hospital',
    features: [
      '醫療程序協助',
      '病房照護',
      '家屬溝通',
      '復健協助',
    ],
  },
  {
    title: '外籍看護',
    description: '多語溝通、跨文化照護，提供國際化的專業服務',
    icon: 'translate',
    features: [
      '多國語言溝通',
      '文化適應指導',
      '專業技能培訓',
      '長期穩定服務',
    ],
  },
]

// 平台優勢資料
const advantages = [
  { title: '快速媒合', desc: '透過演算法即時找到合適看護', icon: 'bolt' },
  { title: '專業審核', desc: '嚴格把關每位看護的資格', icon: 'verified' },
  { title: '彈性排班', desc: '依照需求安排看護時段', icon: 'schedule' },
  { title: '完善保障', desc: '客服與意外保險讓您更放心', icon: 'security' },
]

// 安全保障資料
const safeties = [
  {
    title: '完整背景調查',
    desc: '所有看護員皆通過身份與犯罪紀錄查核',
    icon: 'fact_check',
    color: 'primary',
  },
  {
    title: '定期教育訓練',
    desc: '持續進修並更新照護技巧',
    icon: 'school',
    color: 'secondary',
  },
  {
    title: '24小時客服支援',
    desc: '任何突發狀況皆可即時聯繫',
    icon: 'support_agent',
    color: 'accent',
  },
  {
    title: '嚴格健康監測',
    desc: '人員須定期健康檢查',
    icon: 'health_and_safety',
    color: 'positive',
  },
]
</script>

<style scoped>
.about-page {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.95;
}

.content-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.missions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.mission-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.mission-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.mission-icon .q-icon {
  font-size: 2.5rem;
  color: white;
}

.mission-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.mission-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
}

.team-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.team-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.team-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #6c757d;
  font-weight: 500;
}

.cta-section {
  margin-top: 4rem;
}

.cta-button {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: none;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .missions-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .mission-card {
    padding: 1.5rem;
  }

  .team-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stat-number {
    font-size: 2.5rem;
  }
}

/* 服務介紹區塊樣式 */
.services-section {
  margin-top: 4rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.service-icon .q-icon {
  font-size: 2rem;
  color: white;
}

.service-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
  text-align: center;
}

.service-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1.5rem;
  text-align: center;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #4a5568;
}

/* 平台優勢區塊樣式 */
.advantages-section {
  margin-top: 4rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.advantage-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-top: 4px solid transparent;
  background-image: linear-gradient(white, white),
    linear-gradient(135deg, #667eea, #764ba2);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.advantage-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.advantage-icon .q-icon {
  font-size: 2rem;
  color: white;
}

.advantage-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.advantage-desc {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #6c757d;
}

/* 安全保障區域樣式 */
.safety-section {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 16px;
}

.subsection-title {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
}

.safety-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.safety-item {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.safety-item:hover {
  transform: translateY(-5px);
}

.safety-item h4 {
  margin: 1rem 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.safety-item p {
  font-size: 0.9rem;
  color: #6c757d;
  line-height: 1.6;
}
</style>
