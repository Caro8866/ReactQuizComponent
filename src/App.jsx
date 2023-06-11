import Quiz from "./Components/quiz/Quiz";
import { jsonData } from "./data";
function App() {
  return (
    <div className="container">
      <Quiz questions={jsonData.questions} />
    </div>
  );
}

export default App;
