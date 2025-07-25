<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <q-card
      flat
      bordered
      class="login-card"
      style="min-width: 400px; max-width: 450px; width: 100%"
    >
      <q-card-section class="text-center q-pb-none">
        <div class="text-h5 text-primary q-mb-sm">
          <q-icon name="login" size="md" class="q-mr-sm" />
          登入帳號
        </div>
        <div class="text-grey-6 text-body2">歡迎回到護理服務平台</div>
      </q-card-section>

      <q-card-section>
        <Form
          :validation-schema="loginSchema"
          @submit="handleSubmit"
          v-slot="{ errors, isSubmitting }"
        >
          <!-- 電子郵件 -->
          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <Field name="email" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="電子郵件"
                  type="email"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="請輸入您的電子郵件"
                  autocomplete="email"
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

          <!-- 密碼 -->
          <div class="row q-gutter-md q-mb-lg">
            <div class="col">
              <Field name="password" v-slot="{ field, errorMessage }">
                <q-input
                  v-bind="field"
                  label="密碼"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  dense
                  :error="!!errorMessage"
                  :error-message="errorMessage"
                  placeholder="請輸入您的密碼"
                  autocomplete="current-password"
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

          <!-- 記住我和忘記密碼 -->
          <div class="row justify-between items-center q-mb-lg">
            <q-checkbox
              v-model="rememberMe"
              label="記住我"
              color="primary"
              size="sm"
            />
            <q-btn
              flat
              no-caps
              color="primary"
              size="sm"
              @click="showForgotPasswordDialog = true"
            >
              忘記密碼？
            </q-btn>
          </div>

          <!-- 登入按鈕 -->
          <div class="row q-gutter-md q-mb-md">
            <div class="col">
              <q-btn
                type="submit"
                color="primary"
                size="lg"
                class="full-width"
                :loading="isSubmitting || loading"
                :disable="Object.keys(errors).length > 0"
                icon="login"
                aria-label="提交登入表單"
                :aria-describedby="Object.keys(errors).length > 0 ? 'form-errors' : undefined"
              >
                {{ isSubmitting ? '登入中...' : '登入' }}
              </q-btn>
              <!-- 表單錯誤提示 -->
              <div
                v-if="Object.keys(errors).length > 0"
                id="form-errors"
                class="text-negative text-caption q-mt-sm"
                role="alert"
                aria-live="polite"
              >
                請修正表單中的錯誤後再提交
              </div>
            </div>
          </div>

          <!-- 測試帳號提示 (僅開發環境) -->
          <q-expansion-item
            v-if="isDevelopment"
            icon="info"
            label="測試帳號資訊"
            class="q-mb-md"
            header-class="text-grey-6 text-caption"
          >
            <div class="q-pa-md bg-blue-1">
              <div class="text-caption text-grey-7 q-mb-sm">
                您可以使用以下測試帳號進行登入：
              </div>
              <div class="q-mb-xs">
                <strong>患者帳號：</strong>
                <q-btn
                  flat
                  dense
                  size="sm"
                  color="primary"
                  @click="fillTestAccount('patient')"
                >
                  zhiming.lin@email.com
                </q-btn>
              </div>
              <div class="q-mb-xs">
                <strong>照護員帳號：</strong>
                <q-btn
                  flat
                  dense
                  size="sm"
                  color="primary"
                  @click="fillTestAccount('caregiver')"
                >
                  meiling.chen@email.com
                </q-btn>
              </div>
              <div class="text-caption text-grey-6">密碼：password123</div>
            </div>
          </q-expansion-item>

          <!-- 註冊連結 -->
          <div class="text-center">
            <div class="text-body2 text-grey-6">
              還沒有帳號？
              <router-link
                to="/auth/register"
                class="text-primary text-decoration-none"
              >
                立即註冊
              </router-link>
            </div>
          </div>
        </Form>
      </q-card-section>
    </q-card>

    <!-- 忘記密碼對話框 -->
    <q-dialog v-model="showForgotPasswordDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">重設密碼</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <Form
            :validation-schema="passwordResetSchema"
            @submit="handleForgotPassword"
            v-slot="{ errors: resetErrors, isSubmitting: isResetting }"
          >
            <Field name="email" v-slot="{ field, errorMessage }">
              <q-input
                v-bind="field"
                label="電子郵件"
                type="email"
                outlined
                dense
                :error="!!errorMessage"
                :error-message="errorMessage"
                placeholder="請輸入您的電子郵件"
              />
            </Field>

            <div class="row q-gutter-sm q-mt-md">
              <q-btn
                flat
                label="取消"
                @click="showForgotPasswordDialog = false"
              />
              <q-btn
                type="submit"
                color="primary"
                label="發送重設郵件"
                :loading="isResetting"
                :disable="Object.keys(resetErrors).length > 0"
              />
            </div>
          </Form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- 錯誤訊息對話框 -->
    <q-dialog v-model="showErrorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-negative">
            <q-icon name="error" class="q-mr-sm" />
            登入失敗
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
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, useForm } from 'vee-validate'
import { useQuasar } from 'quasar'
import {
  loginSchema,
  passwordResetSchema,
  type LoginFormData,
  type PasswordResetFormData,
} from '~/utils/validationSchemas'
import { useAuthStore } from '~/stores/auth'
import usePageSeo from '~/composables/usePageSeo'

