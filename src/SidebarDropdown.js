import React, { useState } from "react";

export default function SidebarDropdown({ title, subItems }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar-dropdown">
      <div className="sidebar-item dropdown-title" onClick={() => setOpen(!open)}>
        {title} {subItems.length > 0 && <span className={`arrow ${open ? "open" : ""}`}>▶</span>}
      </div>
      {open && subItems.length > 0 && (
        <div className="sub-items">
          {subItems.map((sub, index) => (
            <div key={index} className="sidebar-subitem">{sub}</div>
          ))}
        </div>
      )}
    </div>
  );
}
