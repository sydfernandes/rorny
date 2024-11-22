"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Icons } from "@/components/icons"
import { FormInput, FormSelect } from "@/components/form/form-fields"

const BODY_TYPE = [
  { value: "athletic", label: "Athletic" },
  { value: "average", label: "Average" },
  { value: "slim", label: "Slim" },
  { value: "curvy", label: "Curvy" },
  { value: "muscular", label: "Muscular" },
  { value: "plus_size", label: "Plus Size" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const ETHNICITY = [
  { value: "asian", label: "Asian" },
  { value: "black", label: "Black" },
  { value: "hispanic", label: "Hispanic" },
  { value: "middle_eastern", label: "Middle Eastern" },
  { value: "mixed", label: "Mixed" },
  { value: "native_american", label: "Native American" },
  { value: "pacific_islander", label: "Pacific Islander" },
  { value: "white", label: "White" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const SEXUAL_ORIENTATION = [
  { value: "straight", label: "Straight" },
  { value: "gay", label: "Gay" },
  { value: "lesbian", label: "Lesbian" },
  { value: "bisexual", label: "Bisexual" },
  { value: "pansexual", label: "Pansexual" },
  { value: "asexual", label: "Asexual" },
  { value: "queer", label: "Queer" },
  { value: "questioning", label: "Questioning" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const RELATIONSHIP_STATUS = [
  { value: "single", label: "Single" },
  { value: "divorced", label: "Divorced" },
  { value: "separated", label: "Separated" },
  { value: "widowed", label: "Widowed" },
  { value: "its_complicated", label: "It's Complicated" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const

const LOOKING_FOR = [
  { value: "friendship", label: "Friendship" },
  { value: "dating", label: "Dating" },
  { value: "long_term", label: "Long-term Relationship" },
  { value: "marriage", label: "Marriage" },
  { value: "casual", label: "Casual" },
  { value: "not_sure", label: "Not Sure" },
] as const

const sexualInfoSchema = z.object({
  height: z.number()
    .min(120, "Height must be at least 120cm")
    .max(250, "Height must be less than 250cm")
    .optional(),
  weight: z.number()
    .min(30, "Weight must be at least 30kg")
    .max(250, "Weight must be less than 250kg")
    .optional(),
  bodyType: z.string()
    .min(1, "Body type is required"),
  ethnicity: z.string()
    .min(1, "Ethnicity is required"),
  sexualOrientation: z.string()
    .min(1, "Sexual orientation is required"),
  relationshipStatus: z.string()
    .min(1, "Relationship status is required"),
  lookingFor: z.array(z.string())
    .min(1, "Please select at least one option")
    .max(3, "Please select at most 3 options")
})

type SexualInfoFormData = z.infer<typeof sexualInfoSchema>

interface SexualInfoFormProps {
  initialData: Partial<SexualInfoFormData>
  onComplete: (data: SexualInfoFormData) => void
  onBack: () => void
  isLoading: boolean
}

export default function SexualInfoForm({
  initialData,
  onComplete,
  onBack,
  isLoading
}: SexualInfoFormProps) {
  const form = useForm<SexualInfoFormData>({
    resolver: zodResolver(sexualInfoSchema),
    defaultValues: {
      height: undefined,
      weight: undefined,
      bodyType: "",
      ethnicity: "",
      sexualOrientation: "",
      relationshipStatus: "",
      lookingFor: [],
      ...initialData
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onComplete)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="height"
            label="Height (cm)"
            type="number"
            placeholder="170"
          />

          <FormInput
            control={form.control}
            name="weight"
            label="Weight (kg)"
            type="number"
            placeholder="70"
          />
        </div>

        <FormSelect
          control={form.control}
          name="bodyType"
          label="Body Type"
          options={BODY_TYPE}
          placeholder="Select your body type"
        />

        <FormSelect
          control={form.control}
          name="ethnicity"
          label="Ethnicity"
          options={ETHNICITY}
          placeholder="Select your ethnicity"
        />

        <FormSelect
          control={form.control}
          name="sexualOrientation"
          label="Sexual Orientation"
          options={SEXUAL_ORIENTATION}
          placeholder="Select your sexual orientation"
        />

        <FormSelect
          control={form.control}
          name="relationshipStatus"
          label="Relationship Status"
          options={RELATIONSHIP_STATUS}
          placeholder="Select your relationship status"
        />

        <FormSelect
          control={form.control}
          name="lookingFor"
          label="Looking For"
          description="Select up to 3 options"
          options={LOOKING_FOR}
          placeholder="What are you looking for?"
          multiple={true}
        />

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Complete Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
