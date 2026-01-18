# API 規格：取得看護列表

## 端點資訊

- **路徑**: `/api/caregivers`
- **方法**: `GET`
- **認證**: 不需要
- **描述**: 取得看護列表，支援篩選、排序和分頁

## 請求規格

### Query Parameters

```
city: string (optional) - 服務城市
district: string (optional) - 服務區域
specialty: string (optional) - 專長
minRate: number (optional) - 最低時薪
maxRate: number (optional) - 最高時薪
minRating: number (optional) - 最低評分
experienceYears: number (optional) - 最少經驗年數
gender: string (optional) - 性別
sortBy: string (optional, default: 'rating') - 排序方式
  - 'rating': 按評分排序
  - 'price_low': 按價格由低到高
  - 'price_high': 按價格由高到低
  - 'experience': 按經驗年數排序
  - 'reviews': 按評論數量排序
page: number (optional, default: 1) - 頁碼
limit: number (optional, default: 20, max: 100) - 每頁筆數
```

### 範例請求

```
GET /api/caregivers?city=台北市&minRating=4&sortBy=rating&page=1&limit=20
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
      "name": "string",
      "avatar": "string",
      "gender": "string",
      "address": "string",
      "hourly_rate": "number",
      "experience_years": "number",
      "bio": "string",
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
      "recent_reviews": [
        {
          "rating": "number",
          "comment": "string",
          "created_at": "string"
        }
      ],
      "status": "string",
      "created_at": "string"
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
      "city": "string",
      "district": "string",
      "specialty": "string",
      "minRate": "number",
      "maxRate": "number",
      "minRating": "number",
      "experienceYears": "number",
      "gender": "string",
      "sortBy": "string"
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
    "field": "page",
    "details": "頁碼必須大於 0"
  }
}
```

## 測試案例

### 1. 取得預設看護列表

```
Given 系統中有多位看護
When 不提供任何篩選條件
Then 應該回傳 200 狀態碼
And 回傳啟用中的看護列表
And 按評分排序
And 每頁顯示 20 筆
And 回應包含分頁資訊
```

### 2. 按城市篩選

```
Given 系統中有多位看護
When 提供 city 參數
Then 只回傳服務該城市的看護
And 使用 service_areas 子查詢篩選
```

### 3. 按區域篩選

```
Given 系統中有多位看護
When 提供 district 參數
Then 只回傳服務該區域的看護
And 使用 service_areas 子查詢篩選
```

### 4. 按城市和區域篩選

```
Given 系統中有多位看護
When 同時提供 city 和 district 參數
Then 只回傳同時服務該城市和區域的看護
```

### 5. 按專長篩選

```
Given 系統中有多位看護
When 提供 specialty 參數
Then 只回傳具有該專長或專長類別的看護
And 使用 specialties 子查詢篩選
```

### 6. 按時薪範圍篩選 - 最低時薪

```
Given 系統中有多位看護
When 提供 minRate 參數
Then 只回傳時薪 >= minRate 的看護
```

### 7. 按時薪範圍篩選 - 最高時薪

```
Given 系統中有多位看護
When 提供 maxRate 參數
Then 只回傳時薪 <= maxRate 的看護
```

### 8. 按時薪範圍篩選 - 範圍區間

```
Given 系統中有多位看護
When 同時提供 minRate 和 maxRate
Then 只回傳時薪在範圍內的看護
```

### 9. 按評分篩選

```
Given 系統中有多位看護
When 提供 minRating 參數
Then 只回傳評分 >= minRating 的看護
```

### 10. 按經驗年數篩選

```
Given 系統中有多位看護
When 提供 experienceYears 參數
Then 只回傳經驗年數 >= experienceYears 的看護
```

### 11. 按性別篩選

```
Given 系統中有多位看護
When 提供 gender 參數
Then 只回傳該性別的看護
```

### 12. 組合多個篩選條件

```
Given 系統中有多位看護
When 同時提供 city, minRating, experienceYears
Then 只回傳同時符合所有條件的看護
```

### 13. 按評分排序（預設）

