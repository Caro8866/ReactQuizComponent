import PropTypes from "prop-types";
import styles from "./MultipleChoice.module.css";

function MultipleChoice({ choices, question, selectAnswer, selectedAnswerIndex }) {
  return (
    <section>
      <h2 className={styles.questionText}>{question}</h2>
      <ul className={styles.options}>
        {choices.map((answer, index) => (
          <li onClick={() => selectAnswer(answer, index)} key={answer} className={selectedAnswerIndex === index ? styles.selectedAnswer : null}>
            {answer}
          </li>
        ))}
      </ul>
    </section>
  );
}

MultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswerIndex: PropTypes.number,
};

export default MultipleChoice;
