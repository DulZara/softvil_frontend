// src/layout/Header.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ onToggleSidebar }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Event Ground
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
