<template>
  <q-page class="auth-page">
    <div class="auth-container">
      <q-card class="auth-card">
        <!-- Logo 和標題 -->
        <q-card-section class="text-center q-pb-none">
          <q-icon name="medical_services" size="64px" color="primary" />
          <h1 class="text-h4 q-mt-md q-mb-xs">歡迎回來</h1>
          <p class="text-grey-6">登入您的帳號以繼續</p>
        </q-card-section>

        <!-- 登入表單 -->
        <q-card-section class="q-px-lg">
          <q-form @submit="handleLogin" class="q-gutter-md">
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

            <q-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              label="密碼"
              filled
              lazy-rules
              :rules="[val => !!val || '請輸入密碼']"
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

            <!-- 記住我和忘記密碼 -->
            <div class="row items-center justify-between">
              <q-checkbox v-model="rememberMe" label="記住我" />
              <q-btn
                flat
                dense
                no-caps
                color="primary"
                label="忘記密碼？"
                @click="navigateTo('/auth/forgot-password')"
              />
            </div>

            <!-- 錯誤訊息 -->
            <q-banner v-if="errorMessage" class="bg-negative text-white">
              {{ errorMessage }}
            </q-banner>

            <!-- 登入按鈕 -->
            <q-btn
              type="submit"
              color="primary"
              class="full-width"
              size="lg"
              label="登入"
              :loading="loading"
              :disable="loading"
            />
          </q-form>

          <!-- 分隔線 -->
          <div class="divider q-my-lg">
            <span>或</span>
          </div>

          <!-- 社交登入 -->
          <div class="social-login q-gutter-sm">
            <q-btn
              outline
              color="grey-8"
              class="full-width"
              size="md"
              icon="img:https://www.google.com/favicon.ico"
              label="使用 Google 登入"
              @click="handleGoogleLogin"
            />
            <q-btn
              outline
              color="grey-8"
              class="full-width"
              size="md"
              icon="img:https://www.facebook.com/favicon.ico"
              label="使用 Facebook 登入"
              @click="handleFacebookLogin"
            />
          </div>

          <!-- 註冊連結 -->
          <div class="text-center q-mt-lg">
            <span class="text-grey-6">還沒有帳號？</span>
            <q-btn
              flat
              dense
              no-caps
              color="primary"
              label="立即註冊"
              @click="navigateTo('/auth/register')"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- 測試帳號提示 -->
      <q-card class="test-account-card q-mt-md">
        <q-card-section class="q-py-sm">
          <div class="text-caption text-grey-6">
            <q-icon name="info" size="16px" class="q-mr-xs" />
            測試帳號：test@example.com / password123
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
  email: '',
  password: '',
})

const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const errorMessage = ref('')

// 驗證電子郵件格式
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 處理登入
const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    })

    if (response?.user) {
      $q.notify({
        type: 'positive',
        message: '登入成功！',
        timeout: 2000,
      })
      
      // 儲存到 localStorage（如果勾選記住我）
      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', form.value.email)
      }
      
      // 跳轉到首頁或之前的頁面
      const redirectTo = router.currentRoute.value.query.redirect as string || '/'
      router.push(redirectTo)
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '登入失敗，請檢查您的帳號密碼'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// 社交登入
const handleGoogleLogin = () => {
  $q.notify({
    type: 'info',
    message: 'Google 登入功能開發中',
  })
}

const handleFacebookLogin = () => {
  $q.notify({
    type: 'info',
    message: 'Facebook 登入功能開發中',
  })
}

// 載入記住的電子郵件
onMounted(() => {
  const rememberedEmail = localStorage.getItem('rememberedEmail')
  if (rememberedEmail) {
    form.value.email = rememberedEmail
    rememberMe.value = true
  }
})
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

.test-account-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
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