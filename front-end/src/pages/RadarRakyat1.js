import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './RadarRakyat1.css';

import modelImage from '../assets/bannerradar.png';

// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faGavel, faSearch, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons';

const RadarRakyat = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: faSearch,
      title: "Pelacakan Kasus",
      description: "Pantau perkembangan kasus HAM secara real-time di seluruh Indonesia"
    },
    {
      icon: faUsers,
      title: "Jaringan Advokat",
      description: "Temukan advokat yang siap membantu berdasarkan lokasi dan keahlian"
    },
    {
      icon: faChartLine,
      title: "Analisis Data",
      description: "Visualisasi data kasus HAM untuk pemahaman yang lebih mendalam"
    }
  ];

  return (
    <>
      <Header />
      <main className="radar-container">
        {/* Main Title Section */}
        <section className="title-section">
          <h1>Radar Rakyat</h1>
          <p className="section-description">
            Platform pemantauan kasus HAM dan jaringan advokat terintegrasi di Indonesia
          </p>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="about-content">
            <div className="about-text">
              <p>
                Radar Rakyat adalah inisiatif Merdeka Bersuara yang menghadirkan peta interaktif 
                untuk memantau sebaran kasus Hak Asasi Manusia (HAM) serta jaringan advokat 
                di seluruh Indonesia. Platform ini dirancang untuk meningkatkan transparansi 
                dan akses masyarakat terhadap informasi hukum.
              </p>
              <p>
                Dengan teknologi terkini, kami menyajikan data yang akurat dan terupdate 
                untuk mendorong akuntabilitas serta mempermudah pencarian bantuan hukum.
              </p>
            </div>
            <div className="about-image">
              <img src={modelImage} alt="Ilustrasi Radar Rakyat" />
            </div>
          </div>
        </section>

        {/* Features Section (without heading) */}
        <section className="features-section">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} size="3x" />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Maps Access Section */}
        <section className="maps-section">
          <h2>Akses Peta Interaktif</h2>
          <p className="section-description">
            Jelajahi data kasus dan advokat melalui peta digital kami
          </p>
          
          <div className="map-options">
            <div 
              className="map-option"
              onClick={() => navigate('/peta-kasus')}
              aria-label="Peta Sebaran Kasus HAM"
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />
              </div>
              <h3>Peta Kasus HAM</h3>
              <p>Telusuri distribusi kasus HAM di seluruh Indonesia</p>
              <button className="option-button">Buka Peta</button>
            </div>
            
            <div 
              className="map-option"
              onClick={() => navigate('/peta-advokat')}
              aria-label="Peta Sebaran Advokat"
            >
              <div className="option-icon">
                <FontAwesomeIcon icon={faGavel} size="3x" />
              </div>
              <h3>Peta Advokat</h3>
              <p>Temukan advokat berdasarkan lokasi dan spesialisasi</p>
              <button className="option-button">Buka Peta</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RadarRakyat;