import styles from "./Timer.module.css";
import { useEffect, useState, useRef } from "react";

function Timer({ duration, onTimeUp }) {
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

      setTimeout(() => {
        onTimeUp();
      }, 1000);
    }
  }, [counter]);

  return (
    <div className={styles.timerContainer}>
      <div
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
          backgroundColor: `rgba(255, 111, 97, ${progress / 100}`,
        }}
      ></div>
    </div>
  );
}

export default Timer;
