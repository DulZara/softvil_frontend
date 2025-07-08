// src/components/ProtectedApp.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import EventDetail from '../pages/EventDetail'
import EventForm from '../pages/EventForm'
import Profile from '../pages/Profile'

export default function ProtectedApp() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="events/:id" element={<EventDetail />} />
      <Route path="events/new" element={<EventForm />} />
      <Route path="events/:id/edit" element={<EventForm />} />
      <Route path="profile" element={<Profile />} />
      {/* any other private routes… */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
