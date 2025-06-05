import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/artikel/${id}`);
        if (response.data) {
          setArticle(response.data.data);
        } else {
          setError('Article not found');
        }
      } catch (error) {
        setError('Error loading article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="article-detail-page">
      <Header />
      {article ? (
        <section className="article-detail">
          <h2>{article.judul_artikel}</h2>
          <img src={article.gambar_artikel || '/assets/artikel.png'} alt={article.judul_artikel} />
          <p>{new Date(article.tanggal_terbit).toLocaleDateString()}</p>
          <p>{article.isi_artikel}</p>
        </section>
      ) : (
        <p>No article data available</p>
      )}
      <Footer />
    </div>
  );
};

export default ArticleDetailPage;
