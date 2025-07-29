<template>
  <q-page class="guide-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">使用指南</h1>
        <p class="hero-subtitle">透過簡單四個步驟，輕鬆媒合到專業看護</p>
      </div>
    </div>

    <div class="steps-section">
      <div class="container">
        <div class="steps-timeline">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="step-item"
            :class="{ 'step-active': index === 0 }"
          >
            <div class="step-connector" v-if="index < steps.length - 1"></div>
            
            <div class="step-content">
              <div class="step-icon">
                <q-icon :name="step.icon" />
                <div class="step-number">{{ index + 1 }}</div>
              </div>
              
              <div class="step-info">
                <h3 class="step-title">{{ step.title }}</h3>
                <h4 class="step-subtitle">{{ step.subtitle }}</h4>
                <p class="step-description">{{ step.text }}</p>
                
                <div class="step-details" v-if="step.details">
                  <ul>
                    <li v-for="detail in step.details" :key="detail">
                      <q-icon name="check_circle" /> {{ detail }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="guide-features">
          <div class="feature-grid">
            <div class="feature-card" v-for="feature in features" :key="feature.title">
              <div class="feature-icon">
                <q-icon :name="feature.icon" />
              </div>
              <h4 class="feature-title">{{ feature.title }}</h4>
              <p class="feature-desc">{{ feature.desc }}</p>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <div class="cta-content">
            <h2 class="cta-title">準備好開始了嗎？</h2>
            <p class="cta-subtitle">加入 DogFriend，立即体驗專業的看護媒合服務</p>
            <q-btn
              size="lg"
              color="primary"
              to="/auth/register"
              label="立即開始註冊"
              rounded
              unelevated
              class="cta-button"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('使用指南 - DogFriend', '一步步教你如何使用 DogFriend 平台')
const steps = [
  {
    title: '步驟一',
    subtitle: '註冊帳號',
    icon: 'person_add',
    text: '在 DogFriend 平台上建立您的帳號，填寫基本資料',
    details: ['手機驗證註冊', '完善個人訊息', '設定服務地區']
  },
  {
    title: '步驟二',
    subtitle: '搜尋看護',
    icon: 'search',
    text: '使用我們的智慧匹配系統，找到最適合的看護人員',
    details: ['篩選歷經與評價', '查看服務時間', '比較價格方案']
  },
  {
    title: '步驟三',
    subtitle: '預約服務',
    icon: 'event',
    text: '選擇合適的看護人員後，進行預約並確認排程',
    details: ['選擇服務時間', '確認服務內容', '線上付款保障']
  },
  {
    title: '步驟四',
    subtitle: '開始照護',
    icon: 'check_circle',
    text: '看護人員將於約定時間到府服務，您可透過 App 即時追蹤',
    details: ['即時服務通知', '24小時客服支援', '服務結束後評價']
  },
]

const features = [
  {
    title: '快速匹配',
    desc: '智慧演算法幫您找到最適合的看護',
    icon: 'flash_on'
  },
  {
    title: '安全保障',
    desc: '完整的背景查核與保障機制',
    icon: 'shield'
  },
  {
    title: '透明價格',
    desc: '明確公開的計費方式，無隱藏費用',
    icon: 'account_balance_wallet'
  },
  {
    title: '即時服務',
    desc: '24/7 客服支援，隨時解決您的問題',
    icon: 'support_agent'
  }
]
</script>

<style scoped>
.guide-page {
  min-height: 100vh;
  background: #f8f9fa;
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
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

.steps-section {
  padding: 80px 0;
}

.steps-timeline {
  margin-bottom: 5rem;
}

.step-item {
  position: relative;
  margin-bottom: 4rem;
}

.step-item:last-child {
  margin-bottom: 0;
}

.step-connector {
  position: absolute;
  left: 40px;
  top: 100px;
  width: 2px;
  height: calc(100% + 2rem);
  background: linear-gradient(to bottom, #667eea, #764ba2);
  z-index: 1;
}

.step-content {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.step-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.step-icon {
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-icon .q-icon {
  font-size: 2.5rem;
  color: white;
  z-index: 2;
}

.step-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: #ff6b6b;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-subtitle {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.step-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.step-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.step-details li {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.step-details .q-icon {
  color: #28a745;
  margin-right: 8px;
  font-size: 1rem;
}

.guide-features {
  margin-bottom: 5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.feature-icon .q-icon {
  font-size: 1.8rem;
  color: white;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.feature-desc {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #6c757d;
}

.cta-section {
  text-align: center;
}

.cta-content {
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.cta-subtitle {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: none;
  min-width: 200px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .step-content {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1.5rem;
  }
  
  .step-connector {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-content {
    padding: 2rem 1.5rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
}
</style>
