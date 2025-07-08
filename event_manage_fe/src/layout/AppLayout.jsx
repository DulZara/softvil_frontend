// src/layout/AppLayout.jsx
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Tooltip,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import Sidebar from './Sidebar'
import { logout } from '../features/auth/authSlice'

export default function AppLayout() {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: t => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(o => !o)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Event Ground
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Option A: text + icon */}
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Option B: icon-only with tooltip */}
          {/*
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
          */}
        </Toolbar>
      </AppBar>

      <Sidebar open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* pushes content below AppBar */}
        <Outlet />
      </Box>
    </Box>
  )
}
