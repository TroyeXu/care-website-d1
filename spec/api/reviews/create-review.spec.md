# API 規格：建立評價

## 端點資訊

- **路徑**: `/api/reviews`
- **方法**: `POST`
- **認證**: 需要 JWT token
- **描述**: 為看護建立評價

## 請求規格

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### 請求主體 (JSON)

```json
{
  "booking_id": "string (required)",
  "caregiver_id": "string (required)",
  "rating": "number (required, 1-5)",
  "comment": "string (optional)"
}
```

### 欄位驗證

- `booking_id`: 必填，預約必須存在且已完成
- `caregiver_id`: 必填，看護必須存在
- `rating`: 必填，範圍 1-5
- `comment`: 選填

## 回應規格

### 成功回應 (201 Created)

```json
{
  "success": true,
  "message": "評價建立成功",
  "data": {
    "id": "string",
    "booking_id": "string",
    "caregiver_id": "string",
    "user_id": "string",
    "rating": "number",
    "comment": "string",
    "created_at": "string"
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
    "field": "rating",
    "details": "評分必須在 1-5 之間"
  }
}
```

#### 預約不存在 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到 預約"
}
```

#### 重複評價 (409 Conflict)
```json
{
  "success": false,
  "message": "此預約已評價過"
}
```

## 測試案例

### 1. 成功建立評價
```
Given 預約已完成且尚未評價
When 提供有效的評價資料
Then 應該回傳 201 狀態碼
And 回應包含評價資訊
And 看護的平均評分應更新
```

### 2. rating 未填寫
```
Given 嘗試建立評價
When rating 欄位為空
Then 應該回傳 400 狀態碼
```

### 3. rating 超出範圍
```
Given 嘗試建立評價
When rating < 1 或 rating > 5
Then 應該回傳 400 狀態碼
```

### 4. 預約不存在
```
Given 預約不存在
When 嘗試建立評價
Then 應該回傳 404 狀態碼
```

### 5. 重複評價
```
Given 預約已經評價過
When 再次嘗試評價
Then 應該回傳 409 狀態碼
```

### 6. 預約未完成
```
Given 預約狀態不是 completed
When 嘗試建立評價
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "只能為已完成的預約評價"
```
