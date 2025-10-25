import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./HomePage.css";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.getArticles(category);
      
      if (response.status === "success" && response.articles) {
        setArticles(response.articles);
        if (response.articles.length > 0) {
          setFeaturedArticle(response.articles[0]);
        }
      } else {
        setError("Failed to load articles");
      }
    } catch (error) {
      setError("Failed to connect to news service");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article } });
  };

  const handleTopicClick = (topic) => {
    navigate(`/topic/${topic.toLowerCase().replace(/\s+/g, '-')}`);
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
      <div className="homepage">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading latest news from TruthLens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={loadArticles}>Retry</button>
        </div>
      )}

      {/* ORIGINAL 3-COLUMN LAYOUT - 25%/50%/25% */}
      <div className="content-container">
        {/* Left Column - Daily News */}
        <div className="left-column">
          <div className="section-header">
            <h2>Daily News</h2>
            <div className="stories-count">
              {articles.length} stories
            </div>
          </div>

          {articles.slice(1, 6).map((article) => (
            <div 
              key={article.id} 
              className="left-article" 
              onClick={() => handleArticleClick(article)}
            >
              <h3>{article.title}</h3>
              <div className="left-article-meta">
                <div className="left-bias-indicator">
                  <span>{getHighestBias(article.leaning)}% {getBiasType(article.leaning)}</span>
                </div>
                <div className="sources-count">{article.sourceCount || 3} sources</div>
              </div>
            </div>
          ))}

          <div className="section-header">
            <h2>Daily Briefing</h2>
            <div className="date-badge">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          <div className="daily-briefing-articles">
            {articles.slice(6, 8).map((article) => (
              <div 
                key={article.id} 
                className="daily-briefing-article" 
                onClick={() => handleArticleClick(article)}
              >
                <img 
                  src={article.image}
                  alt={article.title}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/70x70/1a1a1a/ffffff?text=News";
                  }}
                />
                <div className="daily-briefing-article-content">
                  <h3>{article.title}</h3>
                  <div className="daily-briefing-bias">
                    <div className="compact-bias-bar">
                      <div className="compact-bias-left" style={{width: `${article.leaning.left}%`}}></div>
                      <div className="compact-bias-center" style={{width: `${article.leaning.center}%`}}></div>
                      <div className="compact-bias-right" style={{width: `${article.leaning.right}%`}}></div>
                    </div>
                    <span>{article.sourceCount || 3} sources</span>
                  </div>
                  <div className="daily-briefing-meta">
                    <span>{getHighestBias(article.leaning)}% {getBiasType(article.leaning)}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Column - Featured Article */}
        <div className="center-column">
          {featuredArticle && (
            <div className="featured-story">
              <img 
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="featured-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x280/1a1a1a/ffffff?text=Featured+News";
                }}
              />
              <div className="featured-content">
                <h2>{featuredArticle.title}</h2>
                
                {/* Simple Rectangle Bias Bar */}
                <div className="bias-bar-rectangle">
                  <div className="bias-bar">
                    <div className="bias-segment left" style={{width: `${featuredArticle.leaning.left}%`}}>
                      <span className="bias-text">Left {featuredArticle.leaning.left}%</span>
                    </div>
                    <div className="bias-segment center" style={{width: `${featuredArticle.leaning.center}%`}}>
                      <span className="bias-text">Center {featuredArticle.leaning.center}%</span>
                    </div>
                    <div className="bias-segment right" style={{width: `${featuredArticle.leaning.right}%`}}>
                      <span className="bias-text">Right {featuredArticle.leaning.right}%</span>
                    </div>
                  </div>
                </div>

                <div className="article-content">
                  <p>{featuredArticle.content}</p>
                </div>

                <div className="article-meta">
                  <div className="source-info">
                    <span className="source-name">{featuredArticle.source.name}</span>
                    <span className="publish-date">Published: {formatDate(featuredArticle.publishedAt)}</span>
                  </div>
                  <button 
                    className="read-full-button"
                    onClick={() => handleArticleClick(featuredArticle)}
                  >
                    Read Full Article →
                  </button>
                </div>
              </div>
            </div>
          )}

          {articles.slice(2, 5).map((article) => (
            <div 
              key={article.id} 
              className="center-article" 
              onClick={() => handleArticleClick(article)}
            >
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="center-article-meta">
                <span className="sources-count">{article.sourceCount || 3} sources</span>
                <div className="left-bias-indicator">
                  <span>{getHighestBias(article.leaning)}% {getBiasType(article.leaning)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Bias Insights */}
        <div className="right-column">
          <div className="sidebar-section">
            <h3>Bias Breakdown</h3>
            <div className="bias-trends">
              <div className="bias-trend-item">
                <div className="trend-topic">Trump</div>
                <div className="trend-bias">
                  <div className="bias-bar-mini">
                    <div className="bias-left" style={{width: '35%'}}></div>
                    <div className="bias-center" style={{width: '25%'}}></div>
                    <div className="bias-right" style={{width: '40%'}}></div>
                  </div>
                  <span className="bias-label">Right</span>
                </div>
              </div>
              
              <div className="bias-trend-item">
                <div className="trend-topic">Climate</div>
                <div className="trend-bias">
                  <div className="bias-bar-mini">
                    <div className="bias-left" style={{width: '60%'}}></div>
                    <div className="bias-center" style={{width: '25%'}}></div>
                    <div className="bias-right" style={{width: '15%'}}></div>
                  </div>
                  <span className="bias-label">Left</span>
                </div>
              </div>
              
              <div className="bias-trend-item">
                <div className="trend-topic">Economy</div>
                <div className="trend-bias">
                  <div className="bias-bar-mini">
                    <div className="bias-left" style={{width: '30%'}}></div>
                    <div className="bias-center" style={{width: '45%'}}></div>
                    <div className="bias-right" style={{width: '25%'}}></div>
                  </div>
                  <span className="bias-label">Balanced</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>My News Bias</h3>
            <div className="bias-profile">
              <div className="engagement-stats">
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Stories Read</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Articles Compared</div>
                </div>
              </div>
              
              <div className="bias-rectangles">
                <div className="bias-rectangle left">42%</div>
                <div className="bias-rectangle center">35%</div>
                <div className="bias-rectangle right">23%</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Fact Check</h3>
            <div className="fact-check">
              <div className="fact-statement">
                "The economy grew by 3.5% last quarter"
              </div>
              <div className="fact-verdict true">
                ✅ Mostly True
              </div>
              <div className="fact-sources">
                Verified by 5 independent sources
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THIN WHITE LINE SEPARATOR */}
      <div className="full-width-separator"></div>

      {/* NEW SECTION: DAILY LOCAL NEWS - 25% left, 75% right */}
      <div className="local-news-container">
        <div className="local-news-left">
          <div className="section-header">
            <h2>Daily Local News</h2>
          </div>
          <div className="local-news-description">
            Discover stories and media bias happening right in your city.
          </div>
          <div className="city-input-container">
            <input 
              type="text" 
              placeholder="Enter your city's name"
              className="city-input"
            />
            <button className="submit-city-button">
              Submit
            </button>
          </div>
        </div>

        <div className="local-news-right">
          <div className="local-news-articles">
            <div className="local-news-article" onClick={() => handleArticleClick(articles[0] || {})}>
              <img 
                src={articles[0]?.image || "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local"}
                alt="Local news"
                className="local-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local";
                }}
              />
              <div className="local-article-content">
                <h3>Alberta legislature set to resume fall sitting amid provincewide teachers strike</h3>
                <p>Alberta government faces challenges as teachers' strike continues during legislative session.</p>
                <div className="local-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '55%'}}></div>
                    <div className="compact-bias-center" style={{width: '25%'}}></div>
                    <div className="compact-bias-right" style={{width: '20%'}}></div>
                  </div>
                  <span className="bias-percentage">55% Left</span>
                  <span className="sources-count">11 sources</span>
                </div>
              </div>
            </div>

            <div className="local-news-article" onClick={() => handleArticleClick(articles[1] || {})}>
              <img 
                src={articles[1]?.image || "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local"}
                alt="Local news"
                className="local-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local";
                }}
              />
              <div className="local-article-content">
                <h3>Most Members of B.C.'s Legislature Vote Against Bill to Stop Land Acknowledgements</h3>
                <p>Victoria lawmakers debate cultural recognition protocols in legislative proceedings.</p>
                <div className="local-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '60%'}}></div>
                    <div className="compact-bias-center" style={{width: '20%'}}></div>
                    <div className="compact-bias-right" style={{width: '20%'}}></div>
                  </div>
                  <span className="bias-percentage">60% Left</span>
                  <span className="sources-count">5 sources</span>
                </div>
              </div>
            </div>

            <div className="local-news-article" onClick={() => handleArticleClick(articles[2] || {})}>
              <img 
                src={articles[2]?.image || "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local"}
                alt="Local news"
                className="local-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/120x100/1a1a1a/ffffff?text=Local";
                }}
              />
              <div className="local-article-content">
                <h3>EOB cutting about eight per cent of workforce in restructuring plan</h3>
                <p>Toronto-based company announces significant workforce reduction in strategic overhaul.</p>
                <div className="local-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '50%'}}></div>
                    <div className="compact-bias-center" style={{width: '30%'}}></div>
                    <div className="compact-bias-right" style={{width: '20%'}}></div>
                  </div>
                  <span className="bias-percentage">50% Left</span>
                  <span className="sources-count">8 sources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THIN WHITE LINE SEPARATOR */}
      <div className="full-width-separator"></div>

      {/* NEW SECTION: WAR ROOM - 75% left, 25% right */}
      <div className="war-room-container">
        <div className="war-room-left">
          <div className="section-header">
            <h2>War Room</h2>
            <div className="section-subtitle">Global Conflict Coverage & Media Bias Analysis</div>
          </div>

          <div className="war-articles">
            <div className="war-article featured-war-article">
              <img 
                src="https://via.placeholder.com/300x180/1a1a1a/ffffff?text=Gaza+Conflict"
                alt="Gaza conflict"
                className="war-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x180/1a1a1a/ffffff?text=Gaza+Conflict";
                }}
              />
              <div className="war-article-content">
                <h3>Israel-Gaza Conflict Enters New Phase as Ceasefire Talks Stall</h3>
                <p>Middle East tensions escalate as diplomatic efforts face obstacles. Analysis of media coverage shows significant bias variations across international outlets.</p>
                <div className="war-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '45%'}}></div>
                    <div className="compact-bias-center" style={{width: '30%'}}></div>
                    <div className="compact-bias-right" style={{width: '25%'}}></div>
                  </div>
                  <span className="bias-percentage">45% Left</span>
                  <span className="sources-count">24 sources</span>
                </div>
              </div>
            </div>

            <div className="war-article">
              <img 
                src="https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Ukraine+War"
                alt="Ukraine war"
                className="war-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Ukraine+War";
                }}
              />
              <div className="war-article-content">
                <h3>Ukraine War: Frontline Updates and Humanitarian Crisis Deepens</h3>
                <p>Eastern European conflict continues with new developments. Media analysis reveals coverage gaps in regional impact reporting.</p>
                <div className="war-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '52%'}}></div>
                    <div className="compact-bias-center" style={{width: '28%'}}></div>
                    <div className="compact-bias-right" style={{width: '20%'}}></div>
                  </div>
                  <span className="bias-percentage">52% Left</span>
                  <span className="sources-count">18 sources</span>
                </div>
              </div>
            </div>

            <div className="war-article">
              <img 
                src="https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Yemen+Conflict"
                alt="Yemen conflict"
                className="war-article-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Yemen+Conflict";
                }}
              />
              <div className="war-article-content">
                <h3>Yemen Civil War: Forgotten Crisis Receives Renewed Attention</h3>
                <p>Humanitarian situation deteriorates as peace talks show little progress. Media coverage analysis indicates significant Western media blindspots.</p>
                <div className="war-article-bias">
                  <div className="compact-bias-bar">
                    <div className="compact-bias-left" style={{width: '38%'}}></div>
                    <div className="compact-bias-center" style={{width: '35%'}}></div>
                    <div className="compact-bias-right" style={{width: '27%'}}></div>
                  </div>
                  <span className="bias-percentage">38% Left</span>
                  <span className="sources-count">12 sources</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="war-room-right">
          <div className="sidebar-section">
            <h3>Lens+</h3>
            <div className="lens-plus-content">
              <div className="lens-plus-item">
                <div className="lens-plus-topic">Middle East Coverage</div>
                <div className="lens-plus-description">See beyond single-narrative reporting with multi-perspective analysis</div>
              </div>
              <div className="lens-plus-item">
                <div className="lens-plus-topic">Ukraine Conflict</div>
                <div className="lens-plus-description">Compare Eastern vs Western media framing of frontline developments</div>
              </div>
              <div className="lens-plus-item">
                <div className="lens-plus-topic">Global Conflicts</div>
                <div className="lens-plus-description">Comprehensive coverage of Yemen, Sudan, and other crisis zones</div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Truth Data Alert</h3>
            <div className="email-signup">
              <div className="email-description">
                Get notified when we detect bias blindspots in war coverage
              </div>
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="email-input"
              />
              <button className="email-submit-button">
                Subscribe to Alerts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* THIN WHITE LINE SEPARATOR */}
      <div className="full-width-separator"></div>

      {/* NEW SECTION: LATEST STORIES - 25% left, 75% right */}
      <div className="latest-stories-container">
        <div className="latest-stories-left">
          <div className="section-header">
            <h2>Latest Stories</h2>
          </div>
          <div className="latest-stories-description">
            Breaking news coverage from multiple sources with bias analysis.
          </div>

          {/* SIMILAR NEWS TOPICS GRID */}
          <div className="similar-topics-section">
            <h3>Similar News Topics</h3>
            <div className="topics-grid">
              <div className="topic-row">
                <div className="topic-item" onClick={() => handleTopicClick("Israel-Gaza")}>
                  <span className="topic-name">Israel-Gaza</span>
                </div>
                <div className="topic-item" onClick={() => handleTopicClick("U.S.-Canada Relations")}>
                  <span className="topic-name">U.S.-Canada Relations</span>
                  <span className="topic-plus">+</span>
                </div>
              </div>
              <div className="topic-row">
                <div className="topic-item" onClick={() => handleTopicClick("Canadian Economy")}>
                  <span className="topic-name">Canadian Economy</span>
                </div>
                <div className="topic-item" onClick={() => handleTopicClick("Toronto Blue Jays")}>
                  <span className="topic-name">Toronto Blue Jays</span>
                  <span className="topic-plus">+</span>
                </div>
              </div>
              <div className="topic-row">
                <div className="topic-item" onClick={() => handleTopicClick("Los Angeles Dodgers")}>
                  <span className="topic-name">Los Angeles Dodgers</span>
                </div>
                <div className="topic-item" onClick={() => handleTopicClick("Canadian Politics")}>
                  <span className="topic-name">Canadian Politics</span>
                  <span className="topic-plus">+</span>
                </div>
              </div>
              <div className="topic-row">
                <div className="topic-item" onClick={() => handleTopicClick("NHL")}>
                  <span className="topic-name">NHL</span>
                </div>
                <div className="topic-item" onClick={() => handleTopicClick("Climate Change")}>
                  <span className="topic-name">Climate Change</span>
                  <span className="topic-plus">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="latest-stories-right">
          <div className="latest-stories-articles">
            {/* Article 1 */}
            <div className="latest-story-item" onClick={() => handleArticleClick(articles[0] || {})}>
              <div className="latest-story-content">
                <h3>EOB cutting about eight per cent of workforce in restructuring plan</h3>
                <div className="latest-story-location">Canadian Economy - Toronto</div>
                <div className="latest-story-bias-bar">
                  <div className="bias-bar">
                    <div className="bias-segment left" style={{width: '50%'}}>
                      <span className="bias-text">Left 50%</span>
                    </div>
                    <div className="bias-segment center" style={{width: '30%'}}>
                      <span className="bias-text">Center 30%</span>
                    </div>
                    <div className="bias-segment right" style={{width: '20%'}}>
                      <span className="bias-text">Right 20%</span>
                    </div>
                  </div>
                  <div className="sources-count">8 sources</div>
                </div>
              </div>
              <img 
                src={articles[0]?.image || "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=EOB"}
                alt="Business news"
                className="latest-story-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=EOB";
                }}
              />
            </div>

            {/* Article 2 */}
            <div className="latest-story-item" onClick={() => handleArticleClick(articles[1] || {})}>
              <div className="latest-story-content">
                <h3>Cars and Parts Drive Retail Sales Bump in August: StatCan</h3>
                <div className="latest-story-location">Statistics Canada - Ottawa</div>
                <div className="latest-story-bias-bar">
                  <div className="bias-bar">
                    <div className="bias-segment left" style={{width: '40%'}}>
                      <span className="bias-text">Left 40%</span>
                    </div>
                    <div className="bias-segment center" style={{width: '40%'}}>
                      <span className="bias-text">Center 40%</span>
                    </div>
                    <div className="bias-segment right" style={{width: '20%'}}>
                      <span className="bias-text">Right 20%</span>
                    </div>
                  </div>
                  <div className="sources-count">8 sources</div>
                </div>
              </div>
              <img 
                src={articles[1]?.image || "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Retail"}
                alt="Economy news"
                className="latest-story-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Retail";
                }}
              />
            </div>

            {/* Article 3 */}
            <div className="latest-story-item" onClick={() => handleArticleClick(articles[2] || {})}>
              <div className="latest-story-content">
                <h3>Restore Cancelled Proms, Ontario Education Minister Urges School Boards</h3>
                <div className="latest-story-location">Ontario Politics - Toronto</div>
                <div className="latest-story-bias-bar">
                  <div className="bias-bar">
                    <div className="bias-segment left" style={{width: '85%'}}>
                      <span className="bias-text">Left 85%</span>
                    </div>
                    <div className="bias-segment center" style={{width: '10%'}}>
                      <span className="bias-text">Center 10%</span>
                    </div>
                    <div className="bias-segment right" style={{width: '5%'}}>
                      <span className="bias-text">Right 5%</span>
                    </div>
                  </div>
                  <div className="sources-count">13 sources</div>
                </div>
              </div>
              <img 
                src={articles[2]?.image || "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Education"}
                alt="Education news"
                className="latest-story-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Education";
                }}
              />
            </div>

            {/* Article 4 */}
            <div className="latest-story-item" onClick={() => handleArticleClick(articles[3] || {})}>
              <div className="latest-story-content">
                <h3>Surgeons remove up to 100 magnets from N. Zealand teen's gut</h3>
                <div className="latest-story-location">Officer - New Zealand</div>
                <div className="latest-story-bias-bar">
                  <div className="bias-bar">
                    <div className="bias-segment left" style={{width: '30%'}}>
                      <span className="bias-text">Left 30%</span>
                    </div>
                    <div className="bias-segment center" style={{width: '26%'}}>
                      <span className="bias-text">Center 26%</span>
                    </div>
                    <div className="bias-segment right" style={{width: '44%'}}>
                      <span className="bias-text">Right 44%</span>
                    </div>
                  </div>
                  <div className="sources-count">36 sources</div>
                </div>
              </div>
              <img 
                src={articles[3]?.image || "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Health"}
                alt="Health news"
                className="latest-story-image"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x60/1a1a1a/ffffff?text=Health";
                }}
              />
            </div>
          </div>
        </div>
      </div>

