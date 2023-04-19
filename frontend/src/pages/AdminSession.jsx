import React from 'react';
import NavBar from '../components/NavBar';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import apiCall from '../components/ApiCall';
import '../global.css'

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

function AdminSession () {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const sessionId = path.replace('/adminSession/', '');

  const dashboardPage = () => {
    navigate('../../dashboard')
  }

  const endGame = (quizId) => {
    apiCall('admin/quiz/' + quizId + '/end', 'POST', {}, (data) => {
      navigate('../../dashboard')
    })
  }

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
          <Typography variant='h2' textAlign={'center'} sx={{ textDecoration: 'underline' }}>Admin Session</Typography>
          <Button fullWidth variant="contained" onClick={dashboardPage}>Home</Button>
          <Button fullWidth variant="contained" onClick={dashboardPage}>Next Question</Button>
          <Button fullWidth variant="contained" onClick={() => endGame(sessionId)}>Stop Session</Button>
        </Box>

      </ThemeProvider>
    </>
  )
}

export default AdminSession;
