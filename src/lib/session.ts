/**
 * Session Management Module
 * 
 * Purpose:
 * Provides secure session management using Iron Session for authentication state.
 * 
 * Functionality:
 * - Configures and manages encrypted sessions
 * - Provides session utilities and type definitions
 * - Handles session creation, validation, and destruction
 * - Implements session timeout and automatic cleanup
 */

import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export interface SessionData {
  userId: string
  email: string
  isLoggedIn: boolean
  loginTime: number
  lastActive: number
}

export interface Session {
  data: SessionData
  save: () => Promise<void>
  destroy: () => Promise<void>
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "rorny_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
}

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

export async function getSession(req?: NextRequest): Promise<Session> {
  const session = await getIronSession<SessionData>(
    req ? req : cookies(),
    sessionOptions
  )

  // Initialize session data if not exists
  if (!session.data) {
    session.data = {
      userId: "",
      email: "",
      isLoggedIn: false,
      loginTime: 0,
      lastActive: 0,
    }
  }

  return session as Session
}

export async function updateSessionActivity(session: Session): Promise<void> {
  if (session.data.isLoggedIn) {
    session.data.lastActive = Date.now()
    await session.save()
  }
}

export async function validateSession(session: Session): Promise<boolean> {
  if (!session.data.isLoggedIn) {
    return false
  }

  const now = Date.now()
  const timeSinceLastActivity = now - session.data.lastActive

  // Check if session has timed out
  if (timeSinceLastActivity > SESSION_TIMEOUT) {
    await session.destroy()
    return false
  }

  // Update last active time
  await updateSessionActivity(session)
  return true
}

export async function createSession(
  session: Session,
  userData: { userId: string; email: string }
): Promise<void> {
  session.data = {
    userId: userData.userId,
    email: userData.email,
    isLoggedIn: true,
    loginTime: Date.now(),
    lastActive: Date.now(),
  }
  await session.save()
}

export async function destroySession(session: Session): Promise<void> {
  await session.destroy()
}

export function getSessionResponse(
  response: NextResponse,
  session: Session
): NextResponse {
  const headers = new Headers(response.headers)
  const cookies = headers.getSetCookie()

  // Add session cookie to response
  cookies.forEach((cookie) => {
    response.headers.append("Set-Cookie", cookie)
  })

  return response
}
