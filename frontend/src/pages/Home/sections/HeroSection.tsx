import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import { useLanguage } from "../../../context/LanguageContext";
import { getCvDownloadUrl } from "../../../services/api";
import type { SiteProfile } from "../../../types/api";
import styles from "../Home.module.scss";

interface HeroSectionProps {
  profile: SiteProfile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className={styles.hero} id="inicio">
      <ScrollReveal onMount delay={0}>
        <p className={styles.heroLead}>{t("home.heroLead")}</p>
      </ScrollReveal>

      <ScrollReveal onMount delay={0.15}>
        <h1 className={styles.heroName}>{profile.name}</h1>
      </ScrollReveal>

      <ScrollReveal onMount delay={0.3}>
        <h2 className={styles.heroTagline}>{profile.tagline}</h2>
      </ScrollReveal>

      <ScrollReveal onMount delay={0.45}>
        <p className={styles.heroBio}>{profile.bio}</p>
      </ScrollReveal>

      {profile.cv_file && (
        <ScrollReveal onMount delay={0.6}>
          <a
            className={styles.cvButton}
            href={getCvDownloadUrl(profile.cv_file)}
            download
          >
            {t("home.downloadCv")}
          </a>
        </ScrollReveal>
      )}
    </section>
  );
}
