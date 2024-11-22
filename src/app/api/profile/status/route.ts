import { NextResponse } from "next/server"
import { auth } from "@/lib/firebase-admin"
import { db } from "@/lib/firebase-admin"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const idToken = authHeader.split("Bearer ")[1]
    const decodedToken = await auth.verifyIdToken(idToken)
    const uid = decodedToken.uid

    const userDoc = await db.collection("users").doc(uid).get()
    const userData = userDoc.data()

    if (!userDoc.exists || !userData) {
      return NextResponse.json({ isComplete: false })
    }

    // Check if all required profile fields are complete
    const isComplete = Boolean(
      userData.username &&
      userData.displayName &&
      userData.birthdate &&
      userData.gender &&
      userData.pronouns &&
      userData.sexualOrientation &&
      userData.sexualPosition &&
      userData.interestedIn &&
      userData.relationshipStatus &&
      userData.lookingFor &&
      userData.profileWizardCompleted
    )

    return NextResponse.json({ isComplete })
  } catch (error) {
    console.error("Error checking profile status:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
