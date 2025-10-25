import React, { useState, useEffect } from 'react';
import './NorthAmericaPage.css';

const NorthAmericaPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockArticles = [
                {
                    id: 1,
                    title: "US Economic Policy Update",
                    country: "United States",
                    summary: "Latest federal reserve decisions and economic indicators",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    title: "Canada Climate Initiative",
                    country: "Canada",
                    summary: "New environmental policies and green energy investments",
                    date: "2025-01-19"
                },
                {
                    id: 3,
                    title: "Mexico Trade Agreement",
                    country: "Mexico",
                    summary: "Updates on regional trade partnerships and economic cooperation",
                    date: "2025-01-18"
                }
            ];
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="north-america-page">
            <div className="page-header">
                <h1>North America</h1>
                <p>News and developments from the United States, Canada, and Mexico</p>
            </div>

            {loading ? (
                <div className="loading">Loading North America news...</div>
            ) : (
                <div className="regional-articles">
                    {articles.map(article => (
                        <div key={article.id} className="regional-article">
                            <div className="country-flag">{article.country}</div>
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

export default NorthAmericaPage;