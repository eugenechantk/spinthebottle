import { motion, useAnimationControls } from "framer-motion";
import { useRef, useState } from "react";
import "./Spinner.css";

interface SpinnerProps {
  onSpinStateChange?: (isSpinning: boolean) => void;
}

export default function Spinner({ onSpinStateChange }: SpinnerProps) {
  const controls = useAnimationControls();
  const [isSpinning, setIsSpinning] = useState(false);
  const totalRotation = useRef(0);

  const handleClick = async () => {
    if (isSpinning) return; // Prevent clicking while already spinning

    // Generate random number of spins between 20 and 40
    const spins = 20 + Math.random() * 20;
    const rotationAmount = spins * 360; // Degrees to rotate

    // Add to the total rotation (continuing from current position)
    totalRotation.current += rotationAmount;

    setIsSpinning(true);
    if (onSpinStateChange) onSpinStateChange(true);

    await controls.start({
      rotate: totalRotation.current,
      transition: {
        duration: 6,
        ease: [0.2, 0.95, 0.1, 1],
        type: "tween",
      },
    });

    setIsSpinning(false);
    if (onSpinStateChange) onSpinStateChange(false);
  };

  return (
    <div className="flex flex-1 min-h-0 justify-center items-center">
      <motion.img
        src="/beer_bottle.png"
        alt="Beer bottle"
        className="beer-bottle"
        animate={controls}
        onClick={handleClick}
        initial={{ rotate: 0 }}
      />
    </div>
  );
}
