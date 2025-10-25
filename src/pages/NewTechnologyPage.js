import React, { useState, useEffect } from 'react';
import './NewTechnologyPage.css';

const NewTechnologyPage = () => {
    const [innovations, setInnovations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInnovations();
    }, []);

    const fetchInnovations = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockInnovations = [
                {
                    id: 1,
                    name: "Neural Interface Glasses",
                    description: "AR glasses that can be controlled with brain signals",
                    category: "Wearable Tech",
                    status: "prototype"
                },
                {
                    id: 2,
                    name: "Self-Healing Concrete",
                    description: "Building material that repairs its own cracks",
                    category: "Construction",
                    status: "testing"
                }
            ];
            setInnovations(mockInnovations);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="new-tech-page">
            <div className="page-header">
                <h1>New Technology</h1>
                <p>Cutting-edge innovations and emerging technologies</p>
            </div>

            {loading ? (
                <div className="loading">Loading new technologies...</div>
            ) : (
                <div className="innovations-grid">
                    {innovations.map(tech => (
                        <div key={tech.id} className="innovation-card">
                            <div className="tech-category">{tech.category}</div>
                            <h3>{tech.name}</h3>
                            <p>{tech.description}</p>
                            <div className={`status ${tech.status}`}>{tech.status}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewTechnologyPage;