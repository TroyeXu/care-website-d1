<template>
  <q-card flat :class="cardClass" @click="handleClick">
    <q-card-section class="text-center">
      <div v-if="icon" class="q-mb-sm">
        <q-icon :name="icon" :size="iconSize" :color="iconColor" />
      </div>
      <div :class="valueClass">
        {{ formattedValue }}
      </div>
      <div :class="labelClass">
        {{ label }}
      </div>
      <div v-if="description" class="text-caption text-grey-6 q-mt-xs">
        {{ description }}
      </div>
    </q-card-section>

    <!-- 可選的操作區域 -->
    <q-card-actions v-if="$slots.actions" align="center">
      <slot name="actions" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: string | number
  label: string
  description?: string
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'grey'
  icon?: string
  iconSize?: string
  prefix?: string
  suffix?: string
  loading?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue',
  iconSize: '2em',
  loading: false,
  clickable: false,
})

const emit = defineEmits<{
  click: []
}>()

// 計算屬性
const cardClass = computed(() => {
  const classes = [`bg-${props.color}-1`]
  if (props.clickable) {
    classes.push('cursor-pointer', 'stat-card-hover')
  }
  return classes.join(' ')
})

const valueClass = computed(() => `text-h6 text-${props.color}-8`)
const labelClass = computed(() => `text-caption text-${props.color}-6`)
const iconColor = computed(() => `${props.color}-6`)

const formattedValue = computed(() => {
  if (props.loading) return '---'

  let value = props.value

  // 如果是數字，進行格式化
  if (typeof value === 'number') {
    value = value.toLocaleString()
  }

  return `${props.prefix || ''}${value}${props.suffix || ''}`
})

const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style scoped>
.stat-card-hover {
  transition: all 0.2s ease;
}

.stat-card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.q-card {
  border-radius: 8px;
  min-height: 100px;
}
</style>
