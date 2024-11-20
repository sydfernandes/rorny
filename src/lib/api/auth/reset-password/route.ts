/**
 * Password Reset API Routes
 * Handles password reset request and completion using Firebase Auth
 * Implements rate limiting for security
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'
import { 
  sendResetPasswordEmail, 
  verifyResetCode, 
  completePasswordReset 
} from '@/lib/firebase/auth'

// Validation schemas
const requestResetSchema = z.object({
  email: z.string().email()
})

const resetPasswordSchema = z.object({
  code: z.string(),
  password: z.string().min(8).max(100)
})

// Rate limiter for password reset requests
const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500
})

/**
 * POST /api/auth/reset-password
 * Request a password reset email
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const identifier = req.ip || 'anonymous'
    const { success } = await limiter.limit(identifier)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { email } = requestResetSchema.parse(body)

    // Send reset email through Firebase
    const sent = await sendResetPasswordEmail(email)

    // Always return success to prevent user enumeration
    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/auth/reset-password
 * Complete password reset using the code from email
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { code, password } = resetPasswordSchema.parse(body)

    // Verify the reset code first
    const email = await verifyResetCode(code)
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired reset code' },
        { status: 400 }
      )
    }

    // Complete the password reset
    const success = await completePasswordReset(code, password)
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to reset password' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
