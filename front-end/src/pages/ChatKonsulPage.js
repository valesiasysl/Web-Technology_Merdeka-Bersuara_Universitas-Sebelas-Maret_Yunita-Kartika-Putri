import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ChatKonsulPage.css';
import ottoImage from '../assets/otto.jpg';

const ChatKonsulPage = () => {
  const [messages, setMessages] = useState([
    { text: 'Halo, ada yang bisa saya bantu?', sender: 'advokat' },
    { text: 'Ya, saya ingin berkonsultasi tentang kasus saya...', sender: 'user' },
    { text: 'Tentu, silakan ceritakan lebih detail.', sender: 'advokat' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Add the new user message to the messages array
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage(''); // Clear the input field

      // Simulate a response from the advocate
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Terima kasih, saya akan membalas sesegera mungkin.', sender: 'advokat' },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chat-konsul-page">
      <Header />
      <div className="chat-container">
        <div className="profile-section">
          <div className="profile-card">
            <img src={ottoImage} alt="Otto Hasibuan" className="ottoImage" />
            <h3 className="profile-name">Otto Hasibuan, S.H., M.M.</h3>
            <p className="profile-description">
              Otto Hasibuan adalah advokat senior dan pendiri Hasibuan Law Firm, dengan lebih dari 25 tahun pengalaman di bidang hukum. Ia menyelesaikan pendidikan hukum di Universitas Indonesia dan memiliki keahlian dalam hukum pidana, perdata, dan keluarga.
            </p>
            <div className="contact-info">
              <p>Email: <a href="mailto:otto.hasibuan@example.com">otto.hasibuan@example.com</a></p>
              <p>Telepon: (021) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="chat-section">
          <div className="chat-header">
            <h3>Otto Hasibuan, S.H., M.M.</h3>
          </div>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'message-sent' : 'message-received'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan Anda..."
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="send-button">
              Kirim
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatKonsulPage;
