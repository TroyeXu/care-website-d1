# API 規格：取得當前用戶資訊

## 端點資訊

- **路徑**: `/api/auth/me`
- **方法**: `GET`
- **認證**: 需要 JWT token
- **描述**: 取得當前登入用戶的詳細資訊

## 請求規格

### Headers

```
Authorization: Bearer {token}
```

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
    "birth_date": "string",
    "address": "string",
    "role": "string",
    "status": "string",
    "email_verified": "boolean",
    "phone_verified": "boolean",
    "created_at": "string",
    "updated_at": "string",
    "last_login_at": "string"
  }
}
```

### 回應欄位說明

- `id`: 用戶唯一識別碼
- `email`: Email 地址
- `name`: 姓名
- `phone`: 電話號碼
- `avatar`: 頭像 URL
- `gender`: 性別
- `birth_date`: 生日
- `address`: 地址
- `role`: 角色（user/caregiver/admin）
- `status`: 帳號狀態（active/inactive/suspended）
- `email_verified`: Email 是否已驗證
- `phone_verified`: 電話是否已驗證
- `created_at`: 建立時間
- `updated_at`: 更新時間
- `last_login_at`: 最後登入時間

### 看護角色額外資訊

如果用戶角色為 caregiver，回應會包含看護相關資訊：

```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "caregiver",
    "caregiver_profile": {
      "caregiver_id": "string",
      "bio": "string",
      "hourly_rate": "number",
      "experience_years": "number",
      "rating": "number",
      "total_reviews": "number",
      "completion_rate": "number",
      "response_rate": "number",
      "background_checked": "boolean",
      "drug_test_passed": "boolean",
      "certifications": ["array"],
      "specialties": ["array"],
      "service_areas": ["array"],
      "status": "string"
    }
  }
}
```

### 錯誤回應

#### 未提供 token (401 Unauthorized)

```json
{
  "success": false,
  "message": "未提供認證 token"
}
```

#### token 無效 (401 Unauthorized)

```json
{
  "success": false,
  "message": "無效的 token"
}
```

#### token 已過期 (401 Unauthorized)

```json
{
  "success": false,
  "message": "Token 已過期"
}
```

#### 用戶不存在 (404 Not Found)

```json
{
  "success": false,
  "message": "找不到 用戶",
  "error": {
    "code": "NOT_FOUND",
    "resource": "用戶"
  }
}
```

## 測試案例

### 1. 成功取得一般用戶資訊

```
Given 一般用戶已登入
When 提供有效的 token
Then 應該回傳 200 狀態碼
And 回應包含完整的用戶資訊
And 不包含密碼欄位
And role 為 'user'
```

### 2. 成功取得看護用戶資訊

```
Given 看護用戶已登入
When 提供有效的 token
Then 應該回傳 200 狀態碼
And 回應包含完整的用戶資訊
And 回應包含 caregiver_profile 欄位
And caregiver_profile 包含看護相關資訊
And role 為 'caregiver'
```

### 3. 未提供 Authorization header

```
Given 嘗試取得用戶資訊
When 未提供 Authorization header
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "未提供認證 token"
```

### 4. 提供無效的 token

```
Given 嘗試取得用戶資訊
When 提供格式錯誤或偽造的 token
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "無效的 token"
```

### 5. 提供已過期的 token

```
Given token 已過期
When 嘗試取得用戶資訊
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Token 已過期"
```

### 6. Token 對應的用戶已被刪除

```
Given token 有效但對應的用戶已被刪除
When 嘗試取得用戶資訊
Then 應該回傳 404 狀態碼
And 錯誤訊息為 "找不到 用戶"
```

### 7. 回應不包含敏感資訊

```
Given 用戶已登入
When 成功取得用戶資訊
Then 回應不應包含 password 欄位
And 回應不應包含 password_hash 欄位
And 回應不應包含其他敏感資訊
```

### 8. 回應包含驗證狀態

```
Given 用戶已登入
When 成功取得用戶資訊
Then 回應應包含 email_verified 狀態
And 回應應包含 phone_verified 狀態
```

### 9. 回應包含時間戳記

```
Given 用戶已登入
When 成功取得用戶資訊
Then 回應應包含 created_at
And 回應應包含 updated_at
And 回應應包含 last_login_at
```

### 10. 看護資料包含完整 profile

```
Given 看護用戶已登入
When 成功取得用戶資訊
Then caregiver_profile 應包含 bio
And 應包含 hourly_rate, experience_years
And 應包含 rating, total_reviews
And 應包含 completion_rate, response_rate
And 應包含驗證狀態
And 應包含 certifications, specialties, service_areas 列表
```

## 使用情境

此端點常用於：

1. **頁面載入時驗證登入狀態**
   - 檢查 token 是否有效
   - 取得最新的用戶資訊

2. **個人資料頁面**
   - 顯示用戶的完整資訊
   - 提供編輯入口

3. **導覽列用戶資訊**
   - 顯示用戶名稱和頭像
   - 顯示角色相關選單

4. **權限檢查**
   - 確認用戶角色和權限
   - 根據 status 決定可用功能

## 安全性考量

- 只能取得當前登入用戶的資訊（從 token 取得用戶 ID）
- 不可透過此端點查詢其他用戶資訊
- 回應不包含敏感資訊（密碼、payment token 等）
- Token 必須是有效且未過期的

## 相關端點

- [POST /api/auth/login](./login.spec.md) - 用戶登入
- [POST /api/auth/logout](./logout.spec.md) - 用戶登出
- [PUT /api/users/:id](../users/update-user.spec.md) - 更新用戶資訊
