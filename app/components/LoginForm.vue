<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const emit = defineEmits(['success'])

function submit() {
  error.value = ''
  try {
    auth.login(email.value, password.value)
    emit('success')
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <q-form @submit.prevent="submit">
    <q-input v-model="email" label="電子郵件" type="email" required class="q-mb-sm" />
    <q-input v-model="password" label="密碼" type="password" required class="q-mb-sm" />
    <div class="text-negative q-mb-sm">{{ error }}</div>
    <q-btn type="submit" color="primary" label="登入" class="full-width" />
    <div class="q-mt-sm text-right">
      <q-btn flat size="sm" label="忘記密碼？" />
    </div>
  </q-form>
</template>
