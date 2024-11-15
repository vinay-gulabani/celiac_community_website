import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage'; // Your main landing page
import Login from './components/Login'; // Login page
import SignUp from './components/SignUp'; // Signup page
import Dashboard from './components/Dashboard'; // Dashboard (protected)
import ProtectedRoute from './components/ProtectedRoute'; // Wrapper for protected pages

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
