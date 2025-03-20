import { motion, useAnimationControls } from "framer-motion";
import "./Spinner.css";

export default function Spinner() {
  const controls = useAnimationControls();

  const handleClick = async () => {
    // Generate random number of spins between 4 and 6
    const spins = 4 + Math.random() * 2;
    const degrees = spins * 360;

    await controls.start({
      rotate: degrees,
      transition: {
        duration: 3,
        ease: [0.2, 0.8, 0.3, 1], // Similar to cubic-bezier
        type: "tween",
      },
    });
  };

  return (
    <div className="spinner-container">
      <motion.div
        className="bottle"
        animate={controls}
        onClick={handleClick}
        initial={{ rotate: 0 }}
      >
        <div className="bottle-neck"></div>
        <div className="bottle-body"></div>
      </motion.div>
    </div>
  );
}
