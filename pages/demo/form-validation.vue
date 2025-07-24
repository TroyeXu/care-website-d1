<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-8">
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="text-h5 text-primary q-mb-md">
              <q-icon name="rule" class="q-mr-sm" />
              表單驗證測試
            </div>
            <div class="text-body2 text-grey-7">
              測試 VeeValidate 整合和各種驗證規則的運作情況
            </div>
          </q-card-section>
        </q-card>

        <!-- API 模式切換 -->
        <ApiModeToggle class="q-mb-md" />

        <!-- 測試項目 -->
        <div class="row q-gutter-md">
          <!-- 登入表單測試 -->
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">
                  <q-icon name="login" class="q-mr-sm" />
                  登入表單驗證
                </div>
                
                <Form
                  :validation-schema="loginSchema"
                  @submit="testLogin"
                  v-slot="{ errors, isSubmitting }"
                >
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
                      class="q-mb-md"
                    />
                  </Field>

                  <Field
                    name="password"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="密碼 *"
                      type="password"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      class="q-mb-md"
                    />
                  </Field>

                  <q-btn
                    type="submit"
                    color="primary"
                    :loading="isSubmitting"
                    :disable="Object.keys(errors).length > 0"
                    class="full-width"
                  >
                    測試登入驗證
                  </q-btn>
                </Form>

                <div v-if="loginResult" class="q-mt-md">
                  <q-banner :class="loginResult.success ? 'bg-green-1 text-green-8' : 'bg-red-1 text-red-8'">
                    <div class="text-weight-bold">
                      {{ loginResult.success ? '驗證通過' : '驗證失敗' }}
                    </div>
                    <div class="text-caption">
                      {{ loginResult.message }}
                    </div>
                  </q-banner>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- 註冊表單測試 -->
          <div class="col-12 col-md-6">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">
                  <q-icon name="person_add" class="q-mr-sm" />
                  註冊表單驗證
                </div>
                
                <Form
                  :validation-schema="registerSchema"
                  @submit="testRegister"
                  v-slot="{ errors, isSubmitting }"
                >
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
                      class="q-mb-md"
                    />
                  </Field>

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
                      class="q-mb-md"
                    />
                  </Field>

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
                      class="q-mb-md"
                    />
                  </Field>

                  <Field
                    name="password"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="密碼 *"
                      type="password"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      class="q-mb-md"
                    />
                  </Field>

                  <Field
                    name="confirmPassword"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-input
                      v-bind="field"
                      label="確認密碼 *"
                      type="password"
                      outlined
                      dense
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      class="q-mb-md"
                    />
                  </Field>

                  <Field
                    name="role"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-select
                      v-bind="field"
                      label="用戶類型 *"
                      :options="roleOptions"
                      outlined
                      dense
                      emit-value
                      map-options
                      :error="!!errorMessage"
                      :error-message="errorMessage"
                      class="q-mb-md"
                    />
                  </Field>

                  <Field
                    name="agreeToTerms"
                    v-slot="{ field, errorMessage }"
                  >
                    <q-checkbox
                      v-bind="field"
                      :model-value="field.value"
                      label="同意服務條款 *"
                      :error="!!errorMessage"
                      class="q-mb-md"
                    />
                    <div v-if="errorMessage" class="text-negative text-caption">
                      {{ errorMessage }}
                    </div>
                  </Field>

                  <q-btn
                    type="submit"
                    color="primary"
                    :loading="isSubmitting"
                    :disable="Object.keys(errors).length > 0"
                    class="full-width"
                  >
                    測試註冊驗證
                  </q-btn>
                </Form>

                <div v-if="registerResult" class="q-mt-md">
                  <q-banner :class="registerResult.success ? 'bg-green-1 text-green-8' : 'bg-red-1 text-red-8'">
                    <div class="text-weight-bold">
                      {{ registerResult.success ? '驗證通過' : '驗證失敗' }}
                    </div>
                    <div class="text-caption">
                      {{ registerResult.message }}
                    </div>
                  </q-banner>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- 聯絡表單測試 -->
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6 q-mb-md">
                  <q-icon name="contact_mail" class="q-mr-sm" />
                  聯絡表單驗證
                </div>
                
                <Form
                  :validation-schema="contactSchema"
                  @submit="testContact"
                  v-slot="{ errors, isSubmitting }"
                >
                  <div class="row q-gutter-md">
                    <div class="col-12 col-md-6">
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
                        />
                      </Field>
                    </div>
                    <div class="col-12 col-md-6">
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
                        />
                      </Field>
                    </div>
                    <div class="col-12 col-md-6">
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
                        />
                      </Field>
                    </div>
                    <div class="col-12 col-md-6">
                      <Field
                        name="subject"
                        v-slot="{ field, errorMessage }"
                      >
                        <q-input
                          v-bind="field"
                          label="主題 *"
                          outlined
                          dense
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                        />
                      </Field>
                    </div>
                    <div class="col-12">
                      <Field
                        name="message"
                        v-slot="{ field, errorMessage }"
                      >
                        <q-input
                          v-bind="field"
                          label="訊息 *"
                          type="textarea"
                          outlined
                          :error="!!errorMessage"
                          :error-message="errorMessage"
                          rows="4"
                        />
                      </Field>
                    </div>
                  </div>

                  <q-btn
                    type="submit"
                    color="primary"
                    :loading="isSubmitting"
                    :disable="Object.keys(errors).length > 0"
                    class="q-mt-md"
                  >
                    測試聯絡表單驗證
                  </q-btn>
                </Form>

                <div v-if="contactResult" class="q-mt-md">
                  <q-banner :class="contactResult.success ? 'bg-green-1 text-green-8' : 'bg-red-1 text-red-8'">
                    <div class="text-weight-bold">
                      {{ contactResult.success ? '驗證通過' : '驗證失敗' }}
                    </div>
                    <div class="text-caption">
                      {{ contactResult.message }}
                    </div>
                  </q-banner>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- 驗證規則說明 -->
        <q-card flat bordered class="q-mt-md">
          <q-card-section>
            <div class="text-h6 q-mb-md">
              <q-icon name="info" class="q-mr-sm" />
              驗證規則說明
            </div>
            
            <div class="row q-gutter-md">
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 q-mb-sm">電子郵件驗證</div>
                <ul class="text-body2 text-grey-7">
                  <li>必填欄位</li>
                  <li>有效的 email 格式</li>
                  <li>最大長度 100 字符</li>
                </ul>
              </div>
              
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 q-mb-sm">密碼驗證</div>
                <ul class="text-body2 text-grey-7">
                  <li>最少 8 個字符</li>
                  <li>包含大寫字母</li>
                  <li>包含小寫字母</li>
                  <li>包含數字</li>
                  <li>確認密碼必須一致</li>
                </ul>
              </div>
              
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 q-mb-sm">其他驗證</div>
                <ul class="text-body2 text-grey-7">
                  <li>姓名：2-50 字符，中英文</li>
                  <li>電話：台灣手機或市話格式</li>
                  <li>年齡：18-120 歲</li>
                  <li>地址：5-200 字符</li>
                </ul>
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
import { 
  loginSchema, 
  registerSchema, 
  contactSchema,
  type LoginFormData,
  type RegisterFormData,
  type ContactFormData
} from '~/utils/validationSchemas'
import usePageSeo from '~/composables/usePageSeo'

