import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './Auth.css';

function SignUp() {
  const [name, setName] = useState(''); // State for the user's name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // State for signup success animation
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's displayName in Firebase Authentication
      await updateProfile(user, { displayName: name });

      // Optional: Store user details in Firestore
      const userDoc = {
        uid: user.uid,
        name,
        email,
      };
      await setDoc(doc(db, 'users', user.uid), userDoc);

      setSuccess(true); // Trigger success animation
      setTimeout(() => navigate('/'), 3000); // Navigate after 3 seconds
    } catch (err) {
      setError(err.message); // Handle errors
    }
  };

  return (
    <div className="auth-container">
      {success ? (
        <div className="success-message"><h1 className='success'>SIGNUP SUCCESSFUL</h1></div> // Success animation
      ) : (
        <div className="auth-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          {error && <p className="error-text">{error}</p>}
          <p className="auth-footer">
            Already have an account?{' '}
            <span className ="auth-btn" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SignUp;
