import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PasalPintarPage.css';
import { format } from 'date-fns';

// Importing fallback image
import fallbackImage from '../assets/artikel1.png';

const PasalPintarPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);

  const baseImageUrl = "http://127.0.0.1:8000/storage/";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/artikel');
        if (response.data.success && Array.isArray(response.data.data)) {
          setArticles(response.data.data);
        } else {
          setError('Unexpected API response');
        }
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchNews = async () => {
      const apiKey = '06c288b70e664b4e967bcadd2baae572';
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            q: 'hak asasi manusia',
            language: 'id',
            apiKey,
          },
        });
        if (response.data.articles && response.data.articles.length > 0) {
          setNews(response.data.articles);
        } else {
          setNewsError('No news found for Human Rights in Indonesia');
        }
      } catch (error) {
        setNewsError('Failed to load news. Please try again later.');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchArticles();
    fetchNews();
  }, []);

  const handleReadNowClick = (article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticleDetail = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="pasal-pintar-page">
      <Header />

      <section className="articles-section">
        <h2 className="section-title">Artikel Merdeka Bersuara</h2>
        <div className="articles-grid">
          {loading ? (
            <p>Loading articles...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : articles.length > 0 ? (
            articles.map((article) => {
              const imageUrl = article.gambar_artikel
                ? `${baseImageUrl}${article.gambar_artikel}`
                : fallbackImage;

              const formattedDate = article.tanggal_terbit
                ? format(new Date(article.tanggal_terbit), 'dd MMMM yyyy')
                : 'Unknown date';

              return (
                <div className="article-card" key={article.artikel_id}>
                  <img
                    alt={article.judul_artikel}
                    className="article-image"
                    src={imageUrl}
                    onError={(e) => (e.target.src = fallbackImage)}
                    onClick={() => handleReadNowClick(article)}
                  />
                  <div className="article-content">
                    <p className="article-date">{formattedDate}</p>
                    <h3 className="article-title">{article.judul_artikel}</h3>
                    <p className="article-excerpt">
                      {article.isi_artikel.split('\n')[0].substring(0, 100)}...
                    </p>
                    <button
                      className="read-button"
                      onClick={() => handleReadNowClick(article)}
                    >
                      Baca Selengkapnya
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No articles available.</p>
          )}
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <section
          className="article-detail-fullscreen"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-title"
          tabIndex={-1}
        >
          <button
            className="close-detail-button"
            onClick={closeArticleDetail}
            aria-label="Tutup artikel"
          >
            &times;
          </button>
          <article className="article-detail-content">
            <h2 id="article-title">{selectedArticle.judul_artikel}</h2>
            <p className="article-detail-date">
              {selectedArticle.tanggal_terbit
                ? format(new Date(selectedArticle.tanggal_terbit), 'dd MMMM yyyy')
                : 'Unknown date'}
            </p>
            <img
              alt={selectedArticle.judul_artikel}
              className="article-detail-image"
              src={selectedArticle.gambar_artikel ? `${baseImageUrl}${selectedArticle.gambar_artikel}` : fallbackImage}
              onError={(e) => (e.target.src = fallbackImage)}
            />
            <div className="article-detail-body" style={{ whiteSpace: 'pre-line' }}>
              {selectedArticle.isi_artikel}
            </div>
          </article>
        </section>
      )}

      <section className="news-section">
        <h2 className="section-title">Berita Hak Asasi Manusia</h2>
        {newsLoading ? (
          <p>Loading news...</p>
        ) : newsError ? (
          <p className="error-message">{newsError}</p>
        ) : news.length > 0 ? (
          <div className="news-grid">
            {news.map((newsItem, index) => (
              <div className="news-card" key={index}>
                <img
                  alt={newsItem.title}
                  className="news-image"
                  src={newsItem.urlToImage || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <div className="news-content">
                  <h3 className="news-title">{newsItem.title}</h3>
                  <p className="news-description">{newsItem.description}</p>
                  <a
                    href={newsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Baca Selengkapnya
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No human rights news available.</p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default PasalPintarPage;
