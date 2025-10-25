import React, { useState, useEffect } from 'react';
import './PublicCriminalCasesPage.css';

const PublicCriminalCasesPage = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        setLoading(true);
        setTimeout(() => {
            const mockCases = [
                {
                    id: 1,
                    title: "High-Profile Fraud Case",
                    defendant: "Business Executive",
                    status: "ongoing",
                    summary: "Major corporate fraud case enters third week of testimony",
                    update: "New evidence presented"
                },
                {
                    id: 2,
                    title: "Celebrity Assault Trial",
                    defendant: "Public Figure",
                    status: "verdict",
                    summary: "Jury reaches verdict in highly publicized case",
                    update: "Verdict to be announced tomorrow"
                },
                {
                    id: 3,
                    title: "Political Corruption Investigation",
                    defendant: "Government Official",
                    status: "investigation",
                    summary: "Ongoing investigation into alleged corruption scheme",
                    update: "New witnesses come forward"
                }
            ];
            setCases(mockCases);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="criminal-cases-page">
            <div className="page-header">
                <h1>Public Criminal Cases</h1>
                <p>Coverage of high-profile legal proceedings and investigations</p>
            </div>

            {loading ? (
                <div className="loading">Loading case information...</div>
            ) : (
                <div className="cases-container">
                    {cases.map(caseItem => (
                        <div key={caseItem.id} className={`case-card ${caseItem.status}`}>
                            <div className="case-header">
                                <h3>{caseItem.title}</h3>
                                <span className={`case-status ${caseItem.status}`}>
                                    {caseItem.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="defendant">Defendant: {caseItem.defendant}</div>
                            <p>{caseItem.summary}</p>
                            <div className="latest-update">
                                <strong>Latest:</strong> {caseItem.update}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicCriminalCasesPage;