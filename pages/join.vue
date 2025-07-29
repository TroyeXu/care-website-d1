<template>
  <q-page class="join-page">
    <!-- 英雄區域 -->
    <section class="hero-section bg-gradient-primary text-white">
      <div class="container q-pa-xl">
        <div class="row items-center q-gutter-lg">
          <div class="col-12 col-md-6">
            <div class="hero-content">
              <div class="hero-badge q-mb-md">
                <q-chip
                  color="accent"
                  text-color="dark"
                  icon="star"
                  label="專業認證平台"
                  size="md"
                />
              </div>
              <h1 class="hero-title text-weight-bold q-mb-md">
                成為專業照護員
                <br />
                <span class="text-accent glow-text">實現照護夢想</span>
              </h1>
              <p class="hero-subtitle text-weight-light q-mb-xl opacity-90">
                發揮專業照護能力，提供溫暖服務，獲得穩定收入與成長機會
              </p>
              <div class="cta-buttons row q-gutter-md">
                <q-btn
                  size="lg"
                  color="accent"
                  text-color="dark"
                  label="立即申請"
                  icon="arrow_forward"
                  unelevated
                  @click="scrollToApplication"
                  class="cta-primary q-px-xl"
                />
                <q-btn
                  size="lg"
                  outline
                  color="white"
                  label="了解更多"
                  icon="info"
                  @click="scrollToBenefits"
                  class="cta-secondary q-px-xl"
                />
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="hero-image text-center">
              <div class="hero-icon-wrapper">
                <q-icon
                  name="medical_services"
                  size="280px"
                  color="white"
                  class="hero-icon"
                />
                <div class="floating-elements">
                  <div class="floating-icon icon-1">
                    <q-icon name="favorite" size="24px" color="accent" />
                  </div>
                  <div class="floating-icon icon-2">
                    <q-icon name="health_and_safety" size="28px" color="white" />
                  </div>
                  <div class="floating-icon icon-3">
                    <q-icon name="groups" size="26px" color="accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 統計數據 -->
    <section class="stats-section q-py-xl bg-white">
      <div class="container">
        <div class="stats-grid row q-gutter-md justify-center">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="col-12 col-sm-6 col-md-3"
          >
            <q-card 
              flat 
              class="stat-card text-center full-height" 
              :class="`stat-card-${index + 1}`"
            >
              <q-card-section class="q-pb-none">
                <div class="stat-icon-wrapper q-mb-md">
                  <q-icon
                    :name="stat.icon"
                    size="56px"
                    :color="stat.color"
                    class="stat-icon"
                  />
                </div>
                <div class="stat-value text-weight-bold text-primary q-mb-xs">
                  {{ stat.value }}
                </div>
                <div class="stat-label text-body1 text-grey-7">{{ stat.label }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- 加入我們的優勢 -->
    <section ref="benefitsSection" class="benefits-section q-py-xl bg-grey-1">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <div class="section-badge q-mb-md">
            <q-chip
              color="primary"
              text-color="white"
              icon="verified"
              label="專業優勢"
              size="md"
            />
          </div>
          <h2 class="section-title text-weight-bold text-primary q-mb-md">
            為什麼選擇我們？
          </h2>
          <p class="section-subtitle text-grey-7 max-width-md">
            我們提供完整的支援體系，讓您在照護路上不孤單
          </p>
        </div>

        <div class="benefits-grid row q-gutter-md">
          <div
            v-for="(benefit, index) in benefits"
            :key="benefit.title"
            class="col-12 col-lg-4 col-md-6"
          >
            <q-card 
              class="benefit-card full-height" 
              :class="`benefit-card-${index + 1}`"
            >
              <q-card-section class="text-center q-pa-lg">
                <div class="benefit-icon-wrapper q-mb-lg">
                  <q-avatar size="88px" :color="benefit.color" text-color="white" class="benefit-avatar">
                    <q-icon :name="benefit.icon" size="44px" />
                  </q-avatar>
                </div>
                <h3 class="benefit-title text-weight-bold q-mb-md">
                  {{ benefit.title }}
                </h3>
                <p class="benefit-description text-body1 text-grey-7">{{ benefit.description }}</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- 申請流程 -->
    <section ref="applicationSection" class="process-section q-py-xl bg-white">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h4 text-weight-bold text-primary q-mb-md">
            簡單四步驟，開始您的照護之旅
          </h2>
        </div>

        <q-stepper
          v-model="currentStep"
          color="primary"
          animated
          flat
          bordered
          class="process-stepper"
        >
          <q-step
            v-for="(step, index) in processSteps"
            :key="index"
            :name="index + 1"
            :title="step.title"
            :icon="step.icon"
            :done="currentStep > index + 1"
          >
            <div class="row q-gutter-lg items-center">
              <div class="col-12 col-md-8">
                <h4 class="text-h6 text-weight-medium q-mb-md">
                  {{ step.title }}
                </h4>
                <p class="text-body1 text-grey-7 q-mb-md">
                  {{ step.description }}
                </p>
                <q-list dense>
                  <q-item
                    v-for="requirement in step.requirements"
                    :key="requirement"
                  >
                    <q-item-section avatar>
                      <q-icon name="check_circle" color="positive" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ requirement }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-12 col-md-4 text-center">
                <q-icon
                  :name="step.icon"
                  size="120px"
                  :color="step.color"
                  class="opacity-60"
                />
              </div>
            </div>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  v-if="index < processSteps.length - 1"
                  @click="currentStep = index + 2"
                  color="primary"
                  label="下一步"
                />
                <q-btn
                  v-if="index > 0"
                  flat
                  color="primary"
                  @click="currentStep = index"
                  label="上一步"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-step>
        </q-stepper>
      </div>
    </section>

    <!-- 薪資福利 -->
    <section class="salary-section q-py-xl bg-grey-1">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h4 text-weight-bold text-primary q-mb-md">
            具競爭力的薪資福利
          </h2>
          <p class="text-h6 text-grey-7">
            我們重視每位照護員的付出，提供合理的報酬與完善的保障
          </p>
        </div>

        <div class="row q-gutter-md">
          <div
            v-for="salaryInfo in salaryPackages"
            :key="salaryInfo.type"
            class="col-12 col-md-4"
          >
            <q-card class="salary-card full-height" :class="salaryInfo.featured ? 'featured' : ''">
              <q-card-section class="text-center">
                <q-badge
                  v-if="salaryInfo.featured"
                  color="accent"
                  label="推薦"
                  class="q-mb-md"
                />
                <h3 class="text-h5 text-weight-bold q-mb-sm">
                  {{ salaryInfo.type }}
                </h3>
                <div class="salary-amount q-mb-md">
                  <span class="text-h4 text-weight-bold text-primary">
                    ${{ salaryInfo.hourlyRate }}
                  </span>
                  <span class="text-body1 text-grey-6">/小時</span>
                </div>
                <div class="text-body2 text-grey-7 q-mb-md">
                  月收入範圍：${{ salaryInfo.monthlyRange }}
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-list dense>
                  <q-item v-for="benefit in salaryInfo.benefits" :key="benefit">
                    <q-item-section avatar>
                      <q-icon name="check" color="positive" size="sm" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-body2">{{ benefit }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- 常見問題 -->
    <section class="faq-section q-py-xl bg-white">
      <div class="container">
        <div class="text-center q-mb-xl">
          <h2 class="text-h4 text-weight-bold text-primary q-mb-md">
            常見問題
          </h2>
          <p class="text-h6 text-grey-7">
            解答您在申請過程中可能遇到的疑問
          </p>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-expansion-item
              v-for="faq in faqs"
              :key="faq.question"
              :label="faq.question"
              icon="help"
              class="faq-item q-mb-sm"
            >
              <div class="q-pa-md text-body1 text-grey-7">
                {{ faq.answer }}
              </div>
            </q-expansion-item>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA 區域 -->
    <section class="cta-section text-white q-py-xl">
      <div class="container text-center">
        <div class="cta-content">
          <div class="cta-badge q-mb-md">
            <q-chip
              color="accent"
              text-color="dark"
              icon="rocket_launch"
              label="現在加入"
              size="lg"
            />
          </div>
          <h2 class="cta-title text-weight-bold q-mb-md">
            準備好開始您的照護事業了嗎？
          </h2>
          <p class="cta-subtitle text-weight-light q-mb-xl opacity-90">
            立即加入我們的團隊，成為專業照護員，為社會貢獻您的愛心與專業
          </p>
          <div class="cta-buttons row justify-center q-gutter-md">
            <q-btn
              size="xl"
              color="accent"
              text-color="dark"
              label="開始申請"
              icon="person_add"
              unelevated
              to="/auth/register"
              class="cta-primary-btn q-px-xl"
            />
            <q-btn
              size="xl"
              outline
              color="white"
              label="聯絡我們"
              icon="contact_support"
              @click="showContactDialog = true"
              class="cta-secondary-btn q-px-xl"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 聯絡對話框 -->
    <q-dialog v-model="showContactDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">聯絡我們</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="phone" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>客服專線</q-item-label>
                <q-item-label caption>0800-123-456</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="email" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>電子郵件</q-item-label>
                <q-item-label caption>recruit@careplatform.com</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="schedule" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>服務時間</q-item-label>
                <q-item-label caption>週一至週五 9:00-18:00</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" @click="showContactDialog = false">
            關閉
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import usePageSeo from '~/composables/usePageSeo'

