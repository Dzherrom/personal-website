import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import type { SiteProfile } from "../../../types/api";
import styles from "../Home.module.scss";

interface HeroSectionProps {
  profile: SiteProfile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className={styles.hero} id="inicio">
      <ScrollReveal onMount delay={0}>
        <p className={styles.heroLead}>
          Hola, como pudiste ver antes, mi nombre es
        </p>
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

      {profile.cv_url && (
        <ScrollReveal onMount delay={0.6}>
          <a className={styles.cvButton} href={profile.cv_url} target="_blank" rel="noreferrer">
            Descargar CV
          </a>
        </ScrollReveal>
      )}
    </section>
  );
}
