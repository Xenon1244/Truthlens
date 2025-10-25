import React, { useState, useEffect } from 'react';
import './BasketballPage.css';

const BasketballPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBasketballData();
    }, []);

    const fetchBasketballData = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockGames = [
                {
                    id: 1,
                    teams: "Lakers vs Celtics",
                    score: "105-98",
                    status: "FT",
                    league: "NBA"
                },
                {
                    id: 2,
                    teams: "Warriors vs Bulls",
                    score: "112-110",
                    status: "FT",
                    league: "NBA"
                },
                {
                    id: 3,
                    teams: "Heat vs Knicks",
                    score: "98-95",
                    status: "Q4 2:15",
                    league: "NBA"
                }
            ];
            setGames(mockGames);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="basketball-page">
            <div className="page-header">
                <h1>Basketball</h1>
                <p>NBA scores, news, and basketball updates</p>
            </div>

            {loading ? (
                <div className="loading">Loading basketball data...</div>
            ) : (
                <div className="games-container">
                    <h2>Recent Games</h2>
                    <div className="games-grid">
                        {games.map(game => (
                            <div key={game.id} className="game-card">
                                <div className="league-badge">{game.league}</div>
                                <div className="teams">{game.teams}</div>
                                <div className="score">{game.score}</div>
                                <div className={`game-status ${game.status.includes('Q') ? 'live' : 'final'}`}>
                                    {game.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasketballPage;