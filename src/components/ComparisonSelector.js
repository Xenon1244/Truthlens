// src/components/Comparison/ComparisonSelector.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Comparison.css';

const ComparisonSelector = ({ isOpen, onClose, currentArticle }) => {
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [suggestedArticles, setSuggestedArticles] = useState([]);
  const navigate = useNavigate();

  // Mock data - replace with your actual API call
  useEffect(() => {
    if (isOpen && currentArticle) {
      // In real app, fetch articles about the same topic
      const mockSuggested = [
        { id: '2', title: 'Related Article from Fox News', source: 'Fox News', bias: 'right' },
        { id: '3', title: 'Coverage from CNN', source: 'CNN', bias: 'left' },
        { id: '4', title: 'Reuters Analysis', source: 'Reuters', bias: 'center' }
      ];
      setSuggestedArticles(mockSuggested);
      setSelectedArticles([currentArticle.id]);
    }
  }, [isOpen, currentArticle]);

  const toggleArticleSelection = (articleId) => {
    setSelectedArticles(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else if (prev.length < 3) {
        return [...prev, articleId];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    if (selectedArticles.length >= 2) {
      navigate(`/compare?articles=${selectedArticles.join(',')}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="comparison-modal-overlay">
      <div className="comparison-modal">
        <div className="comparison-header">
          <h2>Compare Coverage</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="comparison-content">
          <p>Select 2-3 articles to compare different coverage:</p>
          
          <div className="selected-count">
            {selectedArticles.length}/3 articles selected
          </div>

          <div className="articles-list">
            {/* Current Article */}
            <div className="article-item current">
              <div className="article-checkbox">
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                />
              </div>
              <div className="article-info">
                <div className="article-title">{currentArticle.title}</div>
                <div className="article-source">{currentArticle.source?.name}</div>
              </div>
              <div className="article-bias current-bias">Current</div>
            </div>

            {/* Suggested Articles */}
            {suggestedArticles.map(article => (
              <div 
                key={article.id} 
                className={`article-item ${selectedArticles.includes(article.id) ? 'selected' : ''}`}
                onClick={() => toggleArticleSelection(article.id)}
              >
                <div className="article-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedArticles.includes(article.id)}
                    onChange={() => toggleArticleSelection(article.id)}
                  />
                </div>
                <div className="article-info">
                  <div className="article-title">{article.title}</div>
                  <div className="article-source">{article.source}</div>
                </div>
                <div className={`article-bias ${article.bias}`}>
                  {article.bias.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="comparison-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="compare-btn" 
            onClick={handleCompare}
            disabled={selectedArticles.length < 2}
          >
            Compare {selectedArticles.length} Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSelector;