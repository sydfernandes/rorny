"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/icons"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string

    try {
      if (!navigator.onLine) {
        throw new Error("No internet connection. Please check your network and try again.")
      }

      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
      
    } catch (error: any) {
      console.error('Password reset error:', error)
      
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email address.")
      } else if (error.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.")
      } else if (error.code === 'auth/network-request-failed') {
        setError("Network error. Please check your internet connection and try again.")
      } else if (error.message) {
        setError(error.message)
      } else {
        setError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>
                  Check your email for a link to reset your password.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send reset link
            </Button>
            <Button
              variant="link"
              className="w-full"
              onClick={() => router.push('/login')}
              type="button"
            >
              Back to login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
