<template>
  <q-page class="subsidy-page">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-icon">
          <q-icon name="account_balance" size="4rem" color="white" />
        </div>
        <h1 class="hero-title">補助與保險資訊</h1>
        <p class="hero-subtitle">為您詳細介紹政府與機構提供的照護補助方案</p>
      </div>
      <div class="hero-pattern">
        <div class="pattern-dot" v-for="i in 50" :key="i"></div>
      </div>
    </div>

    <!-- Subsidy Section -->
    <div class="subsidy-section">
      <div class="container">
        <!-- Benefits Overview -->
        <div class="benefits-overview">
          <div class="overview-card">
            <div class="overview-icon">
              <q-icon name="savings" size="3rem" color="primary" />
            </div>
            <div class="overview-content">
              <h3>費用減輕</h3>
              <p>透過政府補助與保險方案，大幅降低照護費用負擔</p>
            </div>
          </div>
          <div class="overview-card">
            <div class="overview-icon">
              <q-icon name="verified_user" size="3rem" color="secondary" />
            </div>
            <div class="overview-content">
              <h3>安心保障</h3>
              <p>完整的保險涵蓋範圍，讓您安心享受專業照護服務</p>
            </div>
          </div>
          <div class="overview-card">
            <div class="overview-icon">
              <q-icon name="support" size="3rem" color="positive" />
            </div>
            <div class="overview-content">
              <h3>專業諮詢</h3>
              <p>提供免費諮詢服務，協助您申請最適合的補助方案</p>
            </div>
          </div>
        </div>

        <!-- Subsidy Cards -->
        <div class="subsidy-grid">
          <div 
            v-for="(item, index) in subsidies" 
            :key="index"
            class="subsidy-card"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="card-header">
              <div class="card-icon">
                <q-icon :name="item.icon" size="2.5rem" :color="item.color" />
              </div>
              <div class="card-badge">
                <span>{{ item.badge }}</span>
              </div>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ item.name }}</h3>
              <p class="card-description">{{ item.desc }}</p>
              
              <div class="subsidy-details">
                <div class="detail-item">
                  <q-icon name="group" size="1.2rem" color="primary" />
                  <span>適用對象：{{ item.target }}</span>
                </div>
                <div class="detail-item">
                  <q-icon name="attach_money" size="1.2rem" color="positive" />
                  <span>補助額度：{{ item.amount }}</span>
                </div>
                <div class="detail-item">
                  <q-icon name="schedule" size="1.2rem" color="accent" />
                  <span>申請時間：{{ item.duration }}</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <q-btn 
                :color="item.color"
                :href="item.url"
                target="_blank"
                icon="open_in_new"
                label="立即申請"
                class="subsidy-btn"
                size="md"
              />
              <q-btn 
                flat
                color="grey-7"
                icon="info"
                label="詳細資訊"
                class="info-btn"
                size="md"
              />
            </div>
          </div>
        </div>

        <!-- Help Section -->
        <div class="help-section">
          <div class="help-card">
            <div class="help-content">
              <q-icon name="help_center" size="3rem" color="primary" />
              <h3>需要申請協助嗎？</h3>
              <p>我們的專業團隊將協助您完成補助申請流程，確保您獲得最大的補助金額</p>
              <div class="help-features">
                <div class="feature-item">
                  <q-icon name="check_circle" color="positive" />
                  <span>免費申請諮詢</span>
                </div>
                <div class="feature-item">
                  <q-icon name="check_circle" color="positive" />
                  <span>文件代辦服務</span>
                </div>
                <div class="feature-item">
                  <q-icon name="check_circle" color="positive" />
                  <span>定期追蹤進度</span>
                </div>
              </div>
            </div>
            <div class="help-actions">
              <q-btn 
                color="primary" 
                size="lg"
                icon="phone"
                label="免費諮詢"
                class="help-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('補助資訊 - DogFriend', '了解政府與機構提供的照護補助')

