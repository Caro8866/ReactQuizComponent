import styles from "./Quiz.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import Timer from "../Timer/Timer";
import MultipleChoice from "../MultipleChoice/MultipleChoice";
import FillInTheBlank from "../FillInTheBlank/FillInTheBlank";

const resultInitState = {
  score: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
};

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitState);
  const [showResult, setShowResult] = useState(false);
  const [displayTimer, setDisplayTimer] = useState(true);
  const [FITBAnswer, setFITBAnswer] = useState("");

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  // Callback function to handle the selection of an answer
  const selectAnswer = (answer, index) => {
    setSelectedAnswerIndex(index);
  };

  // Callback function when the "Next Question" button is clicked
  const onNextQuestionClick = () => {
    setDisplayTimer(false);

    setResult((previousResult) => {
      const finalAnswer = selectedAnswerIndex !== null && choices[selectedAnswerIndex] === correctAnswer;

      let scoreChange = 0;
      let correctChange = 0;
      let incorrectChange = 0;

      // Calculate score, correct answers, and wrong answers based on question type
      if (type === "MC") {
        scoreChange = finalAnswer ? 10 : 0;
        correctChange = finalAnswer ? 1 : 0;
        incorrectChange = finalAnswer ? 0 : 1;
      } else if (type === "FITB") {
        scoreChange = answer ? 10 : 0;
        correctChange = answer ? 1 : 0;
        incorrectChange = answer === false ? 1 : 0; // Increment incorrect count only if the answer is false
      }

      return {
        score: previousResult.score + scoreChange,
        correctAnswers: previousResult.correctAnswers + correctChange,
        wrongAnswers: previousResult.wrongAnswers + incorrectChange,
      };
    });

    // If there are more questions, go to the next question
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswerIndex(null);
      setFITBAnswer(""); // Reset FITBAnswer to an empty string
      setAnswer(null); // Reset answer to null
      setTimeout(() => {
        setDisplayTimer(true);
      }, 100); // Delay to allow the component to re-render before starting the timer
    } else {
      // Show the result if it is the last question
      setShowResult(true);
    }
  };

  // Restart the quiz and reset all states
  const restartQuiz = () => {
    setResult(resultInitState);
    setShowResult(false);
    setSelectedAnswerIndex(null);
    setCurrentQuestion(0);
    setFITBAnswer(""); // Reset FITBAnswer to an empty string
    setAnswer(null); // Reset MC answer to null
    setTimeout(() => {
      setDisplayTimer(true);
    }, 100); // Delay to allow the component to re-render before starting the timer
  };

  // Handle timer timeout event
  const handleTimeOut = () => {
    setAnswer(false);
    onNextQuestionClick(false);
  };

  // Handle user change in the input field for FITB questions
  const handleFITBAnswerChange = (e) => {
    const userAnswer = e.target.value; // Get the user input
    setFITBAnswer(userAnswer);
    const lowercaseUserAnswer = userAnswer.toLowerCase(); // Convert the user input to lowercase
    const lowercaseCorrectAnswer = correctAnswer.toLowerCase(); // Convert the correct answer to lowercase

    const isAnswerCorrect = lowercaseUserAnswer === lowercaseCorrectAnswer; // Compare user answer and correct answer
    setAnswer(isAnswerCorrect);
  };

  // Display the appropriate answer component based on the question type
  const displayAnswers = () => {
    if (type === "MC") {
      return <MultipleChoice choices={choices} selectAnswer={selectAnswer} selectedAnswerIndex={selectedAnswerIndex} />;
    } else if (type === "FITB") {
      return <FillInTheBlank value={FITBAnswer} handleAnswerChange={handleFITBAnswerChange} />;
    }
  };

  return (
    <div className={styles.quizContainer}>
      {!showResult ? (
        <>
          {displayTimer && <Timer duration={3} onTimeUp={handleTimeOut} />}
          <header className={styles.header}>
            <span className={styles.currentQuestionNum}>{currentQuestion + 1}</span>/<span className={styles.totalQuestionsNum}>{questions.length}</span>
            <h2 className={styles.questionText}>{question}</h2>
          </header>
          {displayAnswers()}
          <footer className={styles.quizFooter}>
            <button
              onClick={() => {
                onNextQuestionClick(answer);
              }}
              disabled={selectedAnswerIndex === null && !FITBAnswer}
            >
              {currentQuestion === questions.length - 1 ? "Finish!" : "Next Question..."}
            </button>
          </footer>
        </>
      ) : (
        <div className={styles.result}>
          <header>
            <h1>
              Here are your<span> results</span>!
            </h1>
          </header>
          <section>
            <p>
              You answered <span>{questions.length}</span> questions!
            </p>
            <p>
              Your total score is <span>{result.score}</span> points
            </p>
            <p>
              You answered <span>{result.correctAnswers}</span> correctly!
            </p>
            <p>
              You answered <span>{result.wrongAnswers}</span> incorrectly!
            </p>
          </section>
          <footer className={styles.quizFooter}>
            <button onClick={restartQuiz}>Try again!</button>
          </footer>
        </div>
      )}
    </div>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Quiz;
