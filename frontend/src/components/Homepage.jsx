import React from "react";
import "../App.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

function Homepage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <p>This is the homepage.</p>
      <button onClick={() => navigate(`/take-quiz/${userId}`)}>
        Take Quiz
      </button>
    </div>
  );
}

export default Homepage;
