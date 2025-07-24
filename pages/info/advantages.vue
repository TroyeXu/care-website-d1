<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6 q-mb-sm">服務優勢</div>
        <p class="text-subtitle2 q-mb-md">選擇我們平台的四大理由</p>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            v-for="(adv, i) in advantages"
            :key="i"
            :label="adv.title"
            :icon="adv.icon"
          >
            {{ adv.desc }}
          </q-expansion-item>
        </q-list>
        <div class="text-center q-mt-md">
          <q-btn color="primary" to="/auth/register" label="立即體驗" />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('服務優勢 - DogFriend', '了解選擇 DogFriend 的四大優勢')
const advantages = [
  { title: '快速媒合', desc: '透過演算法即時找到合適看護', icon: 'bolt' },
  { title: '專業審核', desc: '嚴格把關每位看護的資格', icon: 'verified' },
  { title: '彈性排班', desc: '依照需求安排看護時段', icon: 'schedule' },
  { title: '完善保障', desc: '客服與意外保險讓您更放心', icon: 'security' },
]
</script>
