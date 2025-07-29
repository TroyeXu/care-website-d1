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
            <div
              v-for="m in missions"
              :key="m.title"
              class="mission-card"
            >
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

        <div class="cta-section text-center">
          <q-btn
            size="lg"
            color="primary"
            to="/auth/register"
            label="立即體驗服務"
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
      children: JSON.stringify({
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
</style>
