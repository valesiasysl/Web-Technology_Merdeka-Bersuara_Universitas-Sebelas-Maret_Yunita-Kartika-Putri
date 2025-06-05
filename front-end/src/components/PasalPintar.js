import React from 'react';
import './PasalPintar.css';

const PasalPintar = () => {
  return (
    <section className="pasal-pintar">
      <h2>Pasal Pintar</h2>
      <div className="content">
        <img src="path-to-smart-article-image" alt="Pasal Pintar" />
        <div className="text-content">
          <p>
            Kuasai hak Anda dengan Pasal Pintar, chatbot cerdas yang siap membantu Anda memahami pasal-pasal hukum...
          </p>
          <button>Coba Sekarang</button>
        </div>
      </div>
    </section>
  );
};

export default PasalPintar;
