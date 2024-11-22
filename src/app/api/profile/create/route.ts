import { NextResponse } from "next/server"
import { auth } from "@/lib/firebase-admin"
import { db } from "@/lib/firebase-admin"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const idToken = authHeader.split("Bearer ")[1]
    const decodedToken = await auth.verifyIdToken(idToken)
    const uid = decodedToken.uid

    const body = await request.json()
    const { email, displayName, photoURL } = body

    // Create initial user profile
    await db.collection("users").doc(uid).set({
      email,
      displayName: displayName || "",
      photoURL: photoURL || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: false,
      profileWizardCompleted: false,
    }, { merge: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating user profile:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
