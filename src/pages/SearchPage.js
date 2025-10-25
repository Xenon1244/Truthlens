import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './SearchPage.css';

const SearchPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');

    const performSearch = async () => {
      if (query) {
        setLoading(true);
        setError('');
        try {
          const response = await api.searchArticles(query);
          setArticles(response.articles || []);
        } catch (err) {
          setError('Failed to search articles');
        } finally {
          setLoading(false);
        }
      }
    };

    performSearch();
  }, [location.search]);

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article } });
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
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  if (loading) {
    return (
      <div className="search-page">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Searching articles...</p>
        </div>
      </div>
    );
  }

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results</h1>
        <div className="search-query">
          for "<strong>{query}</strong>"
        </div>
        <div className="results-count">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
        </div>
      </div>

      {error && (
        <div className="error-state">
          <h3>⚠️ {error}</h3>
        </div>
      )}

      {articles.length === 0 && !error && (
        <div className="no-results">
          <h3>No articles found for "{query}"</h3>
          <p>Try searching with different keywords or check the spelling.</p>
        </div>
      )}

      <div className="search-results">
        {articles.map(article => (
          <div 
            key={article.id} 
            className="search-article-card"
            onClick={() => handleArticleClick(article)}
          >
            <div className="search-article-content">
              <h3>{article.title}</h3>
              <p className="article-description">{article.description}</p>
              
              <div className="search-article-meta">
                <div className="bias-info">
                  <div className={`bias-dot ${getBiasType(article.leaning)}`}></div>
                  <span>{getHighestBias(article.leaning)}% {getBiasType(article.leaning)}</span>
                </div>
                <div className="source-info">
                  <span className="source-name">{article.source?.name || 'Unknown Source'}</span>
                  <span className="article-date">{formatDate(article.publishedAt)}</span>
                </div>
              </div>

              <div className="search-bias-bar">
                <div className="bias-bar-left" style={{width: `${article.leaning.left}%`}}></div>
                <div className="bias-bar-center" style={{width: `${article.leaning.center}%`}}></div>
                <div className="bias-bar-right" style={{width: `${article.leaning.right}%`}}></div>
              </div>
            </div>
            
            {article.image && (
              <img 
                src={article.image} 
                alt={article.title}
                className="search-article-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;