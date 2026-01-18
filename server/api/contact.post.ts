// 聯絡表單提交 API
import { defineEventHandler, readBody } from 'h3'
import { nanoid } from 'nanoid'
import { getD1 } from '../utils/d1'
import { createSuccessResponse } from '../utils/api-response'
import { handleError } from '../utils/error-handler'
import {
  validateRequired,
  validateEmail,
  validateStringLength,
} from '../utils/validation'
import { sendEmail } from '../utils/email'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, phone, subject, message } = body

  try {
    // 使用統一的驗證工具
    validateRequired(name, 'name', '姓名')
    validateRequired(email, 'email', '電子郵件')
    validateRequired(message, 'message', '訊息')

    // 驗證 email 格式
    validateEmail(email, 'email')

    // 驗證訊息長度
    validateStringLength(message, 10, 1000, 'message', '訊息')

    const db = getD1(event)
    const submissionId = nanoid()

    // 插入聯絡表單記錄
    await db
      .prepare(
        `INSERT INTO contact_submissions (
          id, name, email, phone, subject, message, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))`,
      )
      .bind(
        submissionId,
        name,
        email,
        phone || null,
        subject || '一般諮詢',
        message,
      )
      .run()

    // 發送 Email 通知給管理員
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const emailHtml = `
      <h2>收到新的聯絡表單</h2>
      <p><strong>姓名:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>電話:</strong> ${phone || '未提供'}</p>
      <p><strong>主旨:</strong> ${subject || '一般諮詢'}</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
        <p><strong>訊息:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p>請登入後台查看完整內容。</p>
    `

    // 非阻塞式發送
    sendEmail(adminEmail, `[新訊息] ${subject || '一般諮詢'}`, emailHtml, 'system@side-care.com')
      .catch(err => console.error('Failed to send admin notification:', err))

    return createSuccessResponse(
      {
        id: submissionId,
        name,
        email,
        subject: subject || '一般諮詢',
      },
      '您的訊息已送出，我們會盡快回覆',
    )
  } catch (error: any) {
    handleError(error, '提交聯絡表單')
  }
})
