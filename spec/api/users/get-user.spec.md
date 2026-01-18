# API 規格：取得用戶資訊

## 端點資訊

- **路徑**: `/api/users/:id`
- **方法**: `GET`
- **認證**: 需要 JWT token
- **描述**: 取得指定用戶的資訊

## 請求規格

### Headers
```
Authorization: Bearer {token}
```

### Path Parameters
- `id`: 用戶 ID (required)

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "phone": "string",
    "avatar": "string",
    "gender": "string",
    "address": "string",
    "role": "string",
    "status": "string",
    "created_at": "string"
  }
}
```

### 錯誤回應

#### 用戶不存在 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到 用戶"
}
```

## 測試案例

### 1. 成功取得用戶資訊
```
Given 用戶存在
When 提供有效的用戶 ID
Then 應該回傳 200 狀態碼
And 回應包含用戶基本資訊
And 不包含密碼欄位
```

### 2. 用戶不存在
```
Given 用戶不存在
When 提供不存在的 ID
Then 應該回傳 404 狀態碼
```
