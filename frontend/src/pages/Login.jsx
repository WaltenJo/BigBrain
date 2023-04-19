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

function Login () {
  const navigate = useNavigate();

  // Submits data from the textfields to the backend
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

  // Navigate to Register Page
  const RegisterPage = () => {
    navigate('/register');
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
            <Button onClick={RegisterPage} variant='contained'>Sign Up</Button>
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
          <Typography align='center' onClick={RegisterPage}
            sx={{
              mt: '110px',
              textDecoration: 'underline',
              cursor: 'pointer',
              color: 'darkblue'
            }}>Create a new account?</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Login;
