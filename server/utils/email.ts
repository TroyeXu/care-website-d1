import { defineEventHandler } from 'h3'

export interface EmailMessage {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<boolean>
}

/**
 * Mock Email Provider for Development
 */
class MockEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<boolean> {
    await Promise.resolve()
    console.log('\n===== 📧 MOCK EMAIL SENT 📧 =====')
    console.log('To:', message.to)
    console.log('Subject:', message.subject)
    console.log('From:', message.from || 'System')
    console.log('--- HTML Content ---')
    console.log(message.html.substring(0, 100) + '...')
    console.log('=================================\n')
    return true
  }
}

/**
 * Resend Email Provider for Production
 */
class ResendEmailProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(message: EmailMessage): Promise<boolean> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: message.from || 'onboarding@resend.dev',
          to: Array.isArray(message.to) ? message.to : [message.to],
          subject: message.subject,
          html: message.html,
          text: message.text,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('Resend API Error:', error)
        return false
      }

      return true
    } catch (e) {
      console.error('Failed to send email:', e)
      return false
    }
  }
}

// Singleton instance
let emailProvider: EmailProvider | null = null

export function getEmailProvider(): EmailProvider {
  if (emailProvider) return emailProvider

  // In a real app, you would check environment variables
  // const apiKey = process.env.RESEND_API_KEY
  const apiKey = undefined

  if (process.env.NODE_ENV === 'production' && apiKey) {
    emailProvider = new ResendEmailProvider(apiKey)
  } else {
    emailProvider = new MockEmailProvider()
  }

  return emailProvider
}

/**
 * Helper function to send email easily
 */
export function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  from?: string,
): Promise<boolean> {
  const provider = getEmailProvider()
  return provider.send({ to, subject, html, from })
}
