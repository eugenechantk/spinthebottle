import { Twitter } from "lucide-react";
import { useState } from "react";
import "./App.css";
import { Cards } from "./component/Cards";
import QuestionsModal from "./component/QuestionsModal";
import Spinner from "./component/Spinner";

function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAnyCardFlipped, setIsAnyCardFlipped] = useState(false);
  const [hasSpunOnce, setHasSpunOnce] = useState(false);
  const [cardWasFlicked, setCardWasFlicked] = useState(false);
  const [hasCards, setHasCards] = useState(true);

  const handleSpinStateChange = (spinning: boolean) => {
    setIsSpinning(spinning);
    if (!spinning && !hasSpunOnce) {
      setHasSpunOnce(true);
    }
  };

  const handleCardStateChange = (flipped: boolean) => {
    setIsAnyCardFlipped(flipped);

    // If a card was flipped and now no cards are flipped, it means a card was flicked away
    if (!flipped && cardWasFlicked) {
      setHasSpunOnce(false);
      setCardWasFlicked(false);
    }

    // If a card is flipped, mark that we have a flipped card
    if (flipped) {
      setCardWasFlicked(true);
    }
  };

  const handleCardsRemainingChange = (cardsRemain: boolean) => {
    setHasCards(cardsRemain);
  };

  const getMessage = () => {
    // Don't show any messages if there are no cards
    if (!hasCards) {
      return null;
    }

    if (isSpinning) {
      return null; // No message while spinning
    } else if (hasSpunOnce && !isAnyCardFlipped) {
      return "Pick a card to answer the question!";
    } else if (!isAnyCardFlipped) {
      return "Spin the bottle to pick the next person";
    }
    return null; // No message when a card is flipped
  };

  const message = getMessage();

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden">
      <div className="absolute top-4 right-4 left-4 flex flex-row justify-between items-center">
        <a
          href="https://x.com/eugenechantk"
          target="_blank"
          className="text-gray-600 text-sm flex flex-row items-center gap-2"
        >
          Made with ❤️ by Eugene <Twitter className="w-4 h-4 text-gray-500 " />
        </a>
        <QuestionsModal />
      </div>

      <Spinner onSpinStateChange={handleSpinStateChange} />
      {message && (
        <span className="text-center w-full block absolute bottom-[200px] text-base px-30 text-gray-600">
          {message}
        </span>
      )}
      <Cards
        onCardStateChange={handleCardStateChange}
        onCardsRemainingChange={handleCardsRemainingChange}
      />
    </div>
  );
}

export default App;
