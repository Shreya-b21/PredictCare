import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 })
    }

    // This implementation directly matches your Flask code logic
    // It analyzes the image filename to determine if it's benign or malignant
    const filename = image.name.toLowerCase()

    let result
    if (filename.includes("benign")) {
      result = "Benign"
    } else if (filename.includes("malignant")) {
      result = "Malignant"
    } else {
      result = "Could not determine (Please enter relevant image"
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
