import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './RadarRakyat1.css';

import sampleImage from '../assets/petakasus.png';
import sampleImage2 from '../assets/petaadvokat.png';
import paperPlaneIcon from '../assets/iconjelajahi.png';
import modelImage from '../assets/bannerradar.png';

const Card = ({ title, description, navigateTo, imageSrc }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(navigateTo);
  };

  return (
    <div
      className="card-wrapper"
      tabIndex={0}
      role="button"
      onKeyPress={handleClick}
      onClick={handleClick}
    >
      <div className="card">
        <div className="card-left">
          <h3 className="card-title">{title}</h3>
          <div className="card-image-container">
            <img src={imageSrc} alt={title} className="card-image" />
          </div>
        </div>
        <div className="card-right">
          <p className="card-description">{description}</p>
          <button
            className="btn-explore"
            onClick={handleClick}
            aria-label={`Jelajahi Peta ${title}`}
          >
            <img src={paperPlaneIcon} alt="icon" className="btn-icon" />
            Jelajahi Peta
          </button>
        </div>
      </div>
      <span className="ornament ornament-red"></span>
      <span className="ornament ornament-orange"></span>
    </div>
  );
};

const RadarRakyat = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <section className="radar-rakyat">
        <div className="intro-left">
          <h1 className="title">Radar Rakyat</h1>
          <p className="description">
            Radar Rakyat adalah peta interaktif dari Merdeka Bersuara yang menyajikan
            data sebaran kasus Hak Asasi Manusia (HAM) serta pendampingan advokat di
            seluruh Indonesia. Dengan platform ini, masyarakat dapat memantau kasus secara
            transparan dan real-time, sekaligus menemukan advokat yang siap memperjuangkan
            hak-hak mereka.
          </p>
        </div>

        <div className="intro-right">
          <img src={modelImage} alt="Model" className="model-img" />
        </div>

        <div className="divider"></div>

        <div className="cards-container">
          <Card
            title="Peta Sebaran Kasus HAM"
            description="Pantau laporan lengkap berbagai kasus pelanggaran HAM di seluruh wilayah Indonesia untuk mendukung transparansi dan keadilan."
            navigateTo="/peta-kasus"
            imageSrc={sampleImage}
          />
          <Card
            title="Peta Sebaran Advokat"
            description="Temukan advokat terpercaya di daerah Anda yang siap membantu memperjuangkan hak-hak masyarakat secara profesional."
            navigateTo="/peta-advokat"
            imageSrc={sampleImage2}
          />
        </div>

        <div className="maps-section">
          <div
            className="map-box"
            onClick={() => navigate('/peta-kasus')}
            role="button"
            tabIndex={0}
            aria-label="Peta Sebaran Kasus HAM"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/peta-kasus')}
          >
            <h3>Peta Sebaran Kasus HAM</h3>
            <img src={sampleImage} alt="Peta Sebaran Kasus HAM" />
          </div>
          <div
            className="map-box"
            onClick={() => navigate('/peta-advokat')}
            role="button"
            tabIndex={0}
            aria-label="Peta Sebaran Advokat"
            onKeyPress={(e) => e.key === 'Enter' && navigate('/peta-advokat')}
          >
            <h3>Peta Sebaran Advokat</h3>
            <img src={sampleImage2} alt="Peta Sebaran Advokat" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RadarRakyat;
