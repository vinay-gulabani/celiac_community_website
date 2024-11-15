import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig'; // Adjust this path to your Firebase config

function ProtectedRoute({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
