import React, { useRef, useState } from "react";
import "./TakeQuiz.css";
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
  {
    question: "I feel energetic most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel confident most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel creative most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel focused most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel stressed most days",
    answers: [5, 4, 3, 2, 1],
  },
  {
    question: "I feel romantic or in love most days",
    answers: [5, 4, 3, 2, 1],
  },
];

// define moods and their corresponding score
const determineMood = (answers) => {
  const moodScores = {
    Happy: 0,
    Sad: 0,
    Motivated: 0,
    Unmotivated: 0,
    Calm: 0,
    Anxious: 0,
    Playful: 0,
    Serious: 0,
    Energetic: 0,
    Tired: 0,
    Confident: 0,
    Insecure: 0,
    Creative: 0,
    Uninspired: 0,
    Focused: 0,
    Distracted: 0,
    Stressed: 0,
    Peaceful: 0,
    Romantic: 0,
    NotRomantic: 0,
  };

  // Map the questions to moods and update the scores
  answers.forEach((answer, index) => {
    switch (index) {
      case 0: // Anxiety Level
        moodScores.Anxious += answer;
        moodScores.Calm += 6 - answer;
        break;
      case 1: // Happiness
        moodScores.Happy += answer;
        moodScores.Sad += 6 - answer;
        break;
      case 2: // Motivation
        moodScores.Motivated += answer;
        moodScores.Unmotivated += 6 - answer;
        break;
      case 3: // Calmness
        moodScores.Calm += answer;
        moodScores.Anxious += 6 - answer;
        break;
      case 4: // Playfulness
        moodScores.Playful += answer;
        moodScores.Serious += 6 - answer;
        break;
      case 5: // Energy Levels
        moodScores.Energetic += answer;
        moodScores.Tired += 6 - answer;
        break;
      case 6: // Confidence
        moodScores.Confident += answer;
        moodScores.Insecure += 6 - answer;
        break;
      case 7: // Creativity
        moodScores.Creative += answer;
        moodScores.Uninspired += 6 - answer;
        break;
      case 8: // Focus
        moodScores.Focused += answer;
        moodScores.Distracted += 6 - answer;
        break;
      case 9: // Stress Levels
        moodScores.Stressed += answer;
        moodScores.Calm += 6 - answer;
        break;
      case 10: // Romantic Feelings
        moodScores.Romantic += answer;
        moodScores.NotRomantic += 6 - answer;
        break;
      default:
        break;
    }
  });

  //Determine the predominant mood
  const predominantMood = Object.keys(moodScores).reduce((a, b) =>
    moodScores[a] > moodScores[b] ? a : b
  );
  return predominantMood;
};

const TakeQuiz = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [answeredQuestions, setQuestion] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNextClick = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(answers[currentQuestion + 1] || null);
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleAnswerClick = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;
    setAnswers(updatedAnswers);

    const updatedQuestions = [...answeredQuestions];
    updatedQuestions[currentQuestion] = questions[currentQuestion].question;
    setQuestion(updatedQuestions);
    setSelectedAnswer(answer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answers.length !== questions.length) {
      alert("Please answer all the questions before submitting.");
      return;
    }

    const answersData = {
      userId: userId,
      answers: answers,
      questions: answeredQuestions,
      mood: determineMood(answers),
    };
    console.log("Sending data:", answersData);
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
        console.log(data);
        navigate(`/home/${data.userId}`);
      } else {
        const errorData = await response.json();
        console.error("Failed to submit answers:", errorData);
        alert("Failed to submit answers.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers.");
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
              className={`answer-button ${
                selectedAnswer === answer ? "selected" : ""
              }`}
              onClick={() => handleAnswerClick(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      )}
      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button className="previous-button" onClick={handlePreviousClick}>
            Previous
          </button>
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
    </div>
  );
};
export default TakeQuiz;
