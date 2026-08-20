import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./SideStatusLabel.module.scss";

interface Props {
  text?: string;
}

export function SideStatusLabel({ text }: Props) {
  const { t } = useLanguage();
  const label = text ?? t("home.banner");

  return (
    <aside className={styles.sidebar} aria-label={t("side.siteStatus")}>
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <a href="#inicio" className={styles.rotatedText}>
          {label}
        </a>
      </motion.div>
      <div className={styles.line} aria-hidden="true" />
    </aside>
  );
}
