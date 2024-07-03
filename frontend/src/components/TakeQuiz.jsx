import React from 'react';
import "./TakeQuiz.css";
import { useNavigate } from 'react-router-dom';

const TakeQuiz = () => {
    
    return (
        <div className="quiz-container">
            <h1>Music Personality Quiz</h1>
            <p>Which of the following best describes your mood today?</p>
            <div className="answer-options">
                <button className="answer-button">Happy and Energized</button>
                <button className="answer-button">Relaxed and Calm</button>
                <button className="answer-button">Anxious and Overwhelmed</button>
            </div>
            <button className="next-button">Next</button>

        </div>
    )
}
export default TakeQuiz;