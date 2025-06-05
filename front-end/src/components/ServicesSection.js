import React from 'react';
import '../styles/ServicesSection.css';
import advokat from '../assets/aadvokat.png';
import konsultasiIcon from '../assets/2.png';
import solusiIcon from '../assets/3.png';
import laporIcon from '../assets/alapor.png';
import radarrakyaticon from '../assets/iconradarrakyat.png';
import pasalpintaricon from '../assets/iconpasalpintar.png';
import pilihadvokat from '../assets/1.png';
import artikelicon from '../assets/iconartikel.png';

const ServicesSection = () => {
  return (
    <section className="services-section">
      {/* Top Banner with Key Features */}
      
      

      {/* Layanan Kami Section */}
      <div className="layanan-kami">
        <h2>Layanan Kami</h2>
        <div className="layanan-cards">
          <div className="layanan-card">
            <img src={laporIcon} alt="Lapor Kasus" loading="lazy" />
            <p>Lapor Kasus</p>
            <p className="card-description">Laporkan masalah hukum Anda dengan mudah</p>
          </div>
          <div className="layanan-card">
            <img src={radarrakyaticon} alt="Radar Rakyat" loading="lazy" />
            <p>Radar Rakyat</p>
            <p className="card-description">Pantau perkembangan kasus secara real-time</p>
          </div>
          <div className="layanan-card">
            <img src={advokat} alt="Konsultasi" loading="lazy" />
            <p>Konsultasi</p>
            <p className="card-description">Konsultasi langsung dengan ahli hukum</p>
          </div>
          <div className="layanan-card">
            <img src={pasalpintaricon} alt="Pasal Pintar" loading="lazy" />
            <p>Pasal Pintar</p>
            <p className="card-description">Pahami pasal hukum dengan penjelasan sederhana</p>
          </div>
          <div className="layanan-card">
            <img src={artikelicon} alt="Artikel" loading="lazy" />
            <p>Artikel</p>
            <p className="card-description">Update informasi hukum terkini</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;