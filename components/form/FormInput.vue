<template>
  <Field :name="name" v-slot="{ field, errorMessage }">
    <q-input
      v-bind="field"
      :label="label"
      :type="type"
      :placeholder="placeholder"
      :mask="mask"
      :suffix="suffix"
      :min="min"
      :max="max"
      :aria-label="ariaLabel || label"
      :clearable="clearable"
      :autocomplete="autocomplete"
      outlined
      dense
      :error="!!errorMessage"
      :error-message="errorMessage"
      v-bind="$attrs"
    >
      <template v-if="icon" #prepend>
        <q-icon :name="icon" color="primary" />
      </template>
      
      <!-- 允許父組件自定義插槽內容 -->
      <template v-for="(_, slot) of $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </q-input>
  </Field>
</template>

<script setup lang="ts">
interface Props {
  name: string
  label: string
  type?: string
  placeholder?: string
  icon?: string
  mask?: string
  suffix?: string
  min?: string | number
  max?: string | number
  ariaLabel?: string
  clearable?: boolean
  autocomplete?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  clearable: true
})

// 讓組件能夠透傳屬性
defineOptions({
  inheritAttrs: false
})
</script>