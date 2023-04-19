import React from 'react';
import { Typography, Box, TextField, Button, AppBar, Toolbar, Link } from '@mui/material';
import apiCall from '../components/ApiCall';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

function Register () {
  const navigate = useNavigate();

  // Submits all data from the textfields into the backend
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

  // Navigates to Login Page
  const LoginPage = () => {
    navigate('/');
  }

  return (
    <>
      <ThemeProvider theme={kahoodTheme}>
        {/* Logged Out Navigation Bar */}
        <AppBar>
          <Toolbar>
            <Typography variant='h2' sx={{ flexGrow: '1' }}>
              <Link href='/' color="inherit" style={{ textDecoration: 'None' }}>
                Kahood!
              </Link>
            </Typography>
            <Button onClick={LoginPage} variant='contained'>Sign In</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ mb: '80px' }}></Box>

        {/* MAIN */}
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
          <Typography align='center' onClick={LoginPage}
            sx={{
              mt: '20px',
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'darkblue'
            }}>Already have an account?</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Register;
