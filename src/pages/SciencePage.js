import React, { useState, useEffect } from 'react';
import './SciencePage.css';

const SciencePage = () => {
    const [scienceNews, setScienceNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchScienceNews();
    }, []);

    const fetchScienceNews = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockNews = [
                {
                    id: 1,
                    title: "Climate Change Research Update",
                    field: "Environmental Science",
                    summary: "New models show accelerated warming patterns in polar regions",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    title: "Genetic Therapy Breakthrough",
                    field: "Medicine",
                    summary: "Successful trial of new gene editing technique for rare diseases",
                    date: "2025-01-19"
                }
            ];
            setScienceNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="science-page">
            <div className="page-header">
                <h1>Science</h1>
                <p>Latest research and developments across all scientific disciplines</p>
            </div>

            {loading ? (
                <div className="loading">Loading science news...</div>
            ) : (
                <div className="science-articles">
                    {scienceNews.map(article => (
                        <div key={article.id} className="science-article">
                            <div className="science-field">{article.field}</div>
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

export default SciencePage;