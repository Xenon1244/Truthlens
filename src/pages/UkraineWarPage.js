import React, { useState, useEffect } from 'react';
import './UkraineWarPage.css';

const UkraineWarPage = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWarUpdates();
    }, []);

    const fetchWarUpdates = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockUpdates = [
                {
                    id: 1,
                    title: "Frontline Situation Report",
                    location: "Eastern Front",
                    summary: "Latest developments in the ongoing conflict",
                    timestamp: "2 hours ago"
                },
                {
                    id: 2,
                    title: "International Support Update",
                    location: "Brussels",
                    summary: "New aid packages and diplomatic efforts",
                    timestamp: "5 hours ago"
                }
            ];
            setUpdates(mockUpdates);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="ukraine-war-page">
            <div className="page-header">
                <h1>War in Ukraine</h1>
                <p>Real-time updates and analysis of the conflict</p>
            </div>

            {loading ? (
                <div className="loading">Loading war updates...</div>
            ) : (
                <div className="updates-container">
                    {updates.map(update => (
                        <div key={update.id} className="war-update">
                            <div className="update-header">
                                <h3>{update.title}</h3>
                                <span className="location">{update.location}</span>
                            </div>
                            <p>{update.summary}</p>
                            <div className="update-footer">
                                <span className="timestamp">{update.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UkraineWarPage;