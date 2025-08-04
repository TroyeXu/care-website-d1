# 簡化導覽選單

## Q: 如何移除不需要的功能頁面並簡化導覽選單？

## A: 移除多個功能頁面，將安全保障整合到平台優勢，精簡導覽結構

### 移除的頁面：

1. **內容相關：**
   - `/content/blog` - 照護知識
   - `/content/resources` - 資源中心

2. **資訊頁面：**
   - `/info/app` - 手機應用
   - `/info/subsidy` - 補助資訊
   - `/info/guide` - 使用指南
   - `/info/pricing` - 計費說明
   - `/info/safety` - 安全保障（內容已整合到平台優勢）

### 整合後的導覽結構：

**主選單 (mainMenuItems):**
- 首頁
- 看護師列表
- 搜尋看護師
- 智能媒合

**用戶中心 (userMenuItems):**
- 費用計算器
- 平台優勢（包含安全保障）
- 成為看護師

**其他 (otherMenuItems):**
- 服務介紹
- 聯繫我們
- 關於我們

### 安全保障整合：

在平台優勢頁面中新增了「完善的安全保障」區塊，包含：
- 完整背景調查
- 定期教育訓練
- 24小時客服支援
- 嚴格健康監測
- 保密個資管理

### 相關檔案：

- app/app.vue:357-380 (精簡版用戶選單)
- app/app.vue:382-402 (更新的其他選單)
- app/pages/info/advantages.vue:30-44 (安全保障區域)
- app/pages/info/advantages.vue:77-108 (安全保障資料)

### 建議刪除的檔案：

```bash
# 內容相關
app/pages/content/blog.vue
app/pages/content/resources.vue

# 資訊頁面
app/pages/info/app.vue
app/pages/info/subsidy.vue
app/pages/info/guide.vue
app/pages/info/pricing.vue
app/pages/info/safety.vue

# 認證相關（之前提到的）
app/pages/auth/login.vue
app/pages/auth/register.vue

# 用戶功能（之前提到的）
app/pages/booking/schedule.vue
app/pages/user/dashboard.vue
app/pages/support/reviews.vue
```

### 學習重點：

- 簡化導覽可以讓使用者更專注於核心功能
- 相關內容可以整合到同一個頁面，減少頁面數量
- 移除功能時要確保導覽選單同步更新
- 保持導覽結構清晰，分類明確