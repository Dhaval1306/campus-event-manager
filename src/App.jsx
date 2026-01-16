import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateEvent from "./pages/organizer/CreateEvent"
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRole="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/events/create"
        element={
          <ProtectedRoute allowedRole="organizer">
            <CreateEvent />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
