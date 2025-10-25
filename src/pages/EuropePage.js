import React, { useState, useEffect } from 'react';
import './EuropePage.css';

const EuropePage = () => {
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
                    title: "EU Economic Summit Results",
                    country: "European Union",
                    summary: "Key decisions from the latest economic summit in Brussels",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    title: "UK Post-Brexit Trade",
                    country: "United Kingdom",
                    summary: "Latest developments in UK international trade agreements",
                    date: "2025-01-19"
                }
            ];
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="europe-page">
            <div className="page-header">
                <h1>Europe</h1>
                <p>News from across the European continent</p>
            </div>

            {loading ? (
                <div className="loading">Loading European news...</div>
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

export default EuropePage;