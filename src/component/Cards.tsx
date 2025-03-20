import { useEffect, useState } from "react";
import { Card } from "./Card";
import "./Cards.css";
import { Question, questions } from "./questions";

interface CardsProps {
  numCards?: number;
}

export const Cards = ({ numCards = 10 }: CardsProps) => {
  // Use the smaller of numCards or the actual number of questions available
  const actualNumCards = Math.min(numCards, questions.length);

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
    // Create cards using the questions data
    const newCards = Array.from({ length: actualNumCards }, (_, index) => ({
      id: index,
      question: questions[index],
      offset: generateRandomOffset(),
      isFlipped: false,
    }));
    setCards(newCards);
  }, [actualNumCards]);

  const handleFlip = (cardId: number) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      const card = newCards.find((c) => c.id === cardId);
      if (card) {
        if (card.isFlipped) {
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
    </div>
  );
};
