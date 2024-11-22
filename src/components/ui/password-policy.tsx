import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PasswordPolicyProps {
  password: string
  className?: string
}

interface PolicyRule {
  label: string
  test: (password: string) => boolean
}

const policyRules: PolicyRule[] = [
  {
    label: "8-16 characters",
    test: (password) => password.length >= 8 && password.length <= 16,
  },
  {
    label: "Contains uppercase letter",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Contains lowercase letter",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Contains number",
    test: (password) => /[0-9]/.test(password),
  },
  {
    label: "Contains special character",
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
]

export function PasswordPolicy({ password, className }: PasswordPolicyProps) {
  if (!password) return null

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-medium">Password must have:</p>
      <ul className="space-y-1 text-sm">
        {policyRules.map((rule, index) => {
          const passes = rule.test(password)
          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2",
                passes ? "text-green-500" : "text-muted-foreground"
              )}
            >
              {passes ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
              {rule.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
