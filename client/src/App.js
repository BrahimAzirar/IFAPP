import React from 'react';
import StudentPage from './StudentsPage/StudentPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminPage/AdminLogin/AdminLogin';
import AdminPage from './AdminPage/AdminPage';

export default function App() {
  return (
    <Router basename='/'>
      <Routes>
        <Route exact path='/' element={<StudentPage />} />
        <Route exact path='/admin/auth/login' element={<AdminLogin />} />
        <Route exact path='/admin/dashboard/:username' element={<AdminPage />} />
      </Routes>
    </Router>
  );
};