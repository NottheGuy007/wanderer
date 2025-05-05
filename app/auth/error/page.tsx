import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "An unknown error occurred"

  let errorMessage = "An error occurred during authentication."
  let errorDescription = "Please try again or use a different sign-in method."

  // Handle specific error messages
  switch (error) {
    case "AccessDenied":
      errorMessage = "Access Denied"
      errorDescription = "You do not have permission to sign in."
      break
    case "Verification":
      errorMessage = "Invalid Verification"
      errorDescription = "The verification link is invalid or has expired."
      break
    case "OAuthSignin":
      errorMessage = "OAuth Sign In Error"
      errorDescription = "There was a problem with the authentication provider. Please try again."
      break
    case "OAuthCallback":
      errorMessage = "OAuth Callback Error"
      errorDescription = "There was a problem with the authentication callback. Please try again."
      break
    case "OAuthCreateAccount":
      errorMessage = "Account Creation Error"
      errorDescription = "There was a problem creating your account. Please try again."
      break
    case "EmailCreateAccount":
      errorMessage = "Email Account Creation Error"
      errorDescription = "There was a problem creating your email account. Please try again."
      break
    case "Callback":
      errorMessage = "Callback Error"
      errorDescription = "There was a problem with the authentication callback. Please try again."
      break
    case "OAuthAccountNotLinked":
      errorMessage = "Account Not Linked"
      errorDescription =
        "This email is already associated with another account. Please sign in with the provider you used previously."
      break
    case "EmailSignin":
      errorMessage = "Email Sign In Error"
      errorDescription = "The email could not be sent. Please try again."
      break
    case "CredentialsSignin":
      errorMessage = "Invalid Credentials"
      errorDescription = "The credentials you provided are invalid. Please try again."
      break
    case "SessionRequired":
      errorMessage = "Session Required"
      errorDescription = "You must be signed in to access this page."
      break
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{errorMessage}</CardTitle>
          <CardDescription>Authentication Error</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{errorDescription}</p>
          <p className="text-sm text-muted-foreground">Error code: {error}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/auth/signin">Try Again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
