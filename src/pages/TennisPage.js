import React, { useState, useEffect } from 'react';
import './TennisPage.css';

const TennisPage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTennisData();
    }, []);

    const fetchTennisData = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockTournaments = [
                {
                    id: 1,
                    name: "Australian Open",
                    status: "ongoing",
                    matches: [
                        { players: "Player A vs Player B", round: "Quarterfinals", status: "Live" },
                        { players: "Player C vs Player D", round: "Quarterfinals", status: "Upcoming" }
                    ]
                },
                {
                    id: 2,
                    name: "ATP Tour",
                    status: "upcoming",
                    matches: [
                        { players: "Player E vs Player F", round: "Semifinals", status: "Scheduled" }
                    ]
                }
            ];
            setTournaments(mockTournaments);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="tennis-page">
            <div className="page-header">
                <h1>Tennis</h1>
                <p>Grand Slam tournaments and ATP/WTA tour updates</p>
            </div>

            {loading ? (
                <div className="loading">Loading tennis data...</div>
            ) : (
                <div className="tournaments-container">
                    {tournaments.map(tournament => (
                        <div key={tournament.id} className="tournament-card">
                            <div className="tournament-header">
                                <h3>{tournament.name}</h3>
                                <span className={`status ${tournament.status}`}>
                                    {tournament.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="matches-list">
                                {tournament.matches.map((match, index) => (
                                    <div key={index} className="match-item">
                                        <div className="players">{match.players}</div>
                                        <div className="match-details">
                                            <span className="round">{match.round}</span>
                                            <span className={`match-status ${match.status.toLowerCase()}`}>
                                                {match.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TennisPage;