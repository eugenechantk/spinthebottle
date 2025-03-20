import { useEffect, useState } from "react";
import { Card } from "./Card";
import "./Cards.css";
import { Question, questions } from "./questions";

interface CardsProps {
  onCardStateChange?: (isAnyCardFlipped: boolean) => void;
  onCardsRemainingChange?: (hasCards: boolean) => void;
}

export const Cards = ({
  onCardStateChange,
  onCardsRemainingChange,
}: CardsProps) => {
  // Add a shuffle function to randomize the questions array
  const shuffleQuestions = (array: Question[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleRestart = () => {
    // Shuffle questions before creating new cards
    const shuffledQuestions = shuffleQuestions(questions);
    const newCards = Array.from(
      { length: shuffledQuestions.length },
      (_, index) => ({
        id: index,
        question: shuffledQuestions[index],
        offset: generateRandomOffset(),
        isFlipped: false,
      })
    );
    setCards(newCards);
  };

  const [cards, setCards] = useState<
    Array<{
      id: number;
      question: Question;
      offset: { x: number; y: number; rotation: number };
      isFlipped: boolean;
    }>
  >([]);

  const generateRandomOffset = () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    rotation: Math.random() * 8 - 4,
  });

  useEffect(() => {
    // Shuffle questions before creating initial cards
    const shuffledQuestions = shuffleQuestions(questions);
    const newCards = Array.from(
      { length: shuffledQuestions.length },
      (_, index) => ({
        id: index,
        question: shuffledQuestions[index],
        offset: generateRandomOffset(),
        isFlipped: false,
      })
    );
    setCards(newCards);
  }, []);

  useEffect(() => {
    // Notify parent component if any card is flipped
    if (onCardStateChange) {
      const isAnyCardFlipped = cards.some((card) => card.isFlipped);
      onCardStateChange(isAnyCardFlipped);
    }

    // Notify parent about cards remaining state
    if (onCardsRemainingChange) {
      onCardsRemainingChange(cards.length > 0);
    }
  }, [cards, onCardStateChange, onCardsRemainingChange]);

  const handleFlip = (cardId: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const card = newCards.find((c) => c.id === cardId);
      if (card) {
        if (card.isFlipped) {
          // When a flipped card is clicked, mark it for removal
          // The actual removal will happen after animation completes
          setTimeout(() => {
            setCards((currentCards) =>
              currentCards.filter((c) => c.id !== cardId)
            );
          }, 2500); // Match the duration of the exit animation
        } else {
          card.offset = generateRandomOffset();
        }
        card.isFlipped = !card.isFlipped;
      }
      return newCards;
    });
  };

  return (
    <div className="mx-auto w-full my-5 [perspective:1000px] [transform-style:preserve-3d] h-[64px]">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          question={card.question}
          offset={card.offset}
          isFlipped={card.isFlipped}
          isTop={index === cards.length - 1}
          onFlip={handleFlip}
        />
      ))}
      {cards.length === 0 && (
        <button
          className="px-4 py-2 rounded-full border border-gray-800 flex items-center justify-center mx-auto hover:bg-gray-100 text-gray-600 hover:text-gray-800 font-mono uppercase tracking-wider text-xs"
          onClick={handleRestart}
        >
          Restart
        </button>
      )}
    </div>
  );
};
