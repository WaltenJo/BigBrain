import React from 'react';
import NavBar from '../components/NavBar.jsx';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { apiCall } from '../components/ApiCall.jsx';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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

  return (
    <>
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
    </>
  );
}

export default Dashboard;
