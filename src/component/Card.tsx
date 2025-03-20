import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Cards.css";
import { Question } from "./questions";

interface CardProps {
  id: number;
  question: Question;
  offset: {
    x: number;
    y: number;
    rotation: number;
  };
  isFlipped: boolean;
  isTop: boolean;
  onFlip: (id: number) => void;
}

export const Card = ({
  id,
  question,
  offset,
  isFlipped,
  isTop,
  onFlip,
}: CardProps) => {
  const [centerY, setCenterY] = useState(-300);

  useEffect(() => {
    const updateCenterY = () => {
      const viewportHeight = window.innerHeight;
      const cardHeight = 392;
      // Move up by 80% of viewport height, accounting for card height
      const newCenterY = -(viewportHeight * 0.8 - cardHeight / 2);
      setCenterY(newCenterY);
    };

    updateCenterY();
    window.addEventListener("resize", updateCenterY);
    window.addEventListener("scroll", updateCenterY);
    return () => {
      window.removeEventListener("resize", updateCenterY);
      window.removeEventListener("scroll", updateCenterY);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTop) {
      onFlip(id);
    }
  };

  const inDeckVariants = {
    initial: {
      x: `calc(-50% + ${offset.x}px)`,
      y: offset.y,
      rotate: offset.rotation,
      rotateY: 0,
      zIndex: 0,
      translateZ: 0,
    },
    exit: {
      x: `calc(-50% + ${offset.x}px)`,
      y: centerY,
      rotate: 0,
      rotateY: 0,
      zIndex: 10,
      translateZ: 200,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const flippedVariants = {
    initial: {
      x: `calc(-50% + ${offset.x}px)`,
      y: centerY,
      rotate: 0,
      rotateY: 0,
      zIndex: 10,
      translateZ: 200,
    },
    animate: {
      rotateY: 180,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    exit: {
      x: [
        `calc(-50% + ${offset.x}px)`,
        `calc(-50% + ${offset.x + 600}px)`,
        `calc(-50% + ${offset.x + 1500}px)`,
      ],
      y: [centerY, centerY - 150, -1000],
      rotate: [0, 25, 40 + Math.random() * 15],
      rotateY: 180,
      zIndex: 10,
      opacity: [1, 1, 0],
      transition: {
        duration: 2,
        times: [0, 0.3, 1],
        ease: [0.5, 0.05, 0.1, 0.3],
        opacity: {
          delay: 1.5,
          duration: 1.0,
        },
        rotateY: {
          duration: 0,
        },
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isFlipped ? (
        <motion.div
          key="inDeck"
          className="card"
          initial="initial"
          animate="initial"
          exit="exit"
          variants={inDeckVariants}
          style={{ transformStyle: "preserve-3d" }}
          onClick={handleClick}
        >
          <div className="card-face card-front">
            <img
              src="/card_front.png"
              alt="Card Front"
              className="card-image"
            />
          </div>
          <div className="card-face card-back">
            <img src="/card_back.png" alt="Card Back" className="card-image" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="flipped"
          className="card"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={flippedVariants}
          style={{ transformStyle: "preserve-3d" }}
          onClick={handleClick}
        >
          <div className="card-face card-front">
            <img
              src="/card_front.png"
              alt="Card Front"
              className="card-image"
            />
          </div>
          <div className="card-face card-back">
            <img src="/card_back.png" alt="Card Back" className="card-image" />
            <div className="absolute inset-0 flex flex-col items-center justify-start p-6 text-center">
              <div className="flex-1 min-h-0 flex items-center justify-center">
                <h2 className="card-title text-xl font-bold mb-2 ">
                  {question.question}
                </h2>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center mb-4">
                <div className="rounded-full w-3 h-3 bg-[#191919]" />
                <p className="card-description text-xs text-gray-600 uppercase font-mono tracking-wider">
                  {question.type}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
