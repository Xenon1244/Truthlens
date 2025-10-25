import React, { useState, useEffect } from "react";
import SidebarDropdown from "./components/SidebarDropdown";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ArticleComparison from './components/articles/ArticleComparison';
import { AuthProvider, useAuth } from "./context/AuthContext";
import FactCheckPage from "./pages/FactCheckPage";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";

// PAGE IMPORTS
import HomePage from "./pages/HomePage";
import SportsPage from "./pages/SportsPage";
import TechPage from "./pages/TechPage";
import PoliticsPage from "./pages/PoliticsPage";
import LocalPage from "./pages/LocalPage";
import ForYouPage from "./pages/ForYouPage";
import BiasProfilePage from "./pages/BiasProfilePage";
import SearchPage from "./pages/SearchPage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AccountPage from "./pages/AccountPage";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentLocation, setCurrentLocation] = useState('Canada Edition');
  const [currentDate, setCurrentDate] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading } = useAuth();

  // Check which page we're on
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup';
  const isBiasProfilePage = location.pathname === '/bias-profile';
  const isAccountPage = location.pathname === '/account';

  // Progressive scroll detection - only for non-login pages
  useEffect(() => {
    if (isLoginPage || isAccountPage) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max((scrollY - 20) / 80, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoginPage, isAccountPage]);

  // Set current date - only for non-login pages
  useEffect(() => {
    if (isLoginPage || isAccountPage) return;
    
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, [isLoginPage, isAccountPage]);

  // Navigation guard for bias profile
  useEffect(() => {
    if (!loading && user && !user.biasProfileCompleted) {
      const allowedPaths = ['/bias-profile', '/login', '/signup', '/'];
      if (!allowedPaths.includes(location.pathname)) {
        navigate('/bias-profile');
      }
    }
  }, [user, loading, navigate, location]);

  // Initialize trending topics - only for non-login pages
  useEffect(() => {
    if (isLoginPage || isAccountPage) return;
    
    const getDynamicTrends = () => {
      const allTrends = [
        { name: "Ukraine", count: 42, category: "world", trend: "up" },
        { name: "Trump", count: 38, category: "politics", trend: "up" },
        { name: "Climate Summit", count: 25, category: "world", trend: "stable" },
        { name: "NBA Finals", count: 18, category: "sports", trend: "down" },
        { name: "Immigration", count: 35, category: "politics", trend: "down" },
        { name: "Cybersecurity", count: 28, category: "tech", trend: "up" },
        { name: "Stock Market", count: 45, category: "economy", trend: "up" },
        { name: "Tax Reform", count: 31, category: "politics", trend: "stable" },
        { name: "AI Regulation", count: 29, category: "tech", trend: "up" },
        { name: "Elections", count: 33, category: "politics", trend: "up" },
        { name: "Mental Health", count: 27, category: "health", trend: "up" },
      ];

      const shuffled = [...allTrends].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 8 + Math.floor(Math.random() * 4));
    };

    setTrendingTopics(getDynamicTrends());
  }, [isLoginPage, isAccountPage]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate("/");
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleTrendingClick = (topic) => {
    navigate(`/search?q=${encodeURIComponent(topic.name)}`);
  };

  const handleSidebarItemClick = (item) => {
    console.log("Sidebar item clicked:", item);
    closeSidebar();
    if (item === "Fact Checker") {
      navigate("/fact-check");
    }
  };

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
  };

  const handleLocationChange = () => {
    console.log('Location change triggered');
  };

  const handleEditionChange = () => {
    console.log('Edition change triggered');
  };

  const handleSubscribe = () => {
    console.log('Subscribe clicked');
  };

  const handleMyAccount = () => {
    navigate("/account");
  };

  // Calculate opacity and transform values based on scroll progress
  const topBarOpacity = 1 - scrollProgress;
  const mainNavOpacity = 1 - scrollProgress;
  const topBarTransform = `translateY(${-scrollProgress * 20}px)`;
  const mainNavTransform = `translateY(${-scrollProgress * 40}px)`;

  return (
    <div className={`App ${isLoginPage ? 'login-page-only' : ''} ${isAccountPage ? 'account-page-active' : ''}`}>
      {/* SHOW DIFFERENT HEADERS BASED ON PAGE */}
      {!isLoginPage && (
        <>
          {/* TRUTHLENS HEADER - ONLY FOR ACCOUNT PAGE */}
          {isAccountPage && (
            <div className="braid-header">
              <div className="braid-header-main">
                <div className="braid-container">
                  <div className="braid-left">
                    <h1 className="braid-logo">TruthLens</h1>
                  </div>
                  <div className="braid-right">
                    <nav className="braid-nav">
                      <Link to="/" className="braid-nav-link">BacktoHome</Link>
                      <Link to="/account" className="braid-nav-link">MyAccount</Link>
                      <Link to="/bias-profile" className="braid-nav-link">MyNewsBias</Link>
                      <Link to="/alerts" className="braid-nav-link">Alerts</Link>
                      <Link to="/discover" className="braid-nav-link">Discover Topics</Link>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NORMAL HEADER - FOR ALL OTHER PAGES EXCEPT ACCOUNT */}
          {!isAccountPage && (
            <div className="ground-news-header">
              {/* TOP BAR - Extension Theme, Date, Location - Fades out progressively */}
              <div 
                className="header-top-bar"
                style={{
                  opacity: topBarOpacity,
                  transform: topBarTransform,
                  pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
                }}
              >
                <div className="top-bar-container">
                  <div className="top-bar-left">
                    <span className="browser-extension-text" onClick={() => console.log('Browser Extension clicked')}>
                      Browser Extension
                    </span>
                    <span className="theme-label">Theme:</span>
                    <div className="theme-options">
                      <span 
                        className={`theme-option ${currentTheme === 'light' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        Light
                      </span>
                      <span 
                        className={`theme-option ${currentTheme === 'dark' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        Dark
                      </span>
                      <span 
                        className={`theme-option ${currentTheme === 'auto' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('auto')}
                      >
                        Auto
                      </span>
                    </div>
                  </div>
                  
                  <div className="top-bar-right">
                    <span className="current-date">{currentDate}</span>
                    <button className="location-button" onClick={handleLocationChange}>
                      Set Location
                    </button>
                    <span className="edition-separator">•</span>
                    <button className="edition-button" onClick={handleEditionChange}>
                      {currentLocation}
                    </button>
                  </div>
                </div>
              </div>

              {/* MAIN HEADER - Logo, Navigation, Search, Auth - Fades out progressively */}
              <div 
                className="main-navigation-header"
                style={{
                  opacity: mainNavOpacity,
                  transform: mainNavTransform,
                  pointerEvents: scrollProgress > 0.9 ? 'none' : 'auto'
                }}
              >
                <div className="nav-container">
                  <div className="nav-left">
                    <div className="logo" onClick={() => navigate('/')}>
                      TruthLens
                    </div>
                    <nav className="primary-nav">
                      <Link to="/" className="nav-item">Home</Link>
                      <Link to="/local" className="nav-item">Local</Link>
                      <Link to="/for-you" className="nav-item">For You</Link>
                    </nav>
                  </div>

                  <div className="nav-center">
                    <div className="search-container">
                      <input 
                        className="search-input" 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearch}
                      />
                    </div>
                  </div>

                  <div className="nav-right">
                    <div className="auth-section">
                      {user ? (
                        <>
                          <button className="auth-button subscribe" onClick={handleSubscribe}>
                            Subscribe
                          </button>
                          <button className="auth-button my-account" onClick={handleMyAccount}>
                            My Account
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="auth-button login" onClick={handleLogin}>Login</button>
                          <button className="auth-button subscribe" onClick={handleSubscribe}>
                            Subscribe
                          </button>
                        </>
                      )}
                    </div>
                    
                    <button className="menu-toggle" onClick={toggleSidebar}>
                      <span className="menu-bar"></span>
                      <span className="menu-bar"></span>
                      <span className="menu-bar"></span>
                    </button>
                  </div>
                </div>
              </div>

              {/* TRENDING BAR - EXACT GROUND NEWS STYLE - Becomes main header when scrolled */}
              {!isBiasProfilePage && (
                <div 
                  className={`trending-topics-bar ${scrollProgress > 0.1 ? 'sticky' : ''}`}
                  style={{
                    background: scrollProgress > 0.1 ? '#1a1a1a' : '#141414',
                    borderBottom: scrollProgress > 0.1 ? '1px solid #333' : '1px solid #333',
                    position: scrollProgress > 0.1 ? 'fixed' : 'static',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000
                  }}
                >
                  <div className="trending-container">
                    <span className="trending-label">Trending</span>
                    <div className="trending-topics">
                      {trendingTopics.map((topic, index) => (
                        <span 
                          key={`${topic.name}-${index}`}
                          className="trending-topic"
                          onClick={() => handleTrendingClick(topic)}
                        >
                          {topic.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* MAIN CONTENT AREA - SPECIAL CLASSES FOR DIFFERENT PAGES */}
      <div className={
        isLoginPage ? "login-page-wrapper" : 
        isAccountPage ? "main-content-wrapper account-page-active no-gap" : 
        "main-content-wrapper"
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/local" element={<LocalPage />} />
          <Route path="/for-you" element={<ForYouPage />} />
          <Route path="/bias-profile" element={<BiasProfilePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/politics" element={<PoliticsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/fact-check" element={<FactCheckPage />} />
          <Route path="/compare" element={<ArticleComparison />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/alerts" element={<div className="coming-soon">Alerts - Coming Soon</div>} />
          <Route path="/discover" element={<div className="coming-soon">Discover Topics - Coming Soon</div>} />
        </Routes>
      </div>

      {/* SIDEBAR OVERLAY - Only show if sidebar is open and not on login page */}
      {sidebarOpen && !isLoginPage && <div className="overlay" onClick={closeSidebar}></div>}

      {/* SIDEBAR - Only show if not on login page */}
      {!isLoginPage && (
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={closeSidebar}>×</button>

          <div className="sidebar-section">
            <Link to="/" className="sidebar-item" onClick={closeSidebar}>Home</Link>
          </div>
          <hr className="sidebar-divider" />

          <div className="sidebar-section">
            {user ? (
              <>
                <div className="sidebar-user-info">
                  <span>Welcome, {user.name}</span>
                  {user.biasLabel && user.biasLabel !== 'Not Set' && (
                    <span className="sidebar-bias-tag">{user.biasLabel}</span>
                  )}
                </div>
                <div className="sidebar-item" onClick={handleMyAccount}>My Account</div>
                <div className="sidebar-item" onClick={handleSubscribe}>Subscribe</div>
                <div className="sidebar-item" onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <>
                <div className="sidebar-item" onClick={handleLogin}>Login</div>
                <div className="sidebar-item" onClick={() => navigate('/signup')}>Sign Up</div>
                <div className="sidebar-item" onClick={handleSubscribe}>Subscribe</div>
              </>
            )}
            <div className="sidebar-item" onClick={() => handleSidebarItemClick('World News')}>World News</div>
            <div className="sidebar-item" onClick={() => handleSidebarItemClick('Breaking News')}>Breaking News</div>
          </div>
          <hr className="sidebar-divider" />

          <div className="sidebar-section">
            <div className="sidebar-item" onClick={() => handleSidebarItemClick('Website Settings')}>Website Settings</div>
            <div className="sidebar-item" onClick={() => handleSidebarItemClick('Contact')}>Contact</div>
          </div>
          <hr className="sidebar-divider" />

          <div className="sidebar-section">
            <SidebarDropdown 
              title="Global Politics" 
              subItems={["Israel-Palestine Conflict","European Union News","War in Ukraine","Elections"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="Finance" 
              subItems={["Stock Markets","Oil & Gas","Unemployment","Bank & Bitcoin"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="Science & Tech" 
              subItems={["Tech","New Technology","New Discoveries","Science","Space News"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="Local News" 
              subItems={[]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="International News" 
              subItems={["North America","South America","Europe","Asia","Australia","Africa"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="Sports" 
              subItems={["Football","Soccer","Basketball","Hockey","Tennis","MMA","UFC"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <SidebarDropdown 
              title="Arts & Entertainment" 
              subItems={["Hollywood","Celebrities","Public Criminal Cases"]} 
              arrowDirection="left" 
              onItemClick={handleSidebarItemClick}
            />
            <div 
              className="sidebar-item" 
              onClick={() => {
                navigate("/fact-check");
                closeSidebar();
              }}
            >
              Fact Checker
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap App with Router and AuthProvider
export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}