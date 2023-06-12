import { useEffect, useState } from "react";
import Quiz from "./Components/Quiz/Quiz.jsx";
import { supabase } from "../utils/supabaseClient";

function App() {
  const [data, setData] = useState([]);

  // useEffect to fetch questions only once the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      // Fetch questions from Supabase database
      const { data: questions, error } = await supabase.from("questions").select("*");

      if (error) {
        throw new Error(error.message);
      }

      // Update the state with the fetched questions
      setData(questions);

      console.log("Fetched questions:", questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <div className="container">
      {/* Check if the data is fetched */}
      {data.length ? (
        // Render the Quiz component when the data has been fetched
        <Quiz questions={data} />
      ) : (
        // Display a loading message if the data has not yet fetched
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
