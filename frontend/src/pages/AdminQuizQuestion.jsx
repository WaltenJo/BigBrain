import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import apiCall from '../components/ApiCall';
import { Typography, Grid, Box, TextField, Button, ButtonGroup, FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material';
// import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const kahoodTheme = createTheme({
  palette: {
    primary: {
      main: '#4502b8',
    }
  }
})

function AnswerBox ({ type, required, data }) {
  const [value, setValue] = React.useState('')
  const [selected, setSelected] = React.useState(false);

  let optional = '';
  if (required !== true) {
    optional = ' (optional)';
  } else {
    optional = ''
  }

  const color = { A: 'red', B: 'blue', C: '#ffbb1c', D: 'green', E: 'magenta', F: '#02b8b8' };

  React.useEffect(() => {
    if (Object.keys(data).length !== 0 && data.answers[type] !== undefined) {
      setValue(data.answers[type].answer);
      setSelected(data.answers[type].correct);
    }
  }, [data, type])

  return (
    <Box sx={{
      backgroundColor: color[type],
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      <Box align={'center'} sx={{ width: '40px' }}>
        <Typography variant='h4' sx={{ mt: '7px' }}>{type}</Typography>
      </Box>
      <TextField fullWidth id={type} label={'Add answer' + optional} value={value} onChange={(event) => setValue(event.target.value)}></TextField>
      <Checkbox id={type + '-selected'} checked={selected} onChange={() => setSelected(!selected)} />
    </Box>
  )
}

function AdminQuizQuestion () {
  const navigate = useNavigate();

  const [quizData, setQuizData] = React.useState({});
  const [questionData, setQuestionData] = React.useState({});

  const [time, setTime] = React.useState(30);
  const [points, setPoints] = React.useState('');
  const [question, setQuestion] = React.useState('');

  const path = window.location.pathname;
  const quizId = path.replace(/^\/quiz\/(\d+).*$/, '$1');
  const questionId = path.replace(/.*\/(\d+)$/, '$1')

  const saveQuestion = () => {
    const questionStruct = {
      id: questionId,
      question: document.getElementById('question').value,
      timeLimit: time,
      points: document.getElementById('points').value,
      url: null,
      answers: {},
    }

    const choices = ['A', 'B', 'C', 'D', 'E', 'F']
    for (const choice of choices) {
      if ((document.getElementById(choice).value) !== '') {
        const answer = document.getElementById(choice).value;
        const correct = document.getElementById(choice + '-selected').checked
        questionStruct.answers[choice] = { answer: answer, correct: correct };
      }
    }

    for (const question in quizData.questions) {
      if (quizData.questions[question].id === questionId) {
        const filteredQuizData = quizData.questions.filter(question => question.id !== questionId);
        quizData.questions = filteredQuizData;
      }
    }

    quizData.questions.push(questionStruct)

    const payload = {
      questions: quizData.questions
    }

    apiCall('admin/quiz/' + quizId, 'PUT', payload, (data) => {
      setQuizData(data);
    });

    navigate('..')
  }

  const addQuestion = () => {
    console.log(test);
  }

  const Exit = () => {
    navigate('..');
  }

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  useEffect(() => {
    apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
      setQuizData(data);
      for (const question in data.questions) {
        if (data.questions[question].id === questionId) {
          setQuestionData(data.questions[question]);
          setQuestion(data.questions[question].question);
          setPoints(data.questions[question].points);
          setTime(data.questions[question].timeLimit);
        }
      }
    });
  }, []);

  return (
    <>
      <ThemeProvider theme ={kahoodTheme}>
        <NavBar />
        <Typography variant='h3'
          sx={{
            position: 'absolute',
            top: 100,
            left: 30,
          }}>
            {quizData.name}</Typography>
        <Box>
          <ButtonGroup sx={{
            position: 'absolute',
            top: 128,
            right: 305,
          }}>
            <Button variant='outlined' onClick={saveQuestion}>Save</Button>
            <Button variant='outlined' onClick={addQuestion}>Add Question</Button>
            <Button variant='contained' onClick={Exit}>Exit</Button>
          </ButtonGroup>

          <Box sx={{
            position: 'absolute',
            top: 110,
            right: 10,
          }}>

            {/* Points Input */}
            <TextField id='points' label="Set Points" value={points} onChange={(event) => setPoints(event.target.value) }></TextField>

            {/* Time Limit Input */}
            <FormControl>
              <InputLabel>Time Limit</InputLabel>
              <Select value={time} onChange={handleTimeChange}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={120}>120</MenuItem>
              </Select>
            </FormControl>
          </Box>

        </Box>

        {/* Question Input */}
        <TextField fullWidth id='question' label='Add Question' value={question} onChange={(event) => setQuestion(event.target.value)} sx={{ mt: '95px' }}></TextField>

        {/* Multiple Answers/Choices Field */}
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: '10px' }}>
          <Grid item xs={6}>
            <AnswerBox type='A' required={true} data={questionData}/>
          </Grid>
          <Grid item xs={6}>
            <AnswerBox type='B' required={true} data={questionData}/>
          </Grid>
          <Grid item xs={6}>
            <AnswerBox type='C' required={false} data={questionData}/>
          </Grid>
          <Grid item xs={6}>
            <AnswerBox type='D' required={false} data={questionData}/>
          </Grid>
          <Grid item xs={6}>
            <AnswerBox type='E' required={false} data={questionData}/>
          </Grid>
          <Grid item xs={6}>
            <AnswerBox type='F' required={false} data={questionData}/>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}

export default AdminQuizQuestion;
