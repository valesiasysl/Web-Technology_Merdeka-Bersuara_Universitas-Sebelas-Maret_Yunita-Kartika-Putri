import React from 'react';
import '../styles/PasalPintarSection.css';
import robotImage from '../assets/robot.png';
import smallRobotImage from '../assets/small-robot.png';

const PasalPintarSection = () => {
  return (
    <section className="pasal-pintar-section">
      <div className="decoration-circle circle-1"></div>
      <div className="decoration-circle circle-2"></div>
      
      <div className="content-wrapper">
        <div className="robot-container">
          <img 
            src={robotImage} 
            alt="Pasal Pintar Robot" 
            className="robot-image" 
            loading="lazy"
          />
        </div>
        
        <div className="text-container">
          <h2>Pasal Pintar</h2>
          <p>
            Kenali hak Anda dengan Pasal Pintar, chatbot cerdas yang siap membantu Anda memahami pasal-pasal hukum dengan mudah! Dapatkan penjelasan ringkas tentang setiap pasal, dan akses informasi hukum kapan saja, di mana saja.
          </p>
          <button className="coba-sekarang-btn">
            Coba Sekarang Gratis
          </button>
        </div>
        
        <div className="small-robot-container">
          <img 
            src={smallRobotImage} 
            alt="Small Robot Assistant" 
            className="small-robot-image" 
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PasalPintarSection;