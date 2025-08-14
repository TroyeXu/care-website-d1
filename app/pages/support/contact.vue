<template>
  <q-page class="contact-page">
    <!-- 頁面標題區域 -->
    <div class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-icon">
            <q-icon name="support_agent" size="48px" />
          </div>
          <h1 class="hero-title">聯繫我們</h1>
          <p class="hero-subtitle">
            我們很樂意為您提供協助，請選擇最適合的聯絡方式
          </p>
        </div>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- 聯絡資訊卡片 -->
          <div class="contact-info-section">
            <q-card class="contact-info-card">
              <q-card-section class="card-header">
                <h2 class="section-title">
                  <q-icon name="info" class="title-icon" />
                  聯絡資訊
                </h2>
              </q-card-section>

              <q-card-section class="contact-methods">
                <div class="contact-method-grid">
                  <div class="contact-method">
                    <div class="method-icon">
                      <q-icon name="phone" size="32px" />
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">客服電話</h3>
                      <p class="method-value">02-1234-5678</p>
                      <p class="method-desc">
                        服務時間：週一至週五 09:00-18:00
                      </p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">
                      <q-icon name="email" size="32px" />
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">電子郵件</h3>
                      <p class="method-value">service@care-platform.com</p>
                      <p class="method-desc">我們會在24小時內回覆您</p>
                    </div>
                  </div>

                  <div class="contact-method">
                    <div class="method-icon">
                      <q-icon name="location_on" size="32px" />
                    </div>
                    <div class="method-content">
                      <h3 class="method-title">服務地址</h3>
                      <p class="method-value">台北市信義區信義路五段7號</p>
                      <p class="method-desc">台北101大樓35樓</p>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- 聯絡表單卡片 -->
          <div class="contact-form-section">
            <q-card class="contact-form-card">
              <q-card-section class="card-header">
                <h2 class="section-title">
                  <q-icon name="edit" class="title-icon" />
                  線上聯絡
                </h2>
                <p class="section-desc">填寫以下表單，我們會盡快回覆您</p>
              </q-card-section>

              <q-card-section class="form-content">
                <Form
                  v-slot="{ errors, isSubmitting }"
                  :validation-schema="contactSchema"
                  @submit="handleSubmit"
                >
                  <div class="form-grid">
                    <div class="form-row">
                      <div class="form-field">
                        <Field v-slot="{ field, errorMessage }" name="name">
                          <q-input
                            v-bind="fieldProps(field as any)"
                            label="姓名"
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            placeholder="請輸入您的姓名"
                            class="custom-input"
                          >
                            <template #prepend>
                              <q-icon name="person" class="input-icon" />
                            </template>
                          </q-input>
                        </Field>
                      </div>
                      <div class="form-field">
                        <Field v-slot="{ field, errorMessage }" name="email">
                          <q-input
                            v-bind="fieldProps(field as any)"
                            label="電子郵件"
                            type="email"
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            placeholder="example@email.com"
                            class="custom-input"
                          >
                            <template #prepend>
                              <q-icon name="email" class="input-icon" />
                            </template>
                          </q-input>
                        </Field>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-field">
                        <Field v-slot="{ field, errorMessage }" name="phone">
                          <q-input
                            v-bind="fieldProps(field as any)"
                            label="電話號碼"
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            placeholder="09XXXXXXXX"
                            class="custom-input"
                          >
                            <template #prepend>
                              <q-icon name="phone" class="input-icon" />
                            </template>
                          </q-input>
                        </Field>
                      </div>
                      <div class="form-field">
                        <Field v-slot="{ field, errorMessage }" name="subject">
                          <q-select
                            v-bind="fieldProps(field as any)"
                            label="聯絡主題"
                            :options="subjectOptions"
                            outlined
                            emit-value
                            map-options
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            class="custom-select"
                          >
                            <template #prepend>
                              <q-icon name="topic" class="input-icon" />
                            </template>
                          </q-select>
                        </Field>
                      </div>
                    </div>

                    <div class="form-row full-width">
                      <div class="form-field">
                        <Field v-slot="{ field, errorMessage }" name="message">
                          <q-input
                            v-bind="fieldProps(field as any)"
                            label="詳細訊息"
                            type="textarea"
                            outlined
                            :error="!!errorMessage"
                            :error-message="errorMessage"
                            rows="5"
                            placeholder="請詳細描述您的問題或需求，我們會盡快為您解答"
                            class="custom-textarea"
                          >
                            <template #prepend>
                              <q-icon
                                name="message"
                                class="input-icon textarea-icon"
                              />
                            </template>
                          </q-input>
                        </Field>
                      </div>
                    </div>

                    <!-- 成功狀態顯示 -->
                    <div v-if="submitSuccess" class="success-message">
                      <div class="success-content">
                        <q-icon
                          name="check_circle"
                          size="32px"
                          class="success-icon"
                        />
                        <h3 class="success-title">訊息已成功送出！</h3>
                        <p class="success-desc">
                          感謝您的聯絡，我們將在24小時內回覆您
                        </p>
                      </div>
                    </div>

                    <!-- 錯誤狀態顯示 -->
                    <div v-if="submitError" class="error-message">
                      <div class="error-content">
                        <q-icon name="error" size="32px" class="error-icon" />
                        <h3 class="error-title">送出失敗</h3>
                        <p class="error-desc">{{ submitError }}</p>
                        <q-btn
                          flat
                          color="negative"
                          class="error-dismiss"
                          @click="submitError = ''"
                        >
                          關閉
                        </q-btn>
                      </div>
                    </div>

                    <div class="form-actions">
                      <q-btn
                        type="submit"
                        color="primary"
                        size="lg"
                        :loading="isSubmitting || loading"
                        :disable="
                          Object.keys(errors).length > 0 || submitSuccess
                        "
                        :icon="submitSuccess ? 'check' : 'send'"
                        class="submit-btn"
                        :class="{ 'success-btn': submitSuccess }"
                        unelevated
                      >
                        <span v-if="submitSuccess">已送出</span>
                        <span v-else-if="isSubmitting || loading">
                          <q-spinner size="18px" class="q-mr-sm" />
                          送出中...
                        </span>
                        <span v-else>送出訊息</span>
                      </q-btn>
                    </div>
                  </div>
                </Form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useQuasar } from 'quasar'
