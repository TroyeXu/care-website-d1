# API 規格：更新用戶資訊

## 端點資訊

- **路徑**: `/api/users/:id`
- **方法**: `PUT`
- **認證**: 需要 JWT token
- **描述**: 更新用戶資訊

## 請求規格

### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Path Parameters
- `id`: 用戶 ID (required)

### 請求主體 (JSON)

```json
{
  "name": "string (optional)",
  "phone": "string (optional)",
  "avatar": "string (optional)",
  "gender": "string (optional)",
  "address": "string (optional)"
}
```

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "用戶資訊更新成功",
  "data": {
    "id": "string",
    "name": "string",
    "phone": "string",
    "avatar": "string",
    "gender": "string",
    "address": "string",
    "updated_at": "string"
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

#### 權限不足 (403 Forbidden)
```json
{
  "success": false,
  "message": "無權限更新此用戶資訊"
}
```

## 測試案例

### 1. 成功更新用戶資訊
```
Given 用戶存在且有權限
When 提供要更新的欄位
Then 應該回傳 200 狀態碼
And 回應包含更新後的資料
```

### 2. 用戶不存在
```
Given 用戶不存在
When 嘗試更新
Then 應該回傳 404 狀態碼
```

### 3. 無權限更新其他用戶
```
Given 嘗試更新其他用戶的資訊
When 不是管理員
Then 應該回傳 403 狀態碼
```
