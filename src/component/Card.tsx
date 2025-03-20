import { AnimatePresence, motion } from "framer-motion";
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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to container
    if (isTop) {
      onFlip(id);
    }
  };

  const inDeckVariants = {
    initial: {
      x: offset.x,
      y: offset.y,
      rotate: offset.rotation,
      rotateY: 0,
      zIndex: 0,
      translateZ: 0,
    },
    exit: {
      x: offset.x,
      y: offset.y - 160,
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
      x: offset.x,
      y: offset.y - 160,
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
      x: offset.x,
      y: [offset.y - 160, offset.y],
      rotate: [0, offset.rotation],
      rotateY: [180, 0],
      zIndex: 10,
      translateZ: [200, 200, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.6, 1], // Complete rotation by 60% of the animation
        ease: "easeInOut",
        rotateY: {
          duration: 0.5,
          ease: "easeInOut",
        },
        y: {
          delay: 0.5, // Start moving down after rotation
          duration: 0.3,
          ease: "easeOut",
        },
        rotate: {
          delay: 0.5, // Start rotating after flip
          duration: 0.3,
          ease: "easeOut",
        },
        translateZ: {
          delay: 0.5, // Start moving back after flip
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
