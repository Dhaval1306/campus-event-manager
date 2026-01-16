import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase"
import "./registerstyle.css"

function Login() {
  const navigate = useNavigate()

  // 🔐 TEMP: Gmail organizer whitelist (REMOVE before production)
  const ORGANIZER_EMAILS = [
    "dhavaltolani07@gmail.com" // ← replace with your Gmail
  ]

  // 🔍 Detect role based on email
  const detectRole = (email) => {
    const studentRegex = /^[0-9]+@dau\.ac\.in$/
    const organizerRegex = /^[a-zA-Z_]+_(club|committee)@dau\.ac\.in$/

    if (organizerRegex.test(email)) return "organizer"
    if (studentRegex.test(email)) return "student"
    if (ORGANIZER_EMAILS.includes(email)) return "organizer" // ✅ Gmail override

    return "invalid"
  }

  // 🔐 Google Login Handler
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const user = result.user
      const { uid, email, displayName } = user

      const role = detectRole(email)

      if (role === "invalid") {
        alert("Only authorized email IDs are allowed")
        return
      }

      const userRef = doc(db, "users", uid)
      const userSnap = await getDoc(userRef)

      // 🆕 Create user document only once
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: uid,
          email: email,
          role: role,
          name: displayName,
          createdAt: serverTimestamp()
        })
      }

      // 🚀 Redirect by role
      navigate(role === "organizer" ? "/organizer" : "/student")
      console.log("EMAIL:", email)
      console.log("DETECTED ROLE:", role)


    } catch (error) {
      console.error("Google Login Error:", error)
      alert("Login failed. Please try again.")
    }
  }

  return (
    <div className="auth-page">
      {/* BRAND */}
      <div className="page-brand">
        <div className="logo">🎓</div>
        <h1>CampusConnect</h1>
        <p>College Event Management System</p>
      </div>

      {/* AUTH CARD */}
      <div className="registration-form auth-card">
        <div className="outer">
          <h2 className="welcome">Sign in to continue</h2>

          <p className="subtitle">
            Use your official college Google account
          </p>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="privacy">
            By continuing, you agree to our <span>Privacy Policy</span>
          </p>

          <p className="security-text">
            🔒 Secure access
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
