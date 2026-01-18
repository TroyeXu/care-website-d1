# API 規格：取得單一看護詳細資訊

## 端點資訊

- **路徑**: `/api/caregivers/:id`
- **方法**: `GET`
- **認證**: 不需要
- **描述**: 取得單一看護的完整詳細資訊

## 請求規格

### Path Parameters
- `id`: 看護 ID (required)

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "string",
    "user_id": "string",
    "name": "string",
    "avatar": "string",
    "gender": "string",
    "address": "string",
    "bio": "string",
    "hourly_rate": "number",
    "experience_years": "number",
    "rating": "number",
    "total_reviews": "number",
    "completion_rate": "number",
    "response_rate": "number",
    "background_checked": "boolean",
    "drug_test_passed": "boolean",
    "certifications": [
      {
        "name": "string",
        "issuer": "string",
        "issue_date": "string",
        "expiry_date": "string",
        "verified": "boolean"
      }
    ],
    "specialties": [
      {
        "name": "string",
        "category": "string"
      }
    ],
    "service_areas": [
      {
        "city": "string",
        "district": "string"
      }
    ],
    "reviews": [
      {
        "id": "string",
        "user_name": "string",
        "rating": "number",
        "comment": "string",
        "created_at": "string"
      }
    ],
    "status": "string",
    "created_at": "string"
  }
}
```

### 錯誤回應

#### 看護不存在 (404 Not Found)
```json
{
  "success": false,
  "message": "找不到 看護"
}
```

## 測試案例

### 1. 成功取得看護資訊
```
Given 看護存在
When 提供有效的看護 ID
Then 應該回傳 200 狀態碼
And 回應包含完整的看護資訊
And 包含所有證照、專長、服務區域
And 包含評價列表
```

### 2. 看護不存在
```
Given 看護不存在
When 提供不存在的 ID
Then 應該回傳 404 狀態碼
```
