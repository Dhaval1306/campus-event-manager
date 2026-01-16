import "./studentDashboard.css"

function StudentDashboard() {
  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <h1 className="student-title">Student Dashboard</h1>
        <p className="student-subtitle">
          Discover upcoming events and manage your registrations
        </p>

        <div className="student-sections">
          <div className="student-card">
            <h3>Upcoming Events</h3>
            <p>Browse all events happening across the campus.</p>
            <button className="student-btn" disabled>
              View Events (Coming Soon)
            </button>
          </div>

          <div className="student-card disabled">
            <h3>My Registrations</h3>
            <p>See events you have registered for.</p>
            <button className="student-btn" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
