import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface TypewriterProps {
  strings: string[];
  className?: string;
}

export function Typewriter({ strings, className = "" }: TypewriterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elRef.current || strings.length === 0) return;

    if (reducedMotion) {
      elRef.current.textContent = strings[0];
      return;
    }

    const typed = new Typed(elRef.current, {
      strings,
      typeSpeed: 20,
      backSpeed: 20,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, [strings, reducedMotion]);

  return <span ref={elRef} className={className} />;
}