// SEO
usePageSeo(
  '成為照護員 - 護理服務平台',
  '加入專業照護團隊，發揮您的照護專長，獲得穩定收入與職業成長機會',
)

// 響應式資料
const currentStep = ref(1)
const showContactDialog = ref(false)

// 統計數據
const stats = [
  {
    icon: 'people',
    value: '500+',
    label: '活躍照護員',
    color: 'primary',
  },
  {
    icon: 'star',
    value: '4.8',
    label: '平均評分',
    color: 'amber',
  },
  {
    icon: 'schedule',
    value: '10000+',
    label: '服務時數',
    color: 'green',
  },
  {
    icon: 'favorite',
    value: '98%',
    label: '滿意度',
    color: 'red',
  },
]

// 優勢介紹
const benefits = [
  {
    icon: 'payments',
    title: '彈性收入',
    description: '彈性安排工作時間，依服務時數獲得合理報酬，月收入可達 50,000 元以上',
    color: 'green',
  },
  {
    icon: 'school',
    title: '專業培訓',
    description: '完整線上培訓課程，涵蓋照護技能、溝通技巧與緊急處理專業知識',
    color: 'blue',
  },
  {
    icon: 'security',
    title: '保險保障',
    description: '完善工作保險與責任險保障，讓您安心專注於照護服務品質',
    color: 'purple',
  },
  {
    icon: 'support_agent',
    title: '24小時支援',
    description: '專業客服團隊 24 小時待命，即時協助處理工作中的各種狀況',
    color: 'orange',
  },
  {
    icon: 'trending_up',
    title: '職涯發展',
    description: '定期績效評估，提供晉升機會與薪資調整，助您職涯穩步發展',
    color: 'indigo',
  },
  {
    icon: 'favorite',
    title: '溫暖社群',
    description: '加入溫暖照護大家庭，與志同道合的專業夥伴攜手成長',
    color: 'pink',
  },
]

