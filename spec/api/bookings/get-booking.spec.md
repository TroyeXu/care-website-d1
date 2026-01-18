# API 規格：取得單一預約

## 端點資訊

- **路徑**: `/api/bookings/:id`
- **方法**: `GET`
- **認證**: 需要 JWT token
- **描述**: 取得單一預約的詳細資訊

## 請求規格

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
- `id`: 預約 ID (required)

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
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
    "status": "string",
    "total_amount": "number",
    "payment_status": "string",
    "payment_method": "string",
    "notes": "string",
    "created_at": "string",
    "updated_at": "string",
    "user": {
      "name": "string",
      "email": "string",
      "phone": "string"
    },
    "caregiver": {
      "id": "string",
      "name": "string",
      "email": "string",
      "phone": "string"
    }
  }
}
```

### 錯誤回應

#### ID 未填寫 (400 Bad Request)
```json
{
  "success": false,
  "message": "驗證失敗",
  "error": {
    "code": "VALIDATION_ERROR",
    "field": "id",
    "details": "id 為必填欄位"
  }
}
```

#### 預約不存在 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到 預約",
  "error": {
    "code": "NOT_FOUND",
    "resource": "預約",
    "id": "booking123"
  }
}
```

## 測試案例

### 1. 成功取得預約
```
Given 預約存在
When 提供有效的預約 ID
Then 應該回傳 200 狀態碼
And 回應包含完整的預約資訊
And 包含用戶和看護資訊
```

### 2. ID 未填寫
```
Given 嘗試取得預約
When ID 為空
Then 應該回傳 400 狀態碼
```

### 3. 預約不存在
```
Given 預約不存在
When 提供不存在的 ID
Then 應該回傳 404 狀態碼
```
