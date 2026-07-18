import { motion, type HTMLMotionProps, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type Direction = "up" | "left" | "right" | "scale";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  /** Si true, anima al montar (hero). Si false, al entrar en viewport (scroll). */
  onMount?: boolean;
  className?: string;
}

const hiddenByDirection: Record<Direction, TargetAndTransition> = {
  up: { opacity: 0, y: 50 },
  left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 },
  scale: { opacity: 0, scale: 0.85 },
};

const visible: TargetAndTransition = { opacity: 1, x: 0, y: 0, scale: 1 };

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  onMount = false,
  className = "",
  ...rest
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition = { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (onMount) {
    return (
      <motion.div
        className={className}
        initial={hiddenByDirection[direction]}
        animate={visible}
        transition={transition}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hiddenByDirection[direction]}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
