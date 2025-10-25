import React, { useState, useEffect } from 'react';
import './NewDiscoveriesPage.css';

const NewDiscoveriesPage = () => {
    const [discoveries, setDiscoveries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDiscoveries();
    }, []);

    const fetchDiscoveries = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockDiscoveries = [
                {
                    id: 1,
                    title: "Deep Sea Species Discovery",
                    field: "Marine Biology",
                    summary: "Scientists discover 100+ new species in deep ocean trenches",
                    impact: "high"
                },
                {
                    id: 2,
                    title: "Ancient Civilization Findings",
                    field: "Archaeology",
                    summary: "New evidence reveals advanced ancient society in Amazon",
                    impact: "medium"
                }
            ];
            setDiscoveries(mockDiscoveries);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="discoveries-page">
            <div className="page-header">
                <h1>New Discoveries</h1>
                <p>Groundbreaking findings across all scientific fields</p>
            </div>

            {loading ? (
                <div className="loading">Loading discoveries...</div>
            ) : (
                <div className="discoveries-list">
                    {discoveries.map(discovery => (
                        <div key={discovery.id} className="discovery-item">
                            <div className="discovery-field">{discovery.field}</div>
                            <h3>{discovery.title}</h3>
                            <p>{discovery.summary}</p>
                            <div className={`impact ${discovery.impact}`}>
                                Impact: {discovery.impact.toUpperCase()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewDiscoveriesPage;