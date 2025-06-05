import React from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.png'; // Make sure the path to your logo image is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <img src={logo} alt="Merdeka Bersuara Logo" className="footer-logo" />
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Ikuti Kami</h4>
            <p>@merdekabersuara.id</p>
            <p>@merdekabersuara.id</p>
          </div>
          <div className="footer-column">
            <h4>Layanan Kami</h4>
            <p>Lapor</p>
            <p>Konsultasi</p>
            <p>Pasal Pintar</p>
          </div>
          <div className="footer-column">
            <h4>Bantuan</h4>
            <p>FAQ</p>
            <p>Help Center</p>
          </div>
          <div className="footer-column">
            <h4>Info Kontak</h4>
            <p>021218317193</p>
            <p>merdekabersuara@yahoo.id</p>
            <p>Surakarta, Indonesia</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Merdeka Bersuara, All Rights Reserved, 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
