<template>
  <q-page class="flex flex-center auth-page">
    <!-- 動態背景元素 -->
    <div class="auth-bg-pattern"></div>

    <div class="auth-container animate-fade-in">
      <!-- Logo and Title -->
      <div class="text-center q-mb-lg">
        <div class="logo-wrapper q-mb-md">
          <q-icon name="medical_services" size="80px" color="white" />
          <div class="logo-pulse"></div>
        </div>
        <h1
          class="text-h3 text-weight-bold text-white q-mb-sm animate-slide-down"
        >
          歡迎回來
        </h1>
        <p class="text-subtitle1 text-white opacity-90 animate-slide-up">
          登入您的護理服務平台帳號
        </p>
      </div>

      <!-- Login Card -->
      <q-card flat class="auth-card">
        <q-card-section class="q-pa-xl">
          <q-form class="q-gutter-lg" @submit="handleSubmit">
            <!-- Form Title -->
            <div
              class="text-h5 text-center text-weight-medium text-grey-8 q-mb-lg"
            >
              登入帳號
            </div>

            <!-- Email Field -->
            <div class="input-wrapper">
              <q-input
                v-model="form.email"
                type="email"
                label="電子郵件"
                :rules="[
                  (val) => !!val || '請輸入電子郵件',
                  (val) => /.+@.+\..+/.test(val) || '請輸入有效的電子郵件',
                ]"
                lazy-rules
                outlined
                rounded
                class="custom-input"
              >
                <template #prepend>
                  <q-icon name="email" class="input-icon" />
                </template>
              </q-input>
            </div>

            <!-- Password Field -->
            <div class="input-wrapper">
              <q-input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                label="密碼"
                :rules="[
                  (val) => !!val || '請輸入密碼',
                  (val) => val.length >= 6 || '密碼至少需要 6 個字元',
                ]"
                lazy-rules
                outlined
                rounded
                class="custom-input"
              >
                <template #prepend>
                  <q-icon name="lock" class="input-icon" />
                </template>
                <template #append>
                  <q-btn
                    :icon="showPassword ? 'visibility_off' : 'visibility'"
                    flat
                    round
                    dense
                    class="visibility-toggle"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="row justify-between items-center q-mb-lg">
              <q-checkbox v-model="rememberMe" label="記住我" color="primary" />
              <q-btn
                flat
                no-caps
                color="primary"
                label="忘記密碼？"
                @click="showForgotPasswordDialog = true"
              />
            </div>

            <!-- Submit Button -->
            <q-btn
              type="submit"
              size="lg"
              label="登入"
              class="full-width submit-btn"
              rounded
              unelevated
              :loading="loading"
              :disable="!form.email || !form.password"
            >
              <template #loading>
                <q-spinner-dots />
              </template>
            </q-btn>

            <!-- Divider -->
            <div class="row items-center q-my-lg">
              <q-separator class="col" />
              <span class="q-mx-md text-grey-6">或</span>
              <q-separator class="col" />
            </div>

            <!-- Social Login -->
            <div class="q-gutter-sm">
              <q-btn
                outline
                size="md"
                label="使用 Google 登入"
                class="full-width social-btn google-btn"
                rounded
                @click="handleSocialLogin('google')"
              >
                <q-icon
                  name="img:https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                  class="q-mr-sm"
                />
              </q-btn>
              <q-btn
                outline
                size="md"
                label="使用 Facebook 登入"
                class="full-width social-btn facebook-btn"
                rounded
                @click="handleSocialLogin('facebook')"
              >
                <q-icon
                  name="img:https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                  class="q-mr-sm"
                />
              </q-btn>
            </div>

            <!-- Test Account Info (Dev Only) -->
            <q-expansion-item
              v-if="isDevelopment"
              icon="info"
              label="測試帳號資訊"
              class="q-mt-lg"
              header-class="text-grey-7"
            >
              <q-card>
                <q-card-section class="bg-blue-1">
                  <q-list>
                    <q-item clickable @click="fillTestAccount('patient')">
                      <q-item-section avatar>
                        <q-icon name="person" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>患者帳號</q-item-label>
                        <q-item-label caption
                          >zhiming.lin@email.com / password123</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="fillTestAccount('caregiver')">
                      <q-item-section avatar>
                        <q-icon name="medical_services" color="primary" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>照護員帳號</q-item-label>
                        <q-item-label caption
                          >meiling.chen@email.com / password123</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <!-- Register Link -->
            <div class="text-center q-mt-lg">
              <span class="text-grey-7">還沒有帳號？</span>
              <q-btn
                flat
                no-caps
                color="primary"
                label="立即註冊"
                @click="$router.push('/auth/register')"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <!-- Forgot Password Dialog -->
    <q-dialog v-model="showForgotPasswordDialog" position="standard">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">重設密碼</div>
          <q-space />
          <q-btn v-close-popup icon="close" flat round dense />
        </q-card-section>

        <q-card-section>
          <p class="text-grey-7 q-mb-lg">
            輸入您的電子郵件地址，我們會發送密碼重設連結給您。
          </p>
          <q-input
            v-model="resetEmail"
            type="email"
            label="電子郵件"
            outlined
            rounded
            :rules="[
              (val) => !!val || '請輸入電子郵件',
              (val) => /.+@.+\..+/.test(val) || '請輸入有效的電子郵件',
            ]"
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn v-close-popup flat label="取消" color="grey" />
          <q-btn
            unelevated
            label="發送重設郵件"
            color="primary"
            :loading="resetLoading"
            @click="handleForgotPassword"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from '~/stores/auth'

// Composables
const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

// Form data
const form = ref({
  email: '',
  password: '',
})