{/* THIN WHITE LINE SEPARATOR */}
<div className="full-width-separator"></div>

{/* NEW SECTION: CANADIAN POLITICS NEWS - 60% left, 40% right */}
<div className="canadian-politics-container">
  <div className="canadian-politics-left">
    <div className="section-header">
      <h2>Canadian Politics News</h2>
      <div className="section-subtitle">Latest Canadian Politics News</div>
    </div>

    <div className="canadian-politics-content">
      {/* Main Article */}
      <div className="main-canadian-article" onClick={() => handleArticleClick(articles[0] || {})}>
        <img 
          src={articles[0]?.image || "https://via.placeholder.com/600x300/1a1a1a/ffffff?text=Canadian+Politics"}
          alt="Canadian Politics"
          className="main-canadian-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x300/1a1a1a/ffffff?text=Canadian+Politics";
          }}
        />
        <div className="main-canadian-content">
          <h3 className="article-title">Canadians rally around baseball's Blue Jays after Trump trade outburst</h3>
          <div className="canadian-bias-bar">
            <div className="bias-bar">
              <div className="bias-segment left" style={{width: '45%'}}>
                <span className="bias-text">Left 45%</span>
              </div>
              <div className="bias-segment center" style={{width: '35%'}}>
                <span className="bias-text">Center 35%</span>
              </div>
              <div className="bias-segment right" style={{width: '20%'}}>
                <span className="bias-text">Right 20%</span>
              </div>
            </div>
            <div className="sources-count">12 sources</div>
          </div>
        </div>
      </div>

      {/* Side Articles */}
      <div className="side-canadian-articles">
        <div className="side-canadian-article" onClick={() => handleArticleClick(articles[1] || {})}>
          <img 
            src={articles[1]?.image || "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Politics"}
            alt="Canadian Politics"
            className="side-canadian-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Politics";
            }}
          />
          <div className="side-canadian-content">
            <h4 className="article-title">Carney says Canada will arrest Netanyahu if he visits, in keeping with ICC warrant</h4>
            <div className="canadian-bias-bar">
              <div className="compact-bias-bar">
                <div className="compact-bias-left" style={{width: '55%'}}></div>
                <div className="compact-bias-center" style={{width: '25%'}}></div>
                <div className="compact-bias-right" style={{width: '20%'}}></div>
              </div>
              <span className="sources-count">8 sources</span>
            </div>
          </div>
        </div>
        
        <div className="side-canadian-article" onClick={() => handleArticleClick(articles[2] || {})}>
          <img 
            src={articles[2]?.image || "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Politics"}
            alt="Canadian Politics"
            className="side-canadian-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x120/1a1a1a/ffffff?text=Politics";
            }}
          />
          <div className="side-canadian-content">
            <h4 className="article-title">Carney challenges Trump to make a bet on the World Series as Canada's team...</h4>
            <div className="canadian-bias-bar">
              <div className="compact-bias-bar">
                <div className="compact-bias-left" style={{width: '40%'}}></div>
                <div className="compact-bias-center" style={{width: '40%'}}></div>
                <div className="compact-bias-right" style={{width: '20%'}}></div>
              </div>
              <span className="sources-count">6 sources</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="canadian-politics-right">
    {/* Lens+ Section */}
    <div className="lens-plus-section">
      <div className="lens-header">
        <h3>Lens+</h3>
        <p>Our version of blind spots - helping you see beyond your media bubble</p>
      </div>
      
      <div className="newsletter-signup">
        <p>Get the weekly Lens+ report sent to your inbox and stay up to date with your bias blindspot.</p>
        <div className="signup-form">
          <input type="email" placeholder="Email address" className="email-input" />
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>

    {/* Under the Radar Section - Separate from Lens+ */}
    <div className="under-radar-section">
      <div className="under-radar-header">
        <h3>Under the Radar</h3>
        <p>Important but underreported Canadian stories</p>
      </div>
      
      <div className="under-radar-content">
        <p className="under-radar-description">
          While national outlets focused on housing, local papers covered a massive education policy shift in Saskatchewan.
        </p>
        <div className="under-radar-stats">
          <span className="coverage-gap">Coverage Gap: 85%</span>
          <span className="local-sources">12 local sources</span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* THIN WHITE LINE SEPARATOR */}
