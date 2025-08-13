<template>
  <q-page class="auth-page">
    <div class="auth-container">
      <q-card class="auth-card">
        <!-- Logo 和標題 -->
        <q-card-section class="text-center q-pb-none">
          <q-icon name="medical_services" size="64px" color="primary" />
          <h1 class="text-h4 q-mt-md q-mb-xs">建立新帳號</h1>
          <p class="text-grey-6">加入我們的照護服務平台</p>
        </q-card-section>

        <!-- 註冊表單 -->
        <q-card-section class="q-px-lg">
          <q-form @submit="handleRegister" class="q-gutter-md">
            <!-- 帳號類型選擇 -->
            <div class="role-selector q-mb-md">
              <q-btn-toggle
                v-model="form.role"
                spread
                no-caps
                unelevated
                toggle-color="primary"
                color="white"
                text-color="primary"
                :options="[
                  {label: '我要找看護', value: 'patient'},
                  {label: '我要當看護', value: 'caregiver'}
                ]"
              />
            </div>

            <!-- 姓名 -->
            <q-input
              v-model="form.name"
              label="姓名"
              filled
              lazy-rules
              :rules="[val => !!val || '請輸入姓名']"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <!-- 電子郵件 -->
            <q-input
              v-model="form.email"
              type="email"
              label="電子郵件"
              filled
              lazy-rules
              :rules="[
                val => !!val || '請輸入電子郵件',
                val => isValidEmail(val) || '請輸入有效的電子郵件'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>

            <!-- 手機號碼 -->
            <q-input
              v-model="form.phone"
              label="手機號碼"
              filled
              mask="####-###-###"
              lazy-rules
              :rules="[val => !!val || '請輸入手機號碼']"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>

            <!-- 密碼 -->
            <q-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              label="密碼"
              filled
              lazy-rules
              :rules="[
                val => !!val || '請輸入密碼',
                val => val.length >= 8 || '密碼至少需要8個字元'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <!-- 確認密碼 -->
            <q-input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              label="確認密碼"
              filled
              lazy-rules
              :rules="[
                val => !!val || '請確認密碼',
                val => val === form.password || '密碼不相符'
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <!-- 服務條款 -->
            <q-checkbox
              v-model="acceptTerms"
              class="q-mb-md"
            >
              <template v-slot:default>
                <span class="text-grey-7">
                  我同意
                  <a href="/terms" class="text-primary">服務條款</a>
                  和
                  <a href="/privacy" class="text-primary">隱私政策</a>
                </span>
              </template>
            </q-checkbox>

            <!-- 錯誤訊息 -->
            <q-banner v-if="errorMessage" class="bg-negative text-white">
              {{ errorMessage }}
            </q-banner>

            <!-- 註冊按鈕 -->
            <q-btn
              type="submit"
              color="primary"
              class="full-width"
              size="lg"
              label="註冊"
              :loading="loading"
              :disable="loading || !acceptTerms"
            />
          </q-form>

          <!-- 分隔線 -->
          <div class="divider q-my-lg">
            <span>或</span>
          </div>

          <!-- 社交註冊 -->
          <div class="social-login q-gutter-sm">
            <q-btn
              outline
              color="grey-8"
              class="full-width"
              size="md"
              icon="img:https://www.google.com/favicon.ico"
              label="使用 Google 註冊"
              @click="handleGoogleRegister"
            />
            <q-btn
              outline
              color="grey-8"
              class="full-width"
              size="md"
              icon="img:https://www.facebook.com/favicon.ico"
              label="使用 Facebook 註冊"
              @click="handleFacebookRegister"
            />
          </div>

          <!-- 登入連結 -->
          <div class="text-center q-mt-lg">
            <span class="text-grey-6">已經有帳號？</span>
            <q-btn
              flat
              dense
              no-caps
              color="primary"
              label="立即登入"
              @click="router.push('/auth/login')"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// 表單資料
const form = ref({
  role: 'patient',
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})

const showPassword = ref(false)
const acceptTerms = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// 驗證電子郵件格式
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 處理註冊
const handleRegister = async () => {
  if (!acceptTerms.value) {
    errorMessage.value = '請同意服務條款和隱私政策'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        phone: form.value.phone,
        role: form.value.role,
      },
    })

    if (response?.user) {
      $q.notify({
        type: 'positive',
        message: '註冊成功！歡迎加入我們',
        timeout: 3000,
      })
      
      // 跳轉到首頁或個人資料頁
      if (form.value.role === 'caregiver') {
        router.push('/profile/caregiver')
      } else {
        router.push('/')
      }
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '註冊失敗，請稍後再試'
    console.error('Register error:', error)
  } finally {
    loading.value = false
  }
}

// 社交註冊
const handleGoogleRegister = () => {
  $q.notify({
    type: 'info',
    message: 'Google 註冊功能開發中',
  })
}

const handleFacebookRegister = () => {
  $q.notify({
    type: 'info',
    message: 'Facebook 註冊功能開發中',
  })
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.auth-container {
  width: 100%;
  max-width: 450px;
}

.auth-card {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.role-selector {
  background: #f5f5f5;
  padding: 4px;
  border-radius: 8px;
}

.divider {
  position: relative;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e0e0e0;
}

.divider span {
  position: relative;
  padding: 0 16px;
  background: white;
  color: #9e9e9e;
}

/* 響應式設計 */
@media (max-width: 480px) {
  .auth-container {
    max-width: 100%;
  }
  
  .auth-card {
    border-radius: 12px;
  }
}
</style>