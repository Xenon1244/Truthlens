import React, { useState, useEffect } from 'react';
import './ElectionsPage.css';

const ElectionsPage = () => {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchElectionData();
    }, []);

    const fetchElectionData = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockElections = [
                {
                    id: 1,
                    country: "United States",
                    type: "Presidential Election",
                    date: "November 5, 2024",
                    status: "upcoming",
                    candidates: ["Candidate A", "Candidate B"]
                },
                {
                    id: 2,
                    country: "United Kingdom",
                    type: "General Election",
                    date: "January 2025",
                    status: "upcoming",
                    candidates: ["Party X", "Party Y"]
                },
                {
                    id: 3,
                    country: "Germany",
                    type: "Federal Election",
                    date: "Completed - Oct 2023",
                    status: "completed",
                    winner: "Current Coalition"
                }
            ];
            setElections(mockElections);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="elections-page">
            <div className="page-header">
                <h1>Elections</h1>
                <p>Global election coverage, results, and analysis</p>
            </div>

            {loading ? (
                <div className="loading">Loading election data...</div>
            ) : (
                <div className="elections-grid">
                    {elections.map(election => (
                        <div key={election.id} className={`election-card ${election.status}`}>
                            <div className="election-header">
                                <h3>{election.country}</h3>
                                <span className={`status ${election.status}`}>
                                    {election.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="election-type">{election.type}</div>
                            <div className="election-date">{election.date}</div>
                            {election.candidates && (
                                <div className="candidates">
                                    <strong>Candidates:</strong> {election.candidates.join(" vs ")}
                                </div>
                            )}
                            {election.winner && (
                                <div className="winner">
                                    <strong>Winner:</strong> {election.winner}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ElectionsPage;