import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignInForm.css';
import image from '../assets/image.jpg'; // Pastikan path gambar benar

const SignInForm = () => {
  // State untuk menangani form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State untuk pesan error
  const [loading, setLoading] = useState(false); // State untuk loading
  const navigate = useNavigate(); // Hook navigasi

  // Fungsi untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload
    setError(null); // Reset error

    // Validasi input sederhana
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true); // Set loading state

    try {
      // Kirim request login ke API
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      // Ambil token dari response dan simpan ke localStorage
      const { access_token } = response.data; // Pastikan nama token sesuai dengan respons dari backend
      if (access_token) {
        localStorage.setItem('authToken', access_token); // Simpan token ke localStorage

        // Tambahkan log untuk debug
        console.log('Token saved to localStorage:', access_token);

        // Arahkan user ke halaman dashboard
        navigate('/beranda');
      } else {
        throw new Error('No token returned from server.');
      }
    } catch (err) {
      // Tangkap error dari API dan tampilkan pesan
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Pesan error dari backend
      } else {
        setError('Login failed. Please try again later.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="sign-in-container">
      <div className="form-image">
        <img src={image} alt="Sign In Illustration" />
      </div>

      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Tampilkan pesan error jika ada */}
          {error && <div className="error-message">{error}</div>}

          {/* Tampilkan button dengan indikator loading */}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;