import { navigateTo, useRoute, useHead, useRuntimeConfig } from '#app'
import { useApiService } from '~/composables/useApiService'
import { contactSchema, type ContactFormData } from '~/utils/validationSchemas'
import usePageSeo from '~/composables/usePageSeo'
import { fieldProps } from '~/utils/veeValidateHelpers'

// SEO
usePageSeo(
  '聯繫我們 - 護理服務平台',
  '歡迎透過電話或電子郵件與我們聯絡，我們很樂意為您提供協助',
)

// 組合式函數
const $q = useQuasar()
const apiService = useApiService()

// 響應式資料
const loading = ref(false)

// 聯絡主題選項
const subjectOptions = [
  { label: '服務諮詢', value: '服務諮詢' },
  { label: '預約問題', value: '預約問題' },
  { label: '費用問題', value: '費用問題' },
  { label: '帳戶問題', value: '帳戶問題' },
  { label: '技術支援', value: '技術支援' },
  { label: '投訴建議', value: '投訴建議' },
  { label: '合作洽談', value: '合作洽談' },
  { label: '其他問題', value: '其他問題' },
]

// 響應式資料
const submitSuccess = ref(false)
const submitError = ref('')

// 聯絡表單類型
interface ContactFormValues {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: string
}

// 表單提交處理
const handleSubmit = async (values: ContactFormValues) => {
  loading.value = true
  submitError.value = ''

  try {
    const response = await apiService.submitContactForm(values)

    // 設定成功狀態
    submitSuccess.value = true

    // 顯示成功通知
    $q.notify({
      type: 'positive',
      message: response.message || '您的訊息已成功送出，我們會盡快回覆您',
      icon: 'check_circle',
      timeout: 6000,
      position: 'top',
      classes: 'success-notification',
      actions: [
        {
          label: '確定',
          color: 'white',
          handler: () => {},
        },
      ],
    })

    // 3秒後重置成功狀態
    setTimeout(() => {
      submitSuccess.value = false
    }, 3000)
  } catch (error: unknown) {
    console.error('送出聯絡表單失敗:', error)

    submitError.value = (error as any)?.message || '送出失敗，請稍後再試'

    $q.notify({
      type: 'negative',
      message: submitError.value,
      icon: 'error',
      timeout: 6000,
      position: 'top',
      classes: 'error-notification',
    })
  } finally {
    loading.value = false
  }
}

// 頁面結構化資料
// Import 已在上方添加
const route = useRoute()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '聯繫我們 - 護理服務平台',
        url: baseUrl + (route?.fullPath || '/support/contact'),
        description: '歡迎透過電話或電子郵件與我們聯絡，我們很樂意為您提供協助',
        provider: {
          '@type': 'Organization',
          name: '護理服務平台',
          telephone: '02-1234-5678',
          email: 'service@care-platform.com',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '信義路五段7號35樓',
            addressLocality: '信義區',
            addressRegion: '台北市',
            addressCountry: 'TW',
          },
        },
      }),
    },
  ],
})
</script>

<style scoped>
/* 全局樣式 */
.contact-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

/* Hero 區域 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 4rem 0 2rem;
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
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="70" r="1" fill="white" opacity="0.1"/><circle cx="70" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
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
  animation: fadeInUp 0.8s ease-out;
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
  transition: all 0.3s ease;
}

.hero-icon:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.3);
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
  background: #f8fafc;
  position: relative;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* 卡片通用樣式 */
.contact-info-card,
.contact-form-card {
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
}

.contact-info-card:hover,
.contact-form-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem;
  display: flex;
  align-items: center;
}

.title-icon {
  margin-right: 0.75rem;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 8px;
  border-radius: 10px;
}

.section-desc {
  color: #718096;
  margin: 0;
  font-size: 0.95rem;
}

