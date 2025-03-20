import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Cards.css";

interface CardProps {
  id: number;
  offset: {
    x: number;
    y: number;
    rotation: number;
  };
  isFlipped: boolean;
  isTop: boolean;
  onFlip: (id: number) => void;
}

export const Card = ({ id, offset, isFlipped, isTop, onFlip }: CardProps) => {
  const [centerY, setCenterY] = useState(-300);

  useEffect(() => {
    const updateCenterY = () => {
      const viewportHeight = window.innerHeight;
      const cardHeight = 392;
      const scrollY = window.scrollY;
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
      x: `calc(-50% + ${offset.x}px)`,
      y: [centerY, offset.y],
      rotate: [0, offset.rotation],
      rotateY: [180, 0],
      zIndex: 10,
      translateZ: [200, 200, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.6, 1],
        ease: "easeInOut",
        rotateY: {
          duration: 0.5,
          ease: "easeInOut",
        },
        y: {
          delay: 0.5,
          duration: 0.3,
          ease: "easeOut",
        },
        rotate: {
          delay: 0.5,
          duration: 0.3,
          ease: "easeOut",
        },
        translateZ: {
          delay: 0.5,
          duration: 0.3,
          ease: "easeOut",
        },
        zIndex: {
          delay: 0.8,
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
          <div className="card-face card-front" />
          <div className="card-face card-back" />
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
          <div className="card-face card-front" />
          <div className="card-face card-back" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
