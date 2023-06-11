import styles from "./Quiz.module.css";
import { useState } from "react";
import PropTypes from "prop-types";

function Quiz({ questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const selectAnswer = (answer, index) => {
    setSelectedAnswerIndex(index);
    setAnswer(answer === correctAnswer ? true : false);
  };

  const onNextQuestionClick = () => {
    selectedAnswerIndex(null);
  };

  return (
    <div className={styles.quizcontainer}>
      <header className={styles.questionNum}>
        <span className={styles.currentQuestionNum}>{currentQuestion + 1}</span>/<span className={styles.totalQuestionsNum}>{questions.length}</span>
      </header>
      <h2 className={styles.questionText}>{question}</h2>
      <ul className={styles.options}>
        {choices.map((answer, index) => (
          <li onClick={() => selectAnswer(answer, index)} key={answer} className={selectedAnswerIndex === index ? styles.selectedAnswer : null}>
            {answer}
          </li>
        ))}
      </ul>
      <footer className={styles.quizFooter}>
        <button onClick={onNextQuestionClick} disabled={selectedAnswerIndex === null}>
          {currentQuestion === questions.length - 1 ? "Finished!" : "Next Question"}
        </button>
      </footer>
    </div>
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.string).isRequired,
      correctAnswer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Quiz;