// 申請流程
const processSteps = [
  {
    title: '線上註冊',
    icon: 'person_add',
    color: 'primary',
    description: '填寫基本資料並建立個人檔案，僅需 10 分鐘快速完成',
    requirements: [
      '有效身分證件',
      '聯絡電話與電子郵件',
      '緊急聯絡人資訊',
      '工作經驗說明',
    ],
  },
  {
    title: '資格審核',
    icon: 'assignment_turned_in',
    color: 'blue',
    description: '提交證照與經驗證明，3-5 個工作日內完成專業審核',
    requirements: [
      '照護相關證照（護理師、照服員等）',
      '身分證明文件',
      '無犯罪紀錄證明',
      '健康檢查報告',
    ],
  },
  {
    title: '專業培訓',
    icon: 'school',
    color: 'green',
    description: '參與線上培訓課程，掌握平台操作與專業照護技能',
    requirements: [
      '完成基礎照護課程',
      '通過平台操作測驗',
      '了解服務標準流程',
      '學習溝通技巧',
    ],
  },
  {
    title: '開始服務',
    icon: 'work',
    color: 'orange',
    description: '完成準備工作後，即可接受服務案件，開啟照護職涯',
    requirements: [
      '設定服務時間和區域',
      '完善個人檔案資訊',
      '準備服務所需用品',
      '熟悉緊急聯絡流程',
    ],
  },
]

