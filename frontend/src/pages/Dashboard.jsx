import React from 'react';
import NavBar from '../components/NavBar.jsx';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from '@mui/material';
import apiCall from '../components/ApiCall.jsx';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../global.css';

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

/*
const getQuizLength = (id) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    apiCall('admin/quiz/' + id, 'GET', {}, (data) => {
      setValue(data.questions.length);
    })
  }, [id])

  return value;
}
*/

function Dashboard () {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [gamePopup, setGamePopup] = React.useState(false);
  const [gameEndPopup, setGameEndPopup] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const openGamePopup = (id) => {
    setSessionId(id);
    setGamePopup(true);
  }

  const closeGamePopup = () => {
    setGamePopup(false);
  }

  const openGameEndPopup = () => {
    setGameEndPopup(true);
  }

  const closeGameEndPopup = () => {
    setGameEndPopup(false);
  }

  const createNewQuiz = () => {
    const quizName = document.getElementById('quiz-name').value;

    const payload = {
      name: quizName
    }

    apiCall('admin/quiz/new', 'POST', payload, (data) => {
      navigate('../quiz/' + data.quizId);
    });
    handleClose();
  }

  const quizPage = (quizId) => {
    navigate('../quiz/' + quizId);
  }

  const startGame = (quizId) => {
    apiCall('admin/quiz/' + quizId + '/start', 'POST', {}, (data) => {
      apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
        openGamePopup(data.active);
      })
    })
  }

  const endGame = (quizId) => {
    apiCall('admin/quiz/' + quizId + '/end', 'POST', {}, (data) => {
      openGameEndPopup();
    })
  }

  const loadPage = () => {
    apiCall('admin/quiz', 'GET', {}, (data) => {
      const quizFeed = data.quizzes.map((quiz) => {
        // console.log(getQuizLength(quiz.id));
        return (
          <Box key={quiz.id}
            sx={{
              border: '2px solid black',
              padding: '10px',
              mt: '10px',
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                ml: '15px'
              }}>
              <Typography class='clickable' variant='h1' onClick={() => quizPage(quiz.id)}>{quiz.name}</Typography>
              <IconButton aria-label='Delete Question' onClick={() => deleteQuiz(quiz.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <Button variant='contained' onClick={() => startGame(quiz.id)} sx={{ mr: '10px' }}>Start Game</Button>
            <Button variant='contained' onClick={() => endGame(quiz.id)}>End Game</Button>
          </Box>
        )
      })
      ReactDOM.render(quizFeed, document.getElementById('quiz-feed'));
    });
  }
  loadPage();

  const deleteQuiz = (quizId) => {
    apiCall('admin/quiz/' + quizId, 'DELETE', {}, (data) => {
      console.log(data);
      loadPage();
    })
  }

  return (
    <>
      {/* Main */}
      <ThemeProvider theme={kahoodTheme}>
        <NavBar />
        <Box>
          <Button onClick={handleOpen} variant='contained'>Create New Quiz</Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Create New Quiz
          </DialogTitle>
          <DialogContent>
            <TextField id='quiz-name' label='Quiz Name' sx={{
              width: '400px'
            }}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={createNewQuiz}>Create Quiz</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
        <Box id='quiz-feed'></Box>
      </ThemeProvider>

      {/* Dialog For Start Game Popup */}
      <Dialog open={gamePopup} onClose={closeGamePopup}>
        <DialogTitle>
          Session ID
        </DialogTitle>
        <DialogContent>
          <TextField value={sessionId}></TextField>
          <IconButton aria-label='Copy to Clipboard' sx={{ mt: '10px', ml: '10px' }} onClick={() => { navigator.clipboard.writeText(sessionId) }}>
            <ContentCopyIcon />
          </IconButton>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeGamePopup}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog For End Game Popup */}
      <Dialog open={gameEndPopup} onClose={closeGameEndPopup}>
        <DialogTitle>
          Game Stopped
        </DialogTitle>
        <DialogContent>
          <Typography>Would you like to view the results?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={closeGameEndPopup}>Yes</Button>
          <Button onClick={closeGameEndPopup}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dashboard;
