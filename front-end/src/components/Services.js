import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section className="services">
      <h2>Layanan Kami</h2>
      <div className="service-cards">
        <div className="card">
          <img src="path-to-lapor-icon" alt="Lapor Yuk" />
          <p>Lapor Yuk</p>
        </div>
        <div className="card">
          <img src="path-to-konsultasi-icon" alt="Konsultasi" />
          <p>Konsultasi</p>
        </div>
        <div className="card">
          <img src="path-to-edukasi-icon" alt="Edukasi" />
          <p>Edukasi</p>
        </div>
        <div className="card">
          <img src="path-to-forum-icon" alt="Forum Diskusi" />
          <p>Forum Diskusi</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
