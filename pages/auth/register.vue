<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <q-card
      flat
      bordered
      class="register-card"
      style="min-width: 400px; max-width: 500px; width: 100%"
    >
      <q-card-section class="text-center q-pb-none">
        <div class="text-h5 text-primary q-mb-sm">
          <q-icon name="person_add" size="md" class="q-mr-sm" />
          建立新帳號
        </div>
        <div class="text-grey-6 text-body2">
          加入護理服務平台，開始您的照護之旅
        </div>
      </q-card-section>

      <q-card-section>
        <Form
          :validation-schema="registerSchema"
          @submit="handleSubmit"
          v-slot="{ errors, isSubmitting }"
        >
          <!-- 基本資訊 -->
          <div class="text-h6 q-mb-md text-grey-8">
            <q-icon name="info" class="q-mr-xs" />
            基本資訊
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="name" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="姓名 *"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="請輸入您的姓名"
                  aria-label="姓名輸入欄位"
                  clearable
                >
                  <template #prepend>
                    <q-icon name="person" color="primary" />
                  </template>
                </q-input>
              </Field>
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="email" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="電子郵件 *"
                  type="email"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="example@email.com"
                  aria-label="電子郵件輸入欄位"
                  clearable
                >
                  <template #prepend>
                    <q-icon name="email" color="primary" />
                  </template>
                </q-input>
              </Field>
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="phone" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="電話號碼 *"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="09XXXXXXXX"
                  mask="##########"
                  aria-label="電話號碼輸入欄位"
                  clearable
                >
                  <template #prepend>
                    <q-icon name="phone" color="primary" />
                  </template>
                </q-input>
              </Field>
            </div>
          </div>

          <!-- 密碼設定 -->
          <q-separator class="q-my-md" />
          <div class="text-h6 q-mb-md text-grey-8">
            <q-icon name="lock" class="q-mr-xs" />
            密碼設定
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="password" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="密碼 *"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="至少8個字符，包含大小寫和數字"
                  aria-label="密碼輸入欄位"
                >
                  <template #prepend>
                    <q-icon name="lock" color="primary" />
                  </template>
                  <template #append>
                    <q-btn
                      flat
                      round
                      dense
                      :icon="showPassword ? 'visibility' : 'visibility_off'"
                      @click="showPassword = !showPassword"
                      :aria-label="showPassword ? '隱藏密碼' : '顯示密碼'"
                      tabindex="-1"
                    />
                  </template>
                </q-input>
              </Field>
            </div>
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="confirmPassword" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="確認密碼 *"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="請再次輸入密碼"
                  aria-label="確認密碼輸入欄位"
                >
                  <template #prepend>
                    <q-icon name="lock" color="primary" />
                  </template>
                  <template #append>
                    <q-btn
                      flat
                      round
                      dense
                      :icon="
                        showConfirmPassword ? 'visibility' : 'visibility_off'
                      "
                      @click="showConfirmPassword = !showConfirmPassword"
                      :aria-label="
                        showConfirmPassword ? '隱藏確認密碼' : '顯示確認密碼'
                      "
                      tabindex="-1"
                    />
                  </template>
                </q-input>
              </Field>
            </div>
          </div>

          <!-- 用戶類型 -->
          <q-separator class="q-my-md" />
          <div class="text-h6 q-mb-md text-grey-8">
            <q-icon name="group" class="q-mr-xs" />
            用戶類型
          </div>

          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="role" v-slot="{ field, errorMessage }">
                <q-option-group
                  v-bind="field"
                  :options="roleOptions"
                  type="radio"
                  inline
                  :error="!!errorMessage"
                  class="q-mt-sm"
                />
                <div
                  v-if="errorMessage"
                  class="text-negative text-caption q-mt-xs"
                >
                  {{ errorMessage }}
                </div>
              </Field>
            </div>
          </div>

          <!-- 個人資料（可選） -->
          <q-expansion-item
            icon="settings"
            label="個人資料 (選填)"
            class="q-mb-md"
            header-class="text-grey-7"
          >
            <div class="q-pa-md bg-grey-1">
              <div class="row q-gutter-md q-mb-md">
                <div class="col-6">
                  <Field name="profile.age" v-slot="{ field, errorMessage }">
                    <q-input
                      v-bind="field"
                      label="年齡"
                      type="number"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      suffix="歲"
                      min="18"
                      max="120"
                    />
                  </Field>
                </div>
                <div class="col-6">
                  <Field name="profile.gender" v-slot="{ field, errorMessage }">
                    <q-select
                      v-bind="field"
                      label="性別"
                      :options="genderOptions"
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

              <div class="row q-gutter-md q-mb-md">
                <div class="col">
                  <Field
                    name="profile.address"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="地址"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      placeholder="請輸入完整地址"
                    />
                  </Field>
                </div>
              </div>

              <div class="row q-gutter-md q-mb-md">
                <div class="col">
                  <Field
                    name="profile.emergencyContact"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="緊急聯絡人電話"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      placeholder="09XXXXXXXX"
                      mask="##########"
                    />
                  </Field>
                </div>
              </div>

              <!-- 醫療史和偏好 -->
              <div class="row q-gutter-md q-mb-md">
                <div class="col">
                  <q-select
                    v-model="medicalHistory"
                    label="醫療史"
                    :options="medicalConditionOptions"
                    outlined
                    dense
                    multiple
                    use-chips
                    placeholder="選擇相關的醫療狀況"
                  />
                </div>
              </div>

              <div class="row q-gutter-md">
                <div class="col">
                  <q-select
                    v-model="preferences"
                    label="照護偏好"
                    :options="preferenceOptions"
                    outlined
                    dense
                    multiple
                    use-chips
                    placeholder="選擇您的照護偏好"
                  />
                </div>
              </div>
            </div>
          </q-expansion-item>

          <!-- 服務條款 -->
          <div class="row q-gutter-md q-mb-lg">
            <div class="col">
              <Field name="agreeToTerms" v-slot="{ field, errorMessage }">
                <q-checkbox
                  v-bind="field"
                  :model-value="field.value"
                  label="我同意服務條款和隱私政策"
                  :error="!!errorMessage"
                />
                <div
                  v-if="errorMessage"
                  class="text-negative text-caption q-mt-xs"
                >
                  {{ errorMessage }}
                </div>
              </Field>
            </div>
          </div>

          <!-- 提交按鈕 -->
          <div class="row q-gutter-md">
            <div class="col">
              <q-btn
                type="submit"
                color="primary"
                size="lg"
                class="full-width"
                :loading="isSubmitting || loading"
                :disable="Object.keys(errors).length > 0"
                icon="person_add"
                aria-label="提交註冊表單"
                :aria-describedby="
                  Object.keys(errors).length > 0
                    ? 'register-form-errors'
                    : undefined
                "
              >
                {{ isSubmitting ? '註冊中...' : '建立帳號' }}
              </q-btn>
              <!-- 表單錯誤提示 -->
              <div
                v-if="Object.keys(errors).length > 0"
                id="register-form-errors"
                class="text-negative text-caption q-mt-sm"
                role="alert"
                aria-live="polite"
              >
                請修正表單中的錯誤後再提交
              </div>
            </div>
          </div>

          <!-- 登入連結 -->
          <div class="text-center q-mt-md">
            <div class="text-body2 text-grey-6">
              已有帳號？
              <router-link
                to="/auth/login"
                class="text-primary text-decoration-none"
              >
                立即登入
              </router-link>
            </div>
          </div>
        </Form>
      </q-card-section>
    </q-card>

    <!-- 錯誤訊息 -->
    <q-dialog v-model="showErrorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">
            <q-icon name="error" class="q-mr-sm" />
            註冊失敗
          </div>
        </q-card-section>
        <q-card-section>
          {{ errorMessage }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat color="primary" @click="showErrorDialog = false">
            確定
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field } from 'vee-validate'
import { useQuasar } from 'quasar'
import {
  registerSchema,
  type RegisterFormData,
} from '~/utils/validationSchemas'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'

