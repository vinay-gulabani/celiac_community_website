import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State to handle animation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true); // Trigger the animation
      setTimeout(() => navigate('/'), 3000); // Navigate after animation
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      {success ? (
        <div className="success-message"><h1 className='success'>LOGIN SUCCESSFUL</h1></div> // Success animation
      ) : (
        <div className="auth-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button">Login</button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="auth-footer">
            Don't have an account? <span className = "auth-btn" onClick={() => navigate('/signup')}>Sign Up</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
