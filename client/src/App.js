import React from 'react';
import StudentPage from './StudentsPage/StudentPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminPage/AdminLogin/AdminLogin';
import AdminPage from './AdminPage/AdminPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<StudentPage />} />
        <Route path='/admin/auth/login' element={<AdminLogin />} />
        <Route path='/admin/dashboard/:username' element={<AdminPage />} />
      </Routes>
    </Router>
  );
};