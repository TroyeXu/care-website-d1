<template>
  <q-page class="q-pa-md">
    <div class="q-mb-lg">
      <h2 class="text-h5 q-mb-md">{{ $t('index.ourServices') }}</h2>
      <q-list bordered class="rounded-borders bg-white">
        <q-item>
          <q-item-section avatar>
            <q-icon name="home" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>居家照顧</q-item-label>
            <q-item-label caption>提供到府看護與生活協助</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="local_hospital" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>醫院看護</q-item-label>
            <q-item-label caption>協助住院期間的照護需求</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon name="flight" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label>外籍看護</q-item-label>
            <q-item-label caption>具備多語溝通能力的專業看護</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div>
      <h2 class="text-h5 q-mb-md">{{ $t('index.whyUs') }}</h2>
      <q-card class="q-mb-sm" bordered>
        <q-card-section class="text-center">
          <div class="text-h6">快速媒合</div>
          <div class="text-subtitle2">完善系統立即找到合適看護</div>
        </q-card-section>
      </q-card>
      <q-card class="q-mb-sm" bordered>
        <q-card-section class="text-center">
          <div class="text-h6">專業篩選</div>
          <div class="text-subtitle2">嚴格背景審查與專業訓練</div>
        </q-card-section>
      </q-card>
      <div class="text-center q-mt-md">
        <q-badge color="primary" class="q-pa-sm">98% 滿意度</q-badge>
      </div>
    </div>
  </q-page>
</template>

<script setup>
// 簡化的頁面設定，避免複雜的 SEO 配置
useHead({
  title: '首頁 - 專業看護媒合平台',
  meta: [
    { name: 'description', content: '快速找到可靠看護，了解我們的服務與優勢' }
  ]
})
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
