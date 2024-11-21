"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { 
  SEXUAL_ORIENTATION,
  SEXUAL_POSITION,
  INTERESTED_IN,
  RELATIONSHIP_STATUS,
  LOOKING_FOR
} from "@/lib/constants/profile"

const sexualInfoSchema = z.object({
  sexualOrientation: z.string()
    .min(1, "Sexual orientation is required"),
  
  sexualPosition: z.string()
    .min(1, "Sexual position is required"),
  
  interestedIn: z.array(z.string())
    .min(1, "You must select at least one interest"),
  
  relationshipStatus: z.string()
    .min(1, "Relationship status is required"),
  
  lookingFor: z.array(z.string())
    .min(1, "You must select at least one option for what you're looking for")
})

type SexualInfoFormData = z.infer<typeof sexualInfoSchema>

interface SexualInfoFormProps {
  initialData: Partial<SexualInfoFormData>
  onComplete: (data: SexualInfoFormData) => void
  onBack: () => void
}

export default function SexualInfoForm({ initialData, onComplete, onBack }: SexualInfoFormProps) {
  const form = useForm<SexualInfoFormData>({
    resolver: zodResolver(sexualInfoSchema),
    defaultValues: {
      ...initialData,
      sexualOrientation: initialData.sexualOrientation || "",
    }
  })

  const onSubmit = (data: SexualInfoFormData) => {
    onComplete(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sexualOrientation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexual Orientation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sexual orientation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEXUAL_ORIENTATION.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sexualPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexual Position</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your position" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {SEXUAL_POSITION.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interestedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interested In</FormLabel>
              <FormControl>
                <ToggleGroup 
                  type="multiple"
                  className="flex flex-wrap gap-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {INTERESTED_IN.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={option.value}
                      aria-label={option.label}
                      className="px-3 py-2"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relationshipStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relationship Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your relationship status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RELATIONSHIP_STATUS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lookingFor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Looking For</FormLabel>
              <FormControl>
                <ToggleGroup 
                  type="multiple"
                  className="flex flex-wrap gap-2"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  {LOOKING_FOR.map((option) => (
                    <ToggleGroupItem
                      key={option.value}
                      value={option.value}
                      aria-label={option.label}
                      className="px-3 py-2"
                    >
                      {option.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          <Button type="submit" className="flex-1">
            Complete Profile
          </Button>
        </div>
      </form>
    </Form>
  )
}
