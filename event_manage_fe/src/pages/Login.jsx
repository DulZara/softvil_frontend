// src/pages/Login.jsx
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

import { loginThunk } from '../features/auth/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    try {
      await dispatch(loginThunk({ email, password })).unwrap()
      navigate('/dashboard')
    } catch {
      setError('Login failed. Please check your credentials.')
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
          Sign In
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
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
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
              'Log In'
            )}
          </Button>
        </form>

        {/* ↙️ register link */}
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{' '}
          <MuiLink component={RouterLink} to="/register" underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  )
}
