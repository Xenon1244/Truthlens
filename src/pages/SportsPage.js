import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ArticleGrid from '../components/articles/ArticleGrid';
import './CategoryPage.css';

const SportsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadSportsArticles();
  }, []);

  const loadSportsArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getArticles('sports');
      if (response.status === "success" && response.articles) {
        setArticles(response.articles);
      } else {
        setError("Failed to load sports articles");
      }
    } catch (error) {
      setError("Failed to connect to news service");
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>Sports News</h1>
        <p>Latest updates from the world of sports, athletics, and competitions</p>
        <div className="category-stats">
          <span className="stat">{articles.length} articles</span>
          <span className="stat">Live Updates</span>
          <span className="stat">Global Coverage</span>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={loadSportsArticles}>Retry</button>
        </div>
      )}

      <ArticleGrid
        articles={articles}
        onArticleClick={handleArticleClick}
        loading={loading}
        emptyMessage="No sports articles available at the moment"
      />

      <div className="category-info">
        <h3>🏈 Sports Coverage</h3>
        <p>
          Get comprehensive coverage of major sporting events, team updates, player transfers, 
          and match analyses from around the world. Our sports section brings you balanced 
          reporting on all major leagues and competitions.
        </p>
      </div>
    </div>
  );
};

export default SportsPage;