const subsidies = [
  {
    name: '長照補助',
    desc: '政府提供的長期照顧補助方案，依照失能等級給予費用補助，讓家庭減輕經濟負擔。',
    url: 'https://example.com/long-term-care',
    icon: 'elderly',
    color: 'primary',
    badge: '政府補助',
    target: '失能等級2級以上長者',
    amount: '每月最高 NT$36,180',
    duration: '全年開放申請'
  },
  {
    name: '看護保險方案',
    desc: '民間保險公司推出的照護險，提供完整的保險保障，減輕長期看護費用負擔。',
    url: 'https://example.com/caregiver-insurance',
    icon: 'health_and_safety',
    color: 'secondary',
    badge: '保險方案',
    target: '20-70歲健康成人',
    amount: '每日最高 NT$3,000',
    duration: '線上申請24小時受理'
  },
  {
    name: '身心障礙補助',
    desc: '針對身心障礙者提供的照護補助，包含居家服務、輔具購買等多項補助。',
    url: 'https://example.com/disability-subsidy',
    icon: 'accessible',
    color: 'accent',
    badge: '特殊補助',
    target: '持有身心障礙證明者',
    amount: '每月最高 NT$25,000',
    duration: '每季開放申請'
  },
  {
    name: '低收入戶專案',
    desc: '專為低收入戶家庭設計的照護補助專案，提供更高額度的補助與免費服務。',
    url: 'https://example.com/low-income-subsidy',
    icon: 'volunteer_activism',
    color: 'positive',
    badge: '專案補助',
    target: '低收入戶家庭',
    amount: '全額補助',
    duration: '隨時可申請'
  }
]
</script>

<style scoped>
.subsidy-page {
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
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  overflow: hidden;
}

.hero-content {
  text-align: center;
  z-index: 2;
  color: white;
}

.hero-icon {
  margin-bottom: 1.5rem;
  animation: rotateY 2s infinite;
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

.hero-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.pattern-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

.pattern-dot:nth-child(odd) {
  animation-delay: 0s;
}

.pattern-dot:nth-child(even) {
  animation-delay: 1.5s;
}

.subsidy-section {
  padding: 5rem 0;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.benefits-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.overview-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  animation: slideInUp 0.6s ease-out both;
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.overview-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #2d3748;
}

.overview-content p {
  margin: 0;
  color: #64748b;
  line-height: 1.5;
}

.subsidy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

.subsidy-card {
  background: white;
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  animation: slideInUp 0.8s ease-out both;
}

.subsidy-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.card-header {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  text-align: center;
  color: white;
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card-icon {
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

.card-body {
  padding: 2rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #2d3748;
  text-align: center;
}

.card-description {
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  text-align: center;
}

.subsidy-details {
  background: #f7fafc;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #4a5568;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.card-footer {
  padding: 0 2rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.subsidy-btn {
  border-radius: 15px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  flex: 1;
}

.info-btn {
  border-radius: 15px;
  padding: 0.8rem 1.5rem;
  flex: 1;
}

.help-section {
  margin-top: 3rem;
}

.help-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 25px;
  padding: 3rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 3rem;
  animation: slideInUp 0.8s ease-out 1s both;
}

.help-content {
  flex: 1;
  text-align: center;
}

.help-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0;
}

.help-content p {
  font-size: 1.1rem;
  margin: 0 0 2rem 0;
  opacity: 0.9;
  line-height: 1.6;
}

.help-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.help-actions {
  flex-shrink: 0;
}

.help-btn {
  background: white;
  color: #667eea;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
}

.help-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Generate random positions for pattern dots */
.pattern-dot:nth-child(1) { top: 10%; left: 15%; }
.pattern-dot:nth-child(2) { top: 20%; left: 80%; }
.pattern-dot:nth-child(3) { top: 30%; left: 25%; }
.pattern-dot:nth-child(4) { top: 40%; left: 70%; }
.pattern-dot:nth-child(5) { top: 50%; left: 10%; }
.pattern-dot:nth-child(6) { top: 60%; left: 90%; }
.pattern-dot:nth-child(7) { top: 70%; left: 35%; }
.pattern-dot:nth-child(8) { top: 80%; left: 60%; }

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

@keyframes rotateY {
  0%, 100% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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
  
  .benefits-overview {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .overview-card {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
  }
  
  .subsidy-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .card-header {
    padding: 1.5rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .help-card {
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
  }
  
  .help-features {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-footer {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .subsidy-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pattern-dot {
    display: none;
  }
  
  .help-content h3 {
    font-size: 1.5rem;
  }
}
</style>
