import { Link } from "react-router-dom"
import "./organizerDashboard.css"

function OrganizerDashboard() {
  return (
    <div className="organizer-dashboard-page">
      <div className="organizer-dashboard-container">
        {/* Header */}
        <h1 className="organizer-title">Organizer Dashboard</h1>
        <p className="organizer-subtitle">
          Manage your events and create new ones
        </p>

        {/* Action Cards */}
        <div className="organizer-actions">
          <div className="organizer-card">
            <h3>Create a New Event</h3>
            <p>
              Publish a new event for students to discover and register.
            </p>

            <Link to="/organizer/events/create">
              <button className="organizer-btn">
                Create Event
              </button>
            </Link>
          </div>

          {/* Placeholder for future */}
          <div className="organizer-card disabled">
            <h3>Manage Events</h3>
            <p>
              View registrations, edit or cancel events.
            </p>

            <button className="organizer-btn" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrganizerDashboard
