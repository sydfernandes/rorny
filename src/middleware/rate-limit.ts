/**
 * Rate Limiting Middleware
 * 
 * Purpose:
 * Implements rate limiting for authentication endpoints to prevent brute force attacks
 * and protect against DoS attempts.
 * 
 * Functionality:
 * - Tracks login attempts by IP address
 * - Implements sliding window rate limiting
 * - Provides different limits for various authentication endpoints
 * - Uses Redis for distributed rate limiting
 */

import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Create rate limiters for different actions
const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "5 m"), // 5 attempts per 5 minutes
  analytics: true,
  prefix: "ratelimit:login",
})

const resetPasswordLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 m"), // 3 attempts per hour
  analytics: true,
  prefix: "ratelimit:reset",
})

const registerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 m"), // 3 accounts per hour
  analytics: true,
  prefix: "ratelimit:register",
})

export async function rateLimit(
  request: NextRequest,
  type: "login" | "reset" | "register"
) {
  const ip = request.ip ?? "127.0.0.1"
  const limiter = {
    login: loginLimiter,
    reset: resetPasswordLimiter,
    register: registerLimiter,
  }[type]

  const { success, limit, reset, remaining } = await limiter.limit(ip)

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
        remainingTime: reset - Date.now(),
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      }
    )
  }

  return null
}
