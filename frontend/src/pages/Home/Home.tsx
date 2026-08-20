import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import {
  localizeClient,
  localizeProfile,
  localizeProject,
} from "../../i18n/localizeContent";
import { getHomeData } from "../../services/api";
import type { Client, Project, SiteProfile, Skill } from "../../types/api";
import styles from "./Home.module.scss";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { HomeNavBar } from "./sections/HomeNavBar";
import { SideSocialNav } from "./sections/SideSocialNav";
import { SideStatusLabel } from "./sections/SideStatusLabel";
import { SkillsSection } from "./sections/SkillsSection";

export function Home() {
  const { locale, t } = useLanguage();
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

  const localizedProfile = useMemo(
    () => (profile ? localizeProfile(profile, locale) : null),
    [profile, locale],
  );

  const localizedClients = useMemo(
    () => clients.map((client) => localizeClient(client, locale)),
    [clients, locale],
  );

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, locale)),
    [projects, locale],
  );

  if (loading) {
    return <div className={styles.loading}>{t("loading")}</div>;
  }

  if (!localizedProfile) {
    return (
      <div className={styles.loading}>
        {t("home.noProfile")} <code>python manage.py seed_demo</code>.
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <HomeNavBar />
      <SideSocialNav profile={localizedProfile} />
      <SideStatusLabel text={t("home.banner")} />
      <HeroSection profile={localizedProfile} />
      <ExperienceSection clients={localizedClients} />
      <SkillsSection skills={skills} profile={localizedProfile} />
      <ProjectsSection projects={localizedProjects} />
      <ContactSection profile={localizedProfile} />
    </main>
  );
}
