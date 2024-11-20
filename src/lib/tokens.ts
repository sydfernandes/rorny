/**
 * Token Generation and Validation Module
 * Handles secure token generation, validation, and management for password reset and email verification
 * Uses crypto for secure random token generation and includes expiration handling
 */

import { randomBytes, createHash } from 'crypto'
import { prisma } from '@/lib/prisma'

// Token types for different purposes
export enum TokenType {
  PASSWORD_RESET = 'PASSWORD_RESET',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION'
}

// Token configuration
const TOKEN_CONFIG = {
  [TokenType.PASSWORD_RESET]: {
    expiresIn: 60 * 60 * 1000, // 1 hour in milliseconds
    length: 32 // Length of the random token in bytes
  },
  [TokenType.EMAIL_VERIFICATION]: {
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    length: 32
  }
}

/**
 * Generates a secure random token and stores it in the database
 * @param userId - The user ID to associate with the token
 * @param type - The type of token to generate
 * @returns The generated token string
 */
export async function generateToken(userId: string, type: TokenType): Promise<string> {
  const config = TOKEN_CONFIG[type]
  const token = randomBytes(config.length).toString('hex')
  const hashedToken = hashToken(token)
  const expiresAt = new Date(Date.now() + config.expiresIn)

  // Store the hashed token in the database
  await prisma.token.create({
    data: {
      type,
      token: hashedToken,
      userId,
      expiresAt
    }
  })

  return token
}

/**
 * Validates a token and returns the associated user if valid
 * @param token - The token to validate
 * @param type - The type of token to validate
 * @returns The user ID if valid, null if invalid
 */
export async function validateToken(token: string, type: TokenType): Promise<string | null> {
  const hashedToken = hashToken(token)

  const storedToken = await prisma.token.findFirst({
    where: {
      token: hashedToken,
      type,
      expiresAt: {
        gt: new Date()
      }
    }
  })

  if (!storedToken) {
    return null
  }

  // Delete the token after successful validation
  await prisma.token.delete({
    where: {
      id: storedToken.id
    }
  })

  return storedToken.userId
}

/**
 * Hashes a token for secure storage
 * @param token - The token to hash
 * @returns The hashed token
 */
function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Removes expired tokens from the database
 * Should be run periodically (e.g., daily via cron job)
 */
export async function cleanupExpiredTokens(): Promise<void> {
  await prisma.token.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })
}
