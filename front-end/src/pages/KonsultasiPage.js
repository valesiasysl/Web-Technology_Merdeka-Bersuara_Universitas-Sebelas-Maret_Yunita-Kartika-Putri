import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './KonsultasiPage.css';

const KonsultasiPage = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // Define isLoading state

  const baseImageUrl = "http://127.0.0.1:8000/storage/";

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/advokat');
        if (response.data.success) {
          setAdvocates(response.data.data);  // Assuming the response contains 'data' array
        } else {
          setError('Failed to fetch advocates');
        }
      } catch (err) {
        setError('An error occurred while fetching advocates');
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchAdvocates();
  }, []);

  const handleViewDetails = (advocate) => {
    setSelectedAdvocate(advocate);
  };

  const handleChat = (advocate) => {
    setSelectedAdvocate(advocate);
    setChatModalOpen(true);
    setChatHistory([]);  // Reset chat history when opening a new chat
  };

  const closeChatModal = () => {
    setChatModalOpen(false);
    setChatMessage('');
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return; // Don't send empty messages

    const newMessage = {
      text: chatMessage,
      sender: 'User', // Or dynamically set this based on actual user data
      timestamp: new Date().toISOString(),
    };

    // Add the message to local chat history (optimistic UI update)
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    // Clear chat input field
    setChatMessage('');

    // Send the message to the server (optional, if you want to persist it)
    try {
      await axios.post('http://127.0.0.1:8000/api/chat', {
        advocate_id: selectedAdvocate.advokat_id,
        message: chatMessage,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Render each advocate dynamically based on fetched data
  const advocatesList = advocates.map((advocate) => (
    <div className="consultant-card" key={advocate.advokat_id}>
      <div className="consultant-image">
        <img
          src={advocate.foto_advokat ? `${baseImageUrl}${advocate.foto_advokat}` : '/default-avatar.jpg'}
          alt={advocate.nama_advokat}
          onError={(e) => (e.target.src = '/default-avatar.jpg')}
        />
        <div className="availability-badge">
          {advocate.ketersediaan === 'Tersedia' ? (
            <span className="available">Tersedia</span>
          ) : (
            <span className="unavailable">Sibuk</span>
          )}
        </div>
      </div>
      <div className="consultant-details">
        <h3>{advocate.nama_advokat}</h3>
        <p className="specialization">{advocate.spesialisasi}</p>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
          <span className="rating-text">5.0 (20 ulasan)</span>
        </div>
        <p className="bio">
          {advocate.bio_advokat.length > 100
            ? `${advocate.bio_advokat.substring(0, 100)}...`
            : advocate.bio_advokat}
        </p>
        <div className="consultant-actions">
          <button className="view-button" onClick={() => handleViewDetails(advocate)}>
            Lihat Detail
          </button>
          <button 
            className="chat-button" 
            onClick={() => handleChat(advocate)}
            disabled={advocate.ketersediaan !== 'Tersedia'}
          >
            {advocate.ketersediaan === 'Tersedia' ? 'Mulai Chat' : 'Tidak Tersedia'}
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="konsultasi-page">
      <Header />

      <section className="consultants-section">
        <div className="section-header">
          <h2>Daftar Advokat Kami</h2>
          <p>Pilih advokat profesional yang sesuai dengan kebutuhan hukum Anda</p>
        </div>

        {loading ? (
          <p>Loading consultants...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : advocates.length > 0 ? (
          <div className="consultants-grid">
            {advocatesList}
          </div>
        ) : (
          <p>No advocates available.</p>
        )}
      </section>

      {/* Modal for Advocate Details */}
      {selectedAdvocate && !chatModalOpen && (
        <div className="modal-overlay" onClick={() => setSelectedAdvocate(null)}>
          <div className="modal-content details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedAdvocate(null)}>
              &times;
            </button>
            <div className="modal-header">
              <img
                src={selectedAdvocate.foto_advokat ? `${baseImageUrl}${selectedAdvocate.foto_advokat}` : '/default-avatar.jpg'}
                alt={selectedAdvocate.nama_advokat}
                className="modal-image"
              />
              <div className="modal-title">
                <h3>{selectedAdvocate.nama_advokat}</h3>
                <p className="specialization">{selectedAdvocate.spesialisasi}</p>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                  <span className="rating-text">5.0 (20 ulasan)</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="info-section">
                <h4>Informasi Profil</h4>
                <div className="info-grid">
                  <div className="info-item">
                    <i className="fas fa-envelope"></i>
                    <span>{selectedAdvocate.email_advokat}</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-briefcase"></i>
                    <span>Pengalaman: {selectedAdvocate.pengalaman}</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-language"></i>
                    <span>Bahasa: {selectedAdvocate.bahasa}</span>
                  </div>
                  <div className="info-item">
                    <i className="fas fa-calendar-check"></i>
                    <span>Status: {selectedAdvocate.ketersediaan}</span>
                  </div>
                </div>
              </div>

              <div className="bio-section">
                <h4>Tentang Advokat</h4>
                <p>{selectedAdvocate.bio_advokat}</p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="chat-button" 
                onClick={() => {
                  setChatModalOpen(true);
                  setSelectedAdvocate(selectedAdvocate);
                }}
                disabled={selectedAdvocate.ketersediaan !== 'Tersedia'}
              >
                {selectedAdvocate.ketersediaan === 'Tersedia' ? 'Mulai Konsultasi' : 'Tidak Tersedia'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chatModalOpen && (
        <div className="modal-overlay" onClick={closeChatModal}>
          <div className="modal-content chat-modal" onClick={(e) => e.stopPropagation()}>
            <div className="chat-header">
              <div className="chat-partner">
                <img
                  src={selectedAdvocate.foto_advokat ? `${baseImageUrl}${selectedAdvocate.foto_advokat}` : '/default-avatar.jpg'}
                  alt={selectedAdvocate.nama_advokat}
                  className="chat-avatar"
                  onError={(e) => (e.target.src = '/default-avatar.jpg')}
                />
                <div>
                  <h3>{selectedAdvocate.nama_advokat.split(',')[0]}</h3>
                  <p className="status">{selectedAdvocate.ketersediaan === 'Tersedia' ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <button className="close-modal" onClick={closeChatModal}>
                &times;
              </button>
            </div>

            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender.toLowerCase()}`}>
                  <div className="message-content">
                    <p>{msg.text}</p>
                    <small>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <div className="input-wrapper">
                <textarea
                  className="chat-input"
                  placeholder="Ketik pesan Anda..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  rows="1"
                  disabled={isLoading}
                ></textarea>

                <button className="send-button" onClick={handleSendMessage} disabled={!chatMessage.trim() || isLoading}>
                  {isLoading ? <><i className="fas fa-spinner fa-spin"></i> Kirim</> : <><i className="fas fa-paper-plane"></i> Kirim</>}
                </button>
              </div>
              <small className="chat-notice">
                Respon biasanya diberikan dalam waktu 3 - 5 menit
              </small>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default KonsultasiPage;
