/**
 * Password Reset Page
 * Handles password reset requests and completion using Firebase Auth
 * Supports both initiating reset and handling reset completion via email link
 */

"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { resetPasswordSchema } from "@/lib/validations/auth"
import { AuthLayout } from "@/components/auth/auth-layout"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"

type FormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [mode, setMode] = useState<'request' | 'reset'>('request')
  const [oobCode, setOobCode] = useState<string>('')
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Check for oobCode (out-of-band code) from Firebase email link
  useEffect(() => {
    const code = searchParams.get('oobCode')
    if (code) {
      setOobCode(code)
      setMode('reset')
    }
  }, [searchParams])

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      if (mode === 'request') {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email })
        })

        if (!response.ok) {
          throw new Error('Failed to request password reset')
        }

        toast({
          title: 'Check your email',
          description: 'If an account exists, you will receive a password reset link.'
        })
      } else {
        const response = await fetch('/api/auth/reset-password', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            code: oobCode,
            password: data.password 
          })
        })

        if (!response.ok) {
          throw new Error('Failed to reset password')
        }

        toast({
          title: 'Password reset successful',
          description: 'You can now log in with your new password.'
        })

        // Redirect to login page after successful reset
        router.push('/login')
      }
    } catch (error) {
      console.error('Reset password error:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {mode === 'request' 
              ? 'Enter your email to receive a password reset link'
              : 'Enter your new password'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {mode === 'request' ? (
              <div className="space-y-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    disabled={isLoading}
                    {...form.register('email')}
                  />
                </FormControl>
                <FormMessage />
              </div>
            ) : (
              <div className="space-y-2">
                <FormLabel htmlFor="password">New Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    disabled={isLoading}
                    {...form.register('password')}
                  />
                </FormControl>
                <FormMessage />
              </div>
            )}
            <Button disabled={isLoading} type="submit" className="w-full">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              {mode === 'request' ? 'Send Reset Link' : 'Reset Password'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Back to login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
