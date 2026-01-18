# API 規格：取得預約列表

## 端點資訊

- **路徑**: `/api/bookings`
- **方法**: `GET`
- **認證**: 需要 JWT token
- **描述**: 取得預約列表，支援篩選和分頁

## 請求規格

### Headers

```
Authorization: Bearer {token}
```

### Query Parameters

```
userId: string (optional) - 用戶 ID
caregiverId: string (optional) - 看護 ID
status: string (optional) - 預約狀態 (pending/confirmed/in_progress/completed/cancelled)
page: number (optional, default: 1) - 頁碼
limit: number (optional, default: 20, max: 100) - 每頁筆數
```

## 回應規格

### 成功回應 (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "user_id": "string",
      "caregiver_id": "string",
      "service_date": "string",
      "start_time": "string",
      "end_time": "string",
      "service_hours": "number",
      "service_location": "string",
      "service_type": "string",
      "requirements": "string",
      "status": "string",
      "total_amount": "number",
      "payment_status": "string",
      "payment_method": "string",
      "notes": "string",
      "created_at": "string",
      "updated_at": "string",
      "user": {
        "name": "string",
        "email": "string",
        "phone": "string"
      },
      "caregiver": {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "hourly_rate": "number",
        "rating": "number"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": "number",
      "limit": "number",
      "total": "number",
      "totalPages": "number",
      "hasNext": "boolean",
      "hasPrev": "boolean"
    },
    "filters": {
      "userId": "string",
      "caregiverId": "string",
      "status": "string"
    }
  }
}
```

## 測試案例

### 1. 取得所有預約

```
Given 系統中有多筆預約
When 不提供任何篩選條件
Then 應該回傳 200 狀態碼
And 回傳所有預約列表
And 按建立時間降序排列
```

### 2. 按用戶 ID 篩選

```
Given 系統中有多筆預約
When 提供 userId 參數
Then 只回傳該用戶的預約
```

### 3. 按看護 ID 篩選

```
Given 系統中有多筆預約
When 提供 caregiverId 參數
Then 只回傳該看護的預約
```

### 4. 按狀態篩選

```
Given 系統中有多種狀態的預約
When 提供 status 參數
Then 只回傳該狀態的預約
```

### 5. 組合篩選條件

```
Given 系統中有多筆預約
When 同時提供 userId 和 status
Then 只回傳符合所有條件的預約
```

### 6. 分頁功能

```
Given 系統中有 50 筆預約
When page=1, limit=20
Then 回傳前 20 筆
And pagination 資訊正確
```

### 7. 回應包含用戶和看護資訊

```
Given 取得預約列表
Then 每筆預約應包含 user 物件
And 每筆預約應包含 caregiver 物件
```
