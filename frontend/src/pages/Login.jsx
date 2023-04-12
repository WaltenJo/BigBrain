import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { apiCall } from '../components/ApiCall';
import { useNavigate } from 'react-router-dom';

function Login () {
  const navigate = useNavigate();

  const Submit = () => {
    const loginEmail = document.getElementById('login-email').value;
    const loginPassword = document.getElementById('login-password').value;

    const payload = {
      email: loginEmail,
      password: loginPassword,
    }

    apiCall('admin/auth/login', 'POST', payload, (data) => {
      localStorage.setItem('token', data.token);
      navigate('/dashboard')
    });
  }

  return (
    <>
    <Box
      sx={{
        margin: 'auto',
        mt: '150px',
        border: '2px solid black',
        justifyContent: 'center',
        width: '450px',
        height: '500px',
        padding: '20px'
      }}>
      <Box
        sx={{
          margin: 'auto',
          mt: '80px',
          height: '250px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Typography align='center' variant='h3'>Sign In</Typography>
        <TextField fullWidth id='login-email' label='Email Address'></TextField>
        <TextField fullWidth id='login-password' label='Password'></TextField>
        <Button fullWidth id='login-button' onClick={Submit}variant='contained'>Login</Button>
      </Box>
    </Box>
    </>
  );
}

export default Login;
