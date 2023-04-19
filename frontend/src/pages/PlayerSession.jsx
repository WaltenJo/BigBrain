import React from 'react';
import NavBar from '../components/NavBar';
import { Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import apiCall from '../components/ApiCall';
import '../global.css'

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

function PlayerSession () {
  // const path = window.location.pathname;
  // const sessionId = path.replace('/adminSession/', '');

  return (
    <>
      <ThemeProvider theme={kahoodTheme}>
        <NavBar />

        {/* MAIN */}
        <Box
          sx={{
            backgroundColor: '#d7bfff',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '200px'
          }}>
          <Typography variant='h2' textAlign={'center'} sx={{ textDecoration: 'underline' }}>Player Session</Typography>
        </Box>

      </ThemeProvider>
    </>
  )
}

export default PlayerSession;
