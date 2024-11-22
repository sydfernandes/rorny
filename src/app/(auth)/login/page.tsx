"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { getFirebaseErrorMessage, createSession } from "@/lib/auth/utils"
import { loginSchema, type LoginFormData } from "@/lib/auth/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user

      if (!user.emailVerified) {
        toast({
          title: "Email verification required",
          description: "Please verify your email before logging in.",
          variant: "destructive",
        })
        router.push("/verify-email")
        return
      }

      // Create session
      const idToken = await user.getIdToken()
      await createSession(idToken)

      // Check profile completion status
      const profileResponse = await fetch("/api/profile/status", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })

      if (!profileResponse.ok) {
        router.push("/profile-wizard")
        return
      }

      router.push("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: getFirebaseErrorMessage(error),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, provider)
      
      // Create session
      const idToken = await result.user.getIdToken()
      await createSession(idToken)
      
      router.push("/dashboard")
    } catch (error: any) {
      console.error("Social login error:", error)
      toast({
        title: "Login failed",
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
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email and password to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icons.eye className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Icons.eyeOff className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => handleSocialLogin(new GoogleAuthProvider())}
              >
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                disabled={isLoading}
                onClick={() => handleSocialLogin(new FacebookAuthProvider())}
              >
                <Icons.facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium underline">
                Register
              </Link>
            </div>
            <div className="text-center text-sm">
              <Link href="/reset-password" className="font-medium underline">
                Forgot your password?
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
