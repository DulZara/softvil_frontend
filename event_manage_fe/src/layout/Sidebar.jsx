// src/layout/Sidebar.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import DashboardIcon from '@mui/icons-material/Dashboard'
import EventIcon     from '@mui/icons-material/Event'
import PersonIcon    from '@mui/icons-material/Person'
import GroupIcon     from '@mui/icons-material/Group'

const drawerWidth = 240
const miniWidth   = 60

export default function Sidebar({ open }) {
  const navigate = useNavigate()
  const role     = useSelector(state => state.auth.role)   // e.g. "ADMIN" or "USER"

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : miniWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniWidth,
          boxSizing: 'border-box',
          transition: 'width .2s',
          overflowX: 'hidden',
        },
      }}
    >
      {/* pushes content below the AppBar */}
      <Toolbar />

      <Divider />

      <List>
        <ListItem button onClick={() => navigate('/')}>
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItem>

        <ListItem button onClick={() => navigate('/events/new')}>
          <ListItemIcon><EventIcon/></ListItemIcon>
          {open && <ListItemText primary="Create Event" />}
        </ListItem>

        <ListItem button onClick={() => navigate('/profile')}>
          <ListItemIcon><PersonIcon/></ListItemIcon>
          {open && <ListItemText primary="Profile" />}
        </ListItem>

        {role === 'ADMIN' && (
          <ListItem button onClick={() => navigate('/admin/users')}>
            <ListItemIcon><GroupIcon/></ListItemIcon>
            {open && <ListItemText primary="Users" />}
          </ListItem>
        )}
      </List>
    </Drawer>
  )
}
