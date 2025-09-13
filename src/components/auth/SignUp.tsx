"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !email || !password) {
      setError("Please fill all required fields.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || "Signup failed")
      }
      setSuccess(true)
      // small delay to show success then redirect to home
      setTimeout(() => router.push("/"), 1200)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/6 to-background p-6">
      <div className="w-full max-w-lg bg-card/80 dark:bg-card/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-border">
        <div className="mb-6 text-center">
          <Badge className="mx-auto mb-3">Create account</Badge>
          <h1 className="text-2xl font-bold text-foreground">Join Sama-han</h1>
          <p className="text-sm text-muted-foreground mt-1">Share your heart, join the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm text-muted-foreground">Full name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm text-muted-foreground">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm text-muted-foreground">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <div>
            <Label htmlFor="confirm" className="text-sm text-muted-foreground">Confirm password</Label>
            <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required />
          </div>

          {error && <div className="text-sm text-destructive mt-1">{error}</div>}
          {success && <div className="text-sm text-primary mt-1">Account created — redirecting...</div>}

          <div className="flex items-center gap-3 mt-4">
            <Button type="submit" className="flex-1" disabled={loading || success}>
              {loading ? "Creating…" : "Sign up"}
            </Button>
            <Button variant="ghost" onClick={() => router.push("/")} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </main>
  )
}