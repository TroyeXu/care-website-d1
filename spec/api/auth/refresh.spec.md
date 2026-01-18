# API 規格：刷新 Token

## 端點資訊

- **路徑**: `/api/auth/refresh`
- **方法**: `POST`
- **認證**: 需要 refreshToken
- **描述**: 使用 refreshToken 取得新的 access token

## 請求規格

### 請求主體 (JSON)

```json
{
  "refreshToken": "string (required)"
}
```

### 欄位驗證

- `refreshToken`: 必填，必須是有效的 refresh token

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "Token 刷新成功",
  "data": {
    "token": "string",
    "refreshToken": "string",
    "expiresIn": "number"
  }
}
```

### 回應欄位說明

- `token`: 新的 access token
- `refreshToken`: 新的 refresh token（可選，可能沿用舊的或發新的）
- `expiresIn`: token 有效期限（秒）

### 錯誤回應

#### refreshToken 未填寫 (400 Bad Request)

```json
{
  "success": false,
  "message": "驗證失敗",
  "error": {
    "code": "VALIDATION_ERROR",
    "field": "refreshToken",
    "details": "refreshToken 為必填欄位"
  }
}
```

#### refreshToken 無效 (401 Unauthorized)

```json
{
  "success": false,
  "message": "無效的 refresh token"
}
```

#### refreshToken 已過期 (401 Unauthorized)

```json
{
  "success": false,
  "message": "Refresh token 已過期，請重新登入"
}
```

#### refreshToken 已被撤銷 (401 Unauthorized)

```json
{
  "success": false,
  "message": "Refresh token 已被撤銷"
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

#### 用戶帳號已停用 (403 Forbidden)

```json
{
  "success": false,
  "message": "帳號已被停用"
}
```

## 測試案例

### 1. 成功刷新 token

```
Given 用戶擁有有效的 refreshToken
When 提供該 refreshToken
Then 應該回傳 200 狀態碼
And 回應包含新的 token
And 回應包含 refreshToken
And 回應包含 expiresIn
And 新 token 應該可以正常使用
```

### 2. refreshToken 未填寫

```
Given 嘗試刷新 token
When refreshToken 欄位為空
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "refreshToken 為必填欄位"
```

### 3. refreshToken 格式錯誤

```
Given 嘗試刷新 token
When 提供格式錯誤的 refreshToken
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "無效的 refresh token"
```

### 4. refreshToken 已過期

```
Given refreshToken 已超過有效期限
When 嘗試刷新 token
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Refresh token 已過期，請重新登入"
And 應提示用戶重新登入
```

### 5. refreshToken 已被撤銷

```
Given 用戶已登出，refreshToken 被撤銷
When 嘗試使用該 refreshToken
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Refresh token 已被撤銷"
```

### 6. refreshToken 對應的用戶不存在

```
Given refreshToken 有效但用戶已被刪除
When 嘗試刷新 token
Then 應該回傳 404 狀態碼
And 錯誤訊息為 "找不到 用戶"
```

### 7. 用戶帳號已停用

```
Given refreshToken 有效但用戶帳號已被停用
When 嘗試刷新 token
Then 應該回傳 403 狀態碼
And 錯誤訊息為 "帳號已被停用"
```

### 8. 重複使用已刷新的 refreshToken

```
Given refreshToken 已被使用過一次
When 再次使用相同的 refreshToken
Then 應該回傳 401 狀態碼
And 錯誤訊息為 "Refresh token 已被撤銷"
And 可選：撤銷該用戶的所有 token（偵測到異常使用）
```

### 9. 新 token 包含最新用戶資訊

```
Given 用戶資料在 token 過期前有更新
When 刷新 token
Then 新 token 應包含最新的用戶資訊
And payload 應反映當前的用戶狀態
```

### 10. RefreshToken 輪換機制（可選）

```
Given 系統啟用 refreshToken 輪換
When 成功刷新 token
Then 應該回傳新的 refreshToken
And 舊的 refreshToken 應該失效
And 舊的 refreshToken 只能使用一次
```

## Token 刷新策略

### 1. Access Token 設計

- **有效期限**: 短期（建議 15 分鐘 - 1 小時）
- **用途**: 日常 API 請求認證
- **儲存**: 前端記憶體或 sessionStorage

### 2. Refresh Token 設計

- **有效期限**: 長期（建議 7-30 天）
- **用途**: 刷新 access token
- **儲存**: HttpOnly Cookie 或安全儲存
- **特性**:
  - 只能用於刷新端點
  - 可以被撤銷
  - 記錄使用歷史

### 3. 刷新時機

前端應在以下時機刷新 token：

1. **主動刷新**: access token 即將過期時（提前 5 分鐘）
2. **被動刷新**: 收到 401 錯誤時嘗試刷新
3. **靜默刷新**: 背景定時刷新保持登入狀態

### 4. 輪換機制（Refresh Token Rotation）

推薦實作 refreshToken 輪換以提升安全性：

- 每次刷新都發放新的 refreshToken
- 舊的 refreshToken 立即失效
- 偵測重複使用時撤銷所有 token
- 防止 token 被盜用後持續使用

## 安全性考量

### 1. Token 盜用防護

- **實作 refreshToken 輪換**：每次使用後更新
- **偵測異常使用**：重複使用已失效的 refreshToken 時觸發安全警報
- **撤銷機制**：發現異常時撤銷該用戶的所有 token

### 2. 儲存安全

- **前端**: refreshToken 儲存在 HttpOnly Cookie 或安全加密儲存
- **後端**: refreshToken 雜湊後儲存，或使用 token family 機制

### 3. 傳輸安全

- **強制 HTTPS**: 所有 token 操作必須透過 HTTPS
- **CSRF 防護**: 使用 CSRF token 保護刷新端點

### 4. 監控與日誌

- 記錄所有 token 刷新事件
- 記錄 IP 和 User-Agent
- 異常刷新頻率警報
- 多裝置登入檢測

## 實作考量

### RefreshToken 儲存方案

#### 方案 1: 資料庫儲存
```sql
CREATE TABLE refresh_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  revoked BOOLEAN DEFAULT FALSE,
  replaced_by TEXT
);
```

#### 方案 2: Redis 儲存
- Key: `refresh_token:{token_hash}`
- Value: `{user_id, expires_at, revoked}`
- TTL: 自動過期

### 錯誤處理流程

```
1. 驗證 refreshToken 格式
2. 檢查 refreshToken 是否存在且未撤銷
3. 檢查是否過期
4. 檢查用戶是否存在且狀態正常
5. 生成新的 access token
6. (可選) 生成新的 refresh token 並撤銷舊的
7. 返回新 token
```

## 相關端點

- [POST /api/auth/login](./login.spec.md) - 用戶登入（獲得初始 token）
- [POST /api/auth/logout](./logout.spec.md) - 用戶登出（撤銷 refreshToken）
- [GET /api/auth/me](./me.spec.md) - 取得當前用戶資訊（使用 access token）

## 前端整合範例

```javascript
// 自動刷新機制
async function refreshToken() {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: getStoredRefreshToken()
      })
    });

    if (response.ok) {
      const { data } = await response.json();
      setAccessToken(data.token);
      setRefreshToken(data.refreshToken);
      return data.token;
    } else {
      // Refresh 失敗，需要重新登入
      redirectToLogin();
    }
  } catch (error) {
    redirectToLogin();
  }
}

// API 請求攔截器
async function apiRequest(url, options) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${getAccessToken()}`
    }
  });

  // 如果 401，嘗試刷新 token
  if (response.status === 401) {
    const newToken = await refreshToken();
    if (newToken) {
      // 使用新 token 重試
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        }
      });
    }
  }

  return response;
}
```
