# API 規格：更新預約

## 端點資訊

- **路徑**: `/api/bookings/:id`
- **方法**: `PUT`
- **認證**: 需要 JWT token
- **描述**: 更新預約資訊

## 請求規格

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
- `id`: 預約 ID (required)

### 請求主體 (JSON)

```json
{
  "service_date": "string (optional)",
  "start_time": "string (optional)",
  "end_time": "string (optional)",
  "total_hours": "number (optional)",
  "hourly_rate": "number (optional)",
  "total_amount": "number (optional)",
  "status": "string (optional)",
  "notes": "string (optional)"
}
```

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "預約更新成功",
  "data": {
    "id": "string",
    "user_id": "string",
    "caregiver_id": "string",
    "service_date": "string",
    "start_time": "string",
    "end_time": "string",
    "total_amount": "number",
    "status": "string",
    "notes": "string",
    "updated_at": "string"
  }
}
```

### 錯誤回應

#### 預約不存在 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到 預約"
}
```

#### 沒有要更新的資料 (400 Bad Request)
```json
{
  "success": false,
  "message": "驗證失敗",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": "沒有要更新的資料"
  }
}
```

## 測試案例

### 1. 成功更新預約
```
Given 預約存在
When 提供要更新的欄位
Then 應該回傳 200 狀態碼
And 回應包含更新後的資料
And updated_at 已更新
```

### 2. 預約不存在
```
Given 預約不存在
When 嘗試更新
Then 應該回傳 404 狀態碼
```

### 3. 沒有提供更新資料
```
Given 預約存在
When 請求主體為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "沒有要更新的資料"
```

### 4. 只能更新允許的欄位
```
Given 預約存在
When 嘗試更新不在允許列表的欄位
Then 該欄位應該被忽略
And 其他有效欄位正常更新
```
