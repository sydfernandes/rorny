import * as z from "zod"

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")

export const displayNameSchema = z
  .string()
  .min(2, "Display name must be at least 2 characters")
  .max(50, "Display name must be at most 50 characters")

export const bioSchema = z
  .string()
  .max(160, "Bio must be at most 160 characters")
  .optional()

export const birthdateSchema = z.date()
  .min(new Date(1900, 0, 1), "Date must be after 1900")
  .max(new Date(), "Date cannot be in the future")

export interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
}
