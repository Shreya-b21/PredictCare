"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "firebase/auth"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface FeedbackProps {
  navigateTo: (page: string) => void
  user: User | null
}

export default function Feedback({ navigateTo, user }: FeedbackProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState(user?.email || "")
  const [rating, setRating] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create feedback data object
      const feedbackData = {
        name,
        email,
        rating: Number.parseInt(rating),
        message,
        userId: user?.uid || "anonymous",
        createdAt: serverTimestamp(),
      }

      // Add document to Firestore
      await addDoc(collection(db, "user-feedback"), feedbackData)

      setSubmitted(true)

      // Reset form
      setName("")
      setEmail(user?.email || "")
      setRating("")
      setMessage("")
    } catch (err) {
      console.error("Error submitting feedback:", err)
      setError("Failed to submit feedback. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navigation navigateTo={navigateTo} currentPage="feedback-page" user={user} />
      <div className="p-8 text-white">
        <h1 className="text-3xl mb-4">Feedback</h1>
        <p className="mb-2">Share your experience and help us improve our services.</p>
        <p className="mb-8">CONTACT US +91-7653468876 or xyz@gmail.com.</p>

        <Card className="max-w-2xl mx-auto bg-black/70 p-8 rounded-lg shadow-[0_0_10px_5px_rgba(255,0,255,0.3)] border border-magenta-500/30">
          <h2 className="text-2xl font-bold mb-6 text-white">Feedback Form</h2>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {submitted && (
            <Alert className="mb-6 bg-magenta-500/20">
              <AlertDescription>Thank you for your feedback! We appreciate your input.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-white">
                Name:
              </label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/50 border-magenta-500/50"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-white">
                Email:
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border-magenta-500/50"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="rating" className="block mb-2 text-white">
                Rating:
              </label>
              <Select value={rating} onValueChange={setRating} required>
                <SelectTrigger className="w-full bg-black/50 border-magenta-500/50">
                  <SelectValue placeholder="-- Select Rating --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Excellent (5)</SelectItem>
                  <SelectItem value="4">Very Good (4)</SelectItem>
                  <SelectItem value="3">Good (3)</SelectItem>
                  <SelectItem value="2">Fair (2)</SelectItem>
                  <SelectItem value="1">Poor (1)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-white">
                Feedback:
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Write your feedback here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-black/50 border-magenta-500/50"
              />
            </div>

            <Button type="submit" className="bg-magenta-600 hover:bg-magenta-700 text-white" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
