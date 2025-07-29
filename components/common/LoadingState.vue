<template>
  <div v-if="loading" class="text-center q-pa-lg">
    <component :is="spinnerComponent" size="50px" color="primary" />
    <div class="text-body2 q-mt-md">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  loading: boolean
  message?: string
  spinnerType?: 'dots' | 'grid' | 'hourglass' | 'rings'
}

const props = withDefaults(defineProps<Props>(), {
  message: '載入中...',
  spinnerType: 'dots'
})

const spinnerComponent = computed(() => {
  const spinnerMap = {
    dots: 'q-spinner-dots',
    grid: 'q-spinner-grid', 
    hourglass: 'q-spinner-hourglass',
    rings: 'q-spinner-rings'
  }
  return spinnerMap[props.spinnerType] || 'q-spinner-dots'
})
</script>