/**
 * Authentication Middleware
 * 
 * Purpose:
 * Provides route protection and session validation for authenticated routes.
 * 
 * Functionality:
 * - Validates user sessions
 * - Protects routes requiring authentication
 * - Handles session timeouts
 * - Manages authentication redirects
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSession, validateSession } from "@/lib/session"

export async function withAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getSession(request)
  const isValidSession = await validateSession(session)

  if (!isValidSession) {
    // Redirect to login page with return URL
    const returnUrl = encodeURIComponent(request.nextUrl.pathname)
    return NextResponse.redirect(
      new URL(`/login?returnUrl=${returnUrl}`, request.url)
    )
  }

  return handler(request)
}

export async function withoutAuth(
  request: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getSession(request)
  const isValidSession = await validateSession(session)

  if (isValidSession) {
    // Redirect to dashboard if already authenticated
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return handler(request)
}

export async function withSessionUpdate(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  const session = await getSession(request)
  
  if (session.data.isLoggedIn) {
    // Update session activity
    session.data.lastActive = Date.now()
    await session.save()
  }

  return response
}
