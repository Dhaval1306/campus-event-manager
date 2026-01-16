import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"
import "./eventDetail.css"

function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const ref = doc(db, "events", id)
        const snap = await getDoc(ref)

        if (snap.exists()) {
          setEvent({ id: snap.id, ...snap.data() })
        }
      } catch (err) {
        console.error("Error fetching event:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (loading) {
    return <p className="event-status">Loading event...</p>
  }

  if (!event) {
    return <p className="event-status">Event not found</p>
  }

  return (
    <div className="event-detail-page">
      <div className="event-detail-card">
        <h1 className="event-title">{event.title}</h1>

        <p className="event-desc">{event.description}</p>

        <div className="event-info">
          <p>📅 {event.date}</p>
          <p>⏰ {event.time}</p>
          <p>📍 {event.venue}</p>
        </div>

        <div className="event-seats">
          Seats Filled: {event.registeredCount} / {event.capacity}
        </div>

        {/* Registration will be added in next task */}
        <button className="event-btn" disabled>
          Register (Coming Soon)
        </button>
      </div>
    </div>
  )
}

export default EventDetail
