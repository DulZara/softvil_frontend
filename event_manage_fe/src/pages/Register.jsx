// src/pages/Register.jsx
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link as MuiLink
} from '@mui/material'

import { registerThunk } from '../features/auth/authSlice'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      await dispatch(registerThunk({ name, email, password })).unwrap()
      // on successful registration, send them to login
      navigate('/login')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f4f6fa"
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" fontWeight={700} align="center" gutterBottom>
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={auth.status === 'loading'}
          >
            {auth.status === 'loading' ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Already have an account?{' '}
          <MuiLink component={RouterLink} to="/login" underline="hover">
            Sign in
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  )
}
