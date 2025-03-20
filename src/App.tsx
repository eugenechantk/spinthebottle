import "./App.css";
import { Cards } from "./component/Cards";
import Spinner from "./component/Spinner";

function App() {
  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden bg-[#F5F2E9]">
      <Spinner />
      <Cards numCards={5} />
    </div>
  );
}

export default App;
