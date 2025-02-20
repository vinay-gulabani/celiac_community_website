import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, googleProvider } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './Auth.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle Regular Email/Password Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
      });

      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user details in Firestore (if new user)
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }, { merge: true });

      navigate('/');
    } catch (error) {
      setError('Google Sign-In failed. Try again.');
    }
  };

  return (
    <div className="auth-container">
      {success ? (
        <div className="success-message">
          <h1 className='success'>SIGNUP SUCCESSFUL</h1>
        </div>
      ) : (
        <div className="auth-card">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <input
              className='name'
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

            {/* Password Field with Toggle Visibility */}
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁‍🗨" : "👁‍🗨"} {/* Toggle Icon */}
              </span>
            </div>

            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>

          {/* Google Sign-In Button */}
          <button className="google-button" onClick={handleGoogleSignIn}>
            <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Google logo" className="google-logo" />
            Sign Up with Google
          </button>

          {error && <p className="error-text">{error}</p>}

          <p className="auth-footer">
            Already have an account?{' '}
            <span className="auth-btn" onClick={() => navigate('/login')}>Login</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default SignUp;

