<template>
  <q-page class="services-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <q-icon name="medical_services" size="4rem" color="white" />
        </div>
        <h1 class="hero-title">服務介紹</h1>
        <p class="hero-subtitle">專業、貼心、全方位的照護服務</p>
      </div>
      <div class="hero-waves">
        <div class="wave wave-1"></div>
        <div class="wave wave-2"></div>
        <div class="wave wave-3"></div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="services-section">
      <div class="container">
        <div class="services-grid">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="service-card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="service-header">
              <div class="service-icon">
                <q-icon :name="service.icon" size="3rem" :color="service.color" />
              </div>
              <div class="service-badge">
                <span>{{ service.badge }}</span>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <q-icon name="check_circle" size="1rem" color="positive" />
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            <div class="service-footer">
              <q-btn 
                flat 
                :color="service.color" 
                label="了解更多"
                icon="arrow_forward"
                class="service-btn"
              />
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section">
          <div class="cta-card">
            <div class="cta-content">
              <h3>需要我們的服務嗎？</h3>
              <p>立即聯繫我們，讓專業團隊為您提供最適合的照護方案</p>
            </div>
            <div class="cta-actions">
              <q-btn 
                color="primary" 
                size="lg"
                to="/support/contact" 
                label="聯繫我們"
                icon="phone"
                class="cta-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRuntimeConfig, useRoute, useHead } from '#imports'
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('服務介紹 - DogFriend', '瞭解居家與醫院看護等多元服務項目')

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

const services = [
  {
    title: '居家照顧',
    description: '提供到府日常照料與生活協助，讓您在熟悉的環境中得到專業照護',
    icon: 'home',
    color: 'primary',
    badge: '熱門',
    features: [
      '24小時專業照護',
      '日常生活協助',
      '藥物管理',
      '健康監測',
      '陪伴聊天'
    ]
  },
  {
    title: '醫院看護',
    description: '協助住院期間的照護需求，提供專業的醫療照護支援',
    icon: 'local_hospital',
    color: 'secondary',
    badge: '專業',
    features: [
      '醫療程序協助',
      '病房照護',
      '家屬溝通',
      '復健協助',
      '營養管理'
    ]
  },
  {
    title: '外籍看護',
    description: '多語溝通、跨文化照護，提供國際化的專業服務',
    icon: 'translate',
    color: 'accent',
    badge: '國際',
    features: [
      '多國語言溝通',
      '文化適應指導',
      '專業技能培訓',
      '法規compliance',
      '長期穩定服務'
    ]
  }
]

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': services.map(service => ({
          '@type': 'Service',
          serviceType: service.title,
          description: service.description,
          provider: { '@type': 'Organization', name: 'DogFriend', url: baseUrl },
          areaServed: 'Taiwan',
        })),
      }),
    },
  ],
})
</script>

<style scoped>
.services-page {
  min-height: 100vh;
  background: #f8fafc;
  padding: 0;
}

.hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  color: white;
}

.hero-icon {
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 100'%3E%3Cpath d='M0,100 C150,50 350,0 600,50 C850,100 1050,50 1200,75 L1200,100 Z' fill='%23f8fafc'/%3E%3C/svg%3E") repeat-x;
  animation: wave 10s linear infinite;
}

.wave-1 {
  opacity: 0.8;
  animation-delay: 0s;
}

.wave-2 {
  opacity: 0.6;
  animation-delay: -2s;
}

.wave-3 {
  opacity: 0.4;
  animation-delay: -4s;
}

.services-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.service-card {
  background: white;
  border-radius: 25px;
  padding: 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  overflow: hidden;
  animation: slideInUp 0.8s ease-out both;
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.service-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.service-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  text-align: center;
  color: white;
}

.service-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.service-icon {
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.service-content {
  padding: 2rem;
}

.service-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #2d3748;
  text-align: center;
}

.service-description {
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
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
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  padding: 0.5rem 0;
  color: #4a5568;
}

.service-footer {
  padding: 0 2rem 2rem 2rem;
  text-align: center;
}

.service-btn {
  width: 100%;
  border-radius: 15px;
  padding: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.service-btn:hover {
  transform: translateY(-2px);
}

.cta-section {
  margin-top: 3rem;
}

.cta-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  animation: slideInUp 0.8s ease-out 0.6s both;
}

.cta-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.cta-content p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
  max-width: 600px;
}

.cta-btn {
  background: white;
  color: #667eea;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1200px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .service-header {
    padding: 1.5rem;
  }
  
  .service-content {
    padding: 1.5rem;
  }
  
  .cta-card {
    padding: 2rem;
    flex-direction: column;
  }
  
  .cta-content h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .service-title {
    font-size: 1.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .hero-waves {
    height: 50px;
  }
}
</style>
