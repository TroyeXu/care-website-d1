# API 規格：用戶登出

## 端點資訊

- **路徑**: `/api/auth/logout`
- **方法**: `POST`
- **認證**: 需要 JWT token
- **描述**: 用戶登出系統，使 token 失效

## 請求規格

### Headers

```
Authorization: Bearer {token}
Content-Type: application/json
```

### 請求主體 (JSON)

```json
{
  "refreshToken": "string (optional)"
}
```

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "登出成功"
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

## 測試案例

### 1. 成功登出

```
Given 用戶已登入
When 提供有效的 token
Then 應該回傳 200 狀態碼
And 回應訊息為 "登出成功"
And token 應該被加入黑名單或失效
And refreshToken 應該被移除（如果有提供）
```

### 2. 未提供 Authorization header

```
Given 用戶嘗試登出
When 未提供 Authorization header
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "未提供認證 token"
```

### 3. 提供無效的 token

```
Given 用戶嘗試登出
When 提供格式錯誤或偽造的 token
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "無效的 token"
```

### 4. 提供已過期的 token

```
Given 用戶的 token 已過期
When 嘗試登出
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Token 已過期"
```

### 5. 重複登出

```
Given 用戶已經登出過
When 使用相同的 token 再次登出
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "無效的 token"
```

### 6. 同時使 refreshToken 失效

```
Given 用戶提供 refreshToken
When 登出成功
Then refreshToken 也應該被移除或標記為失效
```

## 實作考量

### Token 失效機制

可採用以下方式之一：

1. **Token 黑名單**
   - 將登出的 token 加入 Redis 或資料庫黑名單
   - 每次驗證 token 時檢查黑名單
   - 黑名單項目可設定過期時間（與 token 過期時間相同）

2. **版本控制**
   - 在用戶資料中儲存 token 版本號
   - 登出時增加版本號
   - 驗證 token 時比對版本號

3. **短期 token + refreshToken**
   - 使用短期的 access token（如 15 分鐘）
   - 登出時只需移除 refreshToken
   - Access token 會自然過期

## 安全性考量

- 登出後 token 必須真正失效，不能再使用
- 考慮實作「登出所有裝置」功能
- 記錄登出日誌
- 清理用戶相關的 session 資料

## 相關端點

- [POST /api/auth/login](./login.spec.md) - 用戶登入
- [POST /api/auth/refresh](./refresh.spec.md) - 刷新 token
- [GET /api/auth/me](./me.spec.md) - 取得當前用戶資訊