// 薪資方案
const salaryPackages = [
  {
    type: '居家照護',
    hourlyRate: '300-500',
    monthlyRange: '30,000-60,000',
    benefits: [
      '彈性工作時間',
      '交通費補助',
      '年終獎金',
      '績效獎勵',
    ],
    featured: false,
  },
  {
    type: '專業護理',
    hourlyRate: '500-800',
    monthlyRange: '50,000-80,000',
    benefits: [
      '護理師專業費',
      '技術津貼',
      '教育訓練補助',
      '職業發展機會',
    ],
    featured: true,
  },
  {
    type: '長期陪伴',
    hourlyRate: '250-400',
    monthlyRange: '25,000-50,000',
    benefits: [
      '穩定案源',
      '情感支持津貼',
      '節日加給',
      '服務認證',
    ],
    featured: false,
  },
]

// 常見問題
const faqs = [
  {
    question: '需要什麼資格才能申請？',
    answer: '申請條件：年滿 20 歲、持有照護證照（護理師或照服員）、無犯罪紀錄、身心健康。歡迎有愛心耐心的專業人士加入。',
  },
  {
    question: '工作時間如何安排？',
    answer: '提供彈性工作安排，可自由設定服務時段。平台會推薦合適案件，您可自主選擇是否接受。',
  },
  {
    question: '薪資如何計算和發放？',
    answer: '薪資按服務時數計算，每月底結算。透過銀行轉帳發放，通常月初 5 日前到帳，另有績效與年終獎金。',
  },
  {
    question: '如果遇到緊急狀況怎麼辦？',
    answer: '提供 24 小時緊急支援熱線，遇緊急狀況可立即聯絡。平台備有完整處理流程指引與必要支援。',
  },
  {
    question: '是否有提供保險？',
    answer: '為所有照護員提供工作保險與責任險，保障工作安全。詳細保險內容於簽約時詳細說明。',
  },
  {
    question: '培訓課程包含哪些內容？',
    answer: '培訓涵蓋：基礎照護技能、平台操作、溝通技巧、緊急處理、法律規範。採線上授課，可彈性安排學習時間。',
  },
]

// 滾動到指定區域
const benefitsSection = ref()
const applicationSection = ref()

