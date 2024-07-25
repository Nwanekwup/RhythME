import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>RhythME</h1>
      <nav className="navbar">
        <ul>
          <li><Link to={`/home/:userId`}>Home</Link></li>
          <li><Link to={`/search`}>Music Recommendations</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
