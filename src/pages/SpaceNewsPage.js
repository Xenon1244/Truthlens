import React, { useState, useEffect } from 'react';
import './SpaceNewsPage.css';

const SpaceNewsPage = () => {
    const [spaceNews, setSpaceNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSpaceNews();
    }, []);

    const fetchSpaceNews = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockNews = [
                {
                    id: 1,
                    title: "Mars Rover Makes New Discovery",
                    mission: "Perseverance Rover",
                    summary: "Ancient riverbed findings suggest past habitable conditions on Mars",
                    date: "2025-01-20",
                    type: "discovery"
                },
                {
                    id: 2,
                    title: "New Telescope Launch Successful",
                    mission: "James Webb Successor",
                    summary: "Next-generation space telescope begins operations with stunning first images",
                    date: "2025-01-19",
                    type: "mission"
                },
                {
                    id: 3,
                    title: "Asteroid Redirect Mission",
                    mission: "Planetary Defense",
                    summary: "NASA successfully tests asteroid deflection technology",
                    date: "2025-01-18",
                    type: "defense"
                }
            ];
            setSpaceNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-news-page">
            <div className="page-header">
                <h1>Space News</h1>
                <p>Latest discoveries, missions, and developments in space exploration</p>
            </div>

            {loading ? (
                <div className="loading">Loading space news...</div>
            ) : (
                <div className="space-articles">
                    {spaceNews.map(article => (
                        <div key={article.id} className={`space-article ${article.type}`}>
                            <div className="mission-name">{article.mission}</div>
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>
                            <div className="article-footer">
                                <span className="date">{article.date}</span>
                                <span className="article-type">{article.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SpaceNewsPage;