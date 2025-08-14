// D1 資料庫工具
import type { D1Database } from '@cloudflare/workers-types'
import type { H3Event } from 'h3'

// D1 Result 介面（如果 @cloudflare/workers-types 沒有提供）
interface D1Result {
  success: boolean
  meta: {
    duration: number
    changes: number
    last_row_id: number | string
    rows_read: number
    rows_written: number
  }
}

// 獲取 D1 資料庫實例
export function getD1(event: H3Event): D1Database {
  // 在 Cloudflare Workers 環境中，DB 會自動注入到 context
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    // 開發環境使用 mock 或拋出錯誤
    if (process.dev) {
      throw new Error(
        'D1 database not configured for development. Please use wrangler dev.',
      )
    }
    throw new Error('D1 database not available')
  }

  return db as D1Database
}

// 執行查詢並返回結果
export async function query<T = any>(
  event: H3Event,
  sql: string,
  params?: any[],
): Promise<T[]> {
  const db = getD1(event)
  const stmt = params ? db.prepare(sql).bind(...params) : db.prepare(sql)
  const result = await stmt.all()
  return result.results as T[]
}

// 執行查詢並返回第一筆結果
export async function queryFirst<T = any>(
  event: H3Event,
  sql: string,
  params?: any[],
): Promise<T | null> {
  const db = getD1(event)
  const stmt = params ? db.prepare(sql).bind(...params) : db.prepare(sql)
  const result = await stmt.first()
  return result as T | null
}

// 執行命令（INSERT, UPDATE, DELETE）
export async function execute(
  event: H3Event,
  sql: string,
  params?: any[],
): Promise<D1Result> {
  const db = getD1(event)
  const stmt = params ? db.prepare(sql).bind(...params) : db.prepare(sql)
  return await stmt.run()
}

// 批次執行多個語句
export async function batch(
  event: H3Event,
  statements: Array<{ sql: string; params?: any[] }>,
): Promise<D1Result[]> {
  const db = getD1(event)
  const batch = statements.map(({ sql, params }) =>
    params ? db.prepare(sql).bind(...params) : db.prepare(sql),
  )
  return await db.batch(batch)
}

// 交易處理
export async function transaction<T>(
  event: H3Event,
  callback: (db: D1Database) => Promise<T>,
): Promise<T> {
  const db = getD1(event)

  try {
    await execute(event, 'BEGIN TRANSACTION')
    const result = await callback(db)
    await execute(event, 'COMMIT')
    return result
  } catch (error) {
    await execute(event, 'ROLLBACK')
    throw error
  }
}

// 分頁查詢
export interface PaginationOptions {
  page?: number
  limit?: number
  orderBy?: string
  orderDir?: 'ASC' | 'DESC'
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export async function paginate<T = any>(
  event: H3Event,
  baseQuery: string,
  countQuery: string,
  options: PaginationOptions = {},
  params?: any[],
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, options.page || 1)
  const limit = Math.min(100, Math.max(1, options.limit || 20))
  const offset = (page - 1) * limit

  // 構建查詢
  let queryString = baseQuery
  if (options.orderBy) {
    queryString += ` ORDER BY ${options.orderBy} ${options.orderDir || 'ASC'}`
  }
  queryString += ` LIMIT ? OFFSET ?`

  // 執行查詢
  const [data, countResult] = await Promise.all([
    query<T>(event, queryString, [...(params || []), limit, offset]),
    queryFirst<{ count: number }>(event, countQuery, params),
  ])

  const total = countResult?.count || 0
  const totalPages = Math.ceil(total / limit)

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

// 產生唯一 ID（使用 crypto.randomUUID 或 nanoid）
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // 備用方案：簡單的隨機字串
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// SQL 注入防護：驗證排序欄位
export function validateOrderBy(
  field: string,
  allowedFields: string[],
): string {
  if (!allowedFields.includes(field)) {
    throw new Error(`Invalid order by field: ${field}`)
  }
  return field
}

// 建立 WHERE 條件
export interface WhereCondition {
  field: string
  operator: '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'IN' | 'NOT IN'
  value: any
}

export function buildWhereClause(conditions: WhereCondition[]): {
  clause: string
  params: any[]
} {
  if (!conditions.length) {
    return { clause: '', params: [] }
  }

  const clauses: string[] = []
  const params: any[] = []

  for (const condition of conditions) {
    if (condition.operator === 'IN' || condition.operator === 'NOT IN') {
      const placeholders = Array(condition.value.length).fill('?').join(',')
      clauses.push(`${condition.field} ${condition.operator} (${placeholders})`)
      params.push(...condition.value)
    } else {
      clauses.push(`${condition.field} ${condition.operator} ?`)
      params.push(condition.value)
    }
  }

  return {
    clause: 'WHERE ' + clauses.join(' AND '),
    params,
  }
}
