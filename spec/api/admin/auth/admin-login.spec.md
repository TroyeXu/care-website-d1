# API 規格：管理員登入

## 端點資訊

- **路徑**: `/api/admin/auth/login`
- **方法**: `POST`
- **認證**: 不需要
- **描述**: 管理員登入系統

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
    "admin": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "admin",
      "permissions": ["string"]
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

#### 權限不足 (403 Forbidden)

```json
{
  "success": false,
  "message": "此帳號不具備管理員權限"
}
```

## 測試案例

### 1. 管理員成功登入

```
Given 使用者具有管理員角色
When 提供正確的 email 和 password
Then 應該回傳 200 狀態碼
And 回應包含 token 和 refreshToken
And 回應包含管理員資訊和權限列表
And role 為 'admin'
```

### 2. Email 未填寫

```
Given 管理員嘗試登入
When email 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 為必填欄位"
```

### 3. Email 格式錯誤

```
Given 管理員嘗試登入
When email 格式不正確
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 格式不正確"
```

### 4. 密碼未填寫

```
Given 管理員嘗試登入
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
Given 管理員帳號存在
When 提供錯誤的 password
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Email 或密碼錯誤"
```

### 7. 非管理員帳號嘗試登入

```
Given 使用者角色為 'user' 或 'caregiver'
When 嘗試使用管理員登入端點
Then 應該回傳 403 狀態碼
And 錯誤訊息為 "此帳號不具備管理員權限"
```

### 8. 停用的管理員帳號

```
Given 管理員帳號已被停用
When 嘗試登入
Then 應該回傳 403 狀態碼
And 錯誤訊息為 "帳號已被停用"
```

## 安全性考量

- 密碼使用 bcrypt 加密儲存
- JWT token 有效期限設定
- 登入失敗不洩漏帳號是否存在
- 記錄管理員登入日誌
- 考慮實作登入嘗試次數限制
- 考慮實作雙因素認證 (2FA)
- 管理員 token 的有效期限應該比一般用戶更短

## 與一般用戶登入的差異

- 驗證用戶 role 必須為 'admin'
- 回應包含管理員權限列表
- 使用獨立的端點路徑
- 可能有額外的安全驗證機制

## 相關端點

- [POST /api/auth/login](../../auth/login.spec.md) - 一般用戶登入
- [GET /api/admin/auth/me](./admin-me.spec.md) - 取得當前管理員資訊
- [POST /api/admin/auth/logout](./admin-logout.spec.md) - 管理員登出
