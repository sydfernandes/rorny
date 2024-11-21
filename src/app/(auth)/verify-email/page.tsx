import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Verify Email | Rorny",
  description: "Verify your email address",
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Check your email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification code to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              placeholder="Enter 6-digit code"
              required
              maxLength={6}
              className="text-center text-2xl tracking-widest"
            />
            <p className="text-sm text-muted-foreground text-center">
              Enter the 6-digit code we sent to your email
            </p>
          </div>
          <Button className="w-full" type="submit">
            Verify email
          </Button>
          <div className="text-sm text-center space-y-2">
            <p className="text-muted-foreground">
              Didn't receive the code?
            </p>
            <Button variant="link" className="text-sm" type="button">
              Resend code
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <Button variant="link" className="px-0" asChild>
              <Link href="/login">
                Back to login
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
