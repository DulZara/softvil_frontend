import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import client from '../api/axiosClient'

export default function EventForm() {
  const { id } = useParams()
  const isEditing = Boolean(id)
  const [form, setForm] = useState({
    title: '', description: '', hostId: '', startTime: '', endTime: '', location: '', visibility: 'PUBLIC'
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isEditing) {
      client.get(`/event/${id}`)
        .then(res => {
          const e = res.data
          setForm({
            title: e.title,
            description: e.description,
            hostId: e.hostId,
            startTime: e.startTime,
            endTime: e.endTime,
            location: e.location,
            visibility: e.visibility
          })
        })
        .catch(err => setError(err.response?.data?.message))
    }
  }, [id, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await client.put(`/event/${id}`, form)
      } else {
        await client.post('/event/add', form)
      }
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600 }}>
      <h1>{isEditing ? 'Edit Event' : 'New Event'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['title','description','hostId','startTime','endTime','location'].map(field => (
          <div key={field} style={{ margin: '1em 0' }}>
            <label style={{ textTransform: 'capitalize' }}>{field}</label><br/>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
        ))}
        <div style={{ margin: '1em 0' }}>
          <label>visibility</label><br/>
          <select name="visibility" value={form.visibility} onChange={handleChange}>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  )
}