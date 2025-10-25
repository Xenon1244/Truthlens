import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <h1 className="site-logo">TruthLens</h1>
        </div>

        <h1 className="login-title">Log in to your account</h1>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password" className="forgot-link">Forgot your password?</Link>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="signup-section">
          <p>Don't have a TruthLens account? <Link to="/signup" className="signup-link">Create one</Link></p>
        </div>

        <div className="divider">
          <span>Or</span>
        </div>

        <div className="social-login">
          <button className="social-button google-button">
            Continue with Google
          </button>
          
          <button className="social-button facebook-button">
            Continue with Facebook
          </button>
          
          <button className="social-button apple-button">
            Continue with Apple
          </button>
          
          <button className="social-button institution-button">
            Continue with Institution
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;