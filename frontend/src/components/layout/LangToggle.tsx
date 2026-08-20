import { UsaFlag } from "../icons/UsaFlag";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./LangToggle.module.scss";

const LANG_TOGGLE = {
  flagWidth: 38,
  flagHeight: 24,
  stripe: 3,
  frameGap: 10,
} as const;

const FRAME_WIDTH =
  LANG_TOGGLE.flagWidth + LANG_TOGGLE.frameGap * 2 + LANG_TOGGLE.stripe * 2;
const FRAME_HEIGHT =
  LANG_TOGGLE.flagHeight + LANG_TOGGLE.frameGap * 2 + LANG_TOGGLE.stripe * 2;
const STROKE_INSET = LANG_TOGGLE.stripe / 2;

const FRAME_PATH = [
  `M ${FRAME_WIDTH - STROKE_INSET} ${FRAME_HEIGHT - STROKE_INSET}`,
  `L ${FRAME_WIDTH - STROKE_INSET} ${STROKE_INSET}`,
  `L ${STROKE_INSET} ${STROKE_INSET}`,
  `L ${STROKE_INSET} ${FRAME_HEIGHT - STROKE_INSET}`,
  `L ${FRAME_WIDTH - STROKE_INSET} ${FRAME_HEIGHT - STROKE_INSET}`,
].join(" ");

interface LangToggleProps {
  className?: string;
}

export function LangToggle({ className }: LangToggleProps) {
  const { locale, toggleLocale, t } = useLanguage();

  const ariaLabel =
    locale === "es" ? t("lang.switchToEn") : t("lang.switchToEs");

  return (
    <button
      type="button"
      className={`${styles.langToggle} ${className ?? ""}`.trim()}
      aria-label={ariaLabel}
      onClick={toggleLocale}
    >
      <span className={styles.langToggleBox}>
        <span className={styles.langToggleFlag}>
          <UsaFlag className={styles.langToggleFlagSvg} />
        </span>
        <span className={styles.langToggleStripe} aria-hidden="true" />
        <svg
          className={styles.langToggleFrameSvg}
          viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
          width={FRAME_WIDTH}
          height={FRAME_HEIGHT}
          aria-hidden="true"
        >
          <path
            className={styles.langToggleFramePath}
            d={FRAME_PATH}
            pathLength={100}
            strokeWidth={LANG_TOGGLE.stripe}
          />
        </svg>
      </span>
    </button>
  );
}
