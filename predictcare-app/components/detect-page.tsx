"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "firebase/auth"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload } from "lucide-react"

interface DetectPageProps {
  navigateTo: (page: string) => void
  user: User | null
}

export default function DetectPage({ navigateTo, user }: DetectPageProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length) {
      handleFiles(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const file = files[0]
    if (file.type.startsWith("image/")) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setPreview(e.target.result)
        }
      }
      reader.readAsDataURL(file)
      setResult(null)
      setError(null)
    } else {
      setError("Please upload an image file")
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze image")
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      console.error("Error during image analysis:", err)
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navigation navigateTo={navigateTo} currentPage="detect-page" user={user} />
      <div className="p-8">
        <Card className="upload-container max-w-2xl mx-auto bg-black/70 p-8 rounded-lg shadow-[0_0_10px_5px_rgba(255,0,255,0.3)] border border-magenta-500/30">
          <h1 className="text-2xl font-bold text-center text-white mb-4">Upload Tumor Image</h1>
          <p className="text-center text-white mb-6">
            Please upload a clear image of the tumor for analysis.
            <br />
          </p>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert className={`mb-4 ${result.includes("Benign") ? "bg-magenta-500/20" : "bg-red-500/20"}`}>
              <AlertDescription className="text-lg font-semibold">Analysis Result: {result}</AlertDescription>
            </Alert>
          )}

          <div
            className={`upload-area border-2 border-dashed ${isDragging ? "border-magenta-500 bg-magenta-900/10" : "border-white"} rounded-lg p-12 my-8 cursor-pointer transition-all duration-300 text-center`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            {!preview ? (
              <>
                <Upload className="h-16 w-16 mx-auto mb-4 text-magenta-400" />
                <p className="text-white text-xl mb-2">Drag & Drop your image here</p>
                <p className="text-white">or</p>
                <input type="file" id="file-input" className="hidden" accept="image/*" onChange={handleFileInput} />
                <Button className="mt-4 bg-transparent border border-magenta-500 text-white hover:bg-magenta-900/20">
                  Browse Files
                </Button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-[300px] rounded-lg"
                />
                <Button
                  className="mt-4 bg-transparent border border-magenta-500 text-white hover:bg-magenta-900/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                    setPreview(null)
                    setResult(null)
                  }}
                >
                  Remove Image
                </Button>
              </div>
            )}
          </div>

          {preview && (
            <div className="text-center">
              <Button
                className="bg-magenta-600 hover:bg-magenta-700 text-white px-8 py-2 text-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Submit for Analysis"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
