import { fetchNewsArticles } from './newsService';

const generateBiasData = () => {
  const left = Math.floor(Math.random() * 40) + 20;
  const center = Math.floor(Math.random() * 40) + 20;
  const right = Math.floor(Math.random() * 40) + 20;
  
  const total = left + center + right;
  return {
    left: Math.round((left / total) * 100),
    center: Math.round((center / total) * 100),
    right: Math.round((right / total) * 100)
  };
};

const transformArticle = (article, category) => {
  const biasData = generateBiasData();
  
  return {
    id: article.id || `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: article.title,
    description: article.description,
    content: article.description || 'Content not available. Click to read full article.',
    image: article.image,
    publishedAt: article.publishedAt,
    source: {
      name: article.source
    },
    sourceCount: Math.floor(Math.random() * 5) + 1,
    leaning: biasData,
    category: category
  };
};

const getFallbackArticles = (category) => {
  const fallbackData = {
    general: [
      {
        id: 'fallback-1',
        title: "Breaking News: Major Global Developments",
        description: "Stay informed with the latest updates from around the world covering significant events and trends.",
        content: "This is a comprehensive overview of current global events. For detailed coverage, please visit our full article section.",
        image: null,
        publishedAt: new Date().toISOString(),
        source: { name: "Global News Network" },
        sourceCount: 3,
        leaning: { left: 35, center: 40, right: 25 },
        category: 'general'
      }
    ]
  };
  return fallbackData[category] || fallbackData.general;
};

export const api = {
  getArticles: async (category = "general") => {
    try {
      console.log(`API: Fetching ${category} articles...`);
      
      const articles = await fetchNewsArticles(category);
      
      if (articles.length === 0) {
        return {
          status: "error",
          message: "No articles found",
          articles: []
        };
      }
      
      const transformedArticles = articles.map(article => 
        transformArticle(article, category)
      );
      
      return {
        status: "success",
        articles: transformedArticles,
        total: transformedArticles.length
      };
      
    } catch (error) {
      console.error("API Error in getArticles:", error);
      return {
        status: "error",
        message: error.message || "Failed to fetch articles",
        articles: getFallbackArticles(category)
      };
    }
  },

  getTopHeadlines: async () => {
    try {
      console.log('API: Fetching top headlines...');
      
      const articles = await fetchNewsArticles('general');
      
      if (articles.length === 0) {
        return {
          status: "error",
          message: "No headlines found",
          articles: []
        };
      }
      
      const transformedArticles = articles.map(article => 
        transformArticle(article, 'headlines')
      );
      
      return {
        status: "success",
        articles: transformedArticles,
        total: transformedArticles.length
      };
      
    } catch (error) {
      console.error("API Error in getTopHeadlines:", error);
      return {
        status: "error",
        message: error.message || "Failed to fetch headlines",
        articles: getFallbackArticles('general')
      };
    }
  },

  searchArticles: async (query, category = "general") => {
    try {
      console.log(`🔍 API: Searching for "${query}" in ${category}...`);
      
      const allArticles = await fetchNewsArticles(category);
      console.log('📰 All articles from fetchNewsArticles:', allArticles);
      
      const filteredArticles = allArticles.filter(article => {
        const title = article.title || '';
        const description = article.description || '';
        return (
          title.toLowerCase().includes(query.toLowerCase()) ||
          description.toLowerCase().includes(query.toLowerCase())
        );
      });
      
      console.log(`✅ Filtered articles for "${query}":`, filteredArticles);
      
      if (filteredArticles.length === 0) {
        console.log('❌ No articles found for query:', query);
        return {
          status: "error",
          message: `No results found for "${query}"`,
          articles: []
        };
      }
      
      const transformedArticles = filteredArticles.map(article => 
        transformArticle(article, category)
      );
      
      return {
        status: "success",
        articles: transformedArticles,
        total: transformedArticles.length,
        query: query
      };
      
    } catch (error) {
      console.error("❌ API Error in searchArticles:", error);
      return {
        status: "error",
        message: error.message || "Search failed",
        articles: []
      };
    }
  } 
};