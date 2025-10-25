import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onNavigate }) => {
    const handleLinkClick = (sectionId) => {
        // Navigate to the section
        onNavigate(sectionId);
        
        // Close sidebar on mobile after a short delay
        setTimeout(() => {
            if (window.innerWidth <= 768) {
                onClose();
            }
        }, 300);
    };

    const handleBackdropClick = (e) => {
        // Only close if clicking the backdrop, not the sidebar content
        if (e.target.classList.contains('sidebar-backdrop')) {
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div 
                    className="sidebar-backdrop" 
                    onClick={handleBackdropClick}
                >
                    <div className="sidebar">
                        <div className="sidebar-header">
                            <h2>News Categories</h2>
                            <button className="close-btn" onClick={onClose}>×</button>
                        </div>
                        
                        <div className="sidebar-content">
                            {/* Global Politics Section */}
                            <div className="sidebar-section">
                                <h3>Global Politics</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('israel-palestine')}
                                            className="sidebar-link"
                                        >
                                            Israel-Palestine Conflict
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('eu-news')}
                                            className="sidebar-link"
                                        >
                                            European Union News
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('ukraine-war')}
                                            className="sidebar-link"
                                        >
                                            War in Ukraine
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('elections')}
                                            className="sidebar-link"
                                        >
                                            Elections
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Finance Section */}
                            <div className="sidebar-section">
                                <h3>Finance</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('stock-markets')}
                                            className="sidebar-link"
                                        >
                                            Stock Markets
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('oil-gas')}
                                            className="sidebar-link"
                                        >
                                            Oil & Gas
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('unemployment')}
                                            className="sidebar-link"
                                        >
                                            Unemployment
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('bank-bitcoin')}
                                            className="sidebar-link"
                                        >
                                            Bank & Bitcoin
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Science & Tech Section */}
                            <div className="sidebar-section">
                                <h3>Science & Tech</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('tech')}
                                            className="sidebar-link"
                                        >
                                            Tech
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('new-technology')}
                                            className="sidebar-link"
                                        >
                                            New Technology
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('new-discoveries')}
                                            className="sidebar-link"
                                        >
                                            New Discoveries
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('science')}
                                            className="sidebar-link"
                                        >
                                            Science
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('space-news')}
                                            className="sidebar-link"
                                        >
                                            Space News
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* International News Section */}
                            <div className="sidebar-section">
                                <h3>International News</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('north-america')}
                                            className="sidebar-link"
                                        >
                                            North America
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('south-america')}
                                            className="sidebar-link"
                                        >
                                            South America
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('europe')}
                                            className="sidebar-link"
                                        >
                                            Europe
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('asia')}
                                            className="sidebar-link"
                                        >
                                            Asia
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('australia')}
                                            className="sidebar-link"
                                        >
                                            Australia
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('africa')}
                                            className="sidebar-link"
                                        >
                                            Africa
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Sports Section */}
                            <div className="sidebar-section">
                                <h3>Sports</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('football')}
                                            className="sidebar-link"
                                        >
                                            Football
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('soccer')}
                                            className="sidebar-link"
                                        >
                                            Soccer
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('basketball')}
                                            className="sidebar-link"
                                        >
                                            Basketball
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('hockey')}
                                            className="sidebar-link"
                                        >
                                            Hockey
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('tennis')}
                                            className="sidebar-link"
                                        >
                                            Tennis
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('mma')}
                                            className="sidebar-link"
                                        >
                                            MMA
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('ufc')}
                                            className="sidebar-link"
                                        >
                                            UFC
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Arts & Entertainment Section */}
                            <div className="sidebar-section">
                                <h3>Arts & Entertainment</h3>
                                <ul>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('hollywood')}
                                            className="sidebar-link"
                                        >
                                            Hollywood
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('celebrities')}
                                            className="sidebar-link"
                                        >
                                            Celebrities
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('criminal-cases')}
                                            className="sidebar-link"
                                        >
                                            Public Criminal Cases
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={() => handleLinkClick('fact-checker')}
                                            className="sidebar-link"
                                        >
                                            Fact Checker
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;