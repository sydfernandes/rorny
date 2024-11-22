"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth"
import { toast } from "sonner"
import { Icons } from "@/components/icons"

export default function VerifyEmailPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push('/login')
        return
      }

      if (user.emailVerified) {
        toast.success("Email already verified!")
        router.push('/dashboard')
        return
      }

      setUserEmail(user.email)
    })

    return () => unsubscribe()
  }, [router])

  const handleResendVerification = async () => {
    try {
      setIsLoading(true)
      const user = auth.currentUser
      if (!user) {
        toast.error("No user found. Please login again.")
        router.push('/login')
        return
      }

      await sendEmailVerification(user)
      toast.success("Verification email sent! Please check your inbox.")
    } catch (error) {
      console.error("Error sending verification email:", error)
      toast.error("Failed to send verification email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verify your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification link to{" "}
            <span className="font-medium">{userEmail}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Steps to verify your email:</h3>
              <ol className="list-decimal pl-4 space-y-1 text-sm text-muted-foreground">
                <li>Open your email inbox</li>
                <li>Look for an email from Rorny</li>
                <li>Click the verification link in the email</li>
                <li>Return to this page and refresh</li>
              </ol>
            </div>
            <Button
              className="w-full"
              onClick={handleResendVerification}
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Resend verification email
            </Button>
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
