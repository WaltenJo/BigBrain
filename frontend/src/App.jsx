import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminEditQuiz from './pages/AdminEditQuiz.jsx';
import AdminQuizQuestion from './pages/AdminQuizQuestion.jsx';
import AdminSession from './pages/AdminSession.jsx';
import PlayerSession from './pages/PlayerSession.jsx';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:id">
          <Route path="" element={<AdminEditQuiz />} />
          <Route path=":questionId" element={<AdminQuizQuestion />} />
        </Route>
        <Route path="/adminSession/:sessionId" element={<AdminSession />} />
        <Route path="/playerSession/:sessionId" element={<PlayerSession />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
