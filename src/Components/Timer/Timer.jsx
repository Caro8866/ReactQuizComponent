import styles from "./Timer.module.css";
import { useEffect, useState, useRef } from "react";

function Timer({ ...duration }) {
  const [counter, setCounter] = useState(0);
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef();
  useEffect(() => {
    intervalRef.currentCount = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1000);

    return () => clearInterval(intervalRef.currentCount);
  }, []);

  useEffect(() => {
    setProgress((100 * counter) / duration);

    if (counter === duration) {
      clearInterval(intervalRef.currentCount);
    }
  }, [counter]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.progressBar}></div>
    </div>
  );
}

export default Timer;
