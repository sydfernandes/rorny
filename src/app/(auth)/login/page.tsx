/**
 * Login Page Component
 * 
 * Purpose:
 * Handles user authentication through email/password and social providers.
 * Provides a secure and user-friendly login interface with form validation.
 * 
 * Functionality:
 * - Email/password authentication with form validation
 * - Social authentication (Google and Facebook)
 * - Loading states for all authentication methods
 * - Error handling and user feedback
 * - Form validation using Zod schema
 * - Redirects to dashboard on successful login
 * - Links to registration and password reset
 */

"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { loginSchema } from "@/lib/validations/auth"
import { signInWithEmail, signInWithGoogle, signInWithFacebook } from "@/lib/auth"
import type { z } from "zod"
import { AuthLayout } from "../components/auth-layout"
import { SocialButtons } from "../components/social-buttons"

type FormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    const { user, error } = await signInWithEmail(data.email, data.password)
    setIsLoading(false)

    if (error) {
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    if (user) {
      router.push("/dashboard")
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      })
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    const { user, error } = await signInWithGoogle()
    setIsGoogleLoading(false)

    if (error) {
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    if (user) {
      router.push("/hello")
      toast({
        title: "Success",
        description: "You have successfully logged in with Google.",
      })
    }
  }

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true)
    const { user, error } = await signInWithFacebook()
    setIsFacebookLoading(false)

    if (error) {
      return toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    if (user) {
      router.push("/hello")
      toast({
        title: "Success",
        description: "You have successfully logged in with Facebook.",
      })
    }
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SocialButtons
            onGoogleClick={handleGoogleSignIn}
            onFacebookClick={handleFacebookSignIn}
            isGoogleLoading={isGoogleLoading}
            isFacebookLoading={isFacebookLoading}
          />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        type="password"
                        autoComplete="current-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <Link
                  href="/reset-password"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
