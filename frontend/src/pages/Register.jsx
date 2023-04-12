import React from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { apiCall } from '../components/ApiCall';
import { useNavigate } from 'react-router-dom';

function Register () {
  const navigate = useNavigate();

  const Submit = () => {
    const registerEmail = document.getElementById('register-email').value;
    const registerName = document.getElementById('register-name').value;
    const registerPassword = document.getElementById('register-password').value;

    const payload = {
      email: registerEmail,
      password: registerPassword,
      name: registerName
    }

    apiCall('admin/auth/register', 'POST', payload, (data) => {
      localStorage.setItem('token', data.token);
      navigate('/dashboard')
    });
  }
  return (
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
          mt: '30px',
          height: '400px',
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Typography align='center' variant='h3'>Create a New Account</Typography>
        <TextField fullWidth id='register-email' label='Email Address'></TextField>
        <TextField fullWidth id='register-name' label='Full Name'></TextField>
        <TextField fullWidth id='register-password' label='Password'></TextField>
        <Button fullWidth id='register-button' onClick={Submit}variant='contained'>Register</Button>
      </Box>
    </Box>
  );
}

export default Register;
