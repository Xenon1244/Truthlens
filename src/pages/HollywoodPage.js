import React, { useState, useEffect } from 'react';
import './HollywoodPage.css';

const HollywoodPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHollywoodNews();
    }, []);

    const fetchHollywoodNews = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockNews = [
                {
                    id: 1,
                    title: "Oscar Nominations Announced",
                    category: "Awards",
                    summary: "Complete list of nominees for the 2025 Academy Awards",
                    date: "2025-01-20",
                    trending: true
                },
                {
                    id: 2,
                    title: "New Blockbuster Release",
                    category: "Movies",
                    summary: "Highly anticipated sci-fi film breaks opening weekend records",
                    date: "2025-01-19",
                    trending: true
                },
                {
                    id: 3,
                    title: "Streaming Service Mergers",
                    category: "Business",
                    summary: "Major streaming platforms announce consolidation plans",
                    date: "2025-01-18",
                    trending: false
                }
            ];
            setNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="hollywood-page">
            <div className="page-header">
                <h1>Hollywood</h1>
                <p>Movie news, celebrity updates, and entertainment industry coverage</p>
            </div>

            {loading ? (
                <div className="loading">Loading Hollywood news...</div>
            ) : (
                <div className="hollywood-news">
                    {news.map(article => (
                        <div key={article.id} className="hollywood-article">
                            {article.trending && <div className="trending-badge">TRENDING</div>}
                            <div className="article-category">{article.category}</div>
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>
                            <div className="article-date">{article.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HollywoodPage;