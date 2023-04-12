import React from 'react';
import NavBar from '../components/NavBar';
import { apiCall } from '../components/ApiCall';
import { Typography, Grid, Box, TextField, Button, ButtonGroup } from '@mui/material';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
// import { apiCall } from '../components/ApiCall';

const path = window.location.pathname;
const quizId = path.replace('/quiz/', '');

apiCall('admin/quiz/' + quizId, 'GET', {}, (data) => {
  localStorage.setItem('temp', data);
});

const data = localStorage.getItem('temp');
console.log(data);

function AnswerBox ({ type, required }) {
  let optional = '';
  if (required !== true) {
    optional = ' (optional)';
  } else {
    optional = ''
  }

  return (
    <Box sx={{
      backgroundColor: 'red',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      <Box align={'center'} sx={{ width: '40px' }}>
        <Typography variant='h4' sx={{ mt: '7px' }}>{type}</Typography>
      </Box>
      <TextField fullWidth label={'Add answer' + optional}></TextField>
      <CheckCircleOutlineTwoToneIcon sx={{ mt: '15px' }}/>
    </Box>
  )
}

function AdminQuiz () {
  return (
    <>
      <NavBar />
      <Typography variant='h1'>QUIZ NAME</Typography>
      <ButtonGroup>
        <Button variant='outlined'>Save</Button>
        <Button variant='outlined'>Add Question</Button>
        <Button variant='contained'>Exit</Button>
      </ButtonGroup>
      <TextField fullWidth id='Question' label='Add Question'></TextField>
      <Grid container rowSpacing={2} columnSpacing={2}>
        <Grid item xs={6}>
          <AnswerBox type='A' required={true}/>
        </Grid>
        <Grid item xs={6}>
          <AnswerBox type='B' required={true}/>
        </Grid>
        <Grid item xs={6}>
          <AnswerBox type='C' required={false}/>
        </Grid>
        <Grid item xs={6}>
          <AnswerBox type='D' required={false}/>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminQuiz;
