import React from 'react';
import "./TakeQuiz.css";
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
=======
import { useNavigate, useParams } from "react-router-dom";


const backendAddress = import.meta.env.VITE_BACKEND_ADDRESS;
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
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
=======
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
      const response = await fetch(`${backendAddress}/submit-answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answersData),
      });
      if (response.ok) {
        const data = await response.json();
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
>>>>>>> Stashed changes
        </div>
    )
}
export default TakeQuiz;