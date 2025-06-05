import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/logo.png';
import './LoginPage.css';

// Create AuthContext for global auth state management
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const login = (email) => {
    localStorage.setItem('authToken', 'dummy_token');
    localStorage.setItem('userEmail', email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Using login from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send a POST request to your backend login endpoint
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      // Simulate successful login response (replace with actual response handling)
      if (response.status === 200) {
        const { token, userEmail } = response.data; // Assuming the API returns a token and user email

        // Store token and userEmail in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userEmail', userEmail);

        // Update the global auth state
        login(userEmail);

        // Navigate to the home page
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Backend returned an error (invalid credentials or other issues)
        setError('Invalid credentials. Please try again.');
      } else {
        // Other errors (e.g., network issues)
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-section">
          <img src={Logo} alt="Logo" className="left-icon" />
        </div>
        <div className="right-section">
          <h2>Login</h2>
          <form className="form-container" onSubmit={handleLogin}>
            {error && <p className="error-message">{error}</p>}
            <div className="input-group">
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label className="input-label">Email</label>
            </div>
            <div className="input-group">
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label className="input-label">Password</label>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? <div className="loading-spinner"></div> : 'Login'}
            </button>
          </form>

          {/* Additional: Register link */}
          <p className="register-link-text">
            Belum punya akun?{' '}
            <span className="register-link" onClick={() => navigate('/register')}>
              Daftar sekarang
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
