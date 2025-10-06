import React from "react";
import "./ArticleCard.css";

function ArticleCard({ article }) {
  const handleClick = () => {
    window.open(article.url, "_blank");
  };

  return (
    <div className="article-card" onClick={handleClick}>
      <h2 className="article-title">{article.title}</h2>
      <p className="article-content">{article.content}</p>
    </div>
  );
}

export default ArticleCard;
