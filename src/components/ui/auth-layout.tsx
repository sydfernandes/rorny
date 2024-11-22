/**
 * Authentication Layout Component
 * 
 * Purpose:
 * Provides a consistent layout wrapper for all authentication-related pages (login, register, password reset).
 * Creates a centered, responsive container with a gradient background for authentication forms.
 * 
 * Functionality:
 * - Renders a full-height container with centered content
 * - Applies a gradient background
 * - Provides max-width constraint for forms
 * - Includes fade-in animation for content
 * - Supports custom className prop for additional styling
 */

import { cn } from "@/lib/utils/index"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4 sm:p-6 md:p-8">
      <div className={cn("w-full max-w-[400px] space-y-6 animate-in fade-in-50", className)}>
        {children}
      </div>
    </div>
  )
}
