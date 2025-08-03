<template>
  <q-form @submit.prevent="submit">
    <q-input v-model="name" label="姓名" required class="q-mb-sm" />
    <q-input v-model="phone" label="電話" required class="q-mb-sm" />
    <q-input
      v-model="description"
      label="需求說明"
      type="textarea"
      autogrow
      required
      class="q-mb-sm"
    />
    <q-btn type="submit" color="primary" label="送出" class="full-width" />
    <div v-if="submitted" class="text-positive q-mt-sm">表單已提交！</div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const phone = ref('')
const description = ref('')
const submitted = ref(false)
const emit = defineEmits(['success'])

function submit() {
  submitted.value = true
  emit('success')
  console.log('Consultation', {
    name: name.value,
    phone: phone.value,
    description: description.value,
  })
}
</script>
