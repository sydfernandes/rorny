"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/icons"
import { FormInput, FormTextarea, FormSelect } from "@/components/form/form-fields"

const GENDER = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non_binary", label: "Non-binary" },
  { value: "transgender", label: "Transgender" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const PRONOUNS = [
  { value: "he_him", label: "He/Him" },
  { value: "she_her", label: "She/Her" },
  { value: "they_them", label: "They/Them" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const personalInfoSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  displayName: z.string()
    .min(2, "Display name must be at least 2 characters")
    .max(16, "Display name must be less than 16 characters"),
  bioText: z.string()
    .max(240, "Bio must be less than 240 characters")
    .optional(),
  birthdate: z.string()
    .refine((date) => {
      const today = new Date()
      const birthDate = new Date(date)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age >= 18
    }, "You must be at least 18 years old"),
  gender: z.string().min(1, "Gender is required"),
  pronouns: z.string().min(1, "Pronouns are required")
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface PersonalInfoFormProps {
  initialData: Partial<PersonalInfoFormData>
  onComplete: (data: PersonalInfoFormData) => void
  isLoading: boolean
}

export default function PersonalInfoForm({ 
  initialData, 
  onComplete,
  isLoading 
}: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      username: "",
      displayName: "",
      bioText: "",
      birthdate: "",
      gender: "",
      pronouns: "",
      ...initialData
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4">
        <FormInput
          control={form.control}
          name="username"
          label="Username"
          placeholder="Choose a unique username"
        />

        <FormInput
          control={form.control}
          name="displayName"
          label="Display Name"
          placeholder="Your display name"
        />

        <FormTextarea
          control={form.control}
          name="bioText"
          label="Bio"
          placeholder="Tell us about yourself (optional)"
        />

        <FormInput
          control={form.control}
          name="birthdate"
          label="Date of Birth"
          type="date"
          max={new Date().toISOString().split("T")[0]}
        />

        <FormSelect
          control={form.control}
          name="gender"
          label="Gender"
          options={GENDER}
          placeholder="Select your gender"
        />

        <FormSelect
          control={form.control}
          name="pronouns"
          label="Pronouns"
          options={PRONOUNS}
          placeholder="Select your pronouns"
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  )
}
