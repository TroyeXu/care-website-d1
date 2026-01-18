# API 規格：用戶註冊

## 端點資訊

- **路徑**: `/api/auth/register`
- **方法**: `POST`
- **認證**: 不需要
- **描述**: 新用戶註冊

## 請求規格

### 請求主體 (JSON)

```json
{
  "email": "string (required)",
  "password": "string (required)",
  "name": "string (required)",
  "phone": "string (optional)",
  "role": "string (optional, default: 'user')"
}
```

### 欄位驗證

- `email`: 必填，必須是有效的 email 格式，不可重複
- `password`: 必填，必須符合密碼強度要求
  - 至少 8 個字元
  - 包含大小寫字母
  - 包含數字
  - 包含特殊符號
- `name`: 必填
- `phone`: 選填，電話號碼格式
- `role`: 選填，預設為 'user'

## 回應規格

### 成功回應 (201 Created)

```json
{
  "success": true,
  "message": "註冊成功",
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
    "field": "password",
    "details": "密碼必須至少 8 個字元；密碼必須包含大小寫字母"
  }
}
```

#### Email 已存在 (409 Conflict)

```json
{
  "success": false,
  "message": "Email 已被註冊"
}
```

## 測試案例

### 1. 成功註冊

```
Given 提供所有必填欄位
When email 未被使用且 password 符合強度要求
Then 應該回傳 201 狀態碼
And 回應包含 token 和 refreshToken
And 回應包含新建立的用戶資訊
And 密碼應該被加密儲存
```

### 2. Email 未填寫

```
Given 嘗試註冊
When email 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 為必填欄位"
```

### 3. Email 格式錯誤

```
Given 嘗試註冊
When email 格式不正確
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "Email 格式不正確"
```

### 4. Email 已被註冊

```
Given email 已經存在於系統中
When 嘗試使用相同 email 註冊
Then 應該回傳 409 狀態碼
And 錯誤訊息為 "Email 已被註冊"
```

### 5. 密碼未填寫

```
Given 嘗試註冊
When password 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "密碼 為必填欄位"
```

### 6. 密碼強度不足 - 長度不足

```
Given 嘗試註冊
When password 少於 8 個字元
Then 應該回傳 400 狀態碼
And 錯誤訊息包含 "密碼必須至少 8 個字元"
```

### 7. 密碼強度不足 - 缺少大寫字母

```
Given 嘗試註冊
When password 沒有大寫字母
Then 應該回傳 400 狀態碼
And 錯誤訊息包含 "密碼必須包含大小寫字母"
```

### 8. 密碼強度不足 - 缺少數字

```
Given 嘗試註冊
When password 沒有數字
Then 應該回傳 400 狀態碼
And 錯誤訊息包含 "密碼必須包含數字"
```

### 9. 密碼強度不足 - 缺少特殊符號

```
Given 嘗試註冊
When password 沒有特殊符號
Then 應該回傳 400 狀態碼
And 錯誤訊息包含 "密碼必須包含特殊符號"
```

### 10. 姓名未填寫

```
Given 嘗試註冊
When name 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "姓名 為必填欄位"
```

### 11. 使用預設 role 註冊

```
Given 不提供 role 欄位
When 註冊成功
Then 用戶 role 應該為 'user'
```

## 安全性考量

- 密碼使用 bcrypt 加密儲存
- JWT token 有效期限設定
- Email 驗證機制（可選）
- 防止暴力註冊攻擊

## 相關端點

- [POST /api/auth/login](./login.spec.md) - 用戶登入
- [GET /api/auth/me](./me.spec.md) - 取得當前用戶資訊
