"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GENDER, PRONOUNS } from "@/lib/constants/profile"

const personalInfoSchema = z.object({
  username: z.string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be 30 characters or less")
    .regex(/^[a-zA-Z0-9._]+$/, "Username can only contain letters and numbers"),
  
  displayName: z.string()
    .min(1, "Display name is required")
    .max(16, "Display name must be 16 characters or less"),
  
  bioText: z.string()
    .min(1, "Bio is required")
    .max(240, "Bio must be 240 characters or less"),
  
  birthdate: z.string()
    .min(1, "Birthdate is required")
    .refine((date) => {
      const age = Math.floor((new Date().getTime() - new Date(date).getTime()) / 31557600000)
      return age >= 18
    }, "You must be at least 18 years old"),
  
  gender: z.string().min(1, "Gender is required"),
  
  pronouns: z.string().min(1, "Pronouns are required")
})

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>

interface PersonalInfoFormProps {
  initialData: Partial<PersonalInfoFormData>
  onComplete: (data: PersonalInfoFormData) => void
}

export default function PersonalInfoForm({ initialData, onComplete }: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: initialData
  })

  const onSubmit = (data: PersonalInfoFormData) => {
    onComplete(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Choose a unique username" maxLength={30} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your display name" maxLength={16} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bioText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Tell others a little about yourself!"
                  maxLength={240}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthdate</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDER.map((option) => (
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
            name="pronouns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pronouns</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your pronouns" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PRONOUNS.map((option) => (
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
        </div>

        <Button type="submit">Next</Button>
      </form>
    </Form>
  )
}
