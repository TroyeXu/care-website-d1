# Q: 如何修復 stores 檔案中的 TypeScript 錯誤？

## A: 透過為 $fetch 調用添加泛型型別參數來解決型別錯誤

### 解決步驟：

1. **分析錯誤原因**
   - $fetch 預設回傳 `unknown` 型別
   - 當將 unknown 賦值給具體型別時發生錯誤
   - 需要透過泛型參數明確指定回傳型別

2. **修復 app/stores/auth.ts**
   - 行 141-146: 為 updateProfile 的 $fetch 添加 `<User>` 泛型參數
   ```typescript
   const updatedUser = await $fetch<User>(`/api/users/${this.currentUser.id}`, {
     method: 'PUT',
     body: { profile: updates },
   })
   ```

3. **修復 app/stores/bookings.ts**
   - 行 74: fetchBookings 添加 `<{ bookings: Booking[] }>` 泛型
   - 行 89-95: createBooking 添加 `<Booking>` 泛型
   - 行 107-114: updateBookingStatus 添加 `<Booking>` 泛型
   - 行 135: fetchBookingsByUser 添加 `<{ bookings: Booking[] }>` 泛型

4. **修復 app/stores/caregivers.ts**
   - 行 142: fetchCaregivers 添加 `<{ caregivers: Caregiver[] }>` 泛型
   - 行 157-158: fetchCaregiverById 添加 `<Caregiver>` 泛型

### 相關檔案：

- /Users/troye/code/troye/new-care/app/stores/auth.ts:141-146
- /Users/troye/code/troye/new-care/app/stores/bookings.ts:74,89-95,107-114,135
- /Users/troye/code/troye/new-care/app/stores/caregivers.ts:142,157-158

### 學習重點：

- **泛型型別參數的重要性**: $fetch 需要泛型參數來確保型別安全
- **API 回傳型別設計**: 統一使用 `{ data: T }` 或直接回傳 `T` 的格式
- **型別一致性**: 確保 store 中的型別定義與 API 回傳值一致
- **錯誤處理**: 在 TypeScript 中正確處理 unknown 型別的轉換

### 技術要點：

1. **$fetch 泛型語法**:
   ```typescript
   // 直接回傳型別
   const data = await $fetch<Type>('/api/endpoint')
   
   // 包裝在物件中的型別
   const { items } = await $fetch<{ items: Type[] }>('/api/endpoint')
   ```

2. **型別安全的好處**:
   - 編譯時檢查型別錯誤
   - IDE 提供更好的自動完成
   - 減少執行時錯誤

3. **最佳實踐**:
   - 為所有 API 調用添加泛型參數
   - 保持回傳型別與介面定義一致
   - 使用 TypeScript 嚴格模式檢查