<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card flat bordered class="contact-card">
          <q-card-section>
            <div class="text-h5 text-primary q-mb-sm">
              <q-icon name="contact_support" size="md" class="q-mr-sm" />
              聯繫我們
            </div>
            <div class="text-body2 text-grey-7">
              我們很樂意為您提供協助，請選擇最適合的聯絡方式
            </div>
          </q-card-section>
          
          <q-separator />
          
          <!-- 聯絡資訊 -->
          <q-card-section>
            <div class="text-h6 q-mb-md">聯絡資訊</div>
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone" color="primary" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>客服電話</q-item-label>
                  <q-item-label caption>02-1234-5678</q-item-label>
                  <q-item-label caption class="text-grey-6">服務時間：週一至週五 09:00-18:00</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item>
                <q-item-section avatar>
                  <q-icon name="email" color="primary" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>電子郵件</q-item-label>
                  <q-item-label caption>service@care-platform.com</q-item-label>
                  <q-item-label caption class="text-grey-6">我們會在24小時內回覆您</q-item-label>
                </q-item-section>
              </q-item>
              
              <q-item>
                <q-item-section avatar>
                  <q-icon name="location_on" color="primary" size="md" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>服務地址</q-item-label>
                  <q-item-label caption>台北市信義區信義路五段7號</q-item-label>
                  <q-item-label caption class="text-grey-6">台北101大樓35樓</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          
          <q-separator />
          
          <!-- 聯絡表單 -->
          <q-card-section>
            <div class="text-h6 q-mb-md">線上聯絡</div>
            
            <Form
              :validation-schema="contactSchema"
              @submit="handleSubmit"
              v-slot="{ errors, isSubmitting }"
            >
              <div class="row q-gutter-md q-mb-md">
                <div class="col-12 col-sm-6">
                  <Field
                    name="name"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="姓名 *"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      placeholder="請輸入您的姓名"
                    />
                  </Field>
                </div>
                <div class="col-12 col-sm-6">
                  <Field
                    name="email"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="電子郵件 *"
                      type="email"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      placeholder="example@email.com"
                    />
                  </Field>
                </div>
              </div>
              
              <div class="row q-gutter-md q-mb-md">
                <div class="col-12 col-sm-6">
                  <Field
                    name="phone"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="電話號碼 *"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      placeholder="09XXXXXXXX"
                    />
                  </Field>
                </div>
                <div class="col-12 col-sm-6">
                  <Field
                    name="subject"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-select
                      v-bind="field"
                      label="聯絡主題 *"
                      :options="subjectOptions"
                      outlined
                      dense
                      emit-value
                      map-options
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                    />
                  </Field>
                </div>
              </div>
              
              <div class="row q-gutter-md q-mb-lg">
                <div class="col-12">
                  <Field
                    name="message"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="詳細訊息 *"
                      type="textarea"
                      outlined
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      rows="5"
                      placeholder="請詳細描述您的問題或需求，我們會盡快為您解答"
                    />
                  </Field>
                </div>
              </div>
              
              <div class="text-right">
                <q-btn
                  type="submit"
                  color="primary"
                  size="lg"
                  :loading="isSubmitting || loading"
                  :disable="Object.keys(errors).length > 0"
                  icon="send"
                >
                  {{ isSubmitting ? '送出中...' : '送出訊息' }}
                </q-btn>
              </div>
            </Form>
          </q-card-section>
        </q-card>
        
        <!-- 常見問題快速連結 -->
        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">常見問題</div>
            <div class="row q-gutter-md">
              <div class="col-12 col-sm-6">
                <q-btn
                  flat
                  no-caps
                  class="full-width text-left"
                  icon="help_outline"
                  @click="navigateTo('/content/blog')"
                >
                  <div class="q-ml-sm">
                    <div class="text-weight-medium">使用說明</div>
                    <div class="text-caption text-grey-6">如何使用平台服務</div>
                  </div>
                </q-btn>
              </div>
              <div class="col-12 col-sm-6">
                <q-btn
                  flat
                  no-caps
                  class="full-width text-left"
                  icon="payment"
                  @click="navigateTo('/info/pricing')"
                >
                  <div class="q-ml-sm">
                    <div class="text-weight-medium">收費說明</div>
                    <div class="text-caption text-grey-6">服務費用與付款方式</div>
                  </div>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useQuasar } from 'quasar'
import { useApiService } from '~/composables/useApiService'
import { contactSchema, type ContactFormData } from '~/utils/validationSchemas'
import usePageSeo from '~/composables/usePageSeo'

// SEO
usePageSeo('聯繫我們 - 護理服務平台', '歡迎透過電話或電子郵件與我們聯絡，我們很樂意為您提供協助')

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
  { label: '其他問題', value: '其他問題' }
]

// 表單提交處理
const handleSubmit = async (values: ContactFormData) => {
  loading.value = true
  
  try {
    const response = await apiService.submitContactForm(values)
    
    // 顯示成功訊息
    $q.notify({
      type: 'positive',
      message: response.message || '您的訊息已成功送出，我們會盡快回覆您',
      icon: 'check_circle',
      timeout: 5000,
      actions: [
        {
          label: '確定',
          color: 'white',
          handler: () => {}
        }
      ]
    })
    
    // 顯示成功對話框
    $q.dialog({
      title: '訊息已送出',
      message: '感謝您的聯絡，我們已收到您的訊息，將在24小時內回覆您。',
      ok: {
        color: 'primary',
        label: '確定'
      }
    }).onOk(() => {
      // 可以選擇跳轉到其他頁面
      // navigateTo('/')
    })
    
  } catch (error: any) {
    console.error('送出聯絡表單失敗:', error)
    
    $q.notify({
      type: 'negative',
      message: error.message || '送出失敗，請稍後再試',
      icon: 'error',
      timeout: 5000
    })
  } finally {
    loading.value = false
  }
}

// 頁面結構化資料
const { $route } = useNuxtApp()
const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '聯繫我們 - 護理服務平台',
        url: baseUrl + $route.fullPath,
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
            addressCountry: 'TW'
          }
        }
      })
    }
  ]
})
</script>

<style scoped>
.contact-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-field--outlined .q-field__control:before {
  border-color: #e0e0e0;
}

.q-field--outlined.q-field--focused .q-field__control:before {
  border-color: #1976d2;
  border-width: 2px;
}

.q-btn {
  border-radius: 8px;
}

@media (max-width: 600px) {
  .contact-card {
    margin: 1rem;
  }
}
</style>