```
Given 系統中有多位看護
When sortBy 為 'rating' 或不提供
Then 按評分降序排列
And 評分相同時按評論數量降序
```

### 14. 按價格由低到高排序

```
Given 系統中有多位看護
When sortBy 為 'price_low'
Then 按時薪升序排列
```

### 15. 按價格由高到低排序

```
Given 系統中有多位看護
When sortBy 為 'price_high'
Then 按時薪降序排列
```

### 16. 按經驗排序

```
Given 系統中有多位看護
When sortBy 為 'experience'
Then 按經驗年數降序排列
```

### 17. 按評論數量排序

```
Given 系統中有多位看護
When sortBy 為 'reviews'
Then 按評論總數降序排列
```

### 18. 分頁 - 第一頁

```
Given 系統中有 50 位看護
When page=1, limit=20
Then 回傳前 20 筆
And hasNext 為 true
And hasPrev 為 false
And totalPages 為 3
```

### 19. 分頁 - 中間頁

```
Given 系統中有 50 位看護
When page=2, limit=20
Then 回傳 21-40 筆
And hasNext 為 true
And hasPrev 為 true
```

### 20. 分頁 - 最後一頁

```
Given 系統中有 50 位看護
When page=3, limit=20
Then 回傳 41-50 筆
And hasNext 為 false
And hasPrev 為 true
```

### 21. 分頁參數驗證 - 頁碼小於 1

```
Given 嘗試取得看護列表
When page < 1
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "頁碼必須大於 0"
```

### 22. 分頁參數驗證 - 每頁筆數小於 1

```
Given 嘗試取得看護列表
When limit < 1
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "每頁筆數必須大於 0"
```

### 23. 分頁參數驗證 - 每頁筆數超過上限

```
Given 嘗試取得看護列表
When limit > 100
Then 應該回傳 400 狀態碼
And 錯誤訊息為 "每頁筆數不得超過 100"
```

### 24. 只回傳啟用中的看護

```
Given 系統中有啟用和停用的看護
When 查詢看護列表
Then 只回傳 status = 'active' 的看護
```

### 25. 回應包含證照資訊

```
Given 看護有多張證照
When 取得看護列表
Then 每位看護最多回傳 5 張已驗證的證照
And 證照包含 name, issuer, verified 欄位
```

### 26. 回應包含專長資訊

```
Given 看護有多項專長
When 取得看護列表
Then 每位看護最多回傳 10 項專長
And 專長包含 name, category 欄位
```

### 27. 回應包含服務區域

```
Given 看護服務多個區域
When 取得看護列表
Then 回傳所有服務區域
And 服務區域包含 city, district 欄位
```

### 28. 回應包含最近評價

```
Given 看護有多則評價
When 取得看護列表
Then 每位看護回傳最近 3 則評價
And 評價包含 rating, comment, created_at 欄位
And 按建立時間降序排列
```

### 29. 回應包含完整統計資訊

```
Given 取得看護列表
Then 每位看護應包含：
  - rating: 評分
  - total_reviews: 評論總數
  - completion_rate: 完成率
  - response_rate: 回應率
```

### 30. 回應包含驗證狀態

```
Given 取得看護列表
Then 每位看護應包含：
  - background_checked: 背景調查狀態
  - drug_test_passed: 藥檢狀態
```

### 31. 空結果集

```
Given 沒有符合條件的看護
When 提供篩選條件
Then 應該回傳 200 狀態碼
And data 為空陣列
And total 為 0
```

### 32. 回應包含所有應用的篩選條件

```
Given 提供多個篩選條件
When 取得看護列表
Then meta.filters 應包含所有使用的篩選參數
```

## 效能考量

- 使用子查詢優化服務區域和專長篩選
- 批量查詢關聯資料（證照、專長、服務區域、評價）
- 限制每項關聯資料的數量
- 使用適當的索引提升查詢效能

## 相關端點

- [GET /api/caregivers/:id](./get-caregiver.spec.md) - 取得單一看護詳細資訊
- [POST /api/bookings](../bookings/create-booking.spec.md) - 建立預約
