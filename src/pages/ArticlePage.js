import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api"; // IMPORT YOUR API
import ComparisonSelector from "../components/ComparisonSelector";
import "./ArticlePage.css";

const ArticlePage = () => {
  const { articleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { article } = location.state || {};
  const [showComparison, setShowComparison] = useState(false);
  const [activePerspective, setActivePerspective] = useState("center");
  const [showBiasComparison, setShowBiasComparison] = useState(false);
  const [activeBias, setActiveBias] = useState("all");
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Get REAL related articles using YOUR EXACT API
  useEffect(() => {
    const findRelatedArticles = async () => {
      if (!article) return;
      
      try {
        setLoading(true);
        
        // Use the SAME API as your homepage to get ALL articles
        const response = await api.getArticles("general"); // Get all articles
        
        if (response.status === "success" && response.articles) {
          const allArticles = response.articles;
          
          // Filter to find articles that are ACTUALLY related to the current one
          const related = allArticles.filter(otherArticle => {
            // Don't include the current article itself
            if (otherArticle.id === article.id) return false;
            
            // Check if articles are related by topic/keywords
            return areArticlesRelated(article, otherArticle);
          });
          
          setRelatedArticles(related.slice(0, 15)); // Limit to 15 most relevant
        } else {
          setRelatedArticles([]);
        }
        
      } catch (error) {
        console.error('Error finding related articles:', error);
        setRelatedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    findRelatedArticles();
  }, [article]);

  // Smart function to determine if articles are actually related
  const areArticlesRelated = (article1, article2) => {
    const title1 = article1.title.toLowerCase();
    const title2 = article2.title.toLowerCase();
    const desc1 = article1.description?.toLowerCase() || "";
    const desc2 = article2.description?.toLowerCase() || "";
    
    // Extract main topics from both articles
    const topics1 = extractTopics(title1 + " " + desc1);
    const topics2 = extractTopics(title2 + " " + desc2);
    
    // Check if they share significant topics
    const commonTopics = topics1.filter(topic => 
      topics2.some(t => t.includes(topic) || topic.includes(t))
    );
    
    // If they share at least 2 main topics, consider them related
    return commonTopics.length >= 2;
  };

  // Extract main topics from text
  const extractTopics = (text) => {
    const commonWords = ['the', 'and', 'for', 'with', 'that', 'this', 'have', 'from', 'what', 'about', 'their', 'would'];
    const words = text.split(/\W+/)
      .filter(word => word.length > 4 && !commonWords.includes(word.toLowerCase()))
      .slice(0, 8); // Take top 8 meaningful words
    
    return [...new Set(words)]; // Remove duplicates
  };

  if (!article) {
    return (
      <div className="article-page">
        <div className="error-state">
          <h2>Article Not Found</h2>
          <p>The article you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/")} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  const handleBookmarkClick = () => {
    if (!isAuthenticated) return;
    console.log('Bookmark article:', article.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleShowLess = () => {
    console.log('Show less clicked');
  };

  // Process REAL articles from YOUR API
  const getArticlesData = () => {
    if (loading) {
      return {
        stats: { total: 0, left: 0, center: 0, right: 0 },
        articles: []
      };
    }

    // Categorize REAL articles using your actual data
    const categorizedArticles = relatedArticles.map((article) => {
      // Use the SAME bias detection as your homepage
      const bias = detectBias(article);
      const factuality = detectFactuality(article);
      
      return {
        id: article.id,
        source: article.source?.name || "Unknown Source",
        bias: bias,
        factuality: factuality,
        title: article.title,
        snippet: article.description || "Read the full article for more details.",
        date: formatDate(article.publishedAt),
        url: article.url,
        image: article.image
      };
    });

    // Count ACTUAL numbers from real related articles
    const leftCount = categorizedArticles.filter(a => a.bias === "left").length;
    const centerCount = categorizedArticles.filter(a => a.bias === "center").length;
    const rightCount = categorizedArticles.filter(a => a.bias === "right").length;
    const totalCount = categorizedArticles.length;

    return {
      stats: {
        total: totalCount,
        left: leftCount,
        center: centerCount,
        right: rightCount
      },
      articles: categorizedArticles
    };
  };

  // Your bias detection logic (should match what you use elsewhere)
  const detectBias = (article) => {
    const sourceName = article.source?.name || "";
    
    // Left-leaning sources
    if (["CNN", "MSNBC", "The New York Times", "The Guardian", "NPR", "BBC News"]
      .some(s => sourceName.toLowerCase().includes(s.toLowerCase()))) {
      return "left";
    }
    
    // Right-leaning sources  
    if (["Fox News", "New York Post", "Washington Examiner", "The Federalist", "Wall Street Journal"]
      .some(s => sourceName.toLowerCase().includes(s.toLowerCase()))) {
      return "right";
    }
    
    // Center sources
    if (["Reuters", "Associated Press", "PBS News", "USA Today"]
      .some(s => sourceName.toLowerCase().includes(s.toLowerCase()))) {
      return "center";
    }
    
    // Fallback to center if unknown
    return "center";
  };

  // Your factuality detection
  const detectFactuality = (article) => {
    const highFactualitySources = ["Reuters", "Associated Press", "BBC News", "PBS News"];
    const sourceName = article.source?.name || "";
    
    return highFactualitySources.some(s => 
      sourceName.toLowerCase().includes(s.toLowerCase())
    ) ? "high" : "mixed";
  };

  const perspectives = getPerspectivePoints();
  const articlesData = getArticlesData();
  const filteredArticles = activeBias === "all" 
    ? articlesData.articles 
    : articlesData.articles.filter(article => article.bias === activeBias);

  const handleReadFullArticle = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="article-page">
      <div className="article-container">
        <main className="article-main-content">
          {/* Article Header with Meta Info */}
          <div className="article-header-meta">
            <div className="publish-info">
              <span className="publish-time">Published {formatDate(article.publishedAt)}</span>
              <span className="location">{article.country || "International"}</span>
              <span className="update-info">Updated recently</span>
            </div>
            <div className="top-actions">
              <div className="social-share">
                <button className="social-btn facebook" title="Share on Facebook">f</button>
                <button className="social-btn linkedin" title="Share on LinkedIn">in</button>
                <button className="social-btn twitter" title="Share on X">X</button>
                <button className="social-btn reddit" title="Share on Reddit">r</button>
                <button className="social-btn email" title="Share via Email">@</button>
                <button className="social-btn more" title="More options">···</button>
              </div>
              <div className="vertical-divider"></div>
              <div className="action-icons">
                <button className="icon-btn link" onClick={handleShare} title="Copy link">
                  🔗
                </button>
                <button 
                  className={`icon-btn save ${!isAuthenticated ? 'disabled' : ''}`}
                  onClick={handleBookmarkClick}
                  disabled={!isAuthenticated}
                  title={isAuthenticated ? "Save article" : "Sign in to save"}
                >
                  ★
                </button>
                <button className="icon-btn less" onClick={handleShowLess} title="Show me less like this">
                  −
                </button>
              </div>
            </div>
          </div>

          {/* Article Title */}
          <h1 className="article-title">
            {article.title}
          </h1>

          {/* Article Image */}
          {article.image && (
            <div className="article-image">
              <img 
                src={article.image} 
                alt={article.title}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Article+Image";
                }}
              />
            </div>
          )}

          {/* PERSPECTIVE SECTIONS */}
          <div className="perspectives-nav-ground">
            <div className="perspective-tabs-ground">
              <button 
                className={`perspective-tab-ground ${activePerspective === "left" ? "active left" : ""}`}
                onClick={() => setActivePerspective("left")}
              >
                Left
              </button>
              <button 
                className={`perspective-tab-ground ${activePerspective === "center" ? "active center" : ""}`}
                onClick={() => setActivePerspective("center")}
              >
                Center
              </button>
              <button 
                className={`perspective-tab-ground ${activePerspective === "right" ? "active right" : ""}`}
                onClick={() => setActivePerspective("right")}
              >
                Right
              </button>
            </div>
            <button 
              className={`bias-comparison-btn-ground ${showBiasComparison ? "active" : ""}`}
              onClick={() => setShowBiasComparison(!showBiasComparison)}
            >
              Bias Comparison
            </button>
          </div>

          <div className="perspective-content">
            <h3 className="perspective-title">
              {activePerspective.charAt(0).toUpperCase() + activePerspective.slice(1)} Perspective
            </h3>
            <div className="perspective-points">
              {perspectives[activePerspective].map((point, index) => (
                <div key={index} className="point-item">
                  <span className="point-bullet">•</span>
                  <p className="point-text">{point}</p>
                </div>
              ))}
            </div>
            <div className="ai-help">
              <span className="ai-label">this by Truth AI</span>
              <button className="help-btn">Does this summary seem wrong?</button>
            </div>
          </div>

          {/* REAL ARTICLES FROM YOUR API */}
          <div className="ground-articles-section">
            <div className="articles-stats">
              <h1 className="total-articles">{articlesData.stats.total} Articles</h1>
              <div className="bias-filter">
                <button className={`bias-filter-btn ${activeBias === "all" ? "active" : ""}`} onClick={() => setActiveBias("all")}>
                  All
                </button>
                <button className={`bias-filter-btn ${activeBias === "left" ? "active" : ""}`} onClick={() => setActiveBias("left")}>
                  Left {articlesData.stats.left}
                </button>
                <button className={`bias-filter-btn ${activeBias === "center" ? "active" : ""}`} onClick={() => setActiveBias("center")}>
                  Center {articlesData.stats.center}
                </button>
                <button className={`bias-filter-btn ${activeBias === "right" ? "active" : ""}`} onClick={() => setActiveBias("right")}>
                  Right {articlesData.stats.right}
                </button>
              </div>
            </div>

            <div className="articles-filters">
              <button className="filter-btn">Most Recent ▼</button>
              <button className="filter-btn">All Factuality ▼</button>
              <button className="filter-btn">National Locations ▼</button>
              <button className="filter-btn checkbox">
                <span className="checkbox-icon">☐</span>
                Hide Paywall Sources
              </button>
            </div>

            <div className="articles-list">
              {loading ? (
                <div className="loading-articles">Finding related articles...</div>
              ) : filteredArticles.length === 0 ? (
                <div className="no-articles">No related articles found for this story</div>
              ) : (
                filteredArticles.map((article) => (
                  <div key={article.id} className="article-card-ground">
                    <div className="article-source-info">
                      <span className="source-name">{article.source}</span>
                      <div className="article-meta-horizontal">
                        <span className={`factuality ${article.factuality}`}>
                          {article.factuality === "high" ? "High Factuality" : "Mixed Factuality"}
                        </span>
                        <span className={`source-bias ${article.bias}`}>{article.bias}</span>
                      </div>
                    </div>
                    <h3 className="article-title-ground">{article.title}</h3>
                    <p className="article-snippet">{article.snippet}</p>
                    <div className="article-footer">
                      <span className="publish-info">{article.date}</span>
                      <button 
                        className="read-full-btn" 
                        onClick={() => handleReadFullArticle(article.url)}
                      >
                        Read Full Article
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar with REAL counts */}
        <aside className="article-sidebar">
          <div className="sidebar-section">
            <h3>Coverage Details</h3>
            <div className="coverage-details-grid">
              <div className="coverage-detail-row">
                <span className="coverage-label">Total News Sources</span>
                <span className="coverage-value">{articlesData.stats.total}</span>
              </div>
              <div className="coverage-detail-row">
                <span className="coverage-label">Leaning Left</span>
                <span className="coverage-value">{articlesData.stats.left}</span>
              </div>
              <div className="coverage-detail-row">
                <span className="coverage-label">Leaning Right</span>
                <span className="coverage-value">{articlesData.stats.right}</span>
              </div>
              <div className="coverage-detail-row">
                <span className="coverage-label">Center</span>
                <span className="coverage-value">{articlesData.stats.center}</span>
              </div>
              <div className="coverage-detail-row">
                <span className="coverage-label">Last Updated</span>
                <span className="coverage-value">Just now</span>
              </div>
              <div className="coverage-detail-row">
                <span className="coverage-label">Bias Distribution</span>
                <span className="coverage-value">
                  {articlesData.stats.total > 0 ? Math.round((articlesData.stats.center / articlesData.stats.total) * 100) : 0}% Center
                </span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Bias Distribution</h3>
            <p className="distribution-note">
              {articlesData.stats.total > 0 ? Math.round((articlesData.stats.center / articlesData.stats.total) * 100) : 0}% of the sources are Center
            </p>
            <div className="ground-bias-table">
              <div className="bias-table-row">
                <span className="bias-label">
                  L {articlesData.stats.total > 0 ? Math.round((articlesData.stats.left / articlesData.stats.total) * 100) : 0}%
                </span>
                <span className="bias-label">
                  C {articlesData.stats.total > 0 ? Math.round((articlesData.stats.center / articlesData.stats.total) * 100) : 0}%
                </span>
                <span className="bias-label">
                  R {articlesData.stats.total > 0 ? Math.round((articlesData.stats.right / articlesData.stats.total) * 100) : 0}%
                </span>
              </div>
            </div>
            <div className="untracked-bias">
              <span>Untracked bias</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Perspective points function
const getPerspectivePoints = () => {
  return {
    left: [
      "This development represents a significant shift toward progressive policies that prioritize fair standards and environmental protections.",
      "The situation highlights the need for international cooperation and multilateral agreements rather than unilateral actions.",
      "The response demonstrates a commitment to diplomatic solutions and maintaining strong international partnerships."
    ],
    center: [
      "Key developments have occurred that impact international relations and economic policies.",
      "The situation involves complex negotiations and requires balanced approaches from all parties involved.",
      "Officials indicate progress has been made on specific issues before recent developments."
    ],
    right: [
      "Recent decisions reflect a strong stance against what some view as unfair practices and misleading campaigns.",
      "This action demonstrates a commitment to putting national interests first in international negotiations.",
      "The position emphasizes bilateral relationships where stronger negotiating leverage can be maintained."
    ]
  };
};

export default ArticlePage;