"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextGenerateEffect = ({ words }: { words: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + words[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
    }
  }, [currentIndex, words, isComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
        {displayedText}
        {!isComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="ml-1 inline-block w-1 h-6 bg-neutral-100"
          />
        )}
      </div>
    </motion.div>
  );
};
