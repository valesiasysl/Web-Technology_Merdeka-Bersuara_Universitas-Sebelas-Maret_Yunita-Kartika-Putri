import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import advokat1 from '../assets/advokat1.jpg';
import advokat2 from '../assets/advokat2.jpg';
import advokat3 from '../assets/advokat3.jpg';
import advokat4 from '../assets/advokat4.jpg';
import './Consultation.css';

const Consultation = () => {
  const navigate = useNavigate();
  const [advocates] = useState([
    {
      advokat_id: 1,
      email_advokat: "rina_suwandhi1@gmail.com",
      nama_advokat: "Rina Suwandhi, S.H., M.Kn.",
      spesialisasi: "Hukum Pidana",
      ketersediaan: "Tersedia",
      bio_advokat: "Rina Suwandhi, S.H., M.Kn., adalah seorang advokat yang memiliki spesialisasi dalam bidang Hukum Keluarga, dengan fokus pada penyelesaian sengketa perceraian, hak asuh anak, dan pembagian harta warisan.",
      foto_advokat: advokat1,
    },
    {
      advokat_id: 2,
      email_advokat: "johan_wirawan@gmail.com",
      nama_advokat: "Johan Wirawan, S.H., M.H.",
      spesialisasi: "Hukum Perdata",
      ketersediaan: "Tersedia",
      bio_advokat: "Johan Wirawan, S.H., M.H., adalah seorang advokat berpengalaman dalam bidang Hukum Perdata, dengan spesialisasi di bidang kontrak, sengketa properti, dan penyelesaian sengketa bisnis.",
      foto_advokat: advokat2,
    },
    {
      advokat_id: 3,
      email_advokat: "agustina_akbar@gmail.com",
      nama_advokat: "Agustina Akbar, S.H.",
      spesialisasi: "Hukum Keluarga",
      ketersediaan: "Sedang tidak tersedia",
      bio_advokat: "Agustina Akbar, S.H., mengkhususkan diri dalam kasus-kasus Hukum Keluarga seperti perceraian, pembagian harta, dan masalah hak asuh anak.",
      foto_advokat: advokat3,
    },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleConsultationClick = (advocate) => {
    navigate('/chat', { 
      state: { selectedAdvocate: advocate } 
    });
  };

  return (
    <div className="consultation-container">
      <header className="consultation-header">
        <div className="header-content">
          <h1>Konsultasi Hukum Profesional</h1>
          <p className="header-subtitle">Temukan solusi hukum terbaik bersama advokat berpengalaman kami</p>
          <div className="header-cta">
            <button className="primary-button">Mulai Konsultasi</button>
            <button className="secondary-button">Pelajari Lebih Lanjut</button>
          </div>
        </div>
      </header>

      <section className="consultants-section">
        <div className="section-header">
          <h2>Tim Advokat Kami</h2>
          <p>Berpengalaman dan berdedikasi untuk memberikan solusi hukum terbaik</p>
        </div>

        <div className="consultants-grid">
          {advocates.map((advocate) => (
            <div 
              key={advocate.advokat_id} 
              className={`consultant-card ${expandedCard === advocate.advokat_id ? 'expanded' : ''}`}
            >
              <div className="consultant-image">
                <img src={advocate.foto_advokat} alt={advocate.nama_advokat} />
                <span className={`availability-badge ${advocate.ketersediaan.includes('tidak') ? 'unavailable' : 'available'}`}>
                  {advocate.ketersediaan}
                </span>
              </div>
              <div className="consultant-details">
                <h3>{advocate.nama_advokat}</h3>
                <p className="specialization">{advocate.spesialisasi}</p>
                <p className="consultant-bio">
                  {expandedCard === advocate.advokat_id 
                    ? advocate.bio_advokat 
                    : `${advocate.bio_advokat.substring(0, 100)}...`}
                </p>
                <button 
                  className="read-more" 
                  onClick={() => toggleExpand(advocate.advokat_id)}
                >
                  {expandedCard === advocate.advokat_id ? 'Tampilkan Lebih Sedikit' : 'Baca Selengkapnya'}
                </button>
                <div className="consultant-actions">
                  <button
                    onClick={() => handleConsultationClick(advocate)}
                    className="email-button"
                    disabled={advocate.ketersediaan.includes('tidak')}
                  >
                    
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Consultation;