/* 聯絡方式網格 */
.contact-methods {
  padding: 2rem;
}

.contact-method-grid {
  display: grid;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background: rgba(102, 126, 234, 0.02);
  border-radius: 15px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}

.contact-method:hover {
  background: rgba(102, 126, 234, 0.05);
  border-color: rgba(102, 126, 234, 0.2);
  transform: translateX(5px);
}

.method-icon {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 12px;
  border-radius: 12px;
  margin-right: 1rem;
  flex-shrink: 0;
}

.method-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem;
}

.method-value {
  font-size: 1rem;
  font-weight: 500;
  color: #667eea;
  margin: 0 0 0.25rem;
}

.method-desc {
  font-size: 0.9rem;
  color: #718096;
  margin: 0;
}

/* 表單樣式 */
.form-content {
  padding: 2rem;
}

.form-grid {
  display: grid;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-row.full-width {
  grid-template-columns: 1fr;
}

.form-field {
  position: relative;
}

.custom-input,
.custom-select,
.custom-textarea {
  border-radius: 12px !important;
}

.custom-input .q-field__control,
.custom-select .q-field__control,
.custom-textarea .q-field__control {
  border-radius: 12px !important;
  background: rgba(248, 250, 252, 0.8) !important;
  transition: all 0.3s ease !important;
}

.custom-input .q-field__control:hover,
.custom-select .q-field__control:hover,
.custom-textarea .q-field__control:hover {
  background: rgba(248, 250, 252, 1) !important;
  transform: translateY(-1px);
}

.input-icon {
  color: #667eea !important;
}

.textarea-icon {
  align-self: flex-start;
  margin-top: 12px;
}

/* 表單動作 */
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea, #764ba2) !important;
  color: white !important;
  padding: 12px 32px !important;
  border-radius: 50px !important;
  font-weight: 600 !important;
  font-size: 1rem !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
}

.submit-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
}

.submit-btn:active {
  transform: translateY(0) !important;
}

/* 動畫 */
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

.contact-info-card,
.contact-form-card {
  animation: fadeInUp 0.6s ease-out;
}

.contact-form-card {
  animation-delay: 0.2s;
}

/* 成功和錯誤訊息樣式 */
.success-message {
  background: linear-gradient(135deg, #48bb78, #38a169);
  border-radius: 15px;
  padding: 2rem;
  margin: 1.5rem 0;
  text-align: center;
  color: white;
  animation: slideInUp 0.5s ease-out;
  box-shadow: 0 10px 30px rgba(72, 187, 120, 0.3);
}

.success-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.success-icon {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 1rem;
}

.success-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.success-desc {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
}

.error-message {
  background: linear-gradient(135deg, #f56565, #e53e3e);
  border-radius: 15px;
  padding: 2rem;
  margin: 1.5rem 0;
  text-align: center;
  color: white;
  animation: slideInUp 0.5s ease-out;
  box-shadow: 0 10px 30px rgba(245, 101, 101, 0.3);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error-icon {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 12px;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.error-desc {
  font-size: 1rem;
  margin: 0 0 1rem;
  opacity: 0.9;
}

.error-dismiss {
  background: rgba(255, 255, 255, 0.2) !important;
  color: white !important;
  border-radius: 25px !important;
  font-weight: 500 !important;
}

.error-dismiss:hover {
  background: rgba(255, 255, 255, 0.3) !important;
}

.success-btn {
  background: linear-gradient(135deg, #48bb78, #38a169) !important;
}

.success-btn:hover {
  background: linear-gradient(135deg, #38a169, #2f855a) !important;
}

/* 載入和通知樣式 */
:deep(.success-notification) {
  background: linear-gradient(135deg, #48bb78, #38a169) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 25px rgba(72, 187, 120, 0.3) !important;
}

:deep(.error-notification) {
  background: linear-gradient(135deg, #f56565, #e53e3e) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 25px rgba(245, 101, 101, 0.3) !important;
}

/* 輸入框驗證樣式增強 */
.custom-input:deep(.q-field--error .q-field__control),
.custom-select:deep(.q-field--error .q-field__control),
.custom-textarea:deep(.q-field--error .q-field__control) {
  border-color: #f56565 !important;
  background: rgba(245, 101, 101, 0.05) !important;
}

.custom-input:deep(.q-field--error .q-field__bottom),
.custom-select:deep(.q-field--error .q-field__bottom),
.custom-textarea:deep(.q-field--error .q-field__bottom) {
  color: #f56565 !important;
  font-weight: 500 !important;
}

/* 滑入動畫 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 0 1.5rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .hero-icon {
    width: 80px;
    height: 80px;
  }

  .content-grid {
    gap: 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card-header,
  .contact-methods,
  .form-content {
    padding: 1.5rem;
  }

  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .contact-method,
  .faq-content {
    padding: 1rem;
  }

  .method-icon,
  .faq-icon {
    padding: 8px;
  }

  .success-message,
  .error-message {
    padding: 1.5rem;
    margin: 1rem 0;
  }

  .success-title,
  .error-title {
    font-size: 1.3rem;
  }
}
</style>
