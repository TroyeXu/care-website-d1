<template>
  <q-page class="safety-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <q-icon name="security" size="4rem" color="white" />
        </div>
        <h1 class="hero-title">安全措施</h1>
        <p class="hero-subtitle">我們致力於提供最安全、最可靠的看護服務</p>
      </div>
      <div class="hero-decoration">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <div class="container">
        <div class="safety-grid">
          <div 
            v-for="(safety, index) in safeties" 
            :key="index"
            class="safety-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card-icon">
              <q-icon :name="safety.icon" size="2.5rem" :color="safety.color" />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ safety.title }}</h3>
              <p class="card-description">{{ safety.desc }}</p>
            </div>
            <div class="card-overlay"></div>
          </div>
        </div>

        <!-- Trust Badge -->
        <div class="trust-section">
          <div class="trust-badge">
            <q-icon name="verified" size="2rem" color="positive" />
            <div class="trust-text">
              <h4>值得信賴的服務</h4>
              <p>已服務超過 1000+ 家庭</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('安全措施 - DogFriend', '瞭解我們對看護與客戶的安全保障')

const safeties = [
  { 
    title: '完整背景調查', 
    desc: '所有看護員皆通過身份與犯罪紀錄查核，確保每位服務人員的可信度',
    icon: 'fact_check',
    color: 'primary'
  },
  { 
    title: '定期教育訓練', 
    desc: '持續進修並更新照護技巧，提供最專業的服務品質',
    icon: 'school',
    color: 'secondary'
  },
  { 
    title: '24小時客服支援', 
    desc: '任何突發狀況皆可即時聯繫我們，全天候守護您的安心',
    icon: 'support_agent',
    color: 'accent'
  },
  { 
    title: '嚴格健康監測', 
    desc: '人員須定期健康檢查，確保服務品質與安全性',
    icon: 'health_and_safety',
    color: 'positive'
  },
  { 
    title: '保密個資管理', 
    desc: '遵守個人資料保護法，提供完善資訊安全保障',
    icon: 'privacy_tip',
    color: 'info'
  },
]
</script>

<style scoped>
.safety-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.hero-section {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  color: white;
}

.hero-icon {
  margin-bottom: 1.5rem;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 60%;
  animation-delay: 4s;
}

.content-section {
  background: #f8fafc;
  min-height: 40vh;
  padding: 4rem 0;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.safety-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.safety-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out both;
}

.safety-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(102, 126, 234, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.safety-card:hover .card-overlay {
  opacity: 1;
}

.card-icon {
  margin-bottom: 1.5rem;
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #2d3748;
  text-align: center;
}

.card-description {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  text-align: center;
}

.trust-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.trust-badge {
  display: flex;
  align-items: center;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  animation: slideInUp 0.6s ease-out 0.5s both;
}

.trust-text h4 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-weight: 600;
}

.trust-text p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
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
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
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
  
  .safety-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .safety-card {
    padding: 1.5rem;
  }
  
  .trust-badge {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .floating-circle {
    display: none;
  }
}
</style>
