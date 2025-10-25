import React from 'react';
import './BiasIndicator.css';

const BiasIndicator = ({ leaning, size = 'medium', showLabels = true, showBar = true }) => {
  const getBiasType = () => {
    const { left, center, right } = leaning;
    if (left >= center && left >= right) return "left";
    if (center >= left && center >= right) return "center";
    return "right";
  };

  const getHighestBias = () => {
    const { left, center, right } = leaning;
    return Math.max(left, center, right);
  };

  const getBiasColor = (type) => {
    const colors = {
      left: '#60a5fa',
      center: '#4ade80',
      right: '#f87171'
    };
    return colors[type] || '#888';
  };

  const getBiasLabel = (type) => {
    const labels = {
      left: 'Left',
      center: 'Center',
      right: 'Right'
    };
    return labels[type] || type;
  };

  return (
    <div className={`bias-indicator bias-indicator-${size}`}>
      {showLabels && (
        <div className="bias-labels">
          <div className="bias-label">
            <div className="bias-dot left"></div>
            <span>Left {leaning.left}%</span>
          </div>
          <div className="bias-label">
            <div className="bias-dot center"></div>
            <span>Center {leaning.center}%</span>
          </div>
          <div className="bias-label">
            <div className="bias-dot right"></div>
            <span>Right {leaning.right}%</span>
          </div>
        </div>
      )}
      
      {showBar && (
        <div className="bias-bar">
          <div 
            className="bias-segment left" 
            style={{width: `${leaning.left}%`}}
            title={`Left: ${leaning.left}%`}
          ></div>
          <div 
            className="bias-segment center" 
            style={{width: `${leaning.center}%`}}
            title={`Center: ${leaning.center}%`}
          ></div>
          <div 
            className="bias-segment right" 
            style={{width: `${leaning.right}%`}}
            title={`Right: ${leaning.right}%`}
          ></div>
        </div>
      )}
      
      <div className="bias-summary">
        <div 
          className="bias-type"
          style={{ color: getBiasColor(getBiasType()) }}
        >
          {getHighestBias()}% {getBiasLabel(getBiasType())}
        </div>
      </div>
    </div>
  );
};

export default BiasIndicator;