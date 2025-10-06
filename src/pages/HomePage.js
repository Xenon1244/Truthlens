import React from "react";

function HomePage() {
  const articles = [
    {
      id: 1,
      title: "Tech Giants Face New Regulations",
      description: "Lawmakers push for stronger oversight on AI development.",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 2,
      title: "Climate Change Intensifies",
      description: "Wildfires and floods increase as global temperatures rise.",
      image: "https://via.placeholder.com/250",
    },
    {
      id: 3,
      title: "Markets Rally After Uncertain Quarter",
      description: "Stocks rebound despite inflation concerns.",
      image: "https://via.placeholder.com/250",
    },
  ];

  return (
    <div className="content-container">
      <aside className="daily-news">
        <h3>The Daily News</h3>
        {articles.map((a) => (
          <div key={a.id} className="daily-item">
            <img src={a.image} alt={a.title} />
            <p>{a.title}</p>
          </div>
        ))}
      </aside>

      <main className="articles-section">
        {articles.map((article) => (
          <div key={article.id} className="article">
            <img src={article.image} alt={article.title} />
            <div className="text">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default HomePage;
