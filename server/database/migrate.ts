// 資料庫 Migration 執行腳本
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { D1Database } from '@cloudflare/workers-types'

export async function runMigrations(db: D1Database) {
  try {
    // 建立 migrations 記錄表
    await db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `,
      )
      .run()

    // 讀取所有 migration 檔案
    const migrationsDir = join(process.cwd(), 'server/database/migrations')
    const files = await readdir(migrationsDir)
    const sqlFiles = files.filter((f) => f.endsWith('.sql')).sort()

    // 取得已執行的 migrations
    const executed = await db.prepare('SELECT filename FROM migrations').all()
    const executedFiles = new Set(executed.results.map((r) => r.filename))

    // 執行尚未執行的 migrations
    for (const file of sqlFiles) {
      if (!executedFiles.has(file)) {
        console.log(`執行 migration: ${file}`)

        const sqlContent = await readFile(join(migrationsDir, file), 'utf-8')

        // 分割 SQL 語句 (以分號分隔)
        const statements = sqlContent
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0)

        // 執行每個語句
        for (const statement of statements) {
          await db.prepare(statement).run()
        }

        // 記錄已執行的 migration
        await db
          .prepare('INSERT INTO migrations (filename) VALUES (?)')
          .bind(file)
          .run()

        console.log(`✅ Migration ${file} 執行成功`)
      }
    }

    console.log('✅ 所有 migrations 執行完成')
  } catch (error) {
    console.error('❌ Migration 執行失敗:', error)
    throw error
  }
}

// CLI 執行
if (import.meta.url === `file://${process.argv[1]}`) {
  // 這裡需要根據環境取得 D1 實例
  console.log('請透過 Wrangler 執行 migrations')
}
