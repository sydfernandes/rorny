/**
 * Firebase Authentication Service
 * Handles all authentication-related functionality including:
 * - Password reset
 * - Email verification
 * - Session management
 * Uses Firebase Auth for secure token generation and email delivery
 */

import { auth } from './config'
import { 
  sendPasswordResetEmail,
  confirmPasswordReset,
  verifyPasswordResetCode,
  applyActionCode,
  sendEmailVerification,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth'

/**
 * Sends a password reset email using Firebase Auth
 * @param email The user's email address
 * @returns True if the reset email was sent successfully
 */
export async function sendResetPasswordEmail(email: string): Promise<boolean> {
  try {
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
      handleCodeInApp: false
    }

    await sendPasswordResetEmail(auth, email, actionCodeSettings)
    return true
  } catch (error) {
    console.error('Password reset email error:', error)
    return false
  }
}

/**
 * Verifies a password reset code
 * @param code The reset code from the email link
 * @returns The email address if valid, null otherwise
 */
export async function verifyResetCode(code: string): Promise<string | null> {
  try {
    const email = await verifyPasswordResetCode(auth, code)
    return email
  } catch (error) {
    console.error('Reset code verification error:', error)
    return null
  }
}

/**
 * Completes the password reset process
 * @param code The reset code from the email link
 * @param newPassword The new password
 * @returns True if the password was reset successfully
 */
export async function completePasswordReset(
  code: string,
  newPassword: string
): Promise<boolean> {
  try {
    await confirmPasswordReset(auth, code, newPassword)
    return true
  } catch (error) {
    console.error('Password reset completion error:', error)
    return false
  }
}

/**
 * Applies an email action code (verify email, reset password)
 * @param code The action code from the email link
 * @returns True if the action was applied successfully
 */
export async function applyEmailActionCode(code: string): Promise<boolean> {
  try {
    await applyActionCode(auth, code)
    return true
  } catch (error) {
    console.error('Action code application error:', error)
    return false
  }
}

/**
 * Sends an email verification to the currently signed in user
 * @returns True if the verification email was sent successfully
 */
export async function sendVerificationEmail(): Promise<boolean> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('No user is currently signed in')
    }

    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
      handleCodeInApp: true
    }

    await sendEmailVerification(user, actionCodeSettings)
    return true
  } catch (error) {
    console.error('Email verification error:', error)
    return false
  }
}

/**
 * Verifies an email verification code
 * @param code The verification code from the email link
 * @returns True if the email was verified successfully
 */
export async function verifyEmail(code: string): Promise<boolean> {
  try {
    await applyActionCode(auth, code)
    return true
  } catch (error) {
    console.error('Email verification error:', error)
    return false
  }
}

/**
 * Creates a new user account and sends verification email
 * @param email User's email
 * @param password User's password
 * @returns The created user object or null if failed
 */
export async function createUserWithVerification(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    
    // Send verification email
    await sendVerificationEmail()
    
    return userCredential.user
  } catch (error) {
    console.error('User creation error:', error)
    return null
  }
}

/**
 * Signs in a user and checks email verification status
 * @param email User's email
 * @param password User's password
 * @returns Object containing user and verification status
 */
export async function signInAndCheckVerification(
  email: string,
  password: string
): Promise<{ user: User | null; verified: boolean }> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    
    return {
      user: userCredential.user,
      verified: userCredential.user.emailVerified
    }
  } catch (error) {
    console.error('Sign in error:', error)
    return { user: null, verified: false }
  }
}
