import React from 'react';
import './ArticleCard.css';

const ArticleCard = ({ article, onClick, size = 'medium' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  const getBiasType = (leaning) => {
    const { left, center, right } = leaning;
    if (left >= center && left >= right) return "left";
    if (center >= left && center >= right) return "center";
    return "right";
  };

  const getHighestBias = (leaning) => {
    const { left, center, right } = leaning;
    return Math.max(left, center, right);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className={`article-card article-card-${size}`} onClick={handleClick}>
      {article.image && (
        <div className="article-card-image">
          <img 
            src={article.image} 
            alt={article.title}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="article-card-content">
        <h3 className="article-card-title">{article.title}</h3>
        
        {size === 'large' && article.description && (
          <p className="article-card-description">{article.description}</p>
        )}
        
        <div className="article-card-meta">
          <div className="article-card-source">
            {article.source?.name || 'Unknown Source'}
          </div>
          <div className="article-card-date">
            {formatDate(article.publishedAt)}
          </div>
        </div>
        
        <div className="article-card-bias">
          <div className="bias-info">
            <div className={`bias-dot ${getBiasType(article.leaning)}`}></div>
            <span>{getHighestBias(article.leaning)}% {getBiasType(article.leaning)}</span>
          </div>
          <div className="sources-count">
            {article.sourceCount || 3} sources
          </div>
        </div>
        
        <div className="article-card-bias-bar">
          <div 
            className="bias-bar-left" 
            style={{width: `${article.leaning.left}%`}}
          ></div>
          <div 
            className="bias-bar-center" 
            style={{width: `${article.leaning.center}%`}}
          ></div>
          <div 
            className="bias-bar-right" 
            style={{width: `${article.leaning.right}%`}}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;