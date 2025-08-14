<template>
  <q-page class="faq-page">
    <!-- 頁面標題區域 -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">
            <q-icon name="quiz" size="48px" />
          </div>
          <h1 class="hero-title">常見問題</h1>
          <p class="hero-subtitle">
            快速找到您需要的答案，了解更多關於我們服務的資訊
          </p>
        </div>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="main-content">
      <div class="container">
        <!-- 搜尋區域 -->
        <div class="search-section">
          <q-input
            v-model="searchQuery"
            placeholder="搜尋問題..."
            outlined
            clearable
            class="search-input"
            @update:model-value="filterQuestions"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- FAQ 分類標籤 -->
        <div class="category-tabs">
          <q-tabs
            v-model="selectedCategory"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="all" label="全部" />
            <q-tab name="service" label="服務說明" />
            <q-tab name="booking" label="預約相關" />
            <q-tab name="payment" label="費用與付款" />
            <q-tab name="account" label="帳戶問題" />
            <q-tab name="other" label="其他" />
          </q-tabs>
        </div>

        <!-- FAQ 列表 -->
        <div class="faq-list">
          <q-expansion-item
            v-for="(item, index) in filteredQuestions"
            :key="index"
            :label="item.question"
            :header-class="`faq-header ${expandedItems[index] ? 'expanded' : ''}`"
            :expand-icon-class="'faq-icon'"
            class="faq-item"
            @update:model-value="(val) => handleExpansion(index, val)"
          >
            <template #header>
              <q-item-section avatar>
                <q-icon
                  :name="getCategoryIcon(item.category)"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <div class="faq-question">{{ item.question }}</div>
                <div class="faq-category-label">
                  {{ getCategoryLabel(item.category) }}
                </div>
              </q-item-section>
            </template>
            <q-card>
              <q-card-section class="faq-answer">
                <div v-html="item.answer"></div>
                <div
                  v-if="item.links && item.links.length > 0"
                  class="related-links"
                >
                  <div class="links-title">相關連結：</div>
                  <div class="links-list">
                    <q-btn
                      v-for="link in item.links"
                      :key="link.url"
                      flat
                      dense
                      no-caps
                      color="primary"
                      :label="link.text"
                      @click="() => router.push(link.url)"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <!-- 無結果提示 -->
          <div v-if="filteredQuestions.length === 0" class="no-results">
            <q-icon name="search_off" size="64px" color="grey-5" />
            <h3>找不到相關問題</h3>
            <p>請嘗試使用其他關鍵字搜尋，或瀏覽不同的分類</p>
            <q-btn color="primary" label="清除搜尋" @click="clearSearch" />
          </div>
        </div>

        <!-- 聯繫支援區域 -->
        <div class="support-section">
          <q-card class="support-card">
            <q-card-section>
              <div class="support-content">
                <div class="support-icon">
                  <q-icon name="support_agent" size="48px" />
                </div>
                <div class="support-text">
                  <h3>還有其他問題嗎？</h3>
                  <p>
                    如果您在常見問題中找不到答案，歡迎直接聯繫我們的客服團隊
                  </p>
                </div>
                <div class="support-actions">
                  <q-btn
                    color="primary"
                    label="聯繫客服"
                    icon="contact_support"
                    @click="() => router.push('/support/contact')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 響應式資料
const searchQuery = ref('')
const selectedCategory = ref('all')
const expandedItems = ref<Record<number, boolean>>({})

