import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import "./home.css"

function Home() {
    const { user, role } = useAuth()

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchEvents() {
            try {
                const q = query(
                    collection(db, "events"),
                    orderBy("createdAt", "desc")
                )
                const snap = await getDocs(q)
                const list = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setEvents(list)
            } catch (err) {
                console.error("Error fetching events:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className="home-page">
            {/* ===== TOP BAR ===== */}
            <div className="home-topbar">
                <h1 className="brand">CampusConnect</h1>

                <div className="profile-chip">
                    <div className="avatar">
                        {user?.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="name">{user?.displayName}</div>
                        <div className="role">{role}</div>
                    </div>
                </div>
            </div>

            {/* ===== ACTION BAR ===== */}
            {role === "organizer" && (
                <div className="home-actions">
                    <Link to="/organizer/events/create">
                        <button className="primary-btn">Create Event</button>
                    </Link>
                </div>
            )}

            {/* ===== EVENTS SECTION ===== */}
            <h2 className="section-title">Upcoming Events</h2>

            {loading && <p className="status-text">Loading events...</p>}

            {!loading && events.length === 0 && (
                <p className="status-text">No events available yet.</p>
            )}

            <div className="events-grid">
                {events.map(event => (

                    <div className="event-card" key={event.id}>
                        <Link to={`/event/${event.id}`} className="event-title-link">
                            <h3>{event.title}</h3>
                        </Link>


                        <p className="event-meta">
                            📅 {event.date} &nbsp; ⏰ {event.time}
                        </p>

                        <p className="event-meta">📍 {event.venue}</p>

                        <p className="event-seats">
                            Seats: {event.registeredCount} / {event.capacity}
                        </p>

                        {role === "student" && (
                            <button className="secondary-btn" disabled>
                                Register (Coming Soon)
                            </button>
                        )}
                    </div>
                  
                ))}
        </div>
        </div >
    )
}

export default Home
