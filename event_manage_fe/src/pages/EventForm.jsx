import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  LocalizationProvider,
  DateTimePicker,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import axiosClient from '../api/axiosClient'
import { eventSchema } from '../validations/eventSchema'

export default function EventForm() {
  const navigate = useNavigate()
  const userEmail = useSelector(state => state.auth.email)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: '',
      visibility: 'PUBLIC',
    },
  })

  const onSubmit = async data => {
    console.log('🛫 Submitting event:', data)
    try {
      await axiosClient.post('/event/add', {
        ...data,
        hostId: userEmail,
      })
      navigate('/') // back to dashboard
    } catch (err) {
      console.error('Event creation failed:', err)
      // you could set a local error state here if you want to show a message
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}
    >
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          Create New Event
        </Typography>

        {isSubmitSuccessful && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Event created successfully!
          </Alert>
        )}

        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="Start Time"
                value={field.value ? dayjs(field.value) : null}
                onChange={newVal =>
                  field.onChange(newVal ? newVal.toISOString() : null)
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!!errors.startTime}
                    helperText={errors.startTime?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                label="End Time"
                value={field.value ? dayjs(field.value) : null}
                onChange={newVal =>
                  field.onChange(newVal ? newVal.toISOString() : null)
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!!errors.endTime}
                    helperText={errors.endTime?.message}
                  />
                )}
              />
            )}
          />
        </LocalizationProvider>

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Location"
              fullWidth
              margin="normal"
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          )}
        />

        <Controller
          name="visibility"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Visibility"
              fullWidth
              margin="normal"
              error={!!errors.visibility}
              helperText={errors.visibility?.message}
            >
              <MenuItem value="PUBLIC">Public</MenuItem>
              <MenuItem value="PRIVATE">Private</MenuItem>
            </TextField>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Event'}
        </Button>
      </Paper>
    </Box>
  )
}
