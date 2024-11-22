"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PersonalInfoForm from "./components/PersonalInfoForm"
import SexualInfoForm from "./components/SexualInfoForm"
import ProgressIndicator from "./components/ProgressIndicator"
import { Icons } from "@/components/icons"

export interface PersonalInfo {
  username: string
  displayName: string
  bioText?: string
  birthdate: string
  gender: string
  pronouns: string
}

export interface SexualInfo {
  height?: number
  weight?: number
  bodyType: string
  ethnicity: string
  sexualOrientation: string
  relationshipStatus: string
  lookingFor: string[]
}

export interface ProfileData extends PersonalInfo, SexualInfo {
  userId?: string
  email?: string
  createdAt?: string
  updatedAt?: string
}

export default function ProfileWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<Partial<ProfileData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error("Please login to continue")
        router.push("/login")
        return
      }

      if (!user.emailVerified) {
        toast.error("Please verify your email to continue")
        router.push("/verify-email")
        return
      }

      try {
        // Check if profile already exists
        const response = await fetch(`/api/profile/${user.uid}`)
        if (response.ok) {
          const existingProfile = await response.json()
          if (existingProfile) {
            toast.info("Profile already exists")
            router.push("/dashboard")
            return
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error)
      }

      setIsInitialized(true)
    })

    return () => unsubscribe()
  }, [router])

  const handleStepComplete = async (stepData: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...stepData }))
    
    if (step === 1) {
      setStep(2)
      window.scrollTo(0, 0)
    } else {
      await saveProfile()
    }
  }

  const handleBack = () => {
    setStep(1)
    window.scrollTo(0, 0)
  }

  const saveProfile = async () => {
    setIsLoading(true)
    try {
      const user = auth.currentUser
      if (!user) {
        throw new Error("Not authenticated")
      }

      const now = new Date().toISOString()
      const profileData: ProfileData = {
        ...profile as ProfileData,
        userId: user.uid,
        email: user.email || undefined,
        createdAt: now,
        updatedAt: now,
      }

      const idToken = await user.getIdToken()
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save profile")
      }

      toast.success("Profile completed successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving profile:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isInitialized) {
    return (
      <div className="container flex min-h-screen items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>
            {step === 1 
              ? "Tell us about yourself to get started"
              : "Share your preferences to help us match you better"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ProgressIndicator currentStep={step} totalSteps={2} />
          
          {step === 1 ? (
            <PersonalInfoForm 
              initialData={profile}
              onComplete={handleStepComplete}
              isLoading={isLoading}
            />
          ) : (
            <SexualInfoForm
              initialData={profile}
              onComplete={handleStepComplete}
              onBack={handleBack}
              isLoading={isLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
