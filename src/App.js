import React, { useState } from "react";
import SidebarDropdown from "./SidebarDropdown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// PAGE IMPORTS
import HomePage from "./pages/HomePage";
import SportsPage from "./pages/SportsPage";
import TechPage from "./pages/TechPage";
import PoliticsPage from "./pages/PoliticsPage";
import LocalPage from "./pages/LocalPage";
import ForYouPage from "./pages/ForYouPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="App">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <div className="logo">TruthLens</div>
            <nav className="nav-buttons">
              <Link to="/">Home</Link>
              <Link to="/local">Local</Link>
              <Link to="/foryou">For You</Link>
              <Link to="/sports">Sports</Link>
              <Link to="/tech">Tech</Link>
              <Link to="/politics">Politics</Link>
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

        {/* TRENDS BAR */}
        <div className="trending-bar">
          <span className="trending-label">Trends</span>
          <div className="trending-filters">
            <span className="trending-item">Trump</span>
            <span className="trending-item">Carney</span>
            <span className="trending-item">Tariffs</span>
            <span className="trending-item">Elections</span>
            <span className="trending-item">AI</span>
            <span className="trending-item">Climate</span>
            <span className="trending-item">NBA</span>
            <span className="trending-item">Oscars</span>
            <span className="trending-item">Inflation</span>
            <span className="trending-item">Ukraine</span>
            <span className="trending-item">Economy</span>
            <span className="trending-item">War</span>
          </div>
        </div>

        {/* PAGE ROUTES */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/local" element={<LocalPage />} />
          <Route path="/foryou" element={<ForYouPage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/politics" element={<PoliticsPage />} />
        </Routes>

        {/* SIDEBAR OVERLAY */}
        {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

        {/* SIDEBAR */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={closeSidebar}>×</button>

          <div className="sidebar-section">
            <Link to="/" className="sidebar-item" onClick={closeSidebar}>Home</Link>
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
            <SidebarDropdown title="Sports" subItems={["Football","Soccer","Basketball","Hockey","Tennis","MMA","UFC"]} arrowDirection="left" />
            <SidebarDropdown title="Arts & Entertainment" subItems={["Hollywood","Celebrities","Public Criminal Cases"]} arrowDirection="left" />
            <SidebarDropdown title="Fact Checker" subItems={[]} arrowDirection="left" />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
