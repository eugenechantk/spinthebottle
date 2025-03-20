import { motion, useAnimationControls } from "framer-motion";
import "./Spinner.css";

export default function Spinner() {
  const controls = useAnimationControls();

  const handleClick = async () => {
    // Generate random number of spins between 20 and 40
    const spins = 20 + Math.random() * 20;
    const degrees = spins * 360; // Remove the negative sign for clockwise rotation

    await controls.start({
      rotate: degrees,
      transition: {
        duration: 6,
        ease: [0.2, 0.95, 0.1, 1],
        type: "tween",
      },
    });
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
