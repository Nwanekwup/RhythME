import React, { useEffect }from "react";
import "../App.css";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector('.homepage-container').style.opacity = '1';
  }, []);

  const handleLogOut = () => {
    navigate("/");
  };

  const handleSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="homepage-container">
      <Header />
      <div className="sidebar-container">
        <div className="profile-icon-container">
          <img src="profile-icon.png" alt="Profile Icon" />
        </div>
        <button className="log-out-btn" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <div className="main-content-container">
        <div className="welcome-message">
          <h1 className="welcome-text">Welcome to RhythME!</h1>
          <p>Discover music that matches your mood and personality.</p>
          <p>Take our personality quiz or explore our music recommendations!</p>
        </div>
        <div className="buttons-container">
          <button
            className="take-quiz-btn"
            onClick={() => navigate(`/take-quiz/${userId}`)}
            data-tooltip="Take the personality quiz to get personalized music recommendations!"
          >
            <i className="fas fa-music">Let's match your mood</i>
          </button>
          <button
            className="find-music-btn"
            onClick={handleSearchPage}
            data-tooltip="Find music recommendations based on your mood and preferences!"
          >
            <i className="fas fa-search">More Music</i>
          </button>
        </div>
      </div>
      <div className="background-image"></div>
    </div>
  );
}

export default Homepage;
