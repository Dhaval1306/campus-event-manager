import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null)
        setRole(null)
        setLoading(false)
        return
      }

      setUser(firebaseUser)

      // Fetch role from Firestore
      const userRef = doc(db, "users", firebaseUser.uid)
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        setRole(userSnap.data().role)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
console.log("AUTH:", user?.email, role, loading)
  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
    

  )
}

export const useAuth = () => useContext(AuthContext)
