import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json()

    if (!idToken) {
      return NextResponse.json(
        { error: "No ID token provided" },
        { status: 400 }
      )
    }

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken)
    
    // Check if email is verified
    const user = await auth.getUser(decodedToken.uid)
    
    return NextResponse.json({
      verified: user.emailVerified,
      uid: user.uid,
      email: user.email
    })
  } catch (error: any) {
    console.error("Error verifying token:", error)
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const oobCode = searchParams.get("oobCode")

  if (!oobCode) {
    return NextResponse.json(
      { error: "No verification code provided" },
      { status: 400 }
    )
  }

  try {
    // Check the action code
    await auth.verifyIdToken(oobCode)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying email:", error)
    return NextResponse.json(
      { error: "Invalid verification code" },
      { status: 400 }
    )
  }
}
