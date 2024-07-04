import React, { useState } from "react";
import "./TakeQuiz.css";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "I feel anxious most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel happy most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel motivated most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel calm most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel goofy most days",
    answers: [5, 4, 3, 2, 1],
  },
];

const TakeQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswerClick = (answer) => {
    setAnswers([...answers, answer]);
  };

  return (
    <div className="quiz-container">
      <header className="header">
        <h1>Music Personality Quiz</h1>
      </header>
      {questions[currentQuestion] && (
        <div className="option-question">
          <h3>{questions[currentQuestion].question}</h3>
        </div>
      )}
      {questions[currentQuestion] && (
        <div className="answer-options">
          {questions[currentQuestion].answers.map((answer) => (
            <button
              key={answer}
              className="answer-button"
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
      {currentQuestion < questions.length - 1 && (
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
};
export default TakeQuiz;
