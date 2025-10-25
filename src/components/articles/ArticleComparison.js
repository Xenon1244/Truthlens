import React, { useState } from 'react';
import './ArticleComparison.css';

const ArticleComparison = ({ isOpen, onClose, articles = [] }) => {
  const [selectedPerspectives, setSelectedPerspectives] = useState([]);

  if (!isOpen) return null;

  const handlePerspectiveSelect = (articleId) => {
    setSelectedPerspectives(prev => {
      if (prev.includes(articleId)) {
        return prev.filter(id => id !== articleId);
      } else if (prev.length < 2) {
        return [...prev, articleId];
      }
      return prev;
    });
  };

  const getBiasColor = (bias) => {
    if (bias === 'left') return '#60a5fa';
    if (bias === 'center') return '#4ade80';
    if (bias === 'right') return '#f87171';
    return '#333';
  };

  const getBiasPercentage = (article, side) => {
    // Mock data - replace with actual bias data from your backend
    const biasData = {
      left: article.biasScores?.left || 0,
      center: article.biasScores?.center || 0,
      right: article.biasScores?.right || 0
    };
    return biasData[side] || 0;
  };

  const selectedArticles = articles.filter(article => 
    selectedPerspectives.includes(article.id)
  );

  return (
    <div className="comparison-modal">
      <div className="comparison-overlay" onClick={onClose}></div>
      
      <div className="comparison-content">
        <div className="comparison-header">
          <h2>Compare Perspectives</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="comparison-instructions">
          <p>Select 2 different perspectives to compare</p>
        </div>

        <div className="perspectives-selection">
          <h3>Available Perspectives</h3>
          <div className="perspectives-grid">
            {articles.map((article) => (
              <div
                key={article.id}
                className={`perspective-card ${
                  selectedPerspectives.includes(article.id) ? 'selected' : ''
                } ${
                  selectedPerspectives.length >= 2 && 
                  !selectedPerspectives.includes(article.id) ? 'disabled' : ''
                }`}
                onClick={() => handlePerspectiveSelect(article.id)}
              >
                <div className="perspective-header">
                  <div 
                    className="bias-indicator" 
                    style={{ backgroundColor: getBiasColor(article.bias) }}
                  ></div>
                  <span className="perspective-source">{article.source}</span>
                </div>
                <h4>{article.title}</h4>
                <div className="bias-bar-mini">
                  <div 
                    className="bias-left" 
                    style={{ flex: getBiasPercentage(article, 'left') }}
                  ></div>
                  <div 
                    className="bias-center" 
                    style={{ flex: getBiasPercentage(article, 'center') }}
                  ></div>
                  <div 
                    className="bias-right" 
                    style={{ flex: getBiasPercentage(article, 'right') }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedArticles.length === 2 && (
          <div className="comparison-results">
            <h3>Comparison Results</h3>
            <div className="comparison-grid">
              {selectedArticles.map((article) => (
                <div key={article.id} className="comparison-article">
                  <div className="comparison-article-header">
                    <div 
                      className="bias-indicator" 
                      style={{ backgroundColor: getBiasColor(article.bias) }}
                    ></div>
                    <span className="source">{article.source}</span>
                  </div>
                  <h4>{article.title}</h4>
                  <p>{article.summary}</p>
                  
                  <div className="bias-breakdown">
                    <div className="bias-item">
                      <span className="bias-label">Left-leaning:</span>
                      <span className="bias-value">
                        {getBiasPercentage(article, 'left')}%
                      </span>
                    </div>
                    <div className="bias-item">
                      <span className="bias-label">Center:</span>
                      <span className="bias-value">
                        {getBiasPercentage(article, 'center')}%
                      </span>
                    </div>
                    <div className="bias-item">
                      <span className="bias-label">Right-leaning:</span>
                      <span className="bias-value">
                        {getBiasPercentage(article, 'right')}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="comparison-actions">
          <button className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="primary-btn"
            disabled={selectedPerspectives.length !== 2}
            onClick={() => {
              // Handle the comparison action
              console.log('Comparing:', selectedPerspectives);
            }}
          >
            Compare Perspectives
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleComparison;