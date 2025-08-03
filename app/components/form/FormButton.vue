<template>
  <div class="form-button-wrapper">
    <q-btn
      :type="type"
      :color="color"
      :size="size"
      :class="buttonClass"
      :loading="loading"
      :disable="disable"
      :icon="icon"
      :aria-label="ariaLabel"
      :aria-describedby="hasErrors ? errorId : undefined"
      v-bind="$attrs"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </q-btn>
    
    <!-- 表單錯誤提示 -->
    <div
      v-if="hasErrors && showErrorMessage"
      :id="errorId"
      class="text-negative text-caption q-mt-sm"
      role="alert"
      aria-live="polite"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  color?: string
  size?: string
  label?: string
  loading?: boolean
  disable?: boolean
  icon?: string
  ariaLabel?: string
  hasErrors?: boolean
  errorMessage?: string
  showErrorMessage?: boolean
  errorId?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  color: 'primary',
  size: 'md',
  showErrorMessage: true,
  errorMessage: '請修正表單中的錯誤後再提交',
  errorId: 'form-errors',
  fullWidth: true
})

// 發出事件
const emit = defineEmits<{
  click: [event: Event]
}>()

// 計算屬性
const buttonClass = computed(() => {
  const classes = []
  if (props.fullWidth) classes.push('full-width')
  return classes.join(' ')
})

// 方法
const handleClick = (event: Event) => {
  if (props.type !== 'submit') {
    emit('click', event)
  }
}

// 讓組件能夠透傳屬性
defineOptions({
  inheritAttrs: false
})
</script>

<style scoped>
.form-button-wrapper {
  width: 100%;
}

.q-btn {
  border-radius: 8px;
}
</style>