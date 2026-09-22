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

  const handleDownloadCv = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!profile.cv_file) return;

    const url = getCvDownloadUrl(profile.cv_file);
    
    // Si la URL es del mismo origen o relativa, el navegador maneja el download normalmente
    if (url.startsWith('/') || url.startsWith(window.location.origin)) {
      return;
    }

    // Para URLs cross-origin (ej. backend en puerto 8000, frontend en 5173),
    // forzamos la descarga obteniendo el blob
    e.preventDefault();
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      
      const filename = url.split('/').pop() || 'cv.pdf';
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading CV:", error);
      // Fallback: abrir en nueva pestaña si falla el fetch
      window.open(url, '_blank');
    }
  };

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
            onClick={handleDownloadCv}
            download
          >
            {t("home.downloadCv")}
          </a>
        </ScrollReveal>
      )}
    </section>
  );
}
