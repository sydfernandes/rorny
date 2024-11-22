/**
 * Social Authentication Buttons Component
 * 
 * Purpose:
 * Provides a reusable component for social authentication options (Google and Facebook)
 * with loading states and consistent styling across authentication pages.
 * 
 * Functionality:
 * - Renders Google and Facebook authentication buttons in a grid layout
 * - Handles loading states for each provider independently
 * - Displays loading spinners during authentication
 * - Provides click handlers for social authentication
 * - Maintains consistent styling with the application's design system
 */

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface SocialButtonsProps {
  onGoogleClick: () => Promise<void>
  onFacebookClick: () => Promise<void>
  isGoogleLoading: boolean
  isFacebookLoading: boolean
}

export function SocialButtons({
  onGoogleClick,
  onFacebookClick,
  isGoogleLoading,
  isFacebookLoading,
}: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading}
        onClick={onGoogleClick}
        className="w-full"
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isFacebookLoading}
        onClick={onFacebookClick}
        className="w-full"
      >
        {isFacebookLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.facebook className="mr-2 h-4 w-4" />
        )}
        Facebook
      </Button>
    </div>
  )
}