// SEO
usePageSeo(
  '註冊帳號 - 護理服務平台',
  '免費註冊成為護理服務平台使用者，享受專業的照護服務',
)

// 組合式函數
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// 響應式資料
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showErrorDialog = ref(false)
const errorMessage = ref('')
const medicalHistory = ref<string[]>([])
const preferences = ref<string[]>([])

// 選項資料
const roleOptions = [
  {
    label: '患者/家屬',
    value: 'patient',
    icon: 'elderly',
    description: '尋找照護服務',
  },
  {
    label: '照護員',
    value: 'caregiver',
    icon: 'medical_services',
    description: '提供照護服務',
  },
]

const genderOptions = [
  { label: '男性', value: '男' },
  { label: '女性', value: '女' },
  { label: '其他', value: '其他' },
]

const medicalConditionOptions = [
  '糖尿病',
  '高血壓',
  '心臟病',
  '失智症',
  '中風後遺症',
  '骨折/骨病',
  '癌症',
  '腎臟病',
  '肝病',
  '精神疾病',
  '其他慢性病',
]

const preferenceOptions = [
  '女性照護員',
  '男性照護員',
  '有護理師證照',
  '有照服員證照',
  '失智症照護經驗',
  '復健照護經驗',
  '日間照護',
  '夜間照護',
  '24小時照護',
  '語言溝通佳',
  '有愛心耐心',
  '經驗豐富',
]

// 表單提交處理
const handleSubmit = async (values: RegisterFormData) => {
  loading.value = true

  try {
    // 準備註冊資料
    const registerData = {
      ...values,
      profile: {
        ...values.profile,
        medicalHistory:
          medicalHistory.value.length > 0 ? medicalHistory.value : undefined,
        preferences:
          preferences.value.length > 0 ? preferences.value : undefined,
      },
    }

    // 呼叫註冊 API
    await authStore.register(registerData)

    // 註冊成功
    $q.notify({
      type: 'positive',
      message: '註冊成功！歡迎加入護理服務平台',
      icon: 'check_circle',
      timeout: 3000,
    })

    // 跳轉到儀表板
    await router.push('/user/dashboard')
  } catch (error: any) {
    console.error('註冊失敗:', error)

    errorMessage.value = error.message || '註冊過程發生錯誤，請稍後再試'
    showErrorDialog.value = true

    $q.notify({
      type: 'negative',
      message: errorMessage.value,
      icon: 'error',
      timeout: 5000,
    })
  } finally {
    loading.value = false
  }
}

// 頁面標題
definePageMeta({
  title: '註冊帳號',
  layout: 'auth',
})
</script>

<style scoped>
.register-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
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

.q-expansion-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.text-decoration-none {
  text-decoration: none;
}

.text-decoration-none:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .register-card {
    min-width: 300px;
    margin: 1rem;
  }
}
</style>
