import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logomerah.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To manage menu toggle on mobile
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(!!token);
    setUserEmail(email || '');
  };

  useEffect(() => {
    checkAuth(); // initial load
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    window.dispatchEvent(new Event('authChange')); // trigger update
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Merdeka Bersuara Logo" />
      </div>

      <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Beranda</NavLink>
        <NavLink to="/map" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Radar Rakyat</NavLink>
        <NavLink to="/laporin" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Lapor</NavLink>
        <NavLink to="/konsultasi" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Konsultasi</NavLink>
        <NavLink to="/chatbot" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Pasal Pintar</NavLink>
        <NavLink to="/pasalpintar" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Artikel</NavLink>
      </nav>

      <div className="profile-icon">
        {isLoggedIn ? (
          <>
            <span className="user-email">Hi, {userEmail}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </>
        ) : (
          <button className="fancy-login-btn" onClick={handleLogin}>
            <FontAwesomeIcon icon={faSignInAlt} className="login-icon" /> Login
          </button>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
};

export default Header;