const scrollToBenefits = () => {
  benefitsSection.value?.$el?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToApplication = () => {
  applicationSection.value?.$el?.scrollIntoView({ behavior: 'smooth' })
}

// 頁面標題
definePageMeta({
  title: '成為照護員',
  layout: 'default',
})
</script>

<style scoped>
.join-page {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/* 英雄區域 */
.hero-section {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  min-height: 75vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.08"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.12"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
  pointer-events: none;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
  position: relative;
  z-index: 2;
}

.hero-badge {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.glow-text {
  text-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.6;
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-buttons {
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-primary {
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
}

.cta-secondary {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.cta-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.1);
}

.hero-image {
  animation: fadeInRight 1s ease-out 0.5s both;
  position: relative;
}

.hero-icon-wrapper {
  position: relative;
  display: inline-block;
}

.hero-icon {
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-icon {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.icon-1 {
  top: 15%;
  right: 20%;
  animation: float 2s ease-in-out infinite;
}

.icon-2 {
  bottom: 30%;
  left: 10%;
  animation: float 2.5s ease-in-out infinite 0.5s;
}

.icon-3 {
  top: 60%;
  right: 5%;
  animation: float 3s ease-in-out infinite 1s;
}

/* 統計數據 */
.stats-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.stats-grid {
  position: relative;
  z-index: 2;
}

.stat-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(25, 118, 210, 0.1);
  overflow: hidden;
  position: relative;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1976d2, #42a5f5, #ffc107, #4caf50);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 40px rgba(25, 118, 210, 0.15);
}

.stat-icon-wrapper {
  position: relative;
}

.stat-icon {
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
}

.stat-value {
  font-size: clamp(2rem, 4vw, 2.8rem);
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.stat-card:hover .stat-value {
  transform: scale(1.05);
}

.stat-label {
  font-weight: 500;
  transition: color 0.3s ease;
}

.stat-card:hover .stat-label {
  color: #1976d2;
}

.stat-card-1 {
  animation: slideInUp 0.6s ease-out 0.1s both;
}

.stat-card-2 {
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.stat-card-3 {
  animation: slideInUp 0.6s ease-out 0.3s both;
}

.stat-card-4 {
  animation: slideInUp 0.6s ease-out 0.4s both;
}

/* 優勢區域 */
.benefits-section {
  background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%);
  position: relative;
}

.section-header {
  position: relative;
  z-index: 2;
}

.section-badge {
  animation: fadeInUp 0.6s ease-out;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  animation: fadeInUp 0.6s ease-out 0.1s both;
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.benefits-grid {
  position: relative;
  z-index: 2;
}

.benefit-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(25, 118, 210, 0.08);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(10px);
}

.benefit-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(66, 165, 245, 0.02) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-card:hover::before {
  opacity: 1;
}

.benefit-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 60px rgba(25, 118, 210, 0.15);
  border-color: rgba(25, 118, 210, 0.2);
}

.benefit-icon-wrapper {
  position: relative;
}

.benefit-avatar {
  transition: all 0.4s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.benefit-card:hover .benefit-avatar {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
}

.benefit-title {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #1976d2;
  transition: all 0.3s ease;
}

.benefit-card:hover .benefit-title {
  transform: translateY(-2px);
}

.benefit-description {
  line-height: 1.6;
  transition: color 0.3s ease;
}

.benefit-card:hover .benefit-description {
  color: #424242;
}

.benefit-card-1 {
  animation: slideInLeft 0.6s ease-out 0.1s both;
}

.benefit-card-2 {
  animation: slideInUp 0.6s ease-out 0.2s both;
}

.benefit-card-3 {
  animation: slideInRight 0.6s ease-out 0.3s both;
}

.benefit-card-4 {
  animation: slideInLeft 0.6s ease-out 0.4s both;
}

.benefit-card-5 {
  animation: slideInUp 0.6s ease-out 0.5s both;
}

.benefit-card-6 {
  animation: slideInRight 0.6s ease-out 0.6s both;
}

/* 申請流程區域 */
.process-section {
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  position: relative;
}

.process-stepper {
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.1);
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid rgba(25, 118, 210, 0.1);
  overflow: hidden;
}

.process-stepper .q-stepper__step-inner {
  padding: 2rem;
}

.process-stepper .q-stepper__tab {
  transition: all 0.3s ease;
}

.process-stepper .q-stepper__tab:hover {
  background: rgba(25, 118, 210, 0.05);
}

.process-stepper .q-stepper__tab--active {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1976d2;
}

.process-stepper .q-stepper__tab--done {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  color: #2e7d32;
}

.process-stepper .q-btn {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.process-stepper .q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.2);
}

.process-stepper .q-icon {
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

/* 薪資福利區域 */
.salary-section {
  background: linear-gradient(135deg, #e8eaf6 0%, #f1f3f4 100%);
  position: relative;
}

.salary-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 20px;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid rgba(25, 118, 210, 0.1);
  overflow: hidden;
}

.salary-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(255, 193, 7, 0.03) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.salary-card:hover::before {
  opacity: 1;
}

.salary-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(25, 118, 210, 0.15);
}

.salary-card.featured {
  border: 2px solid #ffc107;
  transform: scale(1.03);
  background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
  box-shadow: 0 12px 36px rgba(255, 193, 7, 0.2);
}

.salary-card.featured::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ffc107, #ffeb3b, #ffc107);
  z-index: -1;
  border-radius: 20px;
  animation: shimmer 2s linear infinite;
}

.salary-card.featured:hover {
  transform: scale(1.03) translateY(-8px);
  box-shadow: 0 20px 60px rgba(255, 193, 7, 0.25);
}

.salary-amount {
  position: relative;
}

.salary-amount .text-h4 {
  background: linear-gradient(135deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* FAQ 項目 */
.faq-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
  overflow: hidden;
}

.faq-item:hover {
  border-color: #1976d2;
  transform: translateX(4px);
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.1);
}

/* CTA 區域優化 */
.cta-section {
  background: linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  pointer-events: none;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-badge {
  animation: fadeInUp 0.6s ease-out;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.cta-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  animation: fadeInUp 1s ease-out 0.4s both;
}

.cta-buttons {
  animation: fadeInUp 1.2s ease-out 0.6s both;
}

.cta-primary-btn {
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);
}

.cta-primary-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 193, 7, 0.4);
}

.cta-secondary-btn {
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.cta-secondary-btn:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.15);
}

