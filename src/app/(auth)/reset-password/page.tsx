"use client"

import { useState } from "react"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"
import { getFirebaseErrorMessage } from "@/lib/auth/utils"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/auth/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function ResetPasswordPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(auth, data.email)
      setEmailSent(true)
      toast({
        title: "Reset email sent",
        description: "Please check your email for password reset instructions.",
      })
    } catch (error: any) {
      console.error("Reset password error:", error)
      toast({
        title: "Reset failed",
        description: getFirebaseErrorMessage(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  If an account exists with that email, you will receive password reset instructions.
                </AlertDescription>
              </Alert>
              <Button asChild className="w-full">
                <Link href="/login">Return to login</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Send reset link
                </Button>
              </form>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link href="/login" className="font-medium underline">
                  Login
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
