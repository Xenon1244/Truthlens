// API Configuration
const API_CONFIG = {
  gnews: {
    key: process.env.REACT_APP_GNEWS_API_KEY || '9e498d0b494baaf84956a568df49671b',
    baseUrl: 'https://gnews.io/api/v4'
  },
  newsapi: {
    key: process.env.REACT_APP_NEWSAPI_KEY || '7867cb2cdbbd41ca9d05af42b51e1888',
    baseUrl: 'https://newsapi.org/v2'
  }
};

// Add debug to check if keys are loading
console.log('GNews API Key:', API_CONFIG.gnews.key ? 'Loaded' : 'MISSING');
console.log('NewsAPI Key:', API_CONFIG.newsapi.key ? 'Loaded' : 'MISSING');

// Map your categories to API categories
const categoryMapping = {
  general: 'general',
  technology: 'technology',
  sports: 'sports',
  politics: 'general',
  local: 'general'
};

// GNews API Implementation
const fetchFromGNews = async (category = 'general') => {
  try {
    const apiCategory = categoryMapping[category] || 'general';
    
    const url = `${API_CONFIG.gnews.baseUrl}/top-headlines?token=${API_CONFIG.gnews.key}&category=${apiCategory}&lang=en&max=10&country=us`;
    console.log('GNews URL:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map((article, index) => ({
        id: `gnews-${index}-${Date.now()}`,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.image,
        publishedAt: article.publishedAt,
        source: article.source?.name || 'Unknown Source'
      }));
    }
    throw new Error('No articles from GNews');
  } catch (error) {
    console.warn('GNews failed:', error.message);
    throw error;
  }
};

// NewsAPI Implementation
const fetchFromNewsAPI = async (category = 'general') => {
  try {
    const apiCategory = categoryMapping[category] || 'general';
    
    const url = `${API_CONFIG.newsapi.baseUrl}/top-headlines?apiKey=${API_CONFIG.newsapi.key}&category=${apiCategory}&language=en&pageSize=10&country=us`;
    console.log('NewsAPI URL:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map((article, index) => ({
        id: `newsapi-${index}-${Date.now()}`,
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source?.name || 'Unknown Source'
      }));
    }
    throw new Error('No articles from NewsAPI');
  } catch (error) {
    console.warn('NewsAPI failed:', error.message);
    throw error;
  }
};

// Main function with fallback logic
export const fetchNewsArticles = async (category = 'general') => {
  console.log(`Fetching ${category} news articles...`);
  
  try {
    console.log('Trying GNews API...');
    const articles = await fetchFromGNews(category);
    console.log(`Successfully loaded ${articles.length} articles from GNews`);
    return articles;
  } catch (gnewsError) {
    console.log('GNews failed, trying NewsAPI...');
    
    try {
      const articles = await fetchFromNewsAPI(category);
      console.log(`Successfully loaded ${articles.length} articles from NewsAPI`);
      return articles;
    } catch (newsapiError) {
      console.log('Both APIs failed, using fallback articles');
      return getFallbackArticles(category);
    }
  }
};

// Search functionality
export const searchNews = async (query) => {
  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&token=${API_CONFIG.gnews.key}&lang=en&max=10`;
    console.log('Search URL:', url);
    
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      if (data.articles && data.articles.length > 0) {
        return data.articles.map((article, index) => ({
          id: `search-${index}-${Date.now()}`,
          title: article.title,
          description: article.description,
          url: article.url,
          image: article.image,
          publishedAt: article.publishedAt,
          source: article.source?.name || 'Unknown Source'
        }));
      }
    }
  } catch (error) {
    console.warn('GNews search failed:', error);
  }
  
  return getFallbackArticles('search').filter(article => 
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.description.toLowerCase().includes(query.toLowerCase())
  );
};

// Basic fallback
const getFallbackArticles = (category) => {
  const baseArticles = [
    {
      id: 'fallback-1',
      title: "Latest News Updates",
      description: "Stay informed with current events and breaking news from around the world.",
      url: "#",
      image: null,
      publishedAt: new Date().toISOString(),
      source: "News Network"
    },
    {
      id: 'fallback-2',
      title: "Breaking News Alert",
      description: "Important developments happening now that affect global markets and communities.",
      url: "#",
      image: null,
      publishedAt: new Date().toISOString(),
      source: "Breaking News Network"
    }
  ];
  
  return baseArticles;
};