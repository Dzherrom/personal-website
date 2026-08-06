import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./LetterStagger.module.scss";

interface LetterStaggerProps {
  text: string;
  className?: string;
  delayOffset?: number;
  /** Fuerza salto de línea después de cada espacio (útil en nombres largos) */
  wrapAtSpaces?: boolean;
}

export function LetterStagger({
  text,
  className = "",
  delayOffset = 0,
  wrapAtSpaces = false,
}: LetterStaggerProps) {
  const reducedMotion = useReducedMotion();
  const letters = text.split("");

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={`${styles.wrapper} ${className}`} aria-label={text}>
      {letters.flatMap((letter, index) => {
        const nodes = [
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
          </motion.span>,
        ];

        if (wrapAtSpaces && letter === " ") {
          nodes.push(
            <span
              key={`break-${index}`}
              className={styles.lineBreak}
              aria-hidden="true"
            />,
          );
        }

        return nodes;
      })}
    </span>
  );
}
