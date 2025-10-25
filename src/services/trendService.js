// services/trendService.js

// Realistic trending topics with engagement metrics
const trendingTopicsData = {
  // Politics & Government
  politics: [
    { name: "Trump", count: 245, trend: "up", category: "politics" },
    { name: "Biden", count: 189, trend: "stable", category: "politics" },
    { name: "Elections", count: 167, trend: "up", category: "politics" },
    { name: "Immigration", count: 142, trend: "up", category: "politics" },
    { name: "Tax Reform", count: 98, trend: "down", category: "politics" },
    { name: "Healthcare", count: 134, trend: "stable", category: "politics" },
    { name: "Supreme Court", count: 156, trend: "up", category: "politics" },
    { name: "Congress", count: 121, trend: "stable", category: "politics" }
  ],
  
  // Economy & Business
  economy: [
    { name: "Inflation", count: 287, trend: "down", category: "economy" },
    { name: "Stock Market", count: 234, trend: "up", category: "economy" },
    { name: "Housing Market", count: 178, trend: "stable", category: "economy" },
    { name: "Jobs Report", count: 165, trend: "up", category: "economy" },
    { name: "Bitcoin", count: 198, trend: "up", category: "economy" },
    { name: "Gas Prices", count: 143, trend: "down", category: "economy" },
    { name: "Consumer Spending", count: 112, trend: "stable", category: "economy" }
  ],
  
  // Technology
  technology: [
    { name: "AI Regulation", count: 312, trend: "up", category: "tech" },
    { name: "Cybersecurity", count: 245, trend: "up", category: "tech" },
    { name: "Social Media", count: 189, trend: "stable", category: "tech" },
    { name: "Space News", count: 167, trend: "up", category: "tech" },
    { name: "Apple Event", count: 234, trend: "up", category: "tech" },
    { name: "Tesla", count: 198, trend: "stable", category: "tech" },
    { name: "Quantum Computing", count: 156, trend: "up", category: "tech" }
  ],
  
  // World News
  world: [
    { name: "Ukraine", count: 278, trend: "stable", category: "world" },
    { name: "Middle East", count: 245, trend: "up", category: "world" },
    { name: "Climate Summit", count: 267, trend: "up", category: "world" },
    { name: "Trade Deals", count: 134, trend: "down", category: "world" },
    { name: "UN Assembly", count: 178, trend: "up", category: "world" },
    { name: "Refugee Crisis", count: 156, trend: "stable", category: "world" }
  ],
  
  // Sports
  sports: [
    { name: "NBA Finals", count: 289, trend: "up", category: "sports" },
    { name: "Super Bowl", count: 312, trend: "up", category: "sports" },
    { name: "World Cup", count: 267, trend: "stable", category: "sports" },
    { name: "Olympics", count: 234, trend: "up", category: "sports" },
    { name: "MLB Playoffs", count: 189, trend: "up", category: "sports" },
    { name: "Soccer Transfers", count: 178, trend: "stable", category: "sports" }
  ],
  
  // Entertainment
  entertainment: [
    { name: "Oscars", count: 245, trend: "stable", category: "entertainment" },
    { name: "Streaming Wars", count: 198, trend: "up", category: "entertainment" },
    { name: "Celebrity News", count: 167, trend: "stable", category: "entertainment" },
    { name: "Movie Releases", count: 189, trend: "up", category: "entertainment" },
    { name: "Music Awards", count: 156, trend: "stable", category: "entertainment" }
  ],
  
  // Health & Science
  health: [
    { name: "COVID Variants", count: 134, trend: "down", category: "health" },
    { name: "Mental Health", count: 267, trend: "up", category: "health" },
    { name: "Climate Change", count: 312, trend: "up", category: "science" },
    { name: "Medical Breakthroughs", count: 189, trend: "stable", category: "science" },
    { name: "Vaccine Research", count: 156, trend: "down", category: "health" },
    { name: "Nutrition", count: 178, trend: "up", category: "health" }
  ]
};

// Get daily trending topics with variety
export const getDailyTrendingTopics = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0-6
  const dayOfMonth = today.getDate();
  
  // Mix categories based on day of week for variety
  const categoryMix = [
    ['politics', 'economy', 'technology', 'world'], // Sunday
    ['technology', 'sports', 'entertainment', 'health'], // Monday
    ['politics', 'world', 'economy', 'sports'], // Tuesday
    ['technology', 'health', 'entertainment', 'politics'], // Wednesday
    ['economy', 'sports', 'world', 'technology'], // Thursday
    ['entertainment', 'sports', 'health', 'politics'], // Friday
    ['world', 'economy', 'technology', 'entertainment'] // Saturday
  ];
  
  const todayCategories = categoryMix[dayOfWeek];
  
  // Get top topics from each category
  let allTopics = [];
  todayCategories.forEach(category => {
    const categoryTopics = trendingTopicsData[category] || [];
    // Take 2-3 topics from each category
    const count = 2 + (dayOfMonth % 2); // Alternate between 2 and 3
    allTopics.push(...categoryTopics.slice(0, count));
  });
  
  // Shuffle and return 8-10 topics
  const shuffled = allTopics.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 8 + (dayOfMonth % 3)); // 8-10 topics
};

// Get trending topics for specific category
export const getTrendingByCategory = (category) => {
  return trendingTopicsData[category]?.slice(0, 6) || [];
};

// Get all trending topics (for search/overview)
export const getAllTrendingTopics = () => {
  let allTopics = [];
  Object.values(trendingTopicsData).forEach(category => {
    allTopics.push(...category);
  });
  
  // Sort by count and return top 20
  return allTopics.sort((a, b) => b.count - a.count).slice(0, 20);
};

// Main export - gets today's trending topics
export const getTrendingTopics = () => {
  return getDailyTrendingTopics();
};