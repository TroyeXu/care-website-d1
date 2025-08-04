<template>
  <Field v-slot="{ field, errorMessage }" :name="name">
    <q-input
      v-bind="{ ...field, ...$attrs }"
      :model-value="field.value"
      :label="label"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :aria-label="ariaLabel || label"
      :autocomplete="autocomplete"
      outlined
      dense
      :error="!!errorMessage"
      :error-message="errorMessage"
      @update:model-value="field['onUpdate:modelValue']"
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
          :aria-label="showPassword ? hideLabel : showLabel"
          tabindex="-1"
          @click="togglePasswordVisibility"
        />
      </template>

      <!-- 允許父組件自定義插槽內容 -->
      <template v-for="(_, slot) of $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-input>
  </Field>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  name: string
  label: string
  placeholder?: string
  ariaLabel?: string
  autocomplete?: string
  showLabel?: string
  hideLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  autocomplete: 'current-password',
  showLabel: '顯示密碼',
  hideLabel: '隱藏密碼',
})

// 響應式狀態
const showPassword = ref(false)

// 計算屬性
const showLabel = computed(() => props.showLabel)
const hideLabel = computed(() => props.hideLabel)

// 方法
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 讓組件能夠透傳屬性
defineOptions({
  inheritAttrs: false,
})
</script>
