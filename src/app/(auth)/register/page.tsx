/**
 * Registration Page Component
 * 
 * Purpose:
 * Handles new user registration through email/password and social providers.
 * Provides a secure and user-friendly registration interface with form validation.
 * 
 * Functionality:
 * - Email/password registration with form validation
 * - Social registration (Google and Facebook)
 * - Password strength validation
 * - Loading states for all registration methods
 * - Error handling and user feedback
 * - Form validation using Zod schema
 * - Redirects to dashboard on successful registration
 * - Links to login page
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
  FormDescription,
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
import { registerSchema } from "@/lib/validations/auth"
import { createUserWithVerification } from "@/lib/auth"
import { PasswordValidation } from "@/components/password-validation"
import type { z } from "zod"
import { AuthLayout } from "@/components/auth/auth-layout"
import { SocialButtons } from "@/components/auth/social-buttons"

type FormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isFacebookLoading, setIsFacebookLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    mode: "onChange"
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    try {
      // Create user with Firebase and send verification email
      const user = await createUserWithVerification(data.email, data.password)
      
      if (user) {
        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        })
        router.push('/verify-email')
      } else {
        toast({
          title: "Registration failed",
          description: "This email might already be registered.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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
      router.push("/dashboard")
      toast({
        title: "Success",
        description: "You have successfully signed up with Google.",
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
      router.push("/dashboard")
      toast({
        title: "Success",
        description: "You have successfully signed up with Facebook.",
      })
    }
  }

  return (
    <AuthLayout>
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Choose your preferred sign up method or enter your details below
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe"
                        autoComplete="name"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Create a password"
                        type="password"
                        autoComplete="new-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                    <PasswordValidation password={field.value} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Confirm your password"
                        type="password"
                        autoComplete="new-password"
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
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
