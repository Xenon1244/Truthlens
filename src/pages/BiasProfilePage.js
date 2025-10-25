import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BiasProfilePage.css';

const BiasProfilePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "How important is government regulation in protecting the environment?",
      options: [
        { text: "Very important - strict regulations are necessary", value: -2 },
        { text: "Somewhat important - balanced approach needed", value: -1 },
        { text: "Neutral - depends on the situation", value: 0 },
        { text: "Limited importance - market solutions work better", value: 1 },
        { text: "Not important - regulations hurt the economy", value: 2 }
      ]
    },
    {
      id: 2,
      question: "What's your view on healthcare systems?",
      options: [
        { text: "Universal healthcare is a basic human right", value: -2 },
        { text: "Public option alongside private insurance", value: -1 },
        { text: "Mixed system with some government role", value: 0 },
        { text: "Mostly private with safety nets", value: 1 },
        { text: "Completely private, market-driven system", value: 2 }
      ]
    },
    {
      id: 3,
      question: "How should the government approach economic inequality?",
      options: [
        { text: "Strong wealth redistribution through taxes", value: -2 },
        { text: "Progressive taxation and social programs", value: -1 },
        { text: "Equal opportunity with some safety nets", value: 0 },
        { text: "Lower taxes to encourage growth", value: 1 },
        { text: "Minimal government intervention", value: 2 }
      ]
    },
    {
      id: 4,
      question: "What's your stance on immigration?",
      options: [
        { text: "Open borders with path to citizenship", value: -2 },
        { text: "Liberal immigration with integration support", value: -1 },
        { text: "Balanced approach based on needs", value: 0 },
        { text: "Strict vetting and merit-based", value: 1 },
        { text: "Very limited immigration", value: 2 }
      ]
    },
    {
      id: 5,
      question: "How should news media operate?",
      options: [
        { text: "Serve public interest, even with bias", value: -2 },
        { text: "Balance different perspectives", value: -1 },
        { text: "Strict neutrality and objectivity", value: 0 },
        { text: "Market-driven with diverse voices", value: 1 },
        { text: "Complete free market, no restrictions", value: 2 }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [currentQuestion]: value
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateBiasProfile(newAnswers);
    }
  };

  const calculateBiasProfile = (answerData) => {
    const values = Object.values(answerData);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    let biasLabel = 'Centrist';
    let biasDescription = 'You tend to view issues from multiple perspectives.';
    
    if (average < -1) {
      biasLabel = 'Progressive';
      biasDescription = 'You generally support social and economic reforms.';
    } else if (average < 0) {
      biasLabel = 'Lean Left';
      biasDescription = 'You tend to favor progressive approaches with some moderation.';
    } else if (average > 1) {
      biasLabel = 'Conservative';
      biasDescription = 'You generally support traditional approaches and limited government.';
    } else if (average > 0) {
      biasLabel = 'Lean Right';
      biasDescription = 'You tend to favor conservative approaches with some flexibility.';
    }

    const biasProfile = {
      biasScore: Math.round(average * 20),
      biasLabel,
      biasDescription,
      biasProfileCompleted: true,
      questionsAnswered: questions.length
    };

    updateUserProfile(biasProfile);
    setShowResults(true);
  };

  const handleContinue = () => {
    navigate('/for-you');
  };

  if (showResults) {
    const biasScore = answers ? Math.round(Object.values(answers).reduce((sum, val) => sum + val, 0) / questions.length * 20) : 0;
    
    return (
      <div className="bias-profile-page">
        <div className="bias-results">
          <h1>Your TruthLens Bias Profile</h1>
          <div className="bias-score">
            <div className="bias-meter">
              <div className="bias-scale">
                <span className="left-label">Progressive</span>
                <div className="bias-indicator" style={{ left: `${50 + biasScore}%` }}></div>
                <span className="right-label">Conservative</span>
              </div>
            </div>
            <div className="bias-info">
              <h3>Your Stance: {user?.biasLabel || 'Centrist'}</h3>
              <p>{user?.biasDescription || 'You view issues from multiple perspectives.'}</p>
            </div>
          </div>
          <button onClick={handleContinue} className="continue-btn">
            Continue to Your Personalized News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bias-profile-page">
      <div className="bias-questions">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="question-container">
          <h2>Help Personalize Your TruthLens Experience</h2>
          <p className="question-subtitle">
            Answer a few questions to help us understand your perspectives and show you more relevant content.
          </p>
          
          <div className="question-card">
            <h3>{questions[currentQuestion].question}</h3>
            <div className="options-list">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="option-btn"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
          
          <div className="question-counter">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasProfilePage;