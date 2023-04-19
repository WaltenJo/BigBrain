import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import apiCall from '../components/ApiCall';
import { Typography, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import '../global.css'

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

function AdminEditQuiz () {
  const navigate = useNavigate();
  const [quizData, setQuizData] = React.useState({});
  const path = window.location.pathname;
  const quizId = path.replace('/quiz/', '');

  const questionPage = (questionId) => {
    navigate('./' + questionId);
  }

  useEffect(() => {
    apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
      setQuizData(data);
    });
  }, []);

  apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
    const questionFeed = data.questions.map((question) => {
      const deleteQuestion = (questionId) => {
        for (const q of quizData.questions) {
          if (q.id === questionId) {
            quizData.questions.splice(quizData.questions.indexOf(q), 1);
          }
        }

        const payload = {
          questions: quizData.questions
        }

        apiCall('admin/quiz/' + quizId, 'PUT', payload, (data) => {
          console.log('deleted');
        });

        apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
          setQuizData(data);
        });
      }

      return (
      <Box key={question.id}
        sx={{
          border: '2px solid black',
          mt: '10px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Box sx={{ margin: '10px 10px' }}>
          <Typography class='clickable' onClick={() => questionPage(question.id)}>
              {question.question}
          </Typography>
        </ Box>
        <IconButton aria-label='Delete Question' onClick={() => deleteQuestion(question.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
      )
    })
    ReactDOM.render(questionFeed, document.getElementById('question-feed'));
  })

  const createNewQuestion = () => {
    navigate(path + '/' + Date.now());
  }

  const dashboardPage = () => {
    navigate('../dashboard');
  }
  return (
    <>
      <ThemeProvider theme={kahoodTheme}>
        <NavBar />

        {/* MAIN */}
        <Box>
          <Box sx={{ padding: '10px', backgroundColor: '#d7bfff', mb: '20px' }}>
            <Typography variant='h3'>{quizData.name}</Typography>
            <Button variant='contained' onClick={dashboardPage} sx={{ mr: '10px' }}>Home</Button>
            <Button variant='contained' onClick={createNewQuestion}>Create New Question</Button>
          </Box>
          <Typography variant='h4' sx={{ textDecoration: 'underline' }}>Questions</Typography>
          <Box id='question-feed'></Box>
        </Box>

      </ThemeProvider>
    </>
  )
}

export default AdminEditQuiz;
