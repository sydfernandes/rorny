/**
 * Email Verification Page
 * Handles email verification process when users click the verification link
 * Supports both verification status display and manual verification requests
 */

"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useToast } from "@/hooks/use-toast"
import { verifyEmail, sendVerificationEmail } from "@/lib/firebase/auth"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'waiting'>('waiting')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  // Handle verification when the page loads with a code
  useEffect(() => {
    const oobCode = searchParams.get('oobCode')
    if (oobCode) {
      handleVerification(oobCode)
    }
  }, [searchParams])

  async function handleVerification(code: string) {
    setIsLoading(true)
    setStatus('verifying')
    
    try {
      const success = await verifyEmail(code)
      if (success) {
        setStatus('success')
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        })
      } else {
        setStatus('error')
        toast({
          title: "Verification failed",
          description: "The verification link may have expired. Please request a new one.",
          variant: "destructive",
        })
      }
    } catch (error) {
      setStatus('error')
      toast({
        title: "Verification failed",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendVerification() {
    setIsLoading(true)
    try {
      const success = await sendVerificationEmail()
      if (success) {
        toast({
          title: "Verification email sent",
          description: "Please check your email for the verification link.",
        })
      } else {
        toast({
          title: "Failed to send email",
          description: "Please try again or contact support if the problem persists.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            {status === 'verifying' && "Verifying your email address..."}
            {status === 'success' && "Your email has been verified!"}
            {status === 'error' && "Email verification failed"}
            {status === 'waiting' && "Please verify your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'verifying' && (
            <div className="flex justify-center">
              <Icons.spinner className="h-6 w-6 animate-spin" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-center space-y-4">
              <Icons.check className="h-8 w-8 text-green-500 mx-auto" />
              <p>Your email has been successfully verified.</p>
              <Button
                onClick={() => router.push('/login')}
                className="w-full"
              >
                Continue to Login
              </Button>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center space-y-4">
              <Icons.warning className="h-8 w-8 text-red-500 mx-auto" />
              <p>The verification link may have expired or is invalid.</p>
              <Button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Request New Verification Link
              </Button>
            </div>
          )}
          
          {status === 'waiting' && (
            <div className="text-center space-y-4">
              <p>Please check your email for a verification link.</p>
              <Button
                onClick={handleResendVerification}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Resend Verification Email
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Having trouble? Contact our support team.
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
