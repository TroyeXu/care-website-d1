# Claude Code 工作流程設定

## 核心工作流程規則

### 1. Todo List 管理
- 每次接收到任務時，必須先使用 TodoWrite 工具建立 todo list
- 將複雜任務分解成具體的子任務
- 即時更新任務狀態 (pending -> in_progress -> completed)
- 同時只能有一個任務為 in_progress 狀態

### 2. Q&A 筆記系統
- 每次解決問題後，將過程記錄成 Q&A 格式
- 筆記格式：
  ```markdown
  ## Q: [問題描述]
  
  ## A: [解決方案]
  
  ### 解決步驟：
  1. [步驟1]
  2. [步驟2]
  3. [步驟3]
  
  ### 相關檔案：
  - [檔案路径:行號]
  
  ### 學習重點：
  - [重要概念或技巧]
  ```

### 3. 回覆語言
- 所有回覆都必須使用繁體中文
- 技術術語可保持英文，但說明需用中文

### 4. 工作步驟流程
1. 建立 todo list
2. 分析問題並開始執行
3. 完成任務後更新 todo 狀態
4. 將解決過程記錄成 Q&A 格式
5. 總結並確認完成

## 專案特定資訊

### 專案類型
- Flutter 寵物管理應用
- 使用 GetX 狀態管理
- Firebase 後端服務

### 常用命令
- 程式碼格式化：`flutter format .`
- 執行測試：`flutter test`
- 建置：`flutter build apk`
- 執行 Web 版本：`flutter run -d chrome`

### 檔案結構重點
- 控制器：`lib/modules/*/controllers/`
- 服務：`lib/shared/services/`
- 模型：`lib/shared/models/`
- 儲存庫：`lib/shared/repositories/`

## 注意事項
- 優先使用現有的檔案結構和模式
- 遵循專案的程式碼風格
- 完成任務後務必執行測試和格式化