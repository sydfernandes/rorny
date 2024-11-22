import { FirebaseError } from "firebase/app"
import { Auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth"

export type AuthError = {
  message: string
  code: string
}

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please try logging in instead."
      case "auth/invalid-email":
        return "Please enter a valid email address."
      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled. Please contact support."
      case "auth/weak-password":
        return "Password should be at least 6 characters."
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support."
      case "auth/user-not-found":
        return "No account found with this email address."
      case "auth/wrong-password":
        return "Incorrect password. Please try again."
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later."
      case "auth/network-request-failed":
        return "Network error. Please check your connection and try again."
      case "auth/popup-closed-by-user":
        return "Sign in was cancelled. Please try again."
      default:
        return error.message || "An error occurred. Please try again."
    }
  }
  return "An unexpected error occurred. Please try again."
}

export async function handleSocialAuth(
  auth: Auth,
  provider: GoogleAuthProvider | FacebookAuthProvider
) {
  try {
    const result = await signInWithPopup(auth, provider)
    const idToken = await result.user.getIdToken()
    await createSession(idToken)
    return { success: true, user: result }
  } catch (error) {
    console.error("Social auth error:", error)
    return { success: false, error: getFirebaseErrorMessage(error) }
  }
}

export async function createSession(idToken: string): Promise<void> {
  try {
    // Set the Firebase auth token in a cookie
    document.cookie = `firebase-auth-token=${idToken}; path=/; max-age=3600; SameSite=Strict; Secure`;
  } catch (error) {
    console.error("Session creation error:", error)
    throw error
  }
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    return response.ok
  } catch (error) {
    console.error("Token verification error:", error)
    return false
  }
}

export async function verifyEmailToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
    return response.ok
  } catch (error) {
    console.error("Email verification error:", error)
    return false
  }
}

export function isAuthenticated(): boolean {
  // Check if user is authenticated using Firebase's auth state
  return auth.currentUser !== null
}

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { toast } from "sonner"

export async function logout(): Promise<void> {
  try {
    await signOut(auth)
    // Remove the auth token cookie
    document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    toast.success("Logged out successfully")
  } catch (error) {
    console.error("Logout error:", error)
    toast.error(getFirebaseErrorMessage(error))
  }
}