// FAQ 資料
const faqData = [
  // 服務說明
  {
    category: 'service',
    question: '你們提供哪些類型的看護服務？',
    answer: `我們提供多種專業看護服務，包括：
      <ul>
        <li><strong>居家照護</strong>：到府提供日常生活照護、用藥提醒、復健協助等</li>
        <li><strong>醫院看護</strong>：住院期間的專業陪護、協助就醫等</li>
        <li><strong>長期照護</strong>：失智照護、臥床照護、慢性病管理等</li>
        <li><strong>臨時看護</strong>：短期或臨時的照護需求</li>
      </ul>`,
    links: [
      { text: '查看服務詳情', url: '/info/services' },
      { text: '瀏覽看護師', url: '/caregivers' },
    ],
  },
  {
    category: 'service',
    question: '看護師都有專業證照嗎？',
    answer: `是的，我們平台上的所有看護師都必須具備：
      <ul>
        <li>合格的看護證照或護理師執照</li>
        <li>相關的專業訓練證明</li>
        <li>良民證與健康檢查報告</li>
        <li>至少一年以上的實務經驗</li>
      </ul>
      我們會定期審核看護師的資格，確保服務品質。`,
    links: [],
  },
  {
    category: 'service',
    question: '服務時間如何安排？',
    answer: `我們提供彈性的服務時間選擇：
      <ul>
        <li><strong>鐘點制</strong>：最少2小時起，可依需求調整</li>
        <li><strong>半日制</strong>：4-6小時的服務</li>
        <li><strong>全日制</strong>：8-12小時的服務</li>
        <li><strong>24小時看護</strong>：全天候照護服務</li>
      </ul>
      您可以根據實際需求選擇合適的服務時段。`,
    links: [{ text: '費用計算器', url: '/booking/calculator' }],
  },

  // 預約相關
  {
    category: 'booking',
    question: '如何預約看護服務？',
    answer: `預約看護服務非常簡單：
      <ol>
        <li>瀏覽看護師列表，選擇合適的看護師</li>
        <li>查看看護師的可預約時段</li>
        <li>填寫預約表單，說明照護需求</li>
        <li>等待看護師確認</li>
        <li>預約成功後，按時享受服務</li>
      </ol>`,
    links: [{ text: '立即預約', url: '/caregivers' }],
  },
  {
    category: 'booking',
    question: '可以提前多久預約？',
    answer: `預約時間規定如下：
      <ul>
        <li>一般預約：建議提前至少24小時預約</li>
        <li>緊急需求：部分看護師提供即時服務，最快2小時內可到達</li>
        <li>長期照護：建議提前3-7天預約，以便安排最合適的看護師</li>
      </ul>`,
    links: [],
  },
  {
    category: 'booking',
    question: '如何取消或更改預約？',
    answer: `取消或更改預約的規定：
      <ul>
        <li>服務開始前24小時以上：免費取消或更改</li>
        <li>服務開始前12-24小時：收取20%取消費</li>
        <li>服務開始前12小時內：收取50%取消費</li>
        <li>臨時取消或未到：收取全額費用</li>
      </ul>
      如遇特殊情況，請聯繫客服協助處理。`,
    links: [{ text: '聯繫客服', url: '/support/contact' }],
  },

  // 費用與付款
  {
    category: 'payment',
    question: '服務費用如何計算？',
    answer: `服務費用根據以下因素計算：
      <ul>
        <li><strong>服務類型</strong>：不同類型的照護服務有不同的收費標準</li>
        <li><strong>服務時長</strong>：鐘點制、半日制、全日制等有不同的計費方式</li>
        <li><strong>看護師資歷</strong>：資深看護師的費用可能較高</li>
        <li><strong>特殊需求</strong>：如需特殊照護技能，可能會有額外費用</li>
      </ul>
      您可以使用我們的費用計算器來估算服務費用。`,
    links: [
      { text: '費用計算器', url: '/booking/calculator' },
      { text: '查看收費標準', url: '/info/pricing' },
    ],
  },
  {
    category: 'payment',
    question: '支援哪些付款方式？',
    answer: `我們提供多種便利的付款方式：
      <ul>
        <li>信用卡/金融卡（VISA、MasterCard、JCB）</li>
        <li>銀行轉帳</li>
        <li>LINE Pay</li>
        <li>街口支付</li>
        <li>現金支付（僅限當面交易）</li>
      </ul>
      所有線上交易都經過加密保護，確保您的支付安全。`,
    links: [],
  },
  {
    category: 'payment',
    question: '有提供發票或收據嗎？',
    answer: `是的，我們提供正式的電子發票和收據：
      <ul>
        <li>每筆交易完成後，系統會自動開立電子發票</li>
        <li>發票會發送到您註冊的電子郵件</li>
        <li>可在會員中心查詢和下載歷史發票</li>
        <li>如需紙本發票，請聯繫客服申請</li>
      </ul>`,
    links: [],
  },

  // 帳戶問題
  {
    category: 'account',
    question: '如何註冊成為會員？',
    answer: `註冊會員步驟：
      <ol>
        <li>點擊網站右上角的「註冊」按鈕</li>
        <li>填寫基本資料（姓名、電話、電子郵件）</li>
        <li>設定密碼</li>
        <li>驗證電子郵件或手機號碼</li>
        <li>完成註冊，即可開始使用服務</li>
      </ol>`,
    links: [],
  },
  {
    category: 'account',
    question: '忘記密碼怎麼辦？',
    answer: `如果忘記密碼，請按照以下步驟重設：
      <ol>
        <li>在登入頁面點擊「忘記密碼」</li>
        <li>輸入註冊時使用的電子郵件或手機號碼</li>
        <li>我們會發送重設密碼連結到您的郵箱</li>
        <li>點擊連結，設定新密碼</li>
        <li>使用新密碼登入</li>
      </ol>`,
    links: [],
  },

  // 其他
  {
    category: 'other',
    question: '如何成為平台的看護師？',
    answer: `如果您想加入我們的看護師團隊：
      <ol>
        <li>準備相關證照和文件</li>
        <li>填寫線上申請表</li>
        <li>參加面試和培訓</li>
        <li>通過背景審查</li>
        <li>完成註冊，開始接案</li>
      </ol>
      我們歡迎有愛心、專業的看護師加入！`,
    links: [{ text: '成為看護師', url: '/join' }],
  },
  {
    category: 'other',
    question: '平台如何保障服務品質？',
    answer: `我們透過多重機制確保服務品質：
      <ul>
        <li><strong>嚴格審核</strong>：所有看護師都經過專業認證和背景調查</li>
        <li><strong>評價系統</strong>：客戶可對服務進行評價，幫助其他用戶選擇</li>
        <li><strong>定期培訓</strong>：為看護師提供持續的專業培訓</li>
        <li><strong>客服支援</strong>：專業客服團隊隨時處理問題和投訴</li>
        <li><strong>服務保證</strong>：如服務不滿意，我們提供相應的補償機制</li>
      </ul>`,
    links: [],
  },
  {
    category: 'other',
    question: '個人資料如何被保護？',
    answer: `我們非常重視您的隱私保護：
      <ul>
        <li>所有個人資料都經過加密儲存</li>
        <li>遵守個人資料保護法規定</li>
        <li>不會未經同意分享您的資料給第三方</li>
        <li>定期進行安全性檢查和更新</li>
        <li>您可以隨時要求查看、修改或刪除個人資料</li>
      </ul>`,
    links: [{ text: '隱私政策', url: '/legal/privacy' }],
  },
]

