<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6">補助與保險資訊</div>
        <q-list bordered class="rounded-borders q-mt-md">
          <q-expansion-item
            v-for="(item, i) in subsidies"
            :key="i"
            :label="item.name"
          >
            <div class="q-mb-sm">{{ item.desc }}</div>
            <q-btn
              flat
              size="sm"
              color="primary"
              :href="item.url"
              target="_blank"
              icon="open_in_new"
              label="前往連結"
            />
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('補助資訊 - DogFriend', '了解政府與機構提供的照護補助')
const subsidies = [
  {
    name: '長照補助',
    desc: '政府提供的長期照顧補助方案，依照失能等級給予費用補助。',
    url: 'https://example.com/long-term-care',
  },
  {
    name: '看護保險方案',
    desc: '民間保險公司推出的照護險，減輕長期看護費用負擔。',
    url: 'https://example.com/caregiver-insurance',
  },
]
</script>
