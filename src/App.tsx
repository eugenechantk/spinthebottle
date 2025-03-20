import "./App.css";
import { Cards } from "./component/Cards";
import Spinner from "./component/Spinner";

function App() {
  return (
    <div className="relative h-full w-full flex flex-col">
      <Spinner />
      <Cards numCards={5} />
    </div>
  );
}

export default App;
