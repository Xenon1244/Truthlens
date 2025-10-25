import React, { useState, useEffect } from 'react';
import './IsraelPalestinePage.css';

const IsraelPalestinePage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const mockArticles = [
                {
                    id: 1,
                    title: "Latest Ceasefire Developments",
                    summary: "Recent diplomatic efforts and ground situation updates",
                    date: "2025-01-20",
                    source: "Middle East Monitor"
                },
                {
                    id: 2,
                    title: "Humanitarian Aid Update",
                    summary: "Current status of aid delivery and international response",
                    date: "2025-01-19",
                    source: "Global Relief Watch"
                }
            ];
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="israel-palestine-page">
            <div className="page-header">
                <h1>Israel-Palestine Conflict</h1>
                <p>Comprehensive coverage of the ongoing conflict and peace efforts</p>
            </div>
            
            {loading ? (
                <div className="loading">Loading latest updates...</div>
            ) : (
                <div className="articles-container">
                    {articles.map(article => (
                        <div key={article.id} className="conflict-article">
                            <h3>{article.title}</h3>
                            <p>{article.summary}</p>
                            <div className="article-footer">
                                <span className="source">{article.source}</span>
                                <span className="date">{article.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default IsraelPalestinePage;