// SEO
usePageSeo('表單驗證測試 - 護理服務平台', '測試各種表單驗證功能的運作情況')

// 組合式函數
const $q = useQuasar()

// 響應式資料
const loginResult = ref<{ success: boolean; message: string } | null>(null)
const registerResult = ref<{ success: boolean; message: string } | null>(null)
const contactResult = ref<{ success: boolean; message: string } | null>(null)

// 選項資料
const roleOptions = [
  { label: '患者/家屬', value: 'patient' },
  { label: '照護員', value: 'caregiver' }
]

// 測試函數
const testLogin = async (values: LoginFormData) => {
  try {
    // 模擬驗證過程
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (values.email && values.password) {
      loginResult.value = {
        success: true,
        message: '登入表單驗證通過！所有欄位都符合要求。'
      }
      
      $q.notify({
        type: 'positive',
        message: '登入表單驗證成功',
        timeout: 2000
      })
    }
  } catch (error: any) {
    loginResult.value = {
      success: false,
      message: `驗證失敗：${error.message}`
    }
    
    $q.notify({
      type: 'negative',
      message: '登入表單驗證失敗',
      timeout: 2000
    })
  }
}

const testRegister = async (values: RegisterFormData) => {
  try {
    // 模擬驗證過程
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (values.name && values.email && values.password && values.confirmPassword && values.role && values.agreeToTerms) {
      registerResult.value = {
        success: true,
        message: '註冊表單驗證通過！所有必填欄位都符合要求。'
      }
      
      $q.notify({
        type: 'positive',
        message: '註冊表單驗證成功',
        timeout: 2000
      })
    }
  } catch (error: any) {
    registerResult.value = {
      success: false,
      message: `驗證失敗：${error.message}`
    }
    
    $q.notify({
      type: 'negative',
      message: '註冊表單驗證失敗',
      timeout: 2000
    })
  }
}

const testContact = async (values: ContactFormData) => {
  try {
    // 模擬驗證過程
    await new Promise(resolve => setTimeout(resolve, 800))
    
    if (values.name && values.email && values.phone && values.subject && values.message) {
      contactResult.value = {
        success: true,
        message: '聯絡表單驗證通過！所有欄位都符合要求。'
      }
      
      $q.notify({
        type: 'positive',
        message: '聯絡表單驗證成功',
        timeout: 2000
      })
    }
  } catch (error: any) {
    contactResult.value = {
      success: false,
      message: `驗證失敗：${error.message}`
    }
    
    $q.notify({
      type: 'negative',
      message: '聯絡表單驗證失敗',
      timeout: 2000
    })
  }
}

// 頁面標題
definePageMeta({
  title: '表單驗證測試'
})
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}

.q-field--outlined .q-field__control:before {
  border-color: #e0e0e0;
}

.q-field--outlined.q-field--focused .q-field__control:before {
  border-color: #1976d2;
  border-width: 2px;
}

ul {
  margin: 0;
  padding-left: 1.2rem;
}

li {
  margin-bottom: 0.25rem;
}
</style>