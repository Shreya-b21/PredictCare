"use client"

import type { User } from "firebase/auth"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface NavigationProps {
  navigateTo: (page: string) => void
  currentPage: string
  user: User | null
}

export default function Navigation({ navigateTo, currentPage, user }: NavigationProps) {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigateTo("landing-page")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="bg-black text-white p-4 text-center border-b border-magenta-500/30">
      <ul className="list-none m-0 p-0 flex justify-around items-center">
        <li className="mr-5">
          <a
            href="#"
            className={`text-white no-underline ${currentPage === "dashboard-page" ? "bg-magenta-900/50 text-magenta-300 p-2.5 rounded" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo("dashboard-page")
            }}
          >
            Home
          </a>
        </li>
        <li className="mr-5">
          <a
            href="#"
            className={`text-white no-underline ${currentPage === "self-exam-page" ? "bg-magenta-900/50 text-magenta-300 p-2.5 rounded" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo("self-exam-page")
            }}
          >
            Self-Exam
          </a>
        </li>
        <li className="mr-5">
          <a
            href="#"
            className={`text-white no-underline ${currentPage === "stories-page" ? "bg-magenta-900/50 text-magenta-300 p-2.5 rounded" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo("stories-page")
            }}
          >
            Stories
          </a>
        </li>
        <li className="mr-5">
          <a
            href="#"
            className={`text-white no-underline ${currentPage === "detect-page" ? "bg-magenta-900/50 text-magenta-300 p-2.5 rounded" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo("detect-page")
            }}
          >
            Detect Now
          </a>
        </li>
        <li className="mr-5">
          <a
            href="#"
            className={`text-white no-underline ${currentPage === "feedback-page" ? "bg-magenta-900/50 text-magenta-300 p-2.5 rounded" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              navigateTo("feedback-page")
            }}
          >
            Feedback
          </a>
        </li>
        {user && (
          <li className="ml-auto">
            <div className="flex items-center">
              <span className="mr-2">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="bg-magenta-600 text-white px-3 py-1 rounded text-sm hover:bg-magenta-700"
              >
                Sign Out
              </button>
            </div>
          </li>
        )}
      </ul>
    </nav>
  )
}
