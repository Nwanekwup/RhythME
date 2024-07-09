import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">RhythME</h1>
      <nav className="nav">
        <ul>
          <li>
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
