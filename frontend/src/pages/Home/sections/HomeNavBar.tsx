import { LangToggle } from "../../../components/layout/LangToggle";
import { useLanguage } from "../../../context/LanguageContext";
import styles from "./HomeNavBar.module.scss";

export function HomeNavBar() {
  const { t } = useLanguage();

  return (
    <header className={styles.nav}>
      <div className={styles.banner}>{t("home.banner")}</div>
      <LangToggle />
    </header>
  );
}
