import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import heroImage from '../assets/bannerdepan.png';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleLaporClick = () => {
    navigate('/laporin');
  };

  const handleVideoClick = () => {
    // Add your video modal or navigation logic here
    console.log('Video play clicked');
  };

  return (
    <section className="hero" aria-label="Hero Section">
      <div className="hero-container">
        <div className="hero-left">
          <h1 className="hero-title">
            <span className="highlight-orange">Merdeka</span>{' '}
            <span className="highlight-purple">Bersuara</span>
          </h1>
          <p className="hero-subtitle">
            Platform untuk melaporkan pelanggaran HAM, mengakses informasi, dan berkonsultasi langsung dengan advokat.
            Kami hadir untuk mendengar dan mendampingi setiap suara yang ingin didengar.
          </p>
          <div className="cta-buttons">
            <button
              className="btn-primary"
              type="button"
              onClick={handleLaporClick}
              aria-label="Laporkan Sekarang"
            >
              Laporkan Sekarang
            </button>
            <button 
              className="btn-secondary"
              onClick={handleVideoClick}
              aria-label="Lihat cara kerjanya"
            >
              <span className="play-icon">▶</span>
              <span>Lihat cara kerjanya</span>
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={heroImage}
            alt="Ilustrasi Advokasi Hak Asasi Manusia"
            className="hero-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;