import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ArticleGrid from '../components/articles/ArticleGrid';
import './CategoryPage.css';

const PoliticsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPoliticsArticles();
  }, []);

  const loadPoliticsArticles = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.getArticles('politics');
      if (response.status === "success" && response.articles) {
        setArticles(response.articles);
      } else {
        setError("Failed to load politics articles");
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
        <h1>Politics News</h1>
        <p>Political developments, policy changes, and government updates from multiple perspectives</p>
        <div className="category-stats">
          <span className="stat">{articles.length} articles</span>
          <span className="stat">Multiple Perspectives</span>
          <span className="stat">Policy Analysis</span>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={loadPoliticsArticles}>Retry</button>
        </div>
      )}

      <ArticleGrid
        articles={articles}
        onArticleClick={handleArticleClick}
        loading={loading}
        emptyMessage="No politics articles available at the moment"
      />

      <div className="category-info">
        <h3>🏛️ Political Coverage</h3>
        <p>
          Get comprehensive political coverage with balanced perspectives on government policies, 
          elections, and international relations. Our analysis helps you understand different 
          viewpoints on important political developments.
        </p>
      </div>
    </div>
  );
};

export default PoliticsPage;