import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SidebarDropdown.css';

const SidebarDropdown = ({ title, subItems = [], arrowDirection = "left", onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    console.log("Dropdown item clicked:", item);
    
    // Map sidebar items to actual routes
    const routeMap = {
      // Global Politics
      "Israel-Palestine Conflict": "/israel-palestine",
      "European Union News": "/european-union",
      "War in Ukraine": "/ukraine-war",
      "Elections": "/elections",
      
      // Finance
      "Stock Markets": "/stock-markets",
      "Oil & Gas": "/oil-gas",
      "Unemployment": "/unemployment",
      "Bank & Bitcoin": "/bank-bitcoin",
      
      // Science & Tech
      "Tech": "/tech",
      "New Technology": "/new-technology",
      "New Discoveries": "/new-discoveries",
      "Science": "/science",
      "Space News": "/space-news",
      
      // International News
      "North America": "/north-america",
      "South America": "/south-america",
      "Europe": "/europe",
      "Asia": "/asia",
      "Australia": "/australia",
      "Africa": "/africa",
      
      // Sports
      "Football": "/football",
      "Soccer": "/soccer",
      "Basketball": "/basketball",
      "Hockey": "/hockey",
      "Tennis": "/tennis",
      "MMA": "/mma",
      "UFC": "/ufc",
      
      // Arts & Entertainment
      "Hollywood": "/hollywood",
      "Celebrities": "/celebrities",
      "Public Criminal Cases": "/criminal-cases"
    };

    // Call the original onItemClick if provided
    if (onItemClick) {
      onItemClick(item);
    }

    // Navigate to the corresponding route
    if (routeMap[item]) {
      navigate(routeMap[item]);
    } else {
      console.warn(`No route mapped for: ${item}`);
    }
  };

  return (
    <div className="sidebar-dropdown">
      <div className="sidebar-item" onClick={toggleDropdown}>
        <span>{title}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>
          {arrowDirection === "left" ? '◀' : '▶'}
        </span>
      </div>
      
      {isOpen && subItems.length > 0 && (
        <div className="sub-items">
          {subItems.map((item, index) => (
            <div 
              key={index} 
              className="sidebar-subitem"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handleItemClick(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;