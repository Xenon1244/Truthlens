import React, { useState, useEffect } from 'react';
import './FootballPage.css';

const FootballPage = () => {
    const [matches, setMatches] = useState([]);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFootballData();
    }, []);

    const fetchFootballData = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockMatches = [
                {
                    id: 1,
                    teams: "Team A vs Team B",
                    score: "2-1",
                    status: "FT",
                    league: "Premier League"
                },
                {
                    id: 2,
                    teams: "Team C vs Team D",
                    score: "0-0",
                    status: "LIVE",
                    league: "Champions League"
                }
            ];

            const mockNews = [
                {
                    id: 1,
                    title: "Transfer Window Updates",
                    summary: "Latest player transfers and club negotiations",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    title: "Injury Report",
                    summary: "Key player injuries and recovery timelines",
                    date: "2025-01-19"
                }
            ];

            setMatches(mockMatches);
            setNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="football-page">
            <div className="page-header">
                <h1>Football</h1>
                <p>Latest scores, news, and updates from the world of football</p>
            </div>

            {loading ? (
                <div className="loading">Loading football data...</div>
            ) : (
                <>
                    <div className="matches-section">
                        <h2>Live Scores</h2>
                        <div className="matches-grid">
                            {matches.map(match => (
                                <div key={match.id} className="match-card">
                                    <div className="league">{match.league}</div>
                                    <div className="teams">{match.teams}</div>
                                    <div className="score">{match.score}</div>
                                    <div className={`status ${match.status.toLowerCase()}`}>
                                        {match.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="news-section">
                        <h2>Football News</h2>
                        <div className="news-grid">
                            {news.map(article => (
                                <div key={article.id} className="news-article">
                                    <h3>{article.title}</h3>
                                    <p>{article.summary}</p>
                                    <div className="article-date">{article.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FootballPage;