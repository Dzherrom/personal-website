import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";
import type { SiteProfile } from "../../types/api";
import styles from "./Footer.module.scss";

export function Footer() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile).catch(() => setProfile(null));
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <nav className={styles.links} aria-label="Redes sociales">
        {profile?.github_url && (
          <a href={profile.github_url} target="_blank" rel="noreferrer">GitHub</a>
        )}
        {profile?.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noreferrer">LinkedIn</a>
        )}
        {profile?.email && (
          <a href={`mailto:${profile.email}`}>Email</a>
        )}
      </nav>
      <p>&copy; {year} {profile?.name ?? "Portfolio"}. Todos los derechos reservados.</p>
    </footer>
  );
}
