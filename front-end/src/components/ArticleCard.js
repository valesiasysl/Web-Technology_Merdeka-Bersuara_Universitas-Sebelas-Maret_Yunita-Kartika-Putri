import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';  // Optional styling

const ArticleCard = ({ article }) => {
  const imageUrl = article.gambar_artikel || '/assets/artikel.png';
  const formattedDate = article.tanggal_terbit ? new Date(article.tanggal_terbit).toLocaleDateString() : 'Unknown date';

  return (
    <div className="article-card">
      <img src={imageUrl} alt={article.judul_artikel} className="article-image" />
      <div className="article-content">
        <p className="article-date">{formattedDate}</p>
        <h3 className="article-title">{article.judul_artikel}</h3>
        <Link to={`/article/${article.artikel_id}`}>
          <button className="read-button">Read Now</button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
