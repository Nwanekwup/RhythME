import React from 'react';
import '../App.css';
import Header from "./Header"
import { useNavigate, useParams } from "react-router-dom";
import "./Homepage.css";
import Search from './Search';


function Homepage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
  }

  const handleSearchPage = () => {
    navigate('/search');
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="sidebar-container">
        <div className="profile-icon-container">
          <img src="profile-icon.png" alt="Profile Icon" />
          <button className="log-out-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <div className="main-content-container">
        <h1>Welcome to RhythME!</h1>
        <div className="buttons-container">
          <button
            className="take-quiz-btn"
            onClick={() => navigate(`/take-quiz/${userId}`)}
          >
            <i className="fas fa-music">Find your match</i>
          </button>
          <button
            className="find-music-btn"
            onClick={handleSearchPage}
          >
            <i className="fas fa-search">Find Music Recommendations</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homepage;


