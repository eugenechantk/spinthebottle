import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { WalletCards } from "lucide-react";
import { useState } from "react";
import { questions } from "./questions";

const QuestionsModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to generate a random rotation between -5 and 5 degrees
  const getRandomRotation = () => Math.random() * 10 - 5;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="h-9 w-9 rounded-full border border-gray-800 flex items-center justify-center hover:bg-gray-100 text-gray-600 hover:text-gray-800 font-mono uppercase tracking-wider text-xs">
          <WalletCards className="w-4 h-4" />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-6"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.3,
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bold">
                    All Questions
                  </Dialog.Title>
                  <Dialog.Close className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Dialog.Close>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {questions.map((question, index) => {
                    // Generate a random rotation for each card
                    const rotation = getRandomRotation();

                    return (
                      <motion.div
                        key={index}
                        className="relative h-[280px] w-[196px] mx-auto"
                        style={{
                          transformStyle: "preserve-3d",
                          transform: `rotate(${rotation}deg)`,
                        }}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          rotate: 0,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                          <img
                            src="/card_back.png"
                            alt="Card Back"
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-start p-6 text-center">
                            <div className="flex-1 min-h-0 flex items-center justify-center">
                              <h3 className="text-lg font-medium">
                                {question.question}
                              </h3>
                            </div>
                            <div className="flex flex-col gap-2 items-center justify-center mb-4">
                              <div className="rounded-full w-3 h-3 bg-[#191919]" />
                              <p className="text-xs text-gray-600 uppercase font-mono tracking-wider">
                                {question.type}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default QuestionsModal;
