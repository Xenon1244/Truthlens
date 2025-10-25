import React, { useState, useEffect } from 'react';
import './AsiaPage.css';

const AsiaPage = () => {
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
                    title: "China Economic Growth",
                    country: "China",
                    summary: "Latest GDP figures and economic policy directions",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    title: "India Technology Summit",
                    country: "India",
                    summary: "Major announcements from annual tech conference",
                    date: "2025-01-19"
                },
                {
                    id: 3,
                    title: "Japan Monetary Policy",
                    country: "Japan",
                    summary: "Central bank decisions and economic outlook",
                    date: "2025-01-18"
                }
            ];
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="asia-page">
            <div className="page-header">
                <h1>Asia</h1>
                <p>News and developments from across the Asian continent</p>
            </div>

            {loading ? (
                <div className="loading">Loading Asian news...</div>
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

export default AsiaPage;