/* 對話框優化 */
.q-dialog .q-card {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

/* 動畫效果 */
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

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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

/* 響應式設計 */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-icon {
    size: 220px;
  }
  
  .floating-icon {
    padding: 10px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 65vh;
    text-align: center;
    padding-top: 2rem;
  }
  
  .hero-content {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 2rem;
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1.5rem;
    padding: 0 0.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
  
  .cta-buttons .q-btn {
    width: 100%;
    max-width: 280px;
  }
  
  .hero-icon {
    size: 180px;
  }
  
  .floating-icon {
    padding: 8px;
  }
  
  .stats-grid {
    gap: 0.75rem;
  }
  
  .stat-card {
    margin-bottom: 0.75rem;
    padding: 1rem 0.75rem;
  }
  
  .benefits-grid {
    gap: 0.75rem;
  }
  
  .benefit-card {
    margin-bottom: 0.75rem;
  }
  
  .benefit-card .q-card-section {
    padding: 1.25rem 1rem;
  }
  
  .benefit-description {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .section-title {
    font-size: 1.8rem;
    line-height: 1.3;
    margin-bottom: 1rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
    line-height: 1.5;
    padding: 0 0.5rem;
  }
  
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 60vh;
    padding-top: 1rem;
  }
  
  .hero-content {
    padding: 0 0.5rem;
  }
  
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-subtitle {
    font-size: 0.95rem;
    line-height: 1.4;
    padding: 0 0.25rem;
  }
  
  .hero-icon {
    size: 140px;
  }
  
  .floating-elements {
    display: none;
  }
  
  .cta-buttons .q-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.6rem;
    line-height: 1.2;
    padding: 0 0.5rem;
  }
  
  .section-subtitle {
    font-size: 0.95rem;
    padding: 0 0.25rem;
  }
  
  .benefit-title {
    font-size: 1.1rem;
    line-height: 1.3;
    margin-bottom: 0.75rem;
  }
  
  .benefit-description {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .q-pa-xl {
    padding: 1.5rem;
  }
  
  .q-py-xl {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  
  .process-stepper .q-stepper__step-inner {
    padding: 1.25rem;
  }
  
  .salary-card .q-card-section {
    padding: 1.25rem 1rem;
  }
  
  .faq-item .q-expansion-item__content {
    padding: 1rem;
  }
}

/* 工具類別 */
.max-width-md {
  max-width: 600px;
  margin: 0 auto;
}

.opacity-60 {
  opacity: 0.6;
}

.opacity-80 {
  opacity: 0.8;
}

.opacity-90 {
  opacity: 0.9;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
}

/* 效能優化 */
.benefit-card,
.stat-card,
.salary-card {
  will-change: transform;
}

/* 無障礙支援 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* 高對比度模式 */
@media (prefers-contrast: high) {
  .benefit-card,
  .stat-card,
  .salary-card {
    border-width: 2px;
  }
  
  .hero-section {
    background: linear-gradient(135deg, #0d47a1 0%, #1565c0 100%);
  }
}
</style>