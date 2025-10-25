import React, { useState, useEffect } from 'react';
import './UnemploymentPage.css';

const UnemploymentPage = () => {
    const [unemploymentData, setUnemploymentData] = useState([]);

    useEffect(() => {
        fetchUnemploymentData();
    }, []);

    const fetchUnemploymentData = async () => {
        const mockData = [
            { country: 'United States', rate: 3.8, previous: 3.9, trend: 'down' },
            { country: 'Euro Area', rate: 6.5, previous: 6.6, trend: 'down' },
            { country: 'United Kingdom', rate: 4.2, previous: 4.3, trend: 'down' },
            { country: 'Japan', rate: 2.6, previous: 2.5, trend: 'up' }
        ];
        setUnemploymentData(mockData);
    };

    return (
        <div className="unemployment-page">
            <div className="page-header">
                <h1>Unemployment</h1>
                <p>Global unemployment rates and trends</p>
            </div>

            <div className="unemployment-stats">
                {unemploymentData.map((item, index) => (
                    <div key={index} className="stat-item">
                        <div className="country">{item.country}</div>
                        <div className="rate-container">
                            <div className="current-rate">{item.rate}%</div>
                            <div className={`trend ${item.trend}`}>
                                {item.trend === 'up' ? '↗' : '↘'} {item.previous}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnemploymentPage;