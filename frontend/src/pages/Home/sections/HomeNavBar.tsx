import { UsaFlag } from "../../../components/icons/UsaFlag";
import styles from "./HomeNavBar.module.scss";

/** Keep in sync with `.langToggleBox` custom properties in HomeNavBar.module.scss */
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

interface HomeNavBarProps {
  bannerText?: string;
}

export function HomeNavBar({
  bannerText = "Sitio desactualizado, nuevo en construcción",
}: HomeNavBarProps) {
  return (
    <header className={styles.nav}>
      <div className={styles.banner}>{bannerText}</div>
      <button
        type="button"
        className={styles.langToggle}
        aria-label="Cambiar idioma a inglés"
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
    </header>
  );
}
