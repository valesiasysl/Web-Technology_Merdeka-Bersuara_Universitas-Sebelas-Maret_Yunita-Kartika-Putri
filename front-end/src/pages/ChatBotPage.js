import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../components/Header';


const ChatBotPage = () => {
  const [chatBotData, setChatBotData] = useState([]);
  const [messages, setMessages] = useState([
    {
      text: 'Selamat datang di Pasal Pintar, asisten virtual untuk Hak Asasi Manusia. Silakan ajukan pertanyaan Anda.',
      sender: 'bot',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    async function loadChatBotData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/chatbots');
        if (response.data?.data && Array.isArray(response.data.data)) {
          setChatBotData(response.data.data);
        }
      } catch (error) {
        console.error('Gagal memuat data chatbot:', error);
      } finally {
        setLoading(false);
      }
    }
    loadChatBotData();
  }, []);

  const findResponse = (input) => {
    if (loading) return 'Sedang memuat data, mohon tunggu sebentar...';

    const normalizedInput = input.toLowerCase().trim();

    for (const item of chatBotData) {
      const keyword = item.keyword.toLowerCase().trim();
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(normalizedInput)) {
        return item.response;
      }
    }

    return (
      'Maaf, saya tidak dapat memahami pertanyaan Anda saat ini.\n' +
      'Silakan gunakan topik yang tersedia pada panel sebelah kanan sebagai panduan.'
    );
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [...prev, { text: newMessage, sender: 'user' }]);
    const userInput = newMessage;
    setNewMessage('');

    setTimeout(() => {
      const botResponse = findResponse(userInput);
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 700);
  };

  const popularTopics = [
    'Selamat datang',
    'Melaporkan Pelanggaran HAM',
    'Jenis Hak Asasi Manusia',
    'Peran Komnas HAM',
    'Perlindungan Anak',
    'Hukuman Pelanggaran HAM Berat',
    'Diskriminasi',
  ];

  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: 1200,
          margin: '2rem auto',
          display: 'flex',
          gap: 32,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          padding: '0 1rem',
          minHeight: 'calc(100vh - 180px)',
        }}
        aria-label="Halaman Chatbot Pasal Pintar"
      >
        {/* Area Chat */}
        <section
          style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            height: '680px',
            minHeight: 0,               // PENTING untuk flex shrink & scroll
          }}
          aria-live="polite"
          aria-relevant="additions"
          aria-atomic="true"
        >
          <header
            style={{
              backgroundColor: '#8B0000',
              color: '#fff',
              padding: '1.5rem 2rem',
              fontSize: '1.75rem',
              fontWeight: '700',
              letterSpacing: '0.04em',
              userSelect: 'none',
            }}
          >
            Pasal Pintar — Asisten Virtual HAM
          </header>
          <div
            style={{
              height: '100%',           // Ubah dari flex:1 ke height 100%
              padding: '1.5rem 2rem',
              overflowY: 'auto',
              backgroundColor: '#FAFAFA',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {messages.map((msg, idx) => (
              <article
                key={idx}
                style={{
                  maxWidth: '75%',
                  marginBottom: 20,
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'user' ? '#8B0000' : '#e3e6eb',
                  color: msg.sender === 'user' ? '#fff' : '#222',
                  padding: '18px 28px',
                  borderRadius: 22,
                  fontSize: 16,
                  fontWeight: msg.sender === 'bot' ? 600 : 400,
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  boxShadow: '0 3px 8px rgba(0,0,0,0.07)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6,
                }}
                aria-live="polite"
              >
                {msg.text}
              </article>
            ))}
            <div ref={chatEndRef} />
          </div>
          <footer
            style={{
              display: 'flex',
              padding: '1rem 2rem',
              borderTop: '1px solid #ddd',
              backgroundColor: '#fff',
            }}
          >
            <input
              type="text"
              aria-label="Tulis pertanyaan"
              placeholder={loading ? 'Memuat data...' : 'Tulis pertanyaan Anda di sini...'}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
              style={{
                flex: 1,
                padding: '16px 20px',
                fontSize: 16,
                borderRadius: 30,
                border: '1.5px solid #ccc',
                outline: 'none',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#8B0000')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              aria-label="Kirim pertanyaan"
              style={{
                marginLeft: 16,
                backgroundColor: loading ? '#ccc' : '#8B0000',
                color: '#fff',
                border: 'none',
                borderRadius: 30,
                padding: '16px 36px',
                fontWeight: '700',
                fontSize: 16,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 5px 14px rgba(139,0,0,0.5)',
                transition: 'background-color 0.3s ease',
              }}
            >
              Kirim
            </button>
          </footer>
        </section>

        {/* Sidebar Informasi Pasal Pintar */}
        <aside
          style={{
            flex: 1,
            backgroundColor: '#f5f7fa',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '2rem 2.5rem',
            height: '680px',
            overflowY: 'auto',
            color: '#2e3a59',
            fontSize: 15,
            lineHeight: 1.7,
          }}
          aria-label="Informasi dan panduan Pasal Pintar"
        >
          <h2
            style={{
              color: '#8B0000',
              marginBottom: '1.5rem',
              fontWeight: '700',
              fontSize: '2rem',
              userSelect: 'none',
              textAlign: 'center',
              letterSpacing: '0.03em',
            }}
          >
            Tentang Pasal Pintar
          </h2>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: 12, fontWeight: '600', fontSize: '1.3rem' }}>
              Pengertian
            </h3>
            <p>
              Pasal Pintar merupakan asisten virtual berbasis data yang dirancang untuk membantu masyarakat memahami Hak Asasi Manusia (HAM) secara cepat, akurat, dan terpercaya.
              Sistem ini menyajikan informasi berdasarkan data hukum resmi dan membantu menjawab pertanyaan Anda secara interaktif.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: 12, fontWeight: '600', fontSize: '1.3rem' }}>
              Cara Penggunaan
            </h3>
            <ol style={{ paddingLeft: 20 }}>
              <li>Ketikkan pertanyaan atau topik yang ingin Anda ketahui di kolom chat.</li>
              <li>Pasal Pintar akan memberikan jawaban relevan berdasarkan database yang tersedia.</li>
              <li>Gunakan daftar topik populer di sebelah kanan untuk memulai percakapan dengan mudah.</li>
              <li>Anda dapat menggunakan Pasal Pintar kapan saja, selama 24 jam sehari, 7 hari seminggu.</li>
            </ol>
          </section>

          <section>
            <h3 style={{ marginBottom: 12, fontWeight: '600', fontSize: '1.3rem' }}>
              Sumber Referensi
            </h3>
            <ul style={{ paddingLeft: 20 }}>
              <li>
                <a
                  href="https://www.komnasham.go.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8B0000', textDecoration: 'none' }}
                >
                  Komisi Nasional Hak Asasi Manusia (Komnas HAM)
                </a>
              </li>
              <li>
                <a
                  href="https://www.undangundang.com/uu/nomor-39-tahun-1999-tentang-hak-asasi-manusia"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8B0000', textDecoration: 'none' }}
                >
                  UU No. 39 Tahun 1999 tentang Hak Asasi Manusia
                </a>
              </li>
              <li>
                <a
                  href="https://www.un.org/en/universal-declaration-human-rights/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#8B0000', textDecoration: 'none' }}
                >
                  Deklarasi Universal Hak Asasi Manusia (PBB)
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </main>
    
    </>
  );
};

export default ChatBotPage;
