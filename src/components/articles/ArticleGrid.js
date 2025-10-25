import React from 'react';
import ArticleCard from './ArticleCard';
import './ArticleGrid.css';

const ArticleGrid = ({ 
  articles, 
  onArticleClick, 
  layout = 'grid',
  loading = false,
  emptyMessage = "No articles found"
}) => {
  if (loading) {
    return (
      <div className="article-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="article-grid-empty">
        <h3>{emptyMessage}</h3>
        <p>Try refreshing or checking back later for new content.</p>
      </div>
    );
  }

  return (
    <div className={`article-grid article-grid-${layout}`}>
      {articles.map((article, index) => (
        <ArticleCard
          key={article.id || index}
          article={article}
          onClick={onArticleClick}
          size={layout === 'list' ? 'small' : 'medium'}
        />
      ))}
    </div>
  );
};

export default ArticleGrid;