import { useEffect, useState } from "react";
import { Card } from "./Card";
import "./Cards.css";

interface CardsProps {
  numCards?: number;
}

export const Cards = ({ numCards = 5 }: CardsProps) => {
  const [cards, setCards] = useState<
    Array<{
      id: number;
      offset: { x: number; y: number; rotation: number };
      isFlipped: boolean;
    }>
  >([]);

  const generateRandomOffset = () => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    rotation: Math.random() * 6 - 3,
  });

  useEffect(() => {
    const newCards = Array.from({ length: numCards }, (_, index) => ({
      id: index,
      offset: generateRandomOffset(),
      isFlipped: false,
    }));
    setCards(newCards);
  }, [numCards]);

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
    <div className="cards-container">
      {cards.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          offset={card.offset}
          isFlipped={card.isFlipped}
          isTop={index === cards.length - 1}
          onFlip={handleFlip}
        />
      ))}
    </div>
  );
};
