import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth()

  // ⏳ WAIT until auth + role are resolved
  if (loading) {
    return null // or a spinner later
  }

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/" replace />
  }

  // 🚫 Role mismatch
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />
  }

  // ✅ Access granted
  return children
}

export default ProtectedRoute
