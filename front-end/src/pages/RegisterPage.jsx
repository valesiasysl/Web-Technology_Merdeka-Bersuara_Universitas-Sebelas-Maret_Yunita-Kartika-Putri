import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png'; // pastikan file ini ada
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/users', {
        username_user: username,
        email_user: email,
        password_user: password,
        status_akun_user: 'aktif',
      });
      setSuccessMessage('Registration successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="left-section">
          <img src={Logo} alt="Logo" className="left-icon" />
        </div>
        <div className="right-section">
          <h2>Register Now</h2>
          <p>Create your account to access all the exclusive features.</p>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form className="form-container" onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="username" className="input-label">Username</label>
            </div>
            <div className="input-group">
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="email" className="input-label">Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label htmlFor="password" className="input-label">Password</label>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : 'Register'}
            </button>
          </form>
          <div className="login-redirect">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
