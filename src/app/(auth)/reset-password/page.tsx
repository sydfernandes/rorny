/**
 * Password Reset Page Component
 * 
 * Purpose:
 * Handles the password reset process for users who have forgotten their passwords.
 * Provides a secure interface for initiating and completing password reset.
 * 
 * Functionality:
 * - Email input for password reset initiation
 * - Form validation using Zod schema
 * - Loading states during reset request
 * - Error handling and user feedback
 * - Success confirmation and next steps
 * - Links back to login page
 */

"use client"

import { useState } from "react"
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
import { resetPassword } from "@/lib/auth"
import type { z } from "zod"
import { AuthLayout } from "../components/auth-layout"

type FormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const { error } = await resetPassword(data.email)
    setIsLoading(false)

    if (error) {
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    toast({
      title: "Success",
      description: "Check your email for a reset link.",
    })
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        type="email"
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send Reset Link
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
