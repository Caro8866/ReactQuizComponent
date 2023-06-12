import React from "react";
import PropTypes from "prop-types";
import styles from "./FillInTheBlank.module.css";

function FillInTheBlank({ value, handleAnswerChange }) {
  return (
    <section>
      <input className={styles.input} value={value} onChange={handleAnswerChange} type="text" />
    </section>
  );
}

FillInTheBlank.propTypes = {
  value: PropTypes.string.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
};

export default FillInTheBlank;
