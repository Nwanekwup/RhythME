import React, { useRef, useState } from "react";
import "./TakeQuiz.css";
import { useNavigate, useParams } from "react-router-dom";

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
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answeredQuestions, setQuestion] = useState([]);

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswerClick = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);
    setQuestion([...answeredQuestions, questions[currentQuestion].question]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answersData = {
      userId: userId,
      answers: answers,
      questions: answeredQuestions,
    };
    try {
      const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;
      const response = await fetch(`${backendAddress}/submit-answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answersData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/home/${data.userId}`);
      }
    } catch (error) {
      console.error(error);
    }
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
          {questions[currentQuestion].answers.map((answer, index) => (
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
      {currentQuestion === questions.length - 1 && (
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};
export default TakeQuiz;
