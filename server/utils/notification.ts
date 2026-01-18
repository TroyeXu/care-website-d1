// 通知系統工具函數
import { nanoid } from 'nanoid'
import type { H3Event } from 'h3'
import { getD1 } from './d1'

/**
 * 通知類型
 */
export enum NotificationType {
  BOOKING = 'booking',
  PAYMENT = 'payment',
  REVIEW = 'review',
  ADMIN = 'admin',
  SYSTEM = 'system',
}

/**
 * 通知資料介面
 */
export interface NotificationData {
  userId: string
  type: NotificationType
  title: string
  message: string
  link?: string
  data?: Record<string, any>
  expiresAt?: string
}

/**
 * 通知範本變數
 */
export interface TemplateVariables {
  [key: string]: string | number
}

/**
 * 發送通知
 */
export async function sendNotification(
  event: H3Event,
  notificationData: NotificationData,
): Promise<void> {
  const db = getD1(event)

  const notificationId = nanoid()

  await db
    .prepare(
      `INSERT INTO notifications (
        id, user_id, type, title, message, link, data, expires_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    )
    .bind(
      notificationId,
      notificationData.userId,
      notificationData.type,
      notificationData.title,
      notificationData.message,
      notificationData.link || null,
      notificationData.data ? JSON.stringify(notificationData.data) : null,
      notificationData.expiresAt || null,
    )
    .run()
}

/**
 * 批量發送通知
 */
export async function sendBulkNotifications(
  event: H3Event,
  notifications: NotificationData[],
): Promise<void> {
  const db = getD1(event)

  // 使用 transaction 批量插入
  for (const notificationData of notifications) {
    const notificationId = nanoid()

    await db
      .prepare(
        `INSERT INTO notifications (
          id, user_id, type, title, message, link, data, expires_at, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      )
      .bind(
        notificationId,
        notificationData.userId,
        notificationData.type,
        notificationData.title,
        notificationData.message,
        notificationData.link || null,
        notificationData.data ? JSON.stringify(notificationData.data) : null,
        notificationData.expiresAt || null,
      )
      .run()
  }
}

/**
 * 從範本建立通知
 */
export async function sendNotificationFromTemplate(
  event: H3Event,
  userId: string,
  templateCode: string,
  variables: TemplateVariables,
  options?: {
    link?: string
    data?: Record<string, any>
    expiresAt?: string
  },
): Promise<void> {
  const db = getD1(event)

  // 取得通知範本
  const template = await db
    .prepare(
      'SELECT * FROM notification_templates WHERE code = ? AND is_active = 1',
    )
    .bind(templateCode)
    .first()

  if (!template) {
    console.error(`通知範本不存在或未啟用: ${templateCode}`)
    return
  }

  // 替換變數
  let title = template.title_template
  let message = template.message_template

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`
    title = title.replace(new RegExp(placeholder, 'g'), String(value))
    message = message.replace(new RegExp(placeholder, 'g'), String(value))
  }

  // 發送通知
  await sendNotification(event, {
    userId,
    type: template.type as NotificationType,
    title,
    message,
    link: options?.link,
    data: options?.data,
    expiresAt: options?.expiresAt,
  })
}

/**
 * 清理過期通知
 */
export async function cleanupExpiredNotifications(
  event: H3Event,
): Promise<number> {
  const db = getD1(event)

  const result = await db
    .prepare(
      `DELETE FROM notifications
       WHERE expires_at IS NOT NULL
       AND expires_at < datetime('now')`,
    )
    .run()

  return result.meta?.changes || 0
}

/**
 * 清理已讀的舊通知（保留最近 30 天）
 */
export async function cleanupOldReadNotifications(
  event: H3Event,
  daysToKeep: number = 30,
): Promise<number> {
  const db = getD1(event)

  const result = await db
    .prepare(
      `DELETE FROM notifications
       WHERE read = 1
       AND read_at < datetime('now', '-${daysToKeep} days')`,
    )
    .run()

  return result.meta?.changes || 0
}

/**
 * 取得用戶未讀通知數量
 */
export async function getUnreadCount(
  event: H3Event,
  userId: string,
): Promise<number> {
  const db = getD1(event)

  const result = await db
    .prepare(
      `SELECT COUNT(*) as count
       FROM notifications
       WHERE user_id = ? AND read = 0
       AND (expires_at IS NULL OR expires_at > datetime('now'))`,
    )
    .bind(userId)
    .first()

  return result?.count || 0
}

/**
 * 通知輔助函數 - 預約相關
 */
export const NotificationHelpers = {
  /**
   * 預約確認通知
   */
  async bookingConfirmed(
    event: H3Event,
    userId: string,
    bookingId: string,
    serviceDate: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'booking_confirmed',
      {
        booking_id: bookingId,
        service_date: serviceDate,
      },
      {
        link: `/bookings/${bookingId}`,
        data: { bookingId },
      },
    )
  },

  /**
   * 預約取消通知
   */
  async bookingCancelled(
    event: H3Event,
    userId: string,
    bookingId: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'booking_cancelled',
      {
        booking_id: bookingId,
      },
      {
        link: `/bookings/${bookingId}`,
        data: { bookingId },
      },
    )
  },

  /**
   * 服務完成通知
   */
  async bookingCompleted(
    event: H3Event,
    userId: string,
    bookingId: string,
    caregiverId: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'booking_completed',
      {
        booking_id: bookingId,
      },
      {
        link: `/reviews/create?booking=${bookingId}&caregiver=${caregiverId}`,
        data: { bookingId, caregiverId },
      },
    )
  },

  /**
   * 收到付款通知
   */
  async paymentReceived(
    event: H3Event,
    userId: string,
    amount: number,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'payment_received',
      {
        amount: amount.toString(),
      },
      {
        link: '/payments',
      },
    )
  },

  /**
   * 收到評價通知
   */
  async reviewReceived(
    event: H3Event,
    userId: string,
    reviewId: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'review_received',
      {},
      {
        link: `/reviews/${reviewId}`,
        data: { reviewId },
      },
    )
  },

  /**
   * 看護師審核通過通知
   */
  async caregiverVerified(
    event: H3Event,
    userId: string,
    caregiverId: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'caregiver_verified',
      {},
      {
        link: `/caregiver/profile`,
        data: { caregiverId },
      },
    )
  },

  /**
   * 看護師審核未通過通知
   */
  async caregiverRejected(
    event: H3Event,
    userId: string,
    reason?: string,
  ): Promise<void> {
    await sendNotificationFromTemplate(
      event,
      userId,
      'caregiver_rejected',
      {},
      {
        link: '/caregiver/application',
        data: { reason },
      },
    )
  },
}
