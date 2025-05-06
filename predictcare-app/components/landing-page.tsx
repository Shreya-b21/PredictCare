"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, AlertTriangle } from "lucide-react"

interface LandingPageProps {
  navigateTo: (page: string) => void
}

export default function LandingPage({ navigateTo }: LandingPageProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isDemo, setIsDemo] = useState(false)
  const [isRedirectInProgress, setIsRedirectInProgress] = useState(false)
  const torchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Remove the demo mode check since we now have valid credentials
    setIsDemo(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (torchRef.current) {
        torchRef.current.style.left = `${e.pageX}px`
        torchRef.current.style.top = `${e.pageY}px`
        torchRef.current.style.opacity = "1"
      }
    }

    const handleMouseOut = () => {
      if (torchRef.current) {
        torchRef.current.style.opacity = "0"
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseout", handleMouseOut)

    // Check for redirect result from Google sign-in
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User successfully signed in with redirect
          navigateTo("dashboard-page")
        }
      })
      .catch((error) => {
        if (error.code !== "auth/no-auth-event") {
          // Only show error if it's not the "no auth event" error
          // which happens normally when there's no redirect result
          console.error("Redirect sign-in error:", error)
          setError(error.message)
        }
      })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [navigateTo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setError("")
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      setSuccess("Login successful!")
      setTimeout(() => {
        navigateTo("dashboard-page")
      }, 1000)
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setError("")
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      setSuccess("Registration successful! Please log in to continue.")

      // Clear registration form
      setRegisterEmail("")
      setRegisterPassword("")
      setConfirmPassword("")

      // Show login form after a short delay
      setTimeout(() => {
        setShowRegisterForm(false)
        setShowLoginForm(true)
      }, 2000)
    } catch (error: any) {
      console.error("Registration error:", error)
      setError(error.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setError("")
      const provider = new GoogleAuthProvider()
      // Add scopes for Google sign-in
      provider.addScope("profile")
      provider.addScope("email")
      // Set custom parameters
      provider.setCustomParameters({
        prompt: "select_account",
      })

      // First try with popup
      try {
        setIsRedirectInProgress(true)
        await signInWithRedirect(auth, provider)
        // The page will redirect, so we won't reach this point until the user returns
      } catch (popupError: any) {
        console.error("Google sign-in redirect error:", popupError)

        if (popupError.code === "auth/unauthorized-domain") {
          setError(
            "This domain is not authorized for authentication. Please add it to your Firebase console or try accessing the app from an authorized domain.",
          )
        } else {
          setError(popupError.message)
        }
        setIsRedirectInProgress(false)
      }
    } catch (error: any) {
      console.error("Google sign-in setup error:", error)
      setError(error.message)
      setIsRedirectInProgress(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setError("")
      await sendPasswordResetEmail(auth, forgotPasswordEmail)
      setSuccess("Password reset email sent! Please check your inbox.")

      // Clear the email field
      setForgotPasswordEmail("")

      // Return to login form after a delay
      setTimeout(() => {
        setShowForgotPasswordForm(false)
        setShowLoginForm(true)
      }, 3000)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error.message)
    }
  }

  return (
    <div className="relative min-h-screen">
      <div
        ref={torchRef}
        className="torch absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          zIndex: 0,
        }}
      />

      <div className="logo-container absolute top-5 left-5 flex items-center z-10">
        <img
          src="/placeholder.svg?height=50&width=50"
          alt="PredictCare Logo"
          className="h-[50px] w-[50px] mr-2.5"
          style={{ objectFit: "contain" }}
        />
        <span className="text-white text-2xl font-bold">PredictCare</span>
      </div>

      <div
        className="menu-icon absolute top-5 right-5 cursor-pointer z-10 text-white text-3xl"
        onClick={() => {
          setShowMenu(!showMenu)
          setShowLanguageMenu(false)
        }}
      >
        &#9776;
      </div>

      {showMenu && (
        <div className="menu absolute top-[60px] right-5 bg-black/80 p-2.5 rounded-md z-20">
          <a
            href="#"
            className="block text-white no-underline py-1.5 px-2.5"
            onClick={(e) => {
              e.preventDefault()
              setShowLoginForm(true)
              setShowMenu(false)
            }}
          >
            Login
          </a>
          <a
            href="#"
            className="block text-white no-underline py-1.5 px-2.5"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("feedback-page")
            }}
          >
            Help
          </a>
          <a
            href="#"
            className="block text-white no-underline py-1.5 px-2.5"
            onClick={(e) => {
              e.preventDefault()
              navigateTo("feedback-page")
            }}
          >
            Contact Us
          </a>
        </div>
      )}

      <div
        className="language-icon absolute top-5 right-[60px] cursor-pointer z-10 text-white text-3xl"
        onClick={() => {
          setShowLanguageMenu(!showLanguageMenu)
          setShowMenu(false)
        }}
      >
        &#127760;
      </div>

      {showLanguageMenu && (
        <div className="language-menu absolute top-[60px] right-5 bg-black/80 p-2.5 rounded-md z-20">
          <a href="#" className="block text-white no-underline py-1.5 px-2.5">
            English
          </a>
          <a href="#" className="block text-white no-underline py-1.5 px-2.5">
            Spanish
          </a>
          <a href="#" className="block text-white no-underline py-1.5 px-2.5">
            French
          </a>
        </div>
      )}

      {!showLoginForm && !showRegisterForm && !showForgotPasswordForm && (
        <>
          <div className="slogan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-5xl z-10">
            Spreading <span className="text-magenta-500 font-bold">HOPE</span> like confetti
          </div>

          <button
            className="get-started absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-magenta-500/30 text-white py-[15px] px-[30px] border-none rounded-md text-xl cursor-pointer z-10 hover:bg-magenta-500/50"
            onClick={() => setShowLoginForm(true)}
          >
            Get Started
          </button>
        </>
      )}

      {showLoginForm && (
        <Card className="login-form absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-5 rounded-md z-30 w-[300px] text-center shadow-[0_0_10px_5px_rgba(255,0,255,0.3)] border border-magenta-500/30">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowLoginForm(false)
                setError("")
                setSuccess("")
              }}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-500/20">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-magenta-600 text-white py-2.5 px-5 border-none rounded cursor-pointer mt-2.5 hover:bg-magenta-700"
            >
              Login
            </Button>
          </form>
          <Button
            onClick={handleGoogleSignIn}
            className="bg-[#4285F4] text-white py-2.5 px-5 border-none rounded cursor-pointer mt-2.5 w-[90%]"
            disabled={isRedirectInProgress}
          >
            {isRedirectInProgress ? "Redirecting..." : "Sign in with Google"}
          </Button>
          <a
            href="#"
            className="block mt-2"
            onClick={(e) => {
              e.preventDefault()
              setShowLoginForm(false)
              setShowForgotPasswordForm(true)
              setError("")
              setSuccess("")
            }}
          >
            Forgot Password?
          </a>
          <a
            href="#"
            className="block mt-2"
            onClick={(e) => {
              e.preventDefault()
              setShowLoginForm(false)
              setShowRegisterForm(true)
              setError("")
              setSuccess("")
            }}
          >
            New User? Register Here
          </a>
        </Card>
      )}

      {showRegisterForm && (
        <Card className="register-form absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-5 rounded-md z-30 w-[300px] text-center shadow-[0_0_10px_5px_rgba(255,0,255,0.3)] border border-magenta-500/30">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowRegisterForm(false)
                setError("")
                setSuccess("")
              }}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mb-4">Register</h2>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-500/20">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegister}>
            <Input
              type="email"
              placeholder="Email"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Create Password"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-magenta-600 text-white py-2.5 px-5 border-none rounded cursor-pointer mt-2.5 hover:bg-magenta-700"
            >
              Register
            </Button>
          </form>
          <Button
            onClick={handleGoogleSignIn}
            className="bg-[#4285F4] text-white py-2.5 px-5 border-none rounded cursor-pointer mt-2.5 w-[90%]"
            disabled={isRedirectInProgress}
          >
            {isRedirectInProgress ? "Redirecting..." : "Sign up with Google"}
          </Button>
          <a
            href="#"
            className="block mt-2"
            onClick={(e) => {
              e.preventDefault()
              setShowRegisterForm(false)
              setShowLoginForm(true)
              setError("")
              setSuccess("")
            }}
          >
            Already have an account? Login
          </a>
        </Card>
      )}

      {showForgotPasswordForm && (
        <Card className="forgot-password-form absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-5 rounded-md z-30 w-[300px] text-center shadow-[0_0_10px_5px_rgba(255,0,255,0.3)] border border-magenta-500/30">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowForgotPasswordForm(false)
                setError("")
                setSuccess("")
              }}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <p className="text-sm mb-4">Enter your email address and we'll send you a link to reset your password.</p>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 bg-green-500/20">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleForgotPassword}>
            <Input
              type="email"
              placeholder="Email"
              className="w-[90%] p-2.5 my-2.5 border border-gray-300 rounded"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-magenta-600 text-white py-2.5 px-5 border-none rounded cursor-pointer mt-2.5 hover:bg-magenta-700"
            >
              Send Reset Link
            </Button>
          </form>
          <a
            href="#"
            className="block mt-4"
            onClick={(e) => {
              e.preventDefault()
              setShowForgotPasswordForm(false)
              setShowLoginForm(true)
              setError("")
              setSuccess("")
            }}
          >
            Back to Login
          </a>
        </Card>
      )}

      {/* Add a helper alert for unauthorized domain */}
      {error && error.includes("unauthorized-domain") && (
        <Alert className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-yellow-500/20 border border-yellow-500/50 z-50">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            <p className="font-bold mb-1">Domain Not Authorized</p>
            <p className="text-sm">
              To fix this, add "{window.location.origin}" to your authorized domains in the Firebase console:
            </p>
            <ol className="text-xs list-decimal pl-4 mt-1">
              <li>Go to Firebase Console</li>
              <li>Select your project</li>
              <li>Go to Authentication → Settings → Authorized domains</li>
              <li>Add this domain</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
