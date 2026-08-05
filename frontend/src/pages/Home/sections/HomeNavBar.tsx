import styles from "./HomeNavBar.module.scss";

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
        <img src="/images/usa-flag.svg" alt="" width={28} height={18} />
      </button>
    </header>
  );
}
