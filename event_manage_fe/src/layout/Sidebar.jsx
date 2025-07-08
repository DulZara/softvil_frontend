// src/layout/Sidebar.jsx
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import EventIcon from '@mui/icons-material/Event';
  import PersonIcon from '@mui/icons-material/Person';
  import { useNavigate } from 'react-router-dom';
  
  const drawerWidth = 240;
  const miniWidth  = 60;
  
  export default function Sidebar({ open }) {
    const navigate = useNavigate();
  
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
        {/* this Toolbar ensures the drawer’s items start below the AppBar */}
        <Toolbar />
  
        <Divider />
  
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button onClick={() => navigate('/events/new')}>
            <ListItemIcon><EventIcon /></ListItemIcon>
            {open && <ListItemText primary="Create Event" />}
          </ListItem>
          <ListItem button onClick={() => navigate('/profile')}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            {open && <ListItemText primary="Profile" />}
          </ListItem>
        </List>
      </Drawer>
    );
  }
  