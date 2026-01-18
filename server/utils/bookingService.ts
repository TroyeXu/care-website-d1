import { nanoid } from 'nanoid'
import type { D1Database } from '@cloudflare/workers-types'
import { createNotFoundError, createConflictError } from './error-handler'
import {
  validateRequired,
  validateDateFormat,
  validateTimeFormat,
} from './validation'

interface CreateBookingParams {
  user_id: string
  caregiver_id: string
  service_date: string
  start_time: string
  end_time: string
  service_hours?: number
  service_location?: string
  service_type?: string
  requirements?: string
  total_amount?: number
  payment_method?: string
  notes?: string
}

export const createBooking = async (
  db: D1Database,
  params: CreateBookingParams,
) => {
  /* eslint-disable camelcase */
  const {
    user_id,
    caregiver_id,
    service_date,
    start_time,
    end_time,
    service_hours,
    service_location,
    service_type,
    requirements,
    total_amount,
    payment_method,
    notes,
  } = params

  // 驗證必要欄位
  validateRequired(user_id, 'user_id', '用戶 ID')
  validateRequired(caregiver_id, 'caregiver_id', '看護 ID')
  validateRequired(service_date, 'service_date', '服務日期')
  validateRequired(start_time, 'start_time', '開始時間')
  validateRequired(end_time, 'end_time', '結束時間')

  // 驗證日期和時間格式
  validateDateFormat(service_date, 'service_date')
  validateTimeFormat(start_time, 'start_time')
  validateTimeFormat(end_time, 'end_time')

  // 檢查看護是否存在
  const caregiver = await db
    .prepare('SELECT id FROM caregivers WHERE id = ?')
    .bind(caregiver_id)
    .first()
  if (!caregiver) {
    throw createNotFoundError('看護', caregiver_id)
  }

  // 檢查使用者是否存在
  const user = await db
    .prepare('SELECT id FROM users WHERE id = ?')
    .bind(user_id)
    .first()
  if (!user) {
    throw createNotFoundError('用戶', user_id)
  }

  // 檢查時間衝突
  const conflict = await db
    .prepare(
      `
    SELECT id FROM bookings 
    WHERE caregiver_id = ? 
    AND service_date = ? 
    AND status NOT IN ('cancelled', 'completed')
    AND (
      (start_time <= ? AND end_time > ?) OR
      (start_time < ? AND end_time >= ?) OR
      (start_time >= ? AND end_time <= ?)
    )
  `,
    )
    .bind(
      caregiver_id,
      service_date,
      start_time,
      start_time,
      end_time,
      end_time,
      start_time,
      end_time,
    )
    .first()

  if (conflict) {
    throw createConflictError('該時段已被預約', {
      conflictId: (conflict as any).id,
      service_date,
      start_time,
      end_time,
    })
  }

  // 產生預約 ID
  const bookingId = nanoid()

  // 插入預約記錄
  await db
    .prepare(
      `
    INSERT INTO bookings (
      id, user_id, caregiver_id, service_date, 
      start_time, end_time, service_hours, service_location,
      service_type, requirements, status, total_amount, 
      payment_status, payment_method, notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, 'pending', ?, ?, datetime('now'), datetime('now'))
  `,
    )
    .bind(
      bookingId,
      user_id,
      caregiver_id,
      service_date,
      start_time,
      end_time,
      service_hours || 0,
      service_location || '',
      service_type || 'general',
      requirements || '',
      total_amount || 0,
      payment_method || 'cash',
      notes || '',
    )
    .run()
  /* eslint-enable camelcase */

  // 回傳新建立的預約資料
  const newBooking = await db
    .prepare(
      `
    SELECT 
      b.*,
      u.name as user_name,
      u.email as user_email,
      u.phone as user_phone,
      c.user_id as caregiver_user_id,
      cu.name as caregiver_name,
      cu.email as caregiver_email,
      cu.phone as caregiver_phone
    FROM bookings b
    LEFT JOIN users u ON b.user_id = u.id
    LEFT JOIN caregivers c ON b.caregiver_id = c.id
    LEFT JOIN users cu ON c.user_id = cu.id
    WHERE b.id = ?
  `,
    )
    .bind(bookingId)
    .first()

  return newBooking
}
