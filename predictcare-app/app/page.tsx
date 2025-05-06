"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import LandingPage from "@/components/landing-page"
import Dashboard from "@/components/dashboard"
import SelfExam from "@/components/self-exam"
import Stories from "@/components/stories"
import DetectPage from "@/components/detect-page"
import Feedback from "@/components/feedback"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing-page")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setLoading(false)

        // If user logs out, redirect to landing page
        if (!currentUser && currentPage !== "landing-page") {
          setCurrentPage("landing-page")
        }
      },
      (error) => {
        console.error("Auth state error:", error)
        setAuthError("Authentication service is currently unavailable. Some features may be limited.")
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [currentPage])

  // Update the navigateTo function to remove the demo mode check
  const navigateTo = (page: string) => {
    // Only allow navigation to protected pages if user is logged in
    if (!user && page !== "landing-page") {
      setCurrentPage("landing-page")
      return
    }

    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-magenta-500"></div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: "black",
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {authError && (
        <div className="fixed top-0 left-0 right-0 z-50 p-4">
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-md text-white">{authError}</div>
        </div>
      )}

      {currentPage === "landing-page" && <LandingPage navigateTo={navigateTo} />}

      {currentPage === "dashboard-page" && user && <Dashboard navigateTo={navigateTo} user={user} />}

      {currentPage === "self-exam-page" && user && <SelfExam navigateTo={navigateTo} user={user} />}

      {currentPage === "stories-page" && user && <Stories navigateTo={navigateTo} user={user} />}

      {currentPage === "detect-page" && user && <DetectPage navigateTo={navigateTo} user={user} />}

      {currentPage === "feedback-page" && user && <Feedback navigateTo={navigateTo} user={user} />}
    </div>
  )
}
