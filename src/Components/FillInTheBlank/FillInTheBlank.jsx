import React from "react";
import PropTypes from "prop-types";
import styles from "./FillInTheBlank.module.css";

function FillInTheBlank({ value, handleAnswerChange }) {
  return (
    <section>
      {/* Render an input element with a class name 'styles.input' */}
      <input className={styles.input} value={value} onChange={handleAnswerChange} type="text" />
    </section>
  );
}

// PropTypes used for type-checking the props passed to the component
FillInTheBlank.propTypes = {
  value: PropTypes.string.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
};

export default FillInTheBlank;
