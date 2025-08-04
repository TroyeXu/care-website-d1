<template>
  <div class="row items-center justify-between q-mb-lg">
    <div class="text-h5 text-primary">
      <q-icon :name="icon" size="md" class="q-mr-sm" />
      {{ title }}
    </div>
    <div class="row q-gutter-sm">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon: string
}

defineProps<Props>()
</script>

<style scoped>
.text-h5 {
  font-weight: 500;
}
</style>
