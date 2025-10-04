<template>
  <q-page class="flex flex-center admin-login-page">
    <q-card class="login-card" flat bordered>
      <q-card-section class="text-center q-pt-lg">
        <div class="text-h4 text-primary q-mb-sm">管理後台</div>
        <div class="text-subtitle1 text-grey-7">請登入以繼續</div>
      </q-card-section>

      <q-card-section>
        <Form :validation-schema="schema" @submit="handleLogin">
          <div class="q-gutter-md">
            <!-- Email -->
            <Field v-slot="{ field, errorMessage }" name="email">
              <q-input
                v-bind="field"
                :model-value="field.value"
                type="email"
                label="電子郵件"
                outlined
                :error="!!errorMessage"
                :error-message="errorMessage"
                autocomplete="email"
                @update:model-value="field.onChange"
              >
                <template #prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
            </Field>

            <!-- Password -->
            <Field v-slot="{ field, errorMessage }" name="password">
              <q-input
                v-bind="field"
                :model-value="field.value"
                :type="showPassword ? 'text' : 'password'"
                label="密碼"
                outlined
                :error="!!errorMessage"
                :error-message="errorMessage"
                autocomplete="current-password"
                @update:model-value="field.onChange"
              >
                <template #prepend>
                  <q-icon name="lock" />
                </template>
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </Field>

            <!-- Remember Me -->
            <q-checkbox
              v-model="rememberMe"
              label="記住我的帳號"
              color="primary"
            />

            <!-- Error Message -->
            <q-banner
              v-if="adminStore.error"
              class="text-negative bg-red-1"
              rounded
            >
              <template #avatar>
                <q-icon name="error" color="negative" />
              </template>
              {{ adminStore.error }}
            </q-banner>

            <!-- Submit Button -->
            <q-btn
              type="submit"
              label="登入"
              color="primary"
              class="full-width"
              size="lg"
              :loading="adminStore.loading"
              :disable="adminStore.loading"
            />
          </div>
        </Form>
      </q-card-section>

      <!-- 測試帳號提示 -->
      <q-card-section class="text-center q-pt-none">
        <q-expansion-item
          label="測試帳號"
          icon="info"
          dense
          header-class="text-grey-7"
        >
          <q-card flat class="bg-grey-2 q-pa-sm">
            <div class="text-caption">
              <div>超級管理員：admin@example.com / admin123</div>
              <div>一般管理員：manager@example.com / manager123</div>
              <div>客服人員：operator@example.com / operator123</div>
            </div>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-center">
        <q-btn
          flat
          color="primary"
          label="返回首頁"
          icon="home"
          @click="navigateTo('/')"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useQuasar } from 'quasar'
import { useAdminStore } from '~/stores/admin'

// 設定頁面 meta
definePageMeta({
  layout: 'auth', // 使用 auth layout
})

const adminStore = useAdminStore()
const $q = useQuasar()
const router = useRouter()

// 導航函數
const navigateTo = (path: string) => {
  router.push(path)
}

// 表單驗證
const schema = yup.object({
  email: yup.string().required('請輸入電子郵件').email('請輸入有效的電子郵件'),
  password: yup.string().required('請輸入密碼').min(6, '密碼至少需要 6 個字元'),
})

// 狀態
const showPassword = ref(false)
const rememberMe = ref(false)

// 登入處理
const handleLogin = async (values: any) => {
  try {
    await adminStore.login(values.email, values.password)

    // 記住帳號
    if (rememberMe.value) {
      localStorage.setItem('admin_email', values.email)
    } else {
      localStorage.removeItem('admin_email')
    }

    $q.notify({
      type: 'positive',
      message: '登入成功',
      position: 'top',
    })
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.data?.message || '登入失敗',
      position: 'top',
    })
  }
}

// 載入記住的帳號
onMounted(() => {
  const savedEmail = localStorage.getItem('admin_email')
  if (savedEmail) {
    rememberMe.value = true
    // TODO: 設定表單預設值
  }
})
</script>

<style scoped>
.admin-login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: white;
}
</style>