// State
const loading = ref(false)
const resetLoading = ref(false)
const rememberMe = ref(false)
const showPassword = ref(false)
const showForgotPasswordDialog = ref(false)
const resetEmail = ref('')

// Environment
const isDevelopment = process.env.NODE_ENV === 'development'

// Test accounts
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

// Fill test account
const fillTestAccount = (type: 'patient' | 'caregiver') => {
  const account = testAccounts[type]
  form.value.email = account.email
  form.value.password = account.password

  $q.notify({
    type: 'info',
    message: `已填入${type === 'patient' ? '患者' : '照護員'}測試帳號`,
    position: 'top',
  })
}

// Handle login
const handleSubmit = async () => {
  loading.value = true

  try {
    await authStore.login(form.value)

    $q.notify({
      type: 'positive',
      message: '登入成功！',
      icon: 'check_circle',
      position: 'top',
    })

    // Redirect based on user role
    if (authStore.isPatient) {
      router.push('/user/dashboard')
    } else if (authStore.isCaregiver) {
      router.push('/caregivers/dashboard')
    } else {
      router.push('/')
    }
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || '登入失敗，請檢查您的帳號密碼',
      position: 'top',
    })
  } finally {
    loading.value = false
  }
}

// Handle forgot password
const handleForgotPassword = async () => {
  if (!resetEmail.value || !/.+@.+\..+/.test(resetEmail.value)) {
    $q.notify({
      type: 'warning',
      message: '請輸入有效的電子郵件地址',
      position: 'top',
    })
    return
  }

  resetLoading.value = true

  try {
    await authStore.resetPassword(resetEmail.value)

    $q.notify({
      type: 'positive',
      message: '密碼重設郵件已發送，請檢查您的信箱',
      icon: 'email',
      position: 'top',
    })

    showForgotPasswordDialog.value = false
    resetEmail.value = ''
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.message || '發送失敗，請稍後再試',
      position: 'top',
    })
  } finally {
    resetLoading.value = false
  }
}

// Handle social login
const handleSocialLogin = (provider: string) => {
  $q.notify({
    type: 'info',
    message: `${provider} 登入功能即將推出`,
    position: 'top',
  })
}

// Page meta
useHead({
  title: '登入 - 專業護理服務平台',
  meta: [
    { name: 'description', content: '登入您的護理服務平台帳號，管理照護服務' },
  ],
})

definePageMeta({
  layout: 'auth',
})
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  position: relative;
  overflow: hidden;
}

/* 動態背景圖案 */
.auth-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(
      circle at 20% 50%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 40% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
  animation: bgMove 20s ease-in-out infinite;
}

.auth-bg-pattern::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.03) 10px,
    rgba(255, 255, 255, 0.03) 20px
  );
  animation: bgSlide 60s linear infinite;
}

@keyframes bgMove {
  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
}

@keyframes bgSlide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}

/* Logo 樣式 */
.logo-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.logo-pulse {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 70%
  );
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0;
  }
}

/* 容器樣式 */
.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 20px;
  z-index: 10;
  position: relative;
}

/* 卡片樣式 */
.auth-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

/* 輸入框樣式 */
.input-wrapper {
  position: relative;
}

.custom-input {
  transition: all 0.3s ease;
}

.custom-input:hover {
  transform: translateY(-2px);
}

.custom-input :deep(.q-field__control) {
  background: #f8f9fa;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.custom-input.q-field--focused :deep(.q-field__control) {
  background: white;
  border-color: #1976d2;
  box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.1);
}

.input-icon {
  color: #718096;
  transition: color 0.3s ease;
}

.custom-input.q-field--focused .input-icon {
  color: #1976d2;
}

.visibility-toggle {
  color: #718096;
  transition: all 0.3s ease;
}

.visibility-toggle:hover {
  color: #1976d2;
  background: rgba(25, 118, 210, 0.1);
}

/* 提交按鈕樣式 */
.submit-btn {
  background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0 2rem;
  height: 48px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
}

.submit-btn:hover::before {
  width: 300px;
  height: 300px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(25, 118, 210, 0.3);
}

.submit-btn:disabled {
  background: #cbd5e0;
  opacity: 0.7;
}

/* 社交登入按鈕 */
.social-btn {
  border: 2px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.3s ease;
  height: 44px;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.google-btn:hover {
  border-color: #4285f4;
  color: #4285f4;
  background: rgba(66, 133, 244, 0.05);
}

.facebook-btn:hover {
  border-color: #1877f2;
  color: #1877f2;
  background: rgba(24, 119, 242, 0.05);
}

/* 動畫類 */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-down {
  animation: slideDown 0.8s ease-out 0.2s both;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out 0.4s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
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
@media (max-width: 600px) {
  .auth-container {
    padding: 16px;
  }

  .auth-card {
    border-radius: 20px;
  }

  .q-card-section {
    padding: 24px !important;
  }

  .logo-wrapper {
    width: 100px;
    height: 100px;
  }

  .text-h3 {
    font-size: 1.75rem !important;
  }

  .submit-btn,
  .social-btn {
    height: 42px;
    font-size: 0.95rem;
  }
}

@media (max-width: 400px) {
  .auth-container {
    padding: 12px;
  }

  .q-card-section {
    padding: 20px !important;
  }

  .text-h3 {
    font-size: 1.5rem !important;
  }

  .text-subtitle1 {
    font-size: 0.9rem !important;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .auth-card {
    background: rgba(30, 30, 30, 0.95);
    color: white;
  }

  .custom-input :deep(.q-field__control) {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  .custom-input :deep(.q-field__label) {
    color: rgba(255, 255, 255, 0.7);
  }

  .social-btn {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
}
</style>
