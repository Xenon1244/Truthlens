import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import SidebarDropdown from "./SidebarDropdown";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const articles = [
    { id: 1, title: "Tech Giants Face New Regulations", description: "Lawmakers push for stronger oversight on AI development.", image: "https://via.placeholder.com/250" },
    { id: 2, title: "Climate Change Intensifies", description: "Wildfires and floods increase as global temperatures rise.", image: "https://via.placeholder.com/250" },
    { id: 3, title: "Markets Rally After Uncertain Quarter", description: "Stocks rebound despite inflation concerns.", image: "https://via.placeholder.com/250" },
  ];

  const dailyNews = [
    { id: 1, title: "SpaceX launches new satellite", image: "https://via.placeholder.com/180" },
    { id: 2, title: "Election results shake Europe", image: "https://via.placeholder.com/180" },
    { id: 3, title: "New AI beats human benchmarks", image: "https://via.placeholder.com/180" },
  ];

  const trends = ["Trump", "Carney", "Tariffs", "AI", "Climate"];

  return (
    <div className="App">
      {/* HEADER */}
<header className="header">
  <div className="header-left">
    <div className="logo">TruthLens</div>
    <nav className="nav-buttons">
      <button>Home</button>
      <button>Local</button>
      <button>For You</button>
    </nav>
  </div>

  <div className="header-right">
    <input className="search-bar" type="text" placeholder="Search..." />
    <div className="auth-buttons">
      <button className="auth">Login</button>
      <button className="auth">Sign Up</button>
    </div>
    <button className="hamburger" onClick={toggleSidebar}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>


<div className="trending-bar">
  <span className="trending-label">Trends</span>
  <div className="trending-filters">
    <span className="trending-item">Trump</span>
    <span className="trending-item">Carney</span>
    <span className="trending-item">Tariffs</span>
    <span className="trending-item">Elections</span>
    <span className="trending-item">AI</span>
    <span className="trending-item">Climate</span>
    <span className="trending-item">Bitcoin</span>
    <span className="trending-item">SpaceX</span>
    <span className="trending-item">NBA</span>
    <span className="trending-item">Oscars</span>
    <span className="trending-item">Inflation</span>
    <span className="trending-item">Ukraine</span>
  </div>
</div>



      {/* MAIN CONTENT */}
      <div className="content-container">
        {/* LEFT COLUMN (DAILY NEWS) */}
        <aside className="daily-news">
          <h3>The Daily News</h3>
          {dailyNews.map(news => (
            <div key={news.id} className="daily-item">
              <img src={news.image} alt={news.title} />
              <p>{news.title}</p>
            </div>
          ))}
        </aside>

        {/* ARTICLES GRID */}
        <main className="articles-section">
          {articles.map(article => (
            <div key={article.id} className="article">
              <img src={article.image} alt={article.title} />
              <div className="text">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </div>
          ))}
        </main>
      </div>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={closeSidebar}>×</button>

        <div className="sidebar-section">
          <div className="sidebar-item">Home</div>
        </div>
        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-item">Login</div>
          <div className="sidebar-item">World News</div>
          <div className="sidebar-item">Breaking News</div>
        </div>
        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-item">Website Settings</div>
          <div className="sidebar-item">Contact</div>
        </div>
        <hr className="sidebar-divider" />

        <div className="sidebar-section">
          <SidebarDropdown title="Global Politics" subItems={["Israel-Palestine Conflict","European Union News","War in Ukraine","Elections"]} arrowDirection="left" />
          <SidebarDropdown title="Finance" subItems={["Stock Markets","Oil & Gas","Unemployment","Bank & Bitcoin"]} arrowDirection="left" />
          <SidebarDropdown title="Science & Tech" subItems={["Tech","New Technology","New Discoveries","Science","Space News"]} arrowDirection="left" />
          <SidebarDropdown title="Local News" subItems={[]} arrowDirection="left" />
          <SidebarDropdown title="International News" subItems={["North America","South America","Europe","Asia","Australia","Africa"]} arrowDirection="left" />
          <SidebarDropdown title="Sports" subItems={["Football","American Football","Soccer","Basketball","Baseball","Hockey","Tennis","Wrestling","MMA","Boxing","Golf","UFC"]} arrowDirection="left" />
          <SidebarDropdown title="Arts & Entertainment" subItems={["Hollywood","Celebrities","Public Criminal Cases"]} arrowDirection="left" />
          <SidebarDropdown title="Fact Checker" subItems={[]} arrowDirection="left" />
        </div>
      </div>
    </div>
  );
}

export default App;
