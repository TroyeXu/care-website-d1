<template>
  <div>
    <h1>測試頁面</h1>
    <p>如果您能看到這個頁面，表示 Nuxt 4 正常運行中！</p>
    <p>當前時間：{{ new Date().toLocaleString() }}</p>
    <p>環境配置測試：</p>
    <ul>
      <li>Base URL: {{ config.public.baseUrl }}</li>
      <li>Supabase URL: {{ config.public.supabaseUrl ? '已配置' : '未配置' }}</li>
    </ul>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
</script>