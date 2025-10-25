import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './ForYouPage.css';

const ForYouPage = () => {
  const [personalizedNews, setPersonalizedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getPersonalizedNews = () => {
    const biasScore = user?.biasScore || 0;
    const biasLabel = user?.biasLabel || 'Centrist';

    const allNews = [
      {
        id: 1,
        title: "Climate Change Initiatives Show Promising Results",
        summary: "New data reveals significant progress in renewable energy adoption and carbon emission reductions worldwide...",
        source: "Environmental News Network",
        bias: "Progressive",
        matchScore: 95,
        timestamp: "1 hour ago",
        category: "Environment"
      },
      {
        id: 2,
        title: "Economic Freedom Index Rises in Developing Nations",
        summary: "Latest report shows improvement in market liberalization and business-friendly policies across emerging economies...",
        source: "Economic Times",
        bias: "Conservative", 
        matchScore: 88,
        timestamp: "3 hours ago",
        category: "Economy"
      },
      {
        id: 3,
        title: "Bipartisan Bill Aims to Reform Healthcare System",
        summary: "Lawmakers from both parties propose new healthcare legislation focusing on cost reduction and accessibility...",
        source: "AP Politics",
        bias: "Centrist",
        matchScore: 92,
        timestamp: "5 hours ago",
        category: "Politics"
      },
      {
        id: 4,
        title: "Tech Innovation Drives Economic Growth in Q3",
        summary: "New startups and tech companies creating jobs and driving innovation across multiple sectors...",
        source: "Tech Review",
        bias: "Lean Right",
        matchScore: 85,
        timestamp: "6 hours ago",
        category: "Technology"
      },
      {
        id: 5,
        title: "Social Programs Show Positive Community Impact",
        summary: "Study reveals benefits of community-based social initiatives in urban and rural areas...",
        source: "Social Progress Journal",
        bias: "Lean Left",
        matchScore: 90,
        timestamp: "8 hours ago",
        category: "Society"
      },
      {
        id: 6,
        title: "Education Reform Bill Gains Bipartisan Support",
        summary: "New legislation focuses on improving educational outcomes and teacher support programs...",
        source: "Education Today",
        bias: "Centrist",
        matchScore: 87,
        timestamp: "10 hours ago",
        category: "Education"
      }
    ];

    return allNews.sort((a, b) => b.matchScore - a.matchScore);
  };

  useEffect(() => {
    setTimeout(() => {
      const news = getPersonalizedNews();
      setPersonalizedNews(news);
      setLoading(false);
    }, 1500);
  }, [user]);

  if (loading) {
    return (
      <div className="for-you-page">
        <div className="loading">Personalizing your news feed...</div>
      </div>
    );
  }

  return (
    <div className="for-you-page">
      <div className="personalized-header">
        <h1>For You</h1>
        <p>Stories tailored to your perspectives and interests</p>
        
        {user?.biasLabel && (
          <div className="bias-profile-display">
            <div className="bias-info">
              <strong>Your Profile:</strong> {user.biasLabel}
              <span className="bias-description"> - {user.biasDescription}</span>
            </div>
          </div>
        )}
      </div>

      <div className="personalized-news">
        {personalizedNews.map(article => (
          <div key={article.id} className="news-card personalized-card">
            <div className="card-header">
              <span className={`bias-tag bias-${article.bias.toLowerCase().replace(' ', '-')}`}>
                {article.bias}
              </span>
              <span className="match-score">
                {article.matchScore}% match
              </span>
            </div>
            
            <div className="category-badge">{article.category}</div>
            
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            
            <div className="card-footer">
              <span className="source">{article.source}</span>
              <span className="timestamp">{article.timestamp}</span>
            </div>
            
            <div className="personalization-note">
              📊 Recommended based on your profile
            </div>
          </div>
        ))}
      </div>

      <div className="personalization-tips">
        <h3>💡 How Your Feed is Personalized</h3>
        <p>
          We show you diverse perspectives while prioritizing content that matches 
          your indicated interests and balanced viewpoints. Your bias profile helps us 
          ensure you see a balanced mix of perspectives.
        </p>
      </div>
    </div>
  );
};

export default ForYouPage;