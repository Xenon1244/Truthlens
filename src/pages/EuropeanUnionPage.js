import React, { useState, useEffect } from 'react';
import './EuropeanUnionPage.css';

const EuropeanUnionPage = () => {
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
                    title: "EU Parliament New Session",
                    summary: "Key legislation and debates in the new parliamentary session",
                    date: "2025-01-20",
                    source: "Brussels Insider"
                },
                {
                    id: 2,
                    title: "Economic Policy Updates",
                    summary: "Latest decisions from the European Central Bank and economic council",
                    date: "2025-01-19",
                    source: "Euro Finance Daily"
                }
            ];
            setArticles(mockArticles);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="eu-page">
            <div className="page-header">
                <h1>European Union News</h1>
                <p>Latest developments from Brussels and member states</p>
            </div>
            
            {loading ? (
                <div className="loading">Loading EU updates...</div>
            ) : (
                <div className="articles-container">
                    {articles.map(article => (
                        <div key={article.id} className="eu-article">
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

export default EuropeanUnionPage;