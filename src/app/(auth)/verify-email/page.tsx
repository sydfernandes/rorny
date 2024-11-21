"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { Icons } from "@/components/icons"
import { useToast } from "@/hooks/use-toast"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // No user is signed in, redirect to register
        router.push('/register')
        return
      }

      if (user.emailVerified) {
        // User is verified, redirect to home
        router.push('/home')
        return
      }

      // User exists but not verified, show their email
      setUserEmail(user.email)
    })

    return () => unsubscribe()
  }, [router])

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      toast({
        title: "Error",
        description: "No user found. Please try logging in again.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
      })
      toast({
        title: "Email sent!",
        description: "A new verification link has been sent to your email.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification email.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckVerification = async () => {
    if (!auth.currentUser) return

    setIsLoading(true)
    try {
      await auth.currentUser.reload()
      if (auth.currentUser.emailVerified) {
        toast({
          title: "Success!",
          description: "Email verified successfully! Redirecting to app...",
        })
        router.push('/home')
      } else {
        toast({
          description: "Email not yet verified. Please check your email and click the verification link.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to check verification status.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!userEmail) {
    return null // Don't render anything while checking auth state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to {userEmail}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Steps to verify your email:</h3>
              <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                <li>Open your email inbox</li>
                <li>Look for an email from Rorny</li>
                <li>Click the verification link in the email</li>
                <li>Click the button below to continue</li>
              </ol>
            </div>
            <Button 
              className="w-full" 
              onClick={handleCheckVerification}
              disabled={isLoading}
            >
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              I've clicked the verification link
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="text-sm text-center space-y-2">
              <p className="text-muted-foreground">
                Can't find the verification email?
              </p>
              <Button 
                variant="link" 
                className="text-sm"
                onClick={handleResendVerification}
                disabled={isLoading}
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Resend verification email
              </Button>
            </div>

            <div className="text-sm text-center space-y-2">
              <p className="text-muted-foreground">
                Entered wrong email?
              </p>
              <Button 
                variant="link" 
                className="text-sm" 
                asChild
              >
                <Link href="/register">Register with different email</Link>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <div className="flex justify-center space-x-4">
              <Button variant="link" className="px-0" asChild>
                <Link href="/login">Back to login</Link>
              </Button>
              <span className="text-muted-foreground">•</span>
              <Button variant="link" className="px-0" asChild>
                <Link href="/register">Back to register</Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
