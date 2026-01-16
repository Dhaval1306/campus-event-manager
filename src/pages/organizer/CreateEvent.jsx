import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import "./createEvent.css"

function CreateEvent() {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    capacity: ""
  })

  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user || loading) return

    const { title, description, date, time, venue, capacity } = formData

    try {
      setLoading(true)

      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        time,
        venue,
        capacity: Number(capacity),
        registeredCount: 0,
        organizerId: user.uid,
        createdAt: serverTimestamp()
      })

      alert("Event created successfully")

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        capacity: ""
      })
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-event-page">
      <div className="create-event-card">
        <h1 className="create-event-title">Create Event</h1>

        <form className="create-event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            required
          />

          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
