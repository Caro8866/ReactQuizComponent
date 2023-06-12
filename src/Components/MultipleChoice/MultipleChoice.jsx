import PropTypes from "prop-types";
import styles from "./MultipleChoice.module.css";

function MultipleChoice({ choices, selectAnswer, selectedAnswerIndex }) {
  return (
    <section>
      <ul className={styles.options}>
        {/* Map over the choices array to render each option */}
        {choices.map((answer, index) => (
          <li onClick={() => selectAnswer(answer, index)} key={answer} className={selectedAnswerIndex === index ? styles.selectedAnswer : null}>
            {answer}
          </li>
        ))}
      </ul>
    </section>
  );
}

// PropTypes used for type-checking the props passed to the component
MultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectAnswer: PropTypes.func.isRequired,
  selectedAnswerIndex: PropTypes.number,
};

export default MultipleChoice;
