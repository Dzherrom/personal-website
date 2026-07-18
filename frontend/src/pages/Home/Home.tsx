import { useEffect, useState } from "react";
import { getHomeData } from "../../services/api";
import type { Client, Project, SiteProfile, Skill } from "../../types/api";
import styles from "./Home.module.scss";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

export function Home() {
  const [profile, setProfile] = useState<SiteProfile | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeData()
      .then((data) => {
        setProfile(data.profile);
        setClients(data.clients);
        setProjects(data.projects);
        setSkills(data.skills);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!profile) {
    return (
      <div className={styles.loading}>
        No hay perfil activo. Ejecuta <code>python manage.py seed_demo</code>.
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <HeroSection profile={profile} />
      <ExperienceSection clients={clients} />
      <SkillsSection skills={skills} profile={profile} />
      <ProjectsSection projects={projects} />
      <ContactSection profile={profile} />
    </main>
  );
}
