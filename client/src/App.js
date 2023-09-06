import React from 'react';
import StudentPage from './StudentsPage/StudentPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StudentPage />} />
      </Routes>
    </Router>
  );
};