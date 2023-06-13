import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Result.module.css";
import { supabase } from "../../../utils/supabaseClient";

function Result({ totalQuestions, result, restartQuiz }) {
  const [userName, setUserName] = useState("");
  const [scores, setScores] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase.from("leaderboard").select("*").order("score", { ascending: false }).limit(10);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setScores(data);
        setShowLeaderboard(true);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const saveUserScore = async () => {
    const score = {
      name: userName,
      score: result.score,
    };

    try {
      const { data, error } = await supabase.from("leaderboard").insert([{ username: score.name, score: score.score }]);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const newScores = [...scores, score].sort((a, b) => b.score - a.score);
        setScores(newScores);
        setShowLeaderboard(true);
      }
    } catch (error) {
      console.error("Error saving user score:", error);
    }
  };

  return (
    <div className={styles.result}>
      <header>
        <h1>
          Here are your<span> results</span>!
        </h1>
      </header>
      <section>
        <p>
          You answered <span>{totalQuestions}</span> questions!
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
      <section>
        <h1>Enter your name and save your score</h1>
        <input type="text" placeholder="Your Name Goes Here!" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button onClick={saveUserScore}>Save Score</button>
      </section>
      {showLeaderboard && (
        <section>
          <h1>Leaderboard</h1>
          <div className={styles.podium}>
            {scores.slice(0, 3).map((score, index) => (
              <div key={index} className={styles.podiumItem}>
                <p className={styles.podiumRank}>{index + 1}</p>
                <h2>{score.username}</h2>
                <p className={styles.points}>{score.score} points</p>
              </div>
            ))}
          </div>
          <table className={styles.leaderboardTable}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.slice(3).map((score, index) => (
                <tr key={index}>
                  <td>{index + 4}</td>
                  <td>{score.username}</td>
                  <td>{score.score} points</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

// PropTypes used for type-checking the props passed to the component
Result.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  result: PropTypes.shape({
    score: PropTypes.number.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    wrongAnswers: PropTypes.number.isRequired,
  }).isRequired,
  restartQuiz: PropTypes.func.isRequired,
};

export default Result;
