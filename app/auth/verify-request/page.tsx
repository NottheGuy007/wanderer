import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyRequestPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>A sign in link has been sent to your email address</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please check your email and click the link to sign in.</p>
        </CardContent>
      </Card>
    </div>
  )
}
