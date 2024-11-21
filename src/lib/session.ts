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
  ttl: 60 * 60 * 24 * 7, // 1 week in seconds
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
  },
}

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000

export async function getSession(req?: NextRequest): Promise<Session> {
  const session = req 
    ? await getIronSession<{ data: SessionData }>(req, new Response(), sessionOptions)
    : await getIronSession<{ data: SessionData }>(cookies(), new Response(), sessionOptions)

  // Initialize session data if it doesn't exist
  if (!session.data) {
    session.data = createEmptySessionData()
  }

  return session as Session
}

export function createEmptySessionData(): SessionData {
  return {
    userId: "",
    email: "",
    isLoggedIn: false,
    loginTime: 0,
    lastActive: 0,
  }
}

export async function updateSessionActivity(session: Session): Promise<void> {
  session.data.lastActive = Date.now()
  await session.save()
}

export async function validateSession(session: Session): Promise<boolean> {
  if (!session.data?.isLoggedIn || !session.data?.userId) {
    return false
  }

  const currentTime = Date.now()
  const timeSinceLastActive = currentTime - (session.data?.lastActive || 0)

  // Check if session has timed out
  if (timeSinceLastActive > SESSION_TIMEOUT) {
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
  session.data = createEmptySessionData()
  await session.destroy()
}

export async function getSessionResponse(
  response: NextResponse,
  session: Session
): Promise<NextResponse> {
  const sessionCookie = cookies().get(sessionOptions.cookieName)
  if (sessionCookie) {
    response.cookies.set(
      sessionOptions.cookieName,
      sessionCookie.value,
      sessionOptions.cookieOptions
    )
  }
  return response
}
