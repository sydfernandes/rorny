/**
 * Email Service Module
 * Handles email sending functionality using Resend
 * Includes email templates and delivery tracking
 */

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
}

/**
 * Sends an email using Resend
 * @param options Email options including recipient, subject, and HTML content
 * @returns True if email was sent successfully
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Rorny <noreply@rorny.app>',
      ...options,
    })

    if (error) {
      console.error('Email send error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Email service error:', error)
    return false
  }
}

/**
 * Sends a password reset email
 * @param email Recipient email address
 * @param resetToken Password reset token
 * @returns True if email was sent successfully
 */
export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
): Promise<boolean> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset Your Password</h2>
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the button below to create a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #0070f3; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you didn't request this password reset, you can safely ignore this email.</p>
      <p>Best regards,<br>The Rorny Team</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;">
      <p style="color: #666; font-size: 12px;">
        If the button doesn't work, copy and paste this URL into your browser:<br>
        ${resetUrl}
      </p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: 'Reset Your Password - Rorny',
    html,
  })
}

/**
 * Sends a password change confirmation email
 * @param email Recipient email address
 * @returns True if email was sent successfully
 */
export async function sendPasswordChangeConfirmationEmail(
  email: string
): Promise<boolean> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Changed Successfully</h2>
      <p>Hello,</p>
      <p>Your password has been successfully changed.</p>
      <p>If you didn't make this change, please contact our support team immediately.</p>
      <p>Best regards,<br>The Rorny Team</p>
    </div>
  `

  return sendEmail({
    to: email,
    subject: 'Password Changed Successfully - Rorny',
    html,
  })
}
