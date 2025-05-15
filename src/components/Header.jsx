import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7, Explore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Header({ darkMode, setDarkMode }) {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/">
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
          <Explore sx={{ mr: 1 }} />
          GitHub Explorer
        </Typography>
        </Link>
        <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
