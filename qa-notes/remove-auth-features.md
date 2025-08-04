# 移除登入和用戶相關功能

## Q: 如何移除登入系統、支付紀錄、排程管理、個人儀表板和評價系統？

## A: 系統性地移除所有用戶相關功能，並重新組織選單結構

### 移除的功能：

1. **登入系統**
   - 移除頂部導航的登入按鈕和用戶頭像
   - 移除 drawer 中的登入提示和用戶資訊
   - 移除登出功能

2. **支付紀錄** - 從選單中移除
3. **排程管理** - 從選單中移除  
4. **個人儀表板** - 從選單中移除
5. **評價系統** - 從選單中移除

### 重新整理的用戶中心選單：

將原本分散在其他地方的功能整合到用戶中心：

```javascript
const userMenuItems = [
  { to: '/booking/calculator', icon: 'calculate', label: '費用計算器' },
  { to: '/info/advantages', icon: 'star', label: '平台優勢' },
  { to: '/info/guide', icon: 'help_outline', label: '使用指南' },
  { to: '/info/subsidy', icon: 'account_balance', label: '補助資訊' },
  { to: '/info/safety', icon: 'security', label: '安全保障' },
  { to: '/info/app', icon: 'phone_android', label: '手機應用' },
  { to: '/join', icon: 'person_add', label: '成為看護師' },
  { to: '/content/blog', icon: 'article', label: '照護知識' },
  { to: '/content/resources', icon: 'library_books', label: '資源中心' },
]
```

### UI 更新：

1. **頂部導航**
   - 移除登入按鈕，改為「聯絡我們」按鈕
   - 移除用戶頭像和通知功能

2. **側邊 Drawer**
   - 移除用戶登入區塊
   - 改為平台介紹區塊
   - 移除登出按鈕

3. **底部導航**
   - 將「我的」改為「更多」
   - 點擊開啟側邊選單而非個人頁面

### 相關檔案：

- app/app.vue:93-98 (平台介紹區塊)
- app/app.vue:32-41 (頂部導航)
- app/app.vue:183-189 (底部導航)
- app/app.vue:452-516 (用戶中心選單)

### 學習重點：

- 系統性移除功能時，要注意相關的 UI 元件和事件處理
- 重新組織選單結構可以提供更好的使用者體驗
- 移除登入系統後，要確保沒有遺留的權限檢查邏輯
- 簡化系統可以讓使用者更專注於核心功能