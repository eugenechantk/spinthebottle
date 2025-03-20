import "./App.css";
import { Cards } from "./component/Cards";
import Spinner from "./component/Spinner";

function App() {
  return (
    <>
      <Spinner />
      <Cards numCards={5} />
      <h1 className="text-3xl font-bold underline">Vite + React</h1>
    </>
  );
}

export default App;
