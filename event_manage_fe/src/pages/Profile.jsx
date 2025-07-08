import { useEffect, useState } from 'react'
import client from '../api/axiosClient'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.get('/user/me')
      .then(res => setUser(res.data))
      .catch(err => setError(err.response?.data?.message))
  }, [])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!user) return <p>Loading…</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  )
}