<div className="full-width-separator"></div>

{/* NEW SECTION: NAVIGATION SIDEBAR AND FOOTER */}
<div className="footer-container">
  {/* Navigation Sidebar */}
  <div className="nav-sidebar">
    <div className="nav-section">
      <h4>News</h4>
      <ul>
        <li>Home Page</li>
        <li>Local News</li>
        <li>Blindspot Feed</li>
        <li>International</li>
      </ul>
    </div>

    <div className="nav-section">
      <h4>International</h4>
      <ul>
        <li>North America</li>
        <li>South America</li>
        <li>Europe</li>
        <li>Asia</li>
        <li>Australia</li>
        <li>Africa</li>
      </ul>
    </div>

    <div className="nav-section">
      <h4>Trending International</h4>
      <ul>
        <li>Halloween</li>
        <li>Toronto Blue Jays</li>
        <li>Los Angeles Dodgers</li>
        <li>Government Shutdown</li>
        <li>Donald Trump</li>
      </ul>
    </div>

    <div className="nav-section">
      <h4>Trending in U.S.</h4>
      <ul>
        <li>Israel-Gaza</li>
        <li>Government Shutdown</li>
        <li>Halloween</li>
        <li>NBA</li>
        <li>Basketball</li>
      </ul>
    </div>

    <div className="nav-section">
      <h4>Trending in U.K.</h4>
      <ul>
        <li>Israel-Gaza</li>
        <li>Premier League</li>
        <li>Manchester United</li>
        <li>Arsenal FC</li>
        <li>NHS</li>
      </ul>
    </div>
  </div>

  {/* Footer */}
  <div className="main-footer">
    <div className="footer-column">
      <h5>Company</h5>
      <ul>
        <li>About</li>
        <li>History</li>
        <li>Mission</li>
        <li>Blog</li>
        <li>Testimonials</li>
        <li>Group Subscriptions</li>
        <li>Subscribe</li>
        <li>Gift</li>
        <li>Free Trial</li>
        <li>Careers</li>
        <li>Affiliates</li>
      </ul>
    </div>

    <div className="footer-column">
      <h5>Help</h5>
      <ul>
        <li>Help Center</li>
        <li>FAQ</li>
        <li>Contact Us</li>
        <li>For Educators/Libraries</li>
        <li>Media Bias Ratings</li>
        <li>Ownership and Factuality Ratings</li>
        <li>Referral Code</li>
        <li>News Sources</li>
        <li>Topics</li>
      </ul>
    </div>

    <div className="footer-column">
      <h5>Tools</h5>
      <ul>
        <li>App</li>
        <li>Browser Extension</li>
        <li>Daily Newsletter</li>
        <li>Blindspot Report Newsletter</li>
        <li>Burst Your Bubble Newsletter</li>
        <li>Timelines</li>
      </ul>
    </div>

    <div className="footer-column">
      <h5>Legal</h5>
      <ul>
        <li>Privacy Policy</li>
        <li>Manage Cookies</li>
        <li>Privacy Preferences</li>
        <li>Terms and Conditions</li>
      </ul>
    </div>

    <div className="footer-column">
      <h5>Canada</h5>
      <ul>
        <li>Canadian Edition</li>
        <li>Local Coverage</li>
        <li>Regional News</li>
      </ul>
    </div>

    {/* Logo Section - Positioned to the right */}
    <div className="logo-section">
      <div className="truthlens-logo">TRUTHLENS</div>
      <div className="logo-tagline">See beyond the bias</div>
    </div>
  </div>
</div>
    </div>
  );
};

export default HomePage;