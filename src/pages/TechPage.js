import React, { useState, useEffect } from 'react';
import './TechPage.css';

const TechPage = () => {
    const [techNews, setTechNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTechNews();
    }, []);

    const fetchTechNews = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockNews = [
                {
                    id: 1,
                    title: "AI Breakthrough in Medical Research",
                    summary: "New AI model shows promising results in early disease detection with 95% accuracy",
                    date: "2025-01-20",
                    category: "Artificial Intelligence",
                    readTime: "4 min read"
                },
                {
                    id: 2,
                    title: "Quantum Computing Milestone Reached",
                    summary: "Scientists achieve new record in quantum bit stability, paving way for practical quantum computers",
                    date: "2025-01-19",
                    category: "Quantum Computing",
                    readTime: "6 min read"
                },
                {
                    id: 3,
                    title: "Cybersecurity Threats Evolve",
                    summary: "Latest report shows 40% increase in sophisticated phishing attacks targeting enterprises",
                    date: "2025-01-18",
                    category: "Cybersecurity",
                    readTime: "3 min read"
                }
            ];
            setTechNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="tech-page">
            <div className="page-header">
                <h1>Technology</h1>
                <p>Latest innovations, trends, and breakthroughs in the tech world</p>
            </div>

            {loading ? (
                <div className="loading">Loading tech news...</div>
            ) : (
                <div className="tech-news">
                    {techNews.map(article => (
                        <div key={article.id} className="tech-article">
                            <div className="article-category">{article.category}</div>
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>
                            <div className="article-meta">
                                <span className="date">{article.date}</span>
                                <span className="read-time">{article.readTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TechPage;