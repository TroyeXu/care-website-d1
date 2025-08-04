import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // 獲取 D1 實例
  const { cloudflare } = event.context
  const db = cloudflare?.env?.DB

  // 如果沒有 D1（開發環境），返回測試資料
  if (!db) {
    return {
      id: 'bk-test-' + Date.now(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
  }

  try {
    // 驗證必要欄位
    const {
      patientName,
      patientPhone,
      patientEmail,
      caregiverId,
      serviceType,
      serviceDate,
      startTime,
      endTime,
      totalCost,
      notes,
    } = body

    if (
      !patientName ||
      !patientPhone ||
      !caregiverId ||
      !serviceDate ||
      !startTime ||
      !endTime
    ) {
      throw createError({
        statusCode: 400,
        statusMessage: '缺少必要資料',
      })
    }

    // 產生預約 ID
    const bookingId =
      'bk-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)

    // 插入預約記錄
    await db
      .prepare(
        `
      INSERT INTO bookings (
        id, patient_name, patient_phone, patient_email, 
        caregiver_id, service_type, service_date, 
        start_time, end_time, status, total_cost, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)
    `,
      )
      .bind(
        bookingId,
        patientName,
        patientPhone,
        patientEmail || null,
        caregiverId,
        serviceType,
        serviceDate,
        startTime,
        endTime,
        totalCost,
        notes || null,
      )
      .run()

    // 回傳新建立的預約資料
    const newBooking = await db
      .prepare('SELECT * FROM bookings WHERE id = ?')
      .bind(bookingId)
      .first()

    return newBooking
  } catch (error: unknown) {
    const errorObj = error as { statusCode?: number }
    if (errorObj.statusCode === 400) {
      throw error
    }

    console.error('Database error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: '建立預約失敗',
    })
  }
})
