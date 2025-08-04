# 組件錯誤修復筆記

## Q: 如何修復組件相關的錯誤？

## A: 修復組件引用、屬性類型和 CSS 語法問題

### 錯誤 1: CaregiverListItem 組件找不到

**錯誤訊息**：`Failed to resolve component: CaregiverListItem`

**解決方法**：
直接使用 Quasar 的 QItem 組件替代不存在的 CaregiverListItem：

```vue
<!-- 原本的錯誤程式碼 -->
<CaregiverListItem
  v-for="caregiver in filteredCaregivers"
  :key="caregiver.id"
  :caregiver="caregiver"
/>

<!-- 修正後的程式碼 -->
<q-item
  v-for="caregiver in filteredCaregivers"
  :key="caregiver.id"
  clickable
  @click="navigateToDetail(caregiver)"
>
  <!-- 使用 QItem 的結構 -->
</q-item>
```

### 錯誤 2: CaregiverCard 的 available 屬性類型錯誤

**錯誤訊息**：`props.caregiver.available.toLowerCase is not a function`

**原因**：組件期望 `available` 是字串，但實際收到布林值

**解決方法**：

```javascript
const availabilityClass = computed(() => {
  const available = props.caregiver.available

  // 處理布林值情況
  if (typeof available === 'boolean') {
    return available ? 'available-full' : 'available-limited'
  }

  // 處理字串情況
  const availability = available.toLowerCase()
  // ... 原本的邏輯
})
```

### 錯誤 3: CSS 使用已棄用的 >>> 語法

**警告訊息**：`the >>> and /deep/ combinators have been deprecated`

**解決方法**：

```css
/* 原本的錯誤寫法 */
.custom-input >>> .q-field__control {
  background: #f8f9fa;
}

/* 修正後的寫法 */
.custom-input :deep(.q-field__control) {
  background: #f8f9fa;
}
```

### 相關檔案：

- pages/caregivers/index.vue:158
- components/CaregiverCard.vue:123
- pages/auth/login.vue (CSS 部分)

### 學習重點：

- 使用組件前要確保已經正確引入或創建
- 處理 props 時要考慮多種資料類型的可能性
- Vue 3 中要使用 `:deep()` 而不是 `>>>` 或 `/deep/`
- 型別安全很重要，可以使用 TypeScript 來避免這類問題
