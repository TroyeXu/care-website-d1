const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = 'https://irjeyglrspwqlvgwtvka.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyamV5Z2xyc3B3cWx2Z3d0dmthIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjQ1ODgyMCwiZXhwIjoyMDY4MDM0ODIwfQ.2B7qz8tCvKBjrcFcqOCiKcRJR0MpFKNa6MIrKpBf1mg'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    // 讀取 SQL 檔案
    const sqlContent = fs.readFileSync('supabase-schema.sql', 'utf8')
    
    // 執行 SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent })
    
    if (error) {
      console.error('錯誤:', error)
    } else {
      console.log('資料庫設定完成！')
      console.log('建立的表格:', data)
    }
  } catch (err) {
    console.error('執行失敗:', err.message)
  }
}

setupDatabase()