import React from "react";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Homepage.css";

function Homepage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <Header />
      <div className="sidebar-container">
        <div className="profile-icon-container">
          <img src="profile-icon.png" alt="Profile Icon" />
        </div>
      </div>
      <div className="main-content-container">
        <h1>Welcome to RhythME!</h1>
        <button
          className="take-quiz-btn"
          onClick={() => navigate(`/take-quiz/${userId}`)}
        >
          <i className="fas fa-music">Find your match</i>
        </button>
      </div>
    </div>
  );
}

export default Homepage;
