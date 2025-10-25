import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' }
  ];

  return (
    <div className="theme-toggle">
      <button 
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Theme settings"
      >
        {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'Auto'}
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((themeOption) => (
            <button
              key={themeOption.id}
              className={`theme-option ${theme === themeOption.id ? 'active' : ''}`}
              onClick={() => {
                toggleTheme(themeOption.id);
                setIsOpen(false);
              }}
            >
              {themeOption.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;