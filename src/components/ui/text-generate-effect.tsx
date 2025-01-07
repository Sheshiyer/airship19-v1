"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface TextGenerateEffectProps {
  words: string | string[];
  className?: string;
}

export const TextGenerateEffect = ({
  words,
  className = "",
}: TextGenerateEffectProps) => {
  const wordArray = useRef<string[]>(
    typeof words === "string" ? words.split(" ") : words
  ).current;
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < wordArray.length) {
        setCompletedWords(prev => [...prev, wordArray[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, [wordArray]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={className}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide">
          {wordArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black"
              initial="hidden"
              animate={completedWords.includes(word) ? "visible" : "hidden"}
              variants={variants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {word}{" "}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
