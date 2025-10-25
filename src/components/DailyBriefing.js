import React from 'react';

const DailyBriefing = () => {
  const briefingData = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    location: "Global Coverage",
    mainStory: {
      title: "Breaking News Summary",
      summary: "Your daily briefing provides an overview of the most important stories from around the world. Stay informed with curated news coverage across all major categories.",
      stats: "Multiple sources · Comprehensive coverage"
    },
    otherStories: [
      "Technology innovations shaping the future",
      "Global economic developments and markets",
      "Political updates from around the world",
      "Sports highlights and major events",
      "Entertainment and culture news"
    ]
  };

  return (
    <div className="daily-briefing">
      <div className="briefing-header">
        <h2>📰 Daily Briefing</h2>
        <div className="briefing-location">
          <div className="location-title">TRUTHLENS UPDATE</div>
          <div className="location-subtitle">COMPREHENSIVE NEWS COVERAGE</div>
          <div className="briefing-date">{briefingData.date}</div>
          <div className="briefing-coords">{briefingData.location}</div>
        </div>
      </div>

      <div className="main-story">
        <h3>{briefingData.mainStory.title}</h3>
        <p>{briefingData.mainStory.summary}</p>
        <div className="story-stats">{briefingData.mainStory.stats}</div>
      </div>

      <div className="other-stories">
        <h4>📋 Today's Coverage</h4>
        {briefingData.otherStories.map((story, index) => (
          <div key={index} className="other-story-item">
            • {story}
          </div>
        ))}
      </div>

      <div className="briefing-footer">
        <p>Powered by TruthLens AI</p>
      </div>
    </div>
  );
};

export default DailyBriefing;