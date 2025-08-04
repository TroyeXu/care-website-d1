# 修復 undefined 讀取錯誤

## Q: 出現 "Cannot read properties of undefined (reading '0')" 錯誤如何解決？

## A: 加入安全導航運算子和防護條件

### 問題描述：
```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '0')
    at index.vue:437:38
```

### 問題原因：
在 `index.vue` 第 437 行，嘗試存取 `caregiver.service_areas[0]`，但 `service_areas` 可能是 undefined 或空陣列

### 解決步驟：

1. **使用可選鏈操作符（Optional Chaining）**
   ```typescript
   // 原本的程式碼
   location: caregiver.service_areas[0],
   
   // 修改後
   location: caregiver.service_areas?.[0] || '未設定',
   ```

2. **加強資料檢查**
   ```typescript
   // 原本的程式碼
   if (!caregiversData.value) return []
   
   // 修改後
   if (!caregiversData.value || !caregiversData.value.caregivers) return []
   ```

### 相關檔案：

- app/pages/index.vue:427 (資料檢查)
- app/pages/index.vue:437 (可選鏈操作符)

### 學習重點：

- 使用可選鏈操作符 `?.` 安全存取可能為 undefined 的屬性
- 在處理陣列索引前，確保陣列存在且不為空
- 提供預設值避免 undefined 錯誤
- 在 computed 屬性中做好防護性編程
- API 回應可能不完整，需要做好容錯處理

### 關於重複導入警告：
重複導入警告是 Nuxt 自動導入機制的特性，當檔案同時從不同來源導入相同名稱的類型時會出現。這只是警告，不影響功能運作。