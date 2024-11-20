/**
 * Root Middleware
 * 
 * Purpose:
 * Handles middleware operations for the entire application, including
 * rate limiting for authentication endpoints and route protection.
 * 
 * Functionality:
 * - Applies rate limiting to authentication endpoints
 * - Handles authentication route protection
 * - Manages response headers and CORS
 * - Implements security headers
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { rateLimit } from "./middleware/rate-limit"
import { withAuth, withoutAuth } from "./middleware/auth"

// Security headers
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

export async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname
  let response: NextResponse

  try {
    // Apply rate limiting to authentication endpoints
    if (path.startsWith("/api/auth")) {
      let rateLimitResponse = null

      if (path.includes("/login")) {
        rateLimitResponse = await rateLimit(request, "login")
      } else if (path.includes("/reset-password")) {
        rateLimitResponse = await rateLimit(request, "reset")
      } else if (path.includes("/register")) {
        rateLimitResponse = await rateLimit(request, "register")
      }

      if (rateLimitResponse) {
        return rateLimitResponse
      }
    }

    // Handle authentication for protected routes
    if (path.startsWith("/dashboard")) {
      response = await withAuth(request, () => NextResponse.next())
    } 
    // Handle authentication for public-only routes
    else if (path.startsWith("/login") || path.startsWith("/register")) {
      response = await withoutAuth(request, () => NextResponse.next())
    }
    // Default response
    else {
      response = NextResponse.next()
    }

    // Apply security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Internal server error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    )
  }
}

export const config = {
  matcher: [
    // Auth endpoints
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/reset-password",
    // Protected routes
    "/dashboard/:path*",
    // Public-only routes
    "/login",
    "/register"
  ],
}
