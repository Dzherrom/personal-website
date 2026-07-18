import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./LetterStagger.module.scss";

interface LetterStaggerProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function LetterStagger({
  text,
  className = "",
  delayOffset = 0,
}: LetterStaggerProps) {
  const reducedMotion = useReducedMotion();
  const letters = text.split("");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`${styles.wrapper} ${className}`} aria-label={text}>
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          className={styles.letter}
          initial={{ opacity: 0, translateY: 150 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            duration: 0.6,
            delay: delayOffset + index * 0.02,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
