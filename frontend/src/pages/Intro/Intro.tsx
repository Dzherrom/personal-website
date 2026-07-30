import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LetterStagger } from "../../components/animations/LetterStagger";
import { Typewriter } from "../../components/animations/Typewriter";
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
  cv_url: "",
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
  const [profile, setProfile] = useState<SiteProfile | null>(null);

  useEffect(() => {
    getProfile()
      .then((data) => setProfile(data ?? FALLBACK_PROFILE))
      .catch(() => setProfile(FALLBACK_PROFILE));
  }, []);

  if (!profile) {
    return (
      <section className={styles.splash}>
        <div className={styles.background} />
        <p className={styles.loading}>Cargando...</p>
      </section>
    );
  }

  const greetingDelay = profile.intro_greeting.length * 0.02 + 0.3;

  return (
    <section className={styles.splash}>
      <motion.div
        className={styles.background}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      <div className={styles.content}>
        <LetterStagger
          text={profile.intro_greeting}
          className={styles.greeting}
        />
        <LetterStagger
          text={profile.intro_name}
          className={styles.name}
          delayOffset={greetingDelay}
        />

        <motion.p
          className={styles.description}
          initial={{ opacity: 0, translateX: -2000 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: greetingDelay + profile.intro_name.length * 0.02 + 0.5,
          }}
        >
          Soy un apasionado{" "}
          <span className={styles.highlight}>
            <Typewriter strings={profile.typewriter_roles} />
          </span>
        </motion.p>

        <motion.div className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Link to="/home" className={styles.cta}>
            ¡Empecemos!
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
