"use client"

import type React from "react"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Twitter } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export function SignInForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get("error")
  const registered = searchParams.get("registered")
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError("")

    if (!email || !password) {
      setFormError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setFormError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.push("/dashboard")
    } catch (error) {
      setFormError("An error occurred during sign in")
      setIsLoading(false)
    }
  }

  let errorMessage = ""
  if (error === "CredentialsSignin") {
    errorMessage = "Invalid email or password"
  } else if (error) {
    errorMessage = "An error occurred during sign in. Please try again."
  }

  return (
    <Card className="p-6 space-y-4">
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {registered && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <AlertDescription className="text-green-800 dark:text-green-300">
            Account created successfully! Please sign in.
          </AlertDescription>
        </Alert>
      )}

      {formError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => signIn("twitter", { callbackUrl: "/dashboard" })}>
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
        <Button variant="outline" onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="underline hover:text-primary">
          Sign up
        </Link>
      </div>
    </Card>
  )
}
