import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './LocalPage.css';

const LocalPage = () => {
  const [localNews, setLocalNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getLocalNews = () => {
    const userCountry = user?.preferences?.country || 'United States';
    
    const mockNews = {
      'Canada': [
        {
          id: 1,
          title: "Canadian Economic Outlook Shows Steady Growth",
          summary: "Latest reports indicate positive trends in Canadian markets with GDP growth exceeding expectations...",
          source: "Canadian Press",
          bias: "Neutral",
          timestamp: "2 hours ago",
          local: true
        },
        {
          id: 2,
          title: "New Environmental Policies Announced in Ontario",
          summary: "Government unveils new climate initiatives focusing on renewable energy and carbon reduction...",
          source: "Toronto Star",
          bias: "Lean Left",
          timestamp: "4 hours ago",
          local: true
        }
      ],
      'United States': [
        {
          id: 1,
          title: "Federal Reserve Announces Interest Rate Decision",
          summary: "Central bank maintains current rates amid economic stability and controlled inflation...",
          source: "AP News",
          bias: "Neutral",
          timestamp: "1 hour ago",
          local: true
        },
        {
          id: 2,
          title: "State Legislation on Tech Regulation Advances",
          summary: "New bills targeting big tech companies move forward in several state legislatures...",
          source: "Reuters",
          bias: "Centrist",
          timestamp: "3 hours ago",
          local: true
        }
      ],
      'United Kingdom': [
        {
          id: 1,
          title: "Brexit Trade Deal Updates and Economic Impact",
          summary: "New negotiations underway for trade agreements with European partners...",
          source: "BBC News",
          bias: "Neutral",
          timestamp: "5 hours ago",
          local: true
        }
      ]
    };

    return mockNews[userCountry] || mockNews['United States'];
  };

  useEffect(() => {
    setTimeout(() => {
      const news = getLocalNews();
      setLocalNews(news);
      setLoading(false);
    }, 1000);
  }, [user]);

  if (loading) {
    return (
      <div className="local-page">
        <div className="loading">Loading local news...</div>
      </div>
    );
  }

  return (
    <div className="local-page">
      <div className="local-header">
        <h1>Local News</h1>
        <p>Stories relevant to your region and community</p>
        {user?.preferences?.country && (
          <div className="location-badge">
            📍 Showing news for {user.preferences.country}
          </div>
        )}
      </div>

      <div className="news-grid">
        {localNews.map(article => (
          <div key={article.id} className="news-card local-card">
            <div className="card-header">
              <span className={`bias-tag bias-${article.bias.toLowerCase().replace(' ', '-')}`}>
                {article.bias}
              </span>
              <span className="local-badge">Local</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <div className="card-footer">
              <span className="source">{article.source}</span>
              <span className="timestamp">{article.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {localNews.length === 0 && (
        <div className="no-news">
          <h3>No local news available</h3>
          <p>Try updating your location in profile settings</p>
        </div>
      )}
    </div>
  );
};

export default LocalPage;