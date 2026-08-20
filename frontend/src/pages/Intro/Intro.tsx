import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LetterStagger } from "../../components/animations/LetterStagger";
import { Typewriter } from "../../components/animations/Typewriter";
import { LangToggle } from "../../components/layout/LangToggle";
import { useLanguage } from "../../context/LanguageContext";
import {
  localizeFallbackProfile,
  localizeProfile,
} from "../../i18n/localizeContent";
import { getProfile } from "../../services/api";
import type { SiteProfile } from "../../types/api";
import styles from "./Intro.module.scss";

const FALLBACK_PROFILE: SiteProfile = {
  id: 0,
  name: "Jerome Rojas",
  tagline: "",
  bio: "",
  location: "",
  email: "",
  github_url: "",
  linkedin_url: "",
  cv_file: "",
  whatsapp_number: "",
  social_links: [],
  skills_note: "",
  contact_title: "¿Qué estás esperando?",
  contact_message: "",
  intro_greeting: "HOLA, SOY",
  intro_name: "<JEROME ROJAS/>",
  typewriter_roles: ["Desarrollador Backend", "React", "Django"],
};

export function Intro() {
  const { locale, t } = useLanguage();
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    getProfile()
      .then((data) => {
        if (data) {
          setProfile(data);
          setUsedFallback(false);
        } else {
          setProfile(FALLBACK_PROFILE);
          setUsedFallback(true);
        }
      })
      .catch(() => {
        setProfile(FALLBACK_PROFILE);
        setUsedFallback(true);
      });
  }, []);

  const localizedProfile = useMemo(() => {
    if (!profile) return null;
    return usedFallback
      ? localizeFallbackProfile(profile, locale)
      : localizeProfile(profile, locale);
  }, [profile, locale, usedFallback]);

  if (!localizedProfile) {
    return (
      <section className={styles.splash}>
        <div className={styles.background} />
        <p className={styles.loading}>{t("loading")}</p>
      </section>
    );
  }

  const greetingDelay = localizedProfile.intro_greeting.length * 0.02 + 0.3;

  return (
    <section className={styles.splash}>
      <motion.div
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <div className={styles.langToggleWrap}>
        <LangToggle />
      </div>

      <div className={styles.content}>
        <LetterStagger
          key={`${locale}-greeting`}
          text={localizedProfile.intro_greeting}
          className={styles.greeting}
        />
        <LetterStagger
          key={`${locale}-name`}
          text={localizedProfile.intro_name}
          className={styles.name}
          delayOffset={greetingDelay}
          wrapAtSpaces
        />

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, translateX: -2000 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: greetingDelay + localizedProfile.intro_name.length * 0.02 + 0.5,
          }}
        >
          {t("intro.passionate")}{" "}
          <span className={styles.highlight}>
            <Typewriter
              key={locale}
              strings={localizedProfile.typewriter_roles}
            />
          </span>
        </motion.p>

        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link to="/home" className={styles.cta}>
            {t("intro.cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
