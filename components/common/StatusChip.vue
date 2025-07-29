<template>
  <q-chip
    :color="statusConfig?.color || 'grey'"
    :text-color="statusConfig?.textColor || 'white'"
    :size="size"
    :outline="outline"
  >
    {{ statusConfig?.label || status }}
  </q-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  status: string
  type?: 'booking' | 'payment' | 'caregiver'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'booking',
  size: 'sm',
  outline: false
})

const statusConfig = computed(() => {
  const configs = {
    booking: {
      pending: { label: '待確認', color: 'warning', textColor: 'white' },
      confirmed: { label: '已確認', color: 'positive', textColor: 'white' },
      in_progress: { label: '進行中', color: 'info', textColor: 'white' },
      completed: { label: '已完成', color: 'grey', textColor: 'white' },
      cancelled: { label: '已取消', color: 'negative', textColor: 'white' }
    },
    payment: {
      pending: { label: '處理中', color: 'warning', textColor: 'white' },
      completed: { label: '已完成', color: 'positive', textColor: 'white' },
      failed: { label: '失敗', color: 'negative', textColor: 'white' },
      cancelled: { label: '已取消', color: 'grey', textColor: 'white' }
    },
    caregiver: {
      available: { label: '可預約', color: 'positive', textColor: 'white' },
      busy: { label: '忙碌中', color: 'warning', textColor: 'white' },
      offline: { label: '離線', color: 'grey', textColor: 'white' }
    }
  }
  
  return configs[props.type]?.[props.status]
})
</script>