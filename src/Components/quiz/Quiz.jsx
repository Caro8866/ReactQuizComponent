import styles from "./Quiz.module.css";
import { useState } from "react";
import PropTypes from "prop-types";
import Timer from "../Timer/Timer";
import MultipleChoice from "../MultipleChoice/MultipleChoice";

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

  const { question, choices, correctAnswer, type } = questions[currentQuestion];

  const selectAnswer = (answer, index) => {
    setSelectedAnswerIndex(index);
    const finalAnswer = answer === correctAnswer;
    setAnswer(finalAnswer);
    setResult((previousResult) => {
      const scoreChange = finalAnswer ? 10 : -5;
      const correctChange = finalAnswer ? 1 : 0;
      const incorrectChange = finalAnswer ? 0 : 1;
      return {
        score: previousResult.score + scoreChange,
        correctAnswers: previousResult.correctAnswers + correctChange,
        wrongAnswers: previousResult.wrongAnswers + incorrectChange,
      };
    });
  };

  const onNextQuestionClick = (finalAnswer) => {
    setSelectedAnswerIndex(null);
    setDisplayTimer(false);
    if (!finalAnswer) {
      setAnswer(false);
    }
    if (finalAnswer) {
      setResult((previousResult) => {
        return {
          ...previousResult,
          score: previousResult.score + 10,
          correctAnswers: previousResult.correctAnswers + 1,
        };
      });
    } else {
      setResult((previousResult) => {
        return {
          ...previousResult,
          wrongAnswers: previousResult.wrongAnswers + 1,
        };
      });
    }
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }

    setTimeout(() => {
      setDisplayTimer(true);
    });
  };

  const restartQuiz = () => {
    setResult(resultInitState);
    setShowResult(false);
  };

  const handleTimeOut = () => {
    setAnswer(false);
    onNextQuestionClick(false);
  };

  return (
    <div className={styles.quizContainer}>
      {!showResult ? (
        <>
          {displayTimer && <Timer duration={3} onTimeUp={handleTimeOut} />}
          <header className={styles.questionNum}>
            <span className={styles.currentQuestionNum}>{currentQuestion + 1}</span>/<span className={styles.totalQuestionsNum}>{questions.length}</span>
          </header>
          <MultipleChoice choices={choices} question={question} selectAnswer={selectAnswer} selectedAnswerIndex={selectedAnswerIndex} />
          <footer className={styles.quizFooter}>
            <button
              onClick={() => {
                onNextQuestionClick(answer);
              }}
              disabled={selectedAnswerIndex === null}
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
