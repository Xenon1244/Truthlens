import React from "react";
import "./Sidebar.css";

function Sidebar() {
  const categories = [
    "World",
    "Canada",
    "USA",
    "Politics",
    "Economy",
    "Trending",
    "Study Mode",
  ];

  return (
    <div className="sidebar">
      <h3>Categories</h3>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
