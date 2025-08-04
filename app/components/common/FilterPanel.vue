<template>
  <q-card flat bordered :class="panelClass">
    <q-card-section>
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">{{ title }}</div>
        <div class="row q-gutter-sm">
          <q-btn
            v-if="showClear"
            flat
            color="grey"
            size="sm"
            @click="clearFilters"
          >
            清除篩選
          </q-btn>
          <q-btn
            v-if="collapsible"
            flat
            :icon="isExpanded ? 'expand_less' : 'expand_more'"
            size="sm"
            @click="toggleExpanded"
          />
        </div>
      </div>

      <q-slide-transition>
        <div v-show="isExpanded">
          <slot :filters="filters" :update-filter="updateFilter" />

          <div v-if="showActions" class="row justify-end q-gutter-sm q-mt-md">
            <q-btn flat color="grey" @click="resetFilters"> 重設 </q-btn>
            <q-btn color="primary" :loading="applying" @click="applyFilters">
              套用篩選
            </q-btn>
          </div>
        </div>
      </q-slide-transition>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 定義篩選器值的類型
type FilterValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]

interface Props {
  title: string
  modelValue: Record<string, FilterValue>
  collapsible?: boolean
  expanded?: boolean
  showClear?: boolean
  showActions?: boolean
  applying?: boolean
  autoApply?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  collapsible: true,
  expanded: true,
  showClear: true,
  showActions: false,
  applying: false,
  autoApply: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, FilterValue>]
  apply: [filters: Record<string, FilterValue>]
  clear: []
  reset: []
}>()

// 響應式狀態
const isExpanded = ref(props.expanded)
const filters = ref({ ...props.modelValue })

// 計算屬性
const panelClass = computed(() => {
  const classes = ['filter-panel']
  if (hasActiveFilters.value) {
    classes.push('filter-panel--active')
  }
  return classes.join(' ')
})

const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some((value) => {
    if (Array.isArray(value)) return value.length > 0
    return value !== null && value !== undefined && value !== ''
  })
})

// 方法
const updateFilter = (key: string, value: FilterValue) => {
  filters.value[key] = value
  emit('update:modelValue', { ...filters.value })

  if (props.autoApply) {
    emit('apply', { ...filters.value })
  }
}

const applyFilters = () => {
  emit('apply', { ...filters.value })
}

const clearFilters = () => {
  const clearedFilters = Object.keys(filters.value).reduce(
    (acc, key) => {
      acc[key] = Array.isArray(filters.value[key]) ? [] : null
      return acc
    },
    {} as Record<string, FilterValue>,
  )

  filters.value = clearedFilters
  emit('update:modelValue', { ...filters.value })
  emit('clear')

  if (props.autoApply) {
    emit('apply', { ...filters.value })
  }
}

const resetFilters = () => {
  filters.value = { ...props.modelValue }
  emit('reset')
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// 監聽外部變化
watch(
  () => props.modelValue,
  (newValue) => {
    filters.value = { ...newValue }
  },
  { deep: true },
)
</script>

<style scoped>
.filter-panel {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.2s ease;
}

.filter-panel--active {
  border-color: #1976d2;
  box-shadow: 0 0 0 1px rgba(25, 118, 210, 0.2);
}

.text-h6 {
  font-weight: 500;
}
</style>
