// src/pages/EventDetail.jsx
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import client from '../api/axiosClient'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.get(`/event/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load'))
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!event) return <p>Loading…</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>
        <strong>When:</strong>{' '}
        {new Date(event.startTime).toLocaleString()} –{' '}
        {new Date(event.endTime).toLocaleString()}
      </p>
      <p><strong>Where:</strong> {event.location}</p>
    </div>
  )
}
