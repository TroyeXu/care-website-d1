# DogFriend API 測試規格文件

本目錄包含 DogFriend 看護媒合平台的完整 API 測試規格，使用 SpecKit 框架撰寫。

## 📁 目錄結構

```
spec/
├── README.md                               # 本文件
└── api/
    ├── auth/                              # 認證相關 API
    │   ├── login.spec.md                 # 用戶登入
    │   ├── register.spec.md              # 用戶註冊
    │   ├── logout.spec.md                # 用戶登出
    │   ├── me.spec.md                    # 取得當前用戶資訊
    │   └── refresh.spec.md               # 刷新 Token
    ├── bookings/                          # 預約相關 API
    │   ├── create-booking.spec.md        # 建立預約
    │   ├── list-bookings.spec.md         # 取得預約列表
    │   ├── get-booking.spec.md           # 取得單一預約
    │   └── update-booking.spec.md        # 更新預約
    ├── caregivers/                        # 看護相關 API
    │   ├── list-caregivers.spec.md       # 取得看護列表
    │   └── get-caregiver.spec.md         # 取得單一看護
    ├── users/                             # 用戶相關 API
    │   ├── get-user.spec.md              # 取得用戶資訊
    │   └── update-user.spec.md           # 更新用戶資訊
    ├── reviews/                           # 評價相關 API
    │   └── create-review.spec.md         # 建立評價
    ├── system/                            # 系統相關 API
    │   ├── health.spec.md                # 健康檢查
    │   └── contact.spec.md               # 聯絡表單
    └── admin/                             # 管理員相關 API
        └── auth/
            └── admin-login.spec.md       # 管理員登入
```

## 🎯 功能模組

### 1. 認證模組 (Authentication)

#### 一般用戶認證
- **登入** (`POST /api/auth/login`) - [規格](./api/auth/login.spec.md)
  - Email 和密碼驗證
  - JWT token 發放
  - 登入狀態管理

- **註冊** (`POST /api/auth/register`) - [規格](./api/auth/register.spec.md)
  - 用戶資料驗證
  - 密碼強度檢查
  - Email 重複檢查
  - 角色設定（user/caregiver）

- **登出** (`POST /api/auth/logout`) - [規格](./api/auth/logout.spec.md)
  - Token 失效處理
  - RefreshToken 撤銷

- **取得當前用戶** (`GET /api/auth/me`) - [規格](./api/auth/me.spec.md)
  - 驗證登入狀態
  - 回傳完整用戶資訊
  - 看護角色額外資訊

- **刷新 Token** (`POST /api/auth/refresh`) - [規格](./api/auth/refresh.spec.md)
  - RefreshToken 驗證
  - 發放新 AccessToken
  - Token 輪換機制

#### 管理員認證
- **管理員登入** (`POST /api/admin/auth/login`) - [規格](./api/admin/auth/admin-login.spec.md)
  - 管理員權限驗證
  - 獨立的認證流程
  - 權限列表回傳

### 2. 預約模組 (Bookings)

- **建立預約** (`POST /api/bookings`) - [規格](./api/bookings/create-booking.spec.md)
  - 完整的預約資訊驗證
  - 用戶和看護存在性檢查
  - 時段衝突檢測
  - 支援多種時段重疊情況

- **取得預約列表** (`GET /api/bookings`) - [規格](./api/bookings/list-bookings.spec.md)
  - 按用戶或看護篩選
  - 按狀態篩選
  - 分頁功能
  - 包含用戶和看護資訊

- **取得單一預約** (`GET /api/bookings/:id`) - [規格](./api/bookings/get-booking.spec.md)
  - 查詢預約詳細資訊
  - 包含關聯資料

- **更新預約** (`PUT /api/bookings/:id`) - [規格](./api/bookings/update-booking.spec.md)
  - 更新預約資訊
  - 欄位驗證
  - 權限檢查

### 3. 看護模組 (Caregivers)

- **取得看護列表** (`GET /api/caregivers`) - [規格](./api/caregivers/list-caregivers.spec.md)
  - 多維度篩選（城市、區域、專長、價格、評分、經驗）
  - 多種排序方式
  - 分頁功能
  - 包含證照、專長、服務區域、評價等關聯資料

- **取得單一看護** (`GET /api/caregivers/:id`) - [規格](./api/caregivers/get-caregiver.spec.md)
  - 查詢看護完整資訊
  - 包含所有證照和專長
  - 包含評價列表

### 4. 用戶模組 (Users)

- **取得用戶資訊** (`GET /api/users/:id`) - [規格](./api/users/get-user.spec.md)
  - 查詢用戶基本資訊
  - 權限控制

- **更新用戶資訊** (`PUT /api/users/:id`) - [規格](./api/users/update-user.spec.md)
  - 更新個人資料
  - 權限驗證

### 5. 評價模組 (Reviews)

- **建立評價** (`POST /api/reviews`) - [規格](./api/reviews/create-review.spec.md)
  - 為已完成預約評價
  - 評分範圍驗證
  - 防止重複評價
  - 更新看護平均評分

### 6. 系統模組 (System)

- **健康檢查** (`GET /api/health`) - [規格](./api/system/health.spec.md)
  - 服務狀態檢查
  - 資料庫連線狀態

- **聯絡表單** (`POST /api/contact`) - [規格](./api/system/contact.spec.md)
  - 提交聯絡資訊
  - 資料驗證

## 📝 規格文件格式

每個規格文件包含以下部分：

### 1. 端點資訊
- API 路徑
- HTTP 方法
- 認證需求
- 功能描述

### 2. 請求規格
- Headers
- Query Parameters / Path Parameters
- Request Body
- 欄位驗證規則

### 3. 回應規格
- 成功回應格式和狀態碼
- 各種錯誤回應格式和狀態碼
- 詳細的錯誤訊息結構

