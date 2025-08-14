import { defineEventHandler, readBody, createError } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../../utils/d1'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const db = getD1(event)

    // 驗證必要欄位
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
    } = body

    if (
      !user_id ||
      !caregiver_id ||
      !service_date ||
      !start_time ||
      !end_time
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要資料',
      })
    }

    // 檢查看護是否存在
    const caregiver = await db
      .prepare('SELECT id FROM caregivers WHERE id = ?')
      .bind(caregiver_id)
      .first()
    if (!caregiver) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到指定的看護',
      })
    }

    // 檢查使用者是否存在
    const user = await db
      .prepare('SELECT id FROM users WHERE id = ?')
      .bind(user_id)
      .first()
    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: '找不到指定的使用者',
      })
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
      throw createError({
        statusCode: 409,
        statusMessage: '該時段已被預約',
      })
    }

    // 產生預約 ID
    const bookingId = nanoid()

    // 插入預約記錄
    const result = await db
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

    return {
      success: true,
      booking: newBooking,
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Database error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `建立預約失敗: ${error.message}`,
    })
  }
})
