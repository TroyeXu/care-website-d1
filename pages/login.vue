<template>
  <div>
    <!-- 自動重定向到正確的登入頁面 -->
  </div>
</template>

<script setup>
// 使用 Nuxt 的內建重定向機制
throw createError({
  statusCode: 301,
  statusMessage: 'Moved Permanently',
  data: {
    location: '/auth/login'
  }
})
</script>