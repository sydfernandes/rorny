"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { PasswordValidation } from "@/components/password-validation"
import { Eye, EyeOff, Facebook, Loader2, Mail } from "lucide-react"

function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()

  const validatePassword = (password: string): string | null => {
    if (password.length > 16) {
      return "Password must not exceed 16 characters"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    return null
  }

  const getFirebaseErrorMessage = (error: any): string => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please try logging in instead.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/operation-not-allowed':
        return 'Email/password registration is not enabled. Please contact support.'
      case 'auth/weak-password':
        return 'Password is too weak. Please choose a stronger password.'
      case 'auth/password-does-not-meet-requirements':
        return 'Password does not meet requirements. Please ensure it is between 8-16 characters.'
      default:
        return error.message || 'An error occurred during registration.'
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Password validation
    const passwordError = validatePassword(password)
    if (passwordError) {
      setError(passwordError)
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Configure actionCodeSettings for email verification
      const actionCodeSettings = {
        url: `${window.location.origin}/login`, // Redirect to login after verification
        handleCodeInApp: false
      }

      // Send verification email
      await sendEmailVerification(userCredential.user, actionCodeSettings)

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      })
      
      router.push("/verify-email")
    } catch (error: any) {
      console.error(error)
      setError(getFirebaseErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true)
    setError("")
    try {
      await signInWithPopup(auth, googleProvider)
      toast({
        title: "Success!",
        description: "Successfully signed in with Google.",
      })
    } catch (error: any) {
      console.error(error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFacebookSignIn() {
    setIsLoading(true)
    setError("")
    try {
      await signInWithPopup(auth, facebookProvider)
      toast({
        title: "Success!",
        description: "Successfully signed in with Facebook.",
      })
    } catch (error: any) {
      console.error(error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          router.push("/home")
        } else {
          router.push("/verify-email")
        }
      }
    });

    return () => unsubscribe()
  }, [router])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              maxLength={16}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <PasswordValidation value={password} />

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              disabled={isLoading}
              maxLength={16}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2.5 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Create Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleGoogleSignIn}
          type="button"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          variant="outline"
          disabled={isLoading}
          onClick={handleFacebookSignIn}
          type="button"
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </div>
    </form>
  )
}

export default function RegisterPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">Rorny</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Join our community of creators and innovators. Start your journey with us today."
            </p>
            <footer className="text-sm">John Smith</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