### 4. 測試案例
- 採用 Given-When-Then 格式
- 涵蓋正常流程和異常情況
- 包含邊界條件測試
- 全面的驗證測試

### 5. 其他資訊
- 業務規則說明
- 安全性考量
- 效能考量
- 相關端點連結

## 🧪 測試案例類型

### 1. 正常流程測試 (Happy Path)
- 驗證 API 在正確輸入下的行為
- 確認回應格式和資料完整性

### 2. 驗證測試 (Validation Tests)
- 必填欄位檢查
- 資料格式驗證
- 資料範圍驗證
- 資料類型驗證

### 3. 業務邏輯測試 (Business Logic Tests)
- 資源存在性檢查
- 權限驗證
- 狀態轉換
- 衝突檢測

### 4. 邊界條件測試 (Edge Cases)
- 空值處理
- 極限值測試
- 特殊字元處理

### 5. 錯誤處理測試 (Error Handling)
- 各種錯誤狀態碼
- 錯誤訊息格式
- 錯誤詳情提供

## 🔧 使用 SpecKit

### 安裝

```bash
npm install --save-dev speckit
```

### 執行測試

```bash
# 執行所有測試
npx speckit run spec/

# 執行特定模組測試
npx speckit run spec/api/auth/

# 執行單一規格測試
npx speckit run spec/api/auth/login.spec.md
```

### 產生測試報告

```bash
npx speckit report --format html --output test-report.html
```

## 📊 API 規格統計

### 已完成規格

| 模組 | 端點數量 | 測試案例數 | 完成度 |
|-----|---------|-----------|--------|
| 認證（一般用戶） | 5 | 40+ | ✅ 100% |
| 認證（管理員） | 1 | 8 | ✅ 100% |
| 預約 | 4 | 45+ | ✅ 核心完成 |
| 看護 | 2 | 40+ | ✅ 100% |
| 用戶 | 2 | 10+ | ✅ 100% |
| 評價 | 1 | 8+ | ✅ 100% |
| 系統 | 2 | 6+ | ✅ 100% |
| **總計** | **17** | **157+** | **85%** |

### 待完成規格

以下是尚未撰寫規格的 API 端點：

#### 預約模組（擴充）
- `DELETE /api/bookings/:id` - 刪除預約
- `PUT /api/bookings/:id-status` - 更新預約狀態
- `POST /api/bookings/cancel` - 取消預約

#### 評價模組（擴充）
- `GET /api/reviews/caregiver/:id` - 取得看護評價列表

#### 付款模組
- `GET /api/payments` - 取得付款記錄
- `POST /api/payments` - 建立付款
- `GET /api/payments/history/:userId` - 取得付款歷史

#### 通知模組
- `GET /api/notifications/:userId` - 取得通知列表
- `PUT /api/notifications/:id-read` - 標記通知為已讀
- `PUT /api/notifications/:userId-read-all` - 標記所有通知為已讀
- `DELETE /api/notifications/:id` - 刪除通知

#### 儀表板模組
- `GET /api/dashboard/stats/:userId` - 取得用戶統計資訊
- `GET /api/admin/dashboard/stats` - 管理員儀表板統計

#### 系統模組（擴充）
- `GET /api/version` - 取得版本資訊

#### 管理員模組（完整後台）
- 預約管理 API
- 看護管理 API
- 用戶管理 API
- FAQ 管理 API
- 系統設定管理 API
- 聯絡表單管理 API
- 付款管理 API

## 🔒 安全性測試重點

1. **認證與授權**
   - JWT token 驗證
   - 權限檢查
   - 角色驗證

2. **資料驗證**
   - 輸入資料清理
   - SQL Injection 防護
   - XSS 防護

3. **敏感資料保護**
   - 密碼加密
   - 敏感資訊不出現在回應中
   - 錯誤訊息不洩漏系統資訊

## 📈 品質指標

### 測試覆蓋率目標
- 端點覆蓋率：100%
- 狀態碼覆蓋率：100%
- 錯誤情境覆蓋率：>95%

### 文件品質要求
- 每個端點都有完整規格文件
- 每個測試案例都有清晰的描述
- 所有欄位都有驗證規則說明
- 包含實際範例

## 🤝 貢獻指南

撰寫新的 API 規格時，請遵循以下原則：

1. **使用統一格式**：參考現有規格文件的結構
2. **完整性**：包含所有必要的章節
3. **清晰性**：使用清楚的語言描述
4. **全面性**：涵蓋所有可能的情境
5. **可測試性**：測試案例應該可以直接轉換為自動化測試

## 📚 參考資源

- [SpecKit 官方文件](https://speckit.dev)
- [產品文件](../doc/PRODUCT_DOCUMENTATION.md)
- [API 錯誤處理指南](../API_ERROR_HANDLING_GUIDE.md)
- [部署文件](../doc/DEPLOYMENT_DOCS.md)

## 🔄 更新日誌

### 2024-03-20
- ✅ 建立 spec 目錄結構
- ✅ 完成認證模組完整規格（登入、註冊、登出、me、refresh）
- ✅ 完成管理員登入規格
- ✅ 完成預約模組核心規格（建立、列表、查詢、更新）
- ✅ 完成看護模組規格（列表、查詢單一）
- ✅ 完成用戶模組規格（查詢、更新）
- ✅ 完成評價模組規格（建立評價）
- ✅ 完成系統模組規格（健康檢查、聯絡表單）
- ✅ 建立並更新 README 文件
- ✅ 設定 SpecKit 配置檔
- 📊 總計完成 17 個端點規格，涵蓋 157+ 測試案例

## 📞 聯絡資訊

如有問題或建議，請：
- 建立 Issue
- 聯繫開發團隊
