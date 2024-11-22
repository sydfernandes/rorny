"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"
import { getFirebaseErrorMessage } from "@/lib/auth/utils"
import { registerSchema, type RegisterFormData } from "@/lib/auth/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PasswordPolicy } from "@/components/ui/password-policy"

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  })

  const password = watch("password", "")

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await sendEmailVerification(userCredential.user)
      
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      })
      
      router.push("/profile-wizard")
    } catch (error: any) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
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
      await signInWithPopup(auth, provider)
      router.push("/profile-wizard")
    } catch (error: any) {
      console.error("Social login error:", error)
      toast({
        title: "Registration failed",
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
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your email and password to create your account</CardDescription>
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
                <PasswordPolicy password={password} className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    disabled={isLoading}
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Icons.eye className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Icons.eyeOff className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create account
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
              Already have an account?{" "}
              <Link href="/login" className="font-medium underline">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
