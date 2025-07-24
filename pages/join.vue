<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered class="info-card">
      <q-card-section>
        <div class="text-h6 q-mb-sm">成為看護員</div>
        <p>加入 DogFriend 團隊，發揮您的照護專長。</p>

        <q-list bordered class="rounded-borders q-mt-md">
          <q-item>
            <q-item-section avatar>
              <q-icon name="person_add" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>註冊帳號</q-item-label>
              <q-item-label caption>建立個人檔案並填寫基本資料</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>資格審核</q-item-label>
              <q-item-label caption>提交證照與經驗以供審查</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="school" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>完成培訓</q-item-label>
              <q-item-label caption>線上課程快速上手服務流程</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" to="/auth/register" label="立即加入" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import usePageSeo from '~/composables/usePageSeo'

usePageSeo('成為看護員 - DogFriend', '加入我們的看護團隊，展現您的專業')
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
}
</style>
