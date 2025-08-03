<template>
  <div class="text-center q-pa-lg">
    <q-icon :name="icon" size="80px" color="grey-5" />
    <div class="text-h6 q-mt-md text-grey-7">{{ title }}</div>
    <div class="text-body2 text-grey-6 q-mt-sm">{{ description }}</div>
    <div v-if="$slots.actions" class="q-mt-md">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
}

defineProps<Props>()
</script>