# API 規格：用戶登入

## 端點資訊

- **路徑**: `/api/auth/login`
- **方法**: `POST`
- **認證**: 不需要
- **描述**: 用戶登入系統

## 請求規格

### 請求主體 (JSON)

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

### 欄位驗證

- `email`: 必填，必須是有效的 email 格式
- `password`: 必填

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "登入成功",
  "data": {
    "token": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string"
    }
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

#### 認證失敗 (401 Unauthorized)

```json
{
  "success": false,
  "message": "Email 或密碼錯誤"
}
```

## 測試案例

### 1. 成功登入

```
Given 使用者已註冊
When 提供正確的 email 和 password
Then 應該回傳 200 狀態碼
And 回應包含 token 和 refreshToken
And 回應包含用戶資訊
```

### 2. Email 未填寫

```
Given 使用者嘗試登入
When email 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 為必填欄位"
```

### 3. Email 格式錯誤

```
Given 使用者嘗試登入
When email 格式不正確
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 格式不正確"
```

### 4. 密碼未填寫

```
Given 使用者嘗試登入
When password 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "密碼 為必填欄位"
```

### 5. 帳號不存在

```
Given 使用者未註冊
When 提供不存在的 email
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Email 或密碼錯誤"
```

### 6. 密碼錯誤

```
Given 使用者已註冊
When 提供錯誤的 password
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Email 或密碼錯誤"
```

## 安全性考量

- 密碼使用 bcrypt 加密儲存
- JWT token 有效期限設定
- 登入失敗不洩漏帳號是否存在
- 考慮實作登入嘗試次數限制

## 相關端點

- [POST /api/auth/register](./register.spec.md) - 用戶註冊
- [POST /api/auth/logout](./logout.spec.md) - 用戶登出
- [POST /api/auth/refresh](./refresh.spec.md) - 刷新 token
