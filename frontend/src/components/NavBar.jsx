import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import apiCall from './ApiCall';

function NavBar () {
  const navigate = useNavigate();

  const Logout = () => {
    apiCall('admin/auth/logout', 'POST', {}, (data) => {
      localStorage.setItem('token', null);
      navigate('/');
    });
  }

  return (
    <>
    <AppBar>
      <Toolbar>
        <Typography variant='h2' sx={{ flexGrow: '1' }}>
          <Link href='/' color="inherit" style={{ textDecoration: 'None' }}>
            Kahood!
          </Link>
        </Typography>
        <Button onClick={Logout} variant='contained'>Log Out</Button>
      </Toolbar>
    </AppBar>
    <Box sx={{ mb: '80px' }}></Box>
    </>
  )
}

export default NavBar;
