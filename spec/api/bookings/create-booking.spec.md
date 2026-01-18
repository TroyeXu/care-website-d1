# API 規格：建立預約

## 端點資訊

- **路徑**: `/api/bookings`
- **方法**: `POST`
- **認證**: 需要 JWT token
- **描述**: 建立新的看護預約

## 請求規格

### Headers

```
Authorization: Bearer {token}
Content-Type: application/json
```

### 請求主體 (JSON)

```json
{
  "user_id": "string (required)",
  "caregiver_id": "string (required)",
  "service_date": "string (required, YYYY-MM-DD)",
  "start_time": "string (required, HH:MM)",
  "end_time": "string (required, HH:MM)",
  "service_hours": "number (optional)",
  "service_location": "string (optional)",
  "service_type": "string (optional, default: 'general')",
  "requirements": "string (optional)",
  "total_amount": "number (optional)",
  "payment_method": "string (optional, default: 'cash')",
  "notes": "string (optional)"
}
```

### 欄位驗證

- `user_id`: 必填，用戶必須存在
- `caregiver_id`: 必填，看護必須存在
- `service_date`: 必填，格式 YYYY-MM-DD
- `start_time`: 必填，格式 HH:MM
- `end_time`: 必填，格式 HH:MM
- `service_hours`: 選填，數字
- `service_location`: 選填
- `service_type`: 選填，預設 'general'
- `requirements`: 選填
- `total_amount`: 選填，數字
- `payment_method`: 選填，預設 'cash'
- `notes`: 選填

## 回應規格

### 成功回應 (201 Created)

```json
{
  "success": true,
  "message": "預約建立成功",
  "data": {
    "id": "string",
    "user_id": "string",
    "caregiver_id": "string",
    "service_date": "string",
    "start_time": "string",
    "end_time": "string",
    "service_hours": "number",
    "service_location": "string",
    "service_type": "string",
    "requirements": "string",
    "status": "pending",
    "total_amount": "number",
    "payment_status": "pending",
    "payment_method": "string",
    "notes": "string",
    "created_at": "string",
    "updated_at": "string",
    "user_name": "string",
    "user_email": "string",
    "user_phone": "string",
    "caregiver_name": "string",
    "caregiver_email": "string",
    "caregiver_phone": "string"
  }
}
```

### 錯誤回應

#### 驗證錯誤 (400 Bad Request)

```json
{
  "success": false,
  "message": "驗證失敗",
  "error": {
    "code": "VALIDATION_ERROR",
    "field": "service_date",
    "details": "服務日期格式不正確，應為 YYYY-MM-DD"
  }
}
```

#### 用戶不存在 (404 Not Found)

```json
{
  "success": false,
  "message": "找不到 用戶",
  "error": {
    "code": "NOT_FOUND",
    "resource": "用戶",
    "id": "user123"
  }
}
```

#### 看護不存在 (404 Not Found)

```json
{
  "success": false,
  "message": "找不到 看護",
  "error": {
    "code": "NOT_FOUND",
    "resource": "看護",
    "id": "caregiver123"
  }
}
```

#### 時段衝突 (409 Conflict)

```json
{
  "success": false,
  "message": "該時段已被預約",
  "error": {
    "code": "CONFLICT",
    "details": {
      "conflictId": "booking123",
      "service_date": "2024-03-20",
      "start_time": "09:00",
      "end_time": "17:00"
    }
  }
}
```

## 測試案例

### 1. 成功建立預約

```
Given 用戶和看護都存在
And 所選時段沒有衝突
When 提供所有必填欄位
Then 應該回傳 201 狀態碼
And 回應包含完整的預約資訊
And 預約狀態為 'pending'
And 付款狀態為 'pending'
```

### 2. user_id 未填寫

```
Given 嘗試建立預約
When user_id 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "用戶 ID 為必填欄位"
```

### 3. caregiver_id 未填寫

```
Given 嘗試建立預約
When caregiver_id 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "看護 ID 為必填欄位"
```

### 4. service_date 未填寫

```
Given 嘗試建立預約
When service_date 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "服務日期 為必填欄位"
```

### 5. service_date 格式錯誤

```
Given 嘗試建立預約
When service_date 格式不是 YYYY-MM-DD
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "服務日期格式不正確，應為 YYYY-MM-DD"
```

### 6. start_time 未填寫

```
Given 嘗試建立預約
When start_time 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "開始時間 為必填欄位"
```

### 7. start_time 格式錯誤

```
Given 嘗試建立預約
When start_time 格式不是 HH:MM
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "開始時間格式不正確，應為 HH:MM"
```

### 8. end_time 未填寫

```
Given 嘗試建立預約
When end_time 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "結束時間 為必填欄位"
```

### 9. end_time 格式錯誤

```
Given 嘗試建立預約
When end_time 格式不是 HH:MM
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "結束時間格式不正確，應為 HH:MM"
```

### 10. 用戶不存在

```
Given caregiver_id 存在
When user_id 不存在於系統中
Then 應該回傳 404 狀態碼
And 錯誤訊息為 "找不到 用戶"
```

### 11. 看護不存在

```
Given user_id 存在
When caregiver_id 不存在於系統中
Then 應該回傳 404 狀態碼
And 錯誤訊息為 "找不到 看護"
```

### 12. 時段完全重疊

```
Given 看護在指定日期的指定時段已有預約
When 嘗試預約相同時段
Then 應該回傳 409 狀態碼
And 錯誤訊息為 "該時段已被預約"
And 錯誤詳情包含衝突的預約資訊
```

### 13. 時段部分重疊 - 開始時間在已預約時段內

```
Given 看護已有 09:00-12:00 的預約
When 嘗試預約 10:00-14:00
Then 應該回傳 409 狀態碼
And 錯誤訊息為 "該時段已被預約"
```

### 14. 時段部分重疊 - 結束時間在已預約時段內

```
Given 看護已有 14:00-18:00 的預約
When 嘗試預約 12:00-15:00
Then 應該回傳 409 狀態碼
And 錯誤訊息為 "該時段已被預約"
```

### 15. 時段包含已預約時段

```
Given 看護已有 10:00-12:00 的預約
When 嘗試預約 09:00-14:00
Then 應該回傳 409 狀態碼
And 錯誤訊息為 "該時段已被預約"
```

### 16. 已取消或已完成的預約不算衝突

```
Given 看護在指定時段有已取消或已完成的預約
When 嘗試預約相同時段
Then 應該回傳 201 狀態碼
And 成功建立新預約
```

### 17. 回應包含用戶和看護資訊

```
Given 成功建立預約
Then 回應應該包含 user_name, user_email, user_phone
And 回應應該包含 caregiver_name, caregiver_email, caregiver_phone
```

## 業務規則

- 預約建立時狀態預設為 'pending'
- 付款狀態預設為 'pending'
- 時段衝突檢查排除 'cancelled' 和 'completed' 狀態的預約
- 時段衝突檢查包含以下情況：
  - 新預約開始時間在已有預約時段內
  - 新預約結束時間在已有預約時段內
  - 新預約完全包含已有預約時段
- 預約建立成功後應該發送通知給看護

## 相關端點

- [GET /api/bookings](./list-bookings.spec.md) - 取得預約列表
- [GET /api/bookings/:id](./get-booking.spec.md) - 取得單一預約
- [PUT /api/bookings/:id](./update-booking.spec.md) - 更新預約
- [DELETE /api/bookings/:id](./delete-booking.spec.md) - 刪除預約
- [PUT /api/bookings/:id-status](./update-booking-status.spec.md) - 更新預約狀態
