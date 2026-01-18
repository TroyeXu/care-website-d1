# API 規格：聯絡表單

## 端點資訊

- **路徑**: `/api/contact`
- **方法**: `POST`
- **認證**: 不需要
- **描述**: 提交聯絡表單

## 請求規格

### 請求主體 (JSON)

```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (optional)",
  "subject": "string (required)",
  "message": "string (required)"
}
```

### 欄位驗證

- `name`: 必填
- `email`: 必填，必須是有效的 email 格式
- `phone`: 選填
- `subject`: 必填
- `message`: 必填

## 回應規格

### 成功回應 (201 Created)

```json
{
  "success": true,
  "message": "聯絡表單已提交",
  "data": {
    "id": "string",
    "status": "pending",
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
    "field": "email",
    "details": "Email 格式不正確"
  }
}
```

## 測試案例

### 1. 成功提交聯絡表單
```
Given 提供所有必填欄位
When 提交聯絡表單
Then 應該回傳 201 狀態碼
And 回應包含表單 ID
And 狀態為 pending
```

### 2. Email 格式錯誤
```
Given email 格式不正確
When 提交聯絡表單
Then 應該回傳 400 狀態碼
```

### 3. 必填欄位未填寫
```
Given 缺少必填欄位
When 提交聯絡表單
Then 應該回傳 400 狀態碼
```
