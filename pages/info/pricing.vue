<template>
  <q-page class="pricing-page">
    <div class="hero-section">
      <div class="container">
        <h1 class="hero-title">透明價格</h1>
        <p class="hero-subtitle">選擇最適合您的服務方案，無隱藏費用</p>
      </div>
    </div>

    <div class="pricing-section">
      <div class="container">
        <div class="pricing-cards">
          <div
            v-for="(plan, index) in plans"
            :key="index"
            class="pricing-card"
            :class="{ 'featured': plan.featured }"
          >
            <div class="plan-header">
              <div class="plan-badge" v-if="plan.featured">推薦方案</div>
              <h3 class="plan-title">{{ plan.type }}</h3>
              <div class="plan-price">
                <span class="currency">NT$</span>
                <span class="amount">{{ plan.amount }}</span>
                <span class="period">{{ plan.period }}</span>
              </div>
              <p class="plan-desc">{{ plan.desc }}</p>
            </div>
            
            <div class="plan-features">
              <h4 class="features-title">服務內容</h4>
              <ul class="features-list">
                <li v-for="feature in plan.features" :key="feature">
                  <q-icon name="check_circle" color="positive" />
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <div class="plan-action">
              <q-btn
                :color="plan.featured ? 'primary' : 'outline'"
                :label="'選擇 ' + plan.type"
                size="lg"
                class="full-width"
                :unelevated="plan.featured"
                rounded
              />
            </div>
          </div>
        </div>

        <div class="comparison-section">
          <h2 class="section-title">詳細比較</h2>
          <div class="comparison-table">
            <q-table
              :rows="comparisonData"
              :columns="comparisonColumns"
              flat
              class="modern-table"
              row-key="feature"
            />
          </div>
        </div>

        <div class="faq-section">
          <h2 class="section-title">常見問題</h2>
          <q-list class="faq-list">
            <q-expansion-item
              v-for="faq in faqs"
              :key="faq.question"
              :label="faq.question"
              icon="help_outline"
              class="faq-item"
            >
              <div class="faq-answer">{{ faq.answer }}</div>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'
import { useHead, useRuntimeConfig, useRoute } from '#imports'

usePageSeo('計費方案 - DogFriend', '查看各種護理服務的價格與方案')
const columns = [
  { name: 'type', label: '方案', field: 'type' },
  { name: 'price', label: '價格', field: 'price' },
  { name: 'desc', label: '內容', field: 'desc' },
]

const plans = [
  {
    type: '按時付費',
    amount: '300',
    period: '/時',
    desc: '適合短時間或臨時照護需求',
    featured: false,
    features: [
      '彈性排班時間',
      '即時預約服務',
      '專業護理人員',
      '基础照護服務',
      '線上付款保障'
    ]
  },
  {
    type: '包班制',
    amount: '6,000',
    period: '/天',
    desc: '全天候專業照護，適合長期需求',
    featured: true,
    features: [
      '24小時專人照護',
      '給藥提醒服務',
      '基础生理監測',
      '線上干和回報',
      '緊急狀況處理',
      '無限客服支援'
    ]
  }
]

const comparisonData = [
  { feature: '服務時間', hourly: '彈性排班', daily: '24小時' },
  { feature: '付款方式', hourly: '按時計費', daily: '按日計費' },
  { feature: '取消政策', hourly: '提前2小時', daily: '提前24小時' },
  { feature: '緊急支援', hourly: '工作時間內', daily: '24/7全天候' },
  { feature: '服務報告', hourly: '簡單記錄', daily: '詳細報告' }
]

const comparisonColumns = [
  { name: 'feature', label: '服務項目', field: 'feature', align: 'left', style: 'font-weight: 600;' },
  { name: 'hourly', label: '按時付費', field: 'hourly', align: 'center' },
  { name: 'daily', label: '包班制', field: 'daily', align: 'center' }
]

const faqs = [
  {
    question: '如何選擇適合的方案？',
    answer: '如果您需要短時間或臨時的照護服務，建議選擇按時付費。若需要長期且全天候的照護，包班制會是更經濟的選擇。'
  },
  {
    question: '是否有額外費用？',
    answer: '我們的價格完全透明，不會有任何隱藏費用。但如果需要特殊醫療器材或預約專科服務，可能會有額外費用，會事先告知。'
  },
  {
    question: '可以更改或取消預約嗎？',
    answer: '可以的。按時付費需提前2小時通知，包班制需提前24小時通知。在規定時間內取消不會收取任何費用。'
  },
  {
    question: '付款方式有哪些？',
    answer: '我們支援信用卡、金融卡、線上轉帳和行動付款等多種方式。所有交易都會透過加密連線保障安全。'
  }
]

const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: '計費方案 - DogFriend',
        url: baseUrl + route.fullPath,
        itemListElement: plans.map((p) => ({
          '@type': 'Offer',
          price: p.price.replace('NT$', ''),
          priceCurrency: 'TWD',
          itemOffered: {
            '@type': 'Service',
            name: p.type,
            description: p.desc,
          },
        })),
      }),
    },
  ],
})
</script>

<style scoped>
.pricing-page {
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

.pricing-section {
  padding: 80px 0;
}

.pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
}

.pricing-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pricing-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.pricing-card.featured {
  transform: scale(1.05);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.2);
}

.pricing-card.featured::before {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-10px);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.plan-badge {
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
}

.plan-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.plan-price {
  margin-bottom: 1rem;
}

.currency {
  font-size: 1.2rem;
  color: #6c757d;
  vertical-align: top;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
}

.period {
  font-size: 1rem;
  color: #6c757d;
}

.plan-desc {
  color: #6c757d;
  line-height: 1.6;
}

.plan-features {
  margin-bottom: 2rem;
}

.features-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #6c757d;
}

.features-list .q-icon {
  margin-right: 0.75rem;
  font-size: 1.2rem;
}

.plan-action .q-btn {
  font-weight: 600;
  padding: 12px 0;
  text-transform: none;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #2c3e50;
}

.comparison-section {
  margin-bottom: 5rem;
}

.comparison-table {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.modern-table {
  border: none;
}

.modern-table :deep(.q-table__top) {
  display: none;
}

.modern-table :deep(th) {
  background: #f8f9fa;
  font-weight: 600;
  color: #2c3e50;
  padding: 1rem;
  border: none;
}

.modern-table :deep(td) {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.modern-table :deep(tr:last-child td) {
  border-bottom: none;
}

.faq-section {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.faq-list {
  border: none;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  overflow: hidden;
}

.faq-item:last-child {
  margin-bottom: 0;
}

.faq-item :deep(.q-expansion-item__toggle-icon) {
  color: #667eea;
}

.faq-item :deep(.q-item__section--main) {
  font-weight: 600;
  color: #2c3e50;
}

.faq-answer {
  padding: 1rem 1.5rem;
  color: #6c757d;
  line-height: 1.6;
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .pricing-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pricing-card.featured {
    transform: none;
  }
  
  .pricing-card.featured:hover {
    transform: translateY(-10px);
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .amount {
    font-size: 2.5rem;
  }
}
</style>
