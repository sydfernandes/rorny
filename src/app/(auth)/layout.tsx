import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register | Rorny",
  description: "Create your Rorny account",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
