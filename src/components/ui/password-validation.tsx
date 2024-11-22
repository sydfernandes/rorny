"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils/index"

interface PasswordValidationProps {
  value: string
}

export function PasswordValidation({ value }: PasswordValidationProps) {
  const rules = [
    {
      id: 1,
      label: "At least 8 characters",
      pattern: /.{8,}/,
    },
    {
      id: 2,
      label: "Contains a capital letter",
      pattern: /[A-Z]/,
    },
    {
      id: 3,
      label: "Contains a number",
      pattern: /[0-9]/,
    },
    {
      id: 4,
      label: "Contains a special character",
      pattern: /[-!@#$%^&*(),.?":{}|<>]/,
    },
  ]

  if (!value) {
    return null
  }

  return (
    <div className="grid gap-2 py-2">
      {rules.map((rule) => {
        const isValid = rule.pattern.test(value)
        return (
          <div
            key={rule.id}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            {isValid ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <X className="h-4 w-4 text-destructive" />
            )}
            <span className={isValid ? "text-green-500" : ""}>{rule.label}</span>
          </div>
        )
      })}
    </div>
  )
}
