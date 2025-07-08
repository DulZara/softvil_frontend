// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react'
import { Box, Typography, Card, CardContent, Grid, CircularProgress, Alert } from '@mui/material'
import axiosClient from '../api/axiosClient' // Or 'client' if that's your file

export default function Dashboard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axiosClient.get('/event/all')
        setEvents(res.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load events')
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>
  )
  if (error) return (
    <Box maxWidth={600} mx="auto" mt={6}><Alert severity="error">{error}</Alert></Box>
  )

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3} fontWeight={700}>Upcoming Events</Typography>
      <Grid container spacing={2}>
        {events.length === 0 && (
          <Typography>No events found.</Typography>
        )}
        {events.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">{event.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Host:</strong> {event.hostId}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {event.startTime?.slice(0, 10)} to {event.endTime?.slice(0, 10)}
                </Typography>
                <Typography variant="body2">
                  <strong>Location:</strong> {event.location}
                </Typography>
                <Typography variant="body2">
                  <strong>Visibility:</strong> {event.visibility}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

