# API 規格：健康檢查

## 端點資訊

- **路徑**: `/api/health`
- **方法**: `GET`
- **認證**: 不需要
- **描述**: 檢查 API 服務健康狀態

## 請求規格

此端點不需要任何參數。

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "string",
    "uptime": "number",
    "database": "connected"
  }
}
```

### 錯誤回應

#### 服務異常 (503 Service Unavailable)

```json
{
  "success": false,
  "data": {
    "status": "unhealthy",
    "timestamp": "string",
    "error": "Database connection failed"
  }
}
```

## 測試案例

### 1. 服務正常運作

```
Given API 服務正常運作
When 訪問健康檢查端點
Then 應該回傳 200 狀態碼
And status 為 "healthy"
And 包含當前時間戳記
And 包含 uptime 資訊
And database 狀態為 "connected"
```

### 2. 資料庫連線失敗

```
Given 資料庫連線失敗
When 訪問健康檢查端點
Then 應該回傳 503 狀態碼
And status 為 "unhealthy"
And 包含錯誤訊息
```
