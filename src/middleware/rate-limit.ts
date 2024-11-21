/**
 * Rate Limiting Middleware
 * 
 * Purpose:
 * Implements basic rate limiting for authentication endpoints
 * 
 * Functionality:
 * - Tracks login attempts by IP address
 * - Implements a simple in-memory rate limiting
 * - Provides different limits for various authentication endpoints
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple in-memory store for rate limiting
const attempts = new Map<string, { count: number; timestamp: number }>()

// Rate limit configurations
const limits = {
  login: { max: 5, window: 5 * 60 * 1000 }, // 5 attempts per 5 minutes
  reset: { max: 3, window: 60 * 60 * 1000 }, // 3 attempts per hour
  register: { max: 3, window: 60 * 60 * 1000 }, // 3 accounts per hour
}

export async function rateLimit(
  request: NextRequest,
  type: "login" | "reset" | "register"
) {
  const ip = request.ip || "127.0.0.1"
  const key = `${type}:${ip}`
  const now = Date.now()
  const limit = limits[type]

  // Clean up old entries
  for (const [key, data] of attempts.entries()) {
    if (now - data.timestamp > limit.window) {
      attempts.delete(key)
    }
  }

  // Get current attempts
  const current = attempts.get(key)

  // If no attempts or window expired, create new entry
  if (!current || now - current.timestamp > limit.window) {
    attempts.set(key, { count: 1, timestamp: now })
    return null
  }

  // If within window and under limit, increment
  if (current.count < limit.max) {
    current.count++
    return null
  }

  // Rate limit exceeded
  return new NextResponse(
    JSON.stringify({
      error: "Too many requests",
      message: `Please try again in ${Math.ceil((limit.window - (now - current.timestamp)) / 1000 / 60)} minutes`,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(Math.ceil((limit.window - (now - current.timestamp)) / 1000)),
      },
    }
  )
}
