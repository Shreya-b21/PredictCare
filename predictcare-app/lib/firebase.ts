import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo0W4MdqAyW77Or6WP9P_qLJ8V7UAg5SU",
  authDomain: "predictcare2024.firebaseapp.com",
  projectId: "predictcare2024",
  storageBucket: "predictcare2024.firebasestorage.app",
  messagingSenderId: "187280089727",
  appId: "1:187280089727:web:7d3bb79a34b5d867a3954a",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Firestore
export const db = getFirestore(app)

// Check if we're in a development environment
const isDevelopment = process.env.NODE_ENV === "development"

// If we're in development, use the emulators if available
if (isDevelopment && typeof window !== "undefined") {
  // Uncomment these lines to use Firebase emulators during development
  // connectAuthEmulator(auth, "http://localhost:9099")
  // connectFirestoreEmulator(db, "localhost", 8080)
}

export default app
