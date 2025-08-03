<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const auth = useAuthStore()
const emit = defineEmits(['success'])

function submit() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = '密碼不一致'
    return
  }
  try {
    auth.register(name.value, email.value, password.value)
    emit('success')
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <q-form @submit.prevent="submit">
    <q-input v-model="name" label="姓名" required class="q-mb-sm" />
    <q-input v-model="email" label="電子郵件" type="email" required class="q-mb-sm" />
    <q-input v-model="password" label="密碼" type="password" required class="q-mb-sm" />
    <q-input v-model="confirmPassword" label="確認密碼" type="password" required class="q-mb-sm" />
    <div class="text-negative q-mb-sm">{{ error }}</div>
    <q-btn type="submit" color="primary" label="提交" class="full-width" />
  </q-form>
</template>