// 計算屬性
const filteredQuestions = computed(() => {
  let questions = faqData

  // 根據分類篩選
  if (selectedCategory.value !== 'all') {
    questions = questions.filter((q) => q.category === selectedCategory.value)
  }

  // 根據搜尋關鍵字篩選
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    questions = questions.filter(
      (q) =>
        q.question.toLowerCase().includes(query) ||
        q.answer.toLowerCase().includes(query),
    )
  }

  return questions
})

// 方法
const filterQuestions = () => {
  // 觸發 filteredQuestions 重新計算
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

const handleExpansion = (index: number, expanded: boolean) => {
  expandedItems.value[index] = expanded
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    service: 'medical_services',
    booking: 'event_available',
    payment: 'payment',
    account: 'account_circle',
    other: 'help_outline',
  }
  return icons[category] || 'help_outline'
}

const getCategoryLabel = (category: string) => {
  const labels: Record<string, string> = {
    service: '服務說明',
    booking: '預約相關',
    payment: '費用與付款',
    account: '帳戶問題',
    other: '其他',
  }
  return labels[category] || '其他'
}
</script>

<style scoped>
/* 全局樣式 */
.faq-page {
  background: #f8fafc;
  min-height: 100vh;
}

/* Hero 區域 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0 3rem;
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
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* 主要內容區域 */
.main-content {
  padding: 3rem 0;
}

/* 搜尋區域 */
.search-section {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  background: white;
  border-radius: 50px;
  overflow: hidden;
}

.search-input :deep(.q-field__control) {
  border-radius: 50px !important;
  padding: 0 1.5rem;
  height: 50px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

/* 分類標籤 */
.category-tabs {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* FAQ 列表 */
.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.faq-header {
  padding: 1.5rem !important;
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-header.expanded {
  background: rgba(102, 126, 234, 0.05);
}

.faq-question {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
}

.faq-category-label {
  font-size: 0.85rem;
  color: #718096;
}

.faq-answer {
  padding: 1.5rem !important;
  color: #4a5568;
  line-height: 1.8;
  background: #f8fafc;
}

.faq-answer ul,
.faq-answer ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.faq-answer li {
  margin: 0.5rem 0;
}

.faq-answer strong {
  color: #2d3748;
  font-weight: 600;
}

/* 相關連結 */
.related-links {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.links-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.links-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* 無結果提示 */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.no-results h3 {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 1rem 0;
}

.no-results p {
  color: #718096;
  margin-bottom: 1.5rem;
}

/* 支援區域 */
.support-section {
  margin-top: 3rem;
}

.support-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  overflow: hidden;
}

.support-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
}

.support-icon {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  padding: 1.5rem;
  flex-shrink: 0;
}

.support-text {
  flex: 1;
}

.support-text h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}

.support-text p {
  margin: 0;
  opacity: 0.9;
}

.support-actions {
  flex-shrink: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .support-content {
    flex-direction: column;
    text-align: center;
  }

  .faq-header {
    padding: 1rem !important;
  }

  .faq-answer {
    padding: 1rem !important;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-icon {
    width: 80px;
    height: 80px;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>