// SEO
usePageSeo('登入 - 護理服務平台', '登入您的護理服務平台帳號，管理照護服務')

// 組合式函數
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// 響應式資料
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)
const showForgotPasswordDialog = ref(false)
const showErrorDialog = ref(false)
const errorMessage = ref('')

// 環境判斷
const isDevelopment = process.env.NODE_ENV === 'development'

// 表單引用
const { setFieldValue } = useForm()

// 測試帳號資料
const testAccounts = {
  patient: {
    email: 'zhiming.lin@email.com',
    password: 'password123',
  },
  caregiver: {
    email: 'meiling.chen@email.com',
    password: 'password123',
  },
}

// 填入測試帳號資料
const fillTestAccount = async (type: 'patient' | 'caregiver') => {
  const account = testAccounts[type]

  // 需要等待下一個 tick 確保 VeeValidate 已經初始化
  await nextTick()

  try {
    setFieldValue('email', account.email)
    setFieldValue('password', account.password)

    $q.notify({
      type: 'info',
      message: `已填入${type === 'patient' ? '患者' : '照護員'}測試帳號`,
      timeout: 2000,
    })
  } catch (error) {
    console.error('填入測試帳號失敗:', error)
  }
}

// 登入表單提交處理
const handleSubmit = async (values: LoginFormData) => {
  loading.value = true

  try {
    // 呼叫登入 API
    await authStore.login(values)

    // 登入成功
    $q.notify({
      type: 'positive',
      message: '登入成功！歡迎回來',
      icon: 'check_circle',
      timeout: 3000,
    })

    // 根據用戶角色跳轉到相應頁面
    const user = authStore.currentUser
    if (user?.role === 'caregiver') {
      await router.push('/caregivers')
    } else {
      await router.push('/user/dashboard')
    }
  } catch (error: any) {
    console.error('登入失敗:', error)

    errorMessage.value = error.message || '登入過程發生錯誤，請稍後再試'
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

// 忘記密碼處理
const handleForgotPassword = async (values: PasswordResetFormData) => {
  try {
    await authStore.resetPassword(values.email)

    $q.notify({
      type: 'positive',
      message: '密碼重設郵件已發送，請檢查您的信箱',
      icon: 'email',
      timeout: 5000,
    })

    showForgotPasswordDialog.value = false
  } catch (error: any) {
    console.error('密碼重設失敗:', error)

    $q.notify({
      type: 'negative',
      message: error.message || '密碼重設失敗，請稍後再試',
      icon: 'error',
      timeout: 5000,
    })
  }
}

// 頁面標題
definePageMeta({
  title: '登入',
  layout: 'auth',
})
</script>

<style scoped>
.login-card {
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
  border: 1px solid #e3f2fd;
  border-radius: 8px;
}

.text-decoration-none {
  text-decoration: none;
}

.text-decoration-none:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .login-card {
    min-width: 300px;
    margin: 1rem;
  }
}
</style>
