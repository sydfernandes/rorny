"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PersonalInfoForm from "./components/PersonalInfoForm"
import SexualInfoForm from "./components/SexualInfoForm"
import ProgressIndicator from "./components/ProgressIndicator"

export default function ProfileWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    // Step 1: Personal Information
    displayName: "",
    bioText: "",
    birthdate: "",
    gender: "",
    pronouns: "",
    
    // Step 2: Sexual Information
    sexualOrientation: [],
    sexualPosition: "",
    interestedIn: [],
    relationshipStatus: "",
    lookingFor: []
  })

  const handleStepComplete = (stepData: any) => {
    setProfile(prev => ({ ...prev, ...stepData }))
    
    if (step === 1) {
      setStep(2)
    } else {
      // Save complete profile and redirect
      saveProfile()
    }
  }

  const saveProfile = async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      })

      if (!response.ok) {
        throw new Error("Failed to save profile")
      }

      // Redirect to app home on success
      router.push("/app")
    } catch (error) {
      console.error("Error saving profile:", error)
      // Handle error (show error message to user)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-8">
        <ProgressIndicator currentStep={step} totalSteps={2} />
        
        {step === 1 ? (
          <PersonalInfoForm 
            initialData={profile}
            onComplete={handleStepComplete}
          />
        ) : (
          <SexualInfoForm
            initialData={profile}
            onComplete={handleStepComplete}
          />
        )}
      </div>
    </div>
  )
}
