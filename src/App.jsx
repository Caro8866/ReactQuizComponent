import Quiz from "./Components/Quiz/Quiz";
import { jsonData } from "./data";
function App() {
  return (
    <div className="container">
      <Quiz questions={jsonData.questions} />
    </div>
  );
}

export default App;
