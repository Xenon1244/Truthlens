// context/NewsContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import { api } from '../services/api';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentCategory, setCurrentCategory] = useState('general');

  const getArticles = useCallback(async (category = 'general') => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.getArticles(category);
      
      if (response.status === 'success') {
        setArticles(response.articles);
        setCurrentCategory(category);
      } else {
        setError(response.message || 'Failed to load articles');
      }
    } catch (err) {
      setError('Network error: Could not fetch articles');
      console.error('News context error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchArticles = useCallback(async (query) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.searchArticles(query);
      
      if (response.status === 'success') {
        setArticles(response.articles);
      } else {
        setError(response.message || 'No results found');
      }
    } catch (err) {
      setError('Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getArticleById = useCallback(async (articleId) => {
    // Find article in current articles or fetch individually
    const article = articles.find(a => a.id === articleId);
    if (article) return article;

    // If not found, you could implement individual article fetch
    return null;
  }, [articles]);

  const value = {
    articles,
    loading,
    error,
    currentCategory,
    getArticles,
    searchArticles,
    getArticleById,
    setArticles
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};