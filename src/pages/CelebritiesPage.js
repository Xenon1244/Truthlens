import React, { useState, useEffect } from 'react';
import './CelebritiesPage.css';

const CelebritiesPage = () => {
    const [celebrityNews, setCelebrityNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCelebrityNews();
    }, []);

    const fetchCelebrityNews = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockNews = [
                {
                    id: 1,
                    celebrity: "Celebrity A",
                    news: "Announces new philanthropic foundation",
                    type: "philanthropy",
                    date: "2025-01-20"
                },
                {
                    id: 2,
                    celebrity: "Celebrity B",
                    news: "Stars in new advertising campaign",
                    type: "endorsement",
                    date: "2025-01-19"
                },
                {
                    id: 3,
                    celebrity: "Celebrity C",
                    news: "Attends major charity gala event",
                    type: "event",
                    date: "2025-01-18"
                }
            ];
            setCelebrityNews(mockNews);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="celebrities-page">
            <div className="page-header">
                <h1>Celebrities</h1>
                <p>Latest news and updates about your favorite stars</p>
            </div>

            {loading ? (
                <div className="loading">Loading celebrity news...</div>
            ) : (
                <div className="celebrity-news">
                    {celebrityNews.map(item => (
                        <div key={item.id} className="celebrity-item">
                            <div className="celebrity-name">{item.celebrity}</div>
                            <div className="news-type">{item.type}</div>
                            <p>{item.news}</p>
                            <div className="news-date">{item.date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CelebritiesPage;