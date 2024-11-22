import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/firebase-admin"
import { cookies } from "next/headers"

// Session duration: 5 days
const SESSION_DURATION = 60 * 60 * 24 * 5 * 1000

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION,
    })

    // Set cookie options
    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax" as const,
    }

    // Set the cookie
    cookies().set(options)

    return NextResponse.json(
      { message: "Session created successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Session creation error:", error)
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 401 }
    )
  }
}
