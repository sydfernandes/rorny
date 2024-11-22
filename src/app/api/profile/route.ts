import { NextRequest, NextResponse } from "next/server"
import { auth, db } from "@/lib/firebase-admin"

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    // Get the token
    const token = authHeader.split(" ")[1]
    
    // Verify the token
    const decodedToken = await auth.verifyIdToken(token)
    const { uid } = decodedToken

    // Get the profile data from the request
    const profileData = await request.json()

    // Add timestamps and uid
    const profile = {
      ...profileData,
      uid,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    // Save to Firestore
    await db.collection("profiles").doc(uid).set(profile, { merge: true })

    return NextResponse.json({ success: true, profile })
  } catch (error: any) {
    console.error("Error saving profile:", error)
    return NextResponse.json(
      { error: error.message || "Failed to save profile" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "No token provided" },
        { status: 401 }
      )
    }

    // Get the token
    const token = authHeader.split(" ")[1]
    
    // Verify the token
    const decodedToken = await auth.verifyIdToken(token)
    const { uid } = decodedToken

    // Get the profile from Firestore
    const profileDoc = await db.collection("profiles").doc(uid).get()
    
    if (!profileDoc.exists) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ profile: profileDoc.data() })
  } catch (error: any) {
    console.error("Error getting profile:", error)
    return NextResponse.json(
      { error: error.message || "Failed to get profile" },
      { status: 500 }
    )
  }
}
