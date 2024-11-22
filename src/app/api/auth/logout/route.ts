import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    // Clear the session cookie
    cookies().delete("session")

    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    )
  }
}
