import React from 'react';
import BiasIndicator from './BiasIndicator';
import './FeaturedArticle.css';

const FeaturedArticle = ({ article, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  if (!article) {
    return (
      <div className="featured-article-placeholder">
        <div className="placeholder-content">
          <h3>No Featured Article</h3>
          <p>Check back later for featured content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-article" onClick={handleClick}>
      <div className="featured-article-image">
        <img 
          src={article.image} 
          alt={article.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x300/1a1a1a/ffffff?text=Featured+News";
          }}
        />
      </div>
      
      <div className="featured-article-content">
        <div className="featured-article-category">
          Featured Story
        </div>
        
        <h2 className="featured-article-title">{article.title}</h2>
        
        <p className="featured-article-description">
          {article.description}
        </p>
        
        <div className="featured-article-meta">
          <div className="featured-article-source">
            Source: <strong>{article.source?.name || 'Unknown Source'}</strong>
          </div>
          <div className="featured-article-date">
            {formatDate(article.publishedAt)}
          </div>
        </div>
        
        <div className="featured-article-bias">
          <BiasIndicator 
            leaning={article.leaning} 
            size="large" 
            showLabels={true}
            showBar={true}
          />
        </div>
        
        <div className="featured-article-actions">
          <button className="read-more-btn">
            Read Full Analysis →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;