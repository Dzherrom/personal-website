import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import { SKILL_BADGES, SKILL_COLORS, SKILL_ICONS } from "../../../constants/skillIcons";
import type { SiteProfile, Skill } from "../../../types/api";
import styles from "../Home.module.scss";

interface SkillsSectionProps {
  skills: Skill[];
  profile: SiteProfile | null;
}

export function SkillsSection({ skills, profile }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section className={styles.section} id="skills">
      <ScrollReveal>
        <h2 className={styles.sectionTitle}>Habilidades y herramientas</h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <p className={styles.sectionSubtitle}>
          Aquí hay algunas tecnologías y herramientas que he estado usando recientemente.
          {profile?.skills_note && (
            <span className={styles.skillsNote}> {profile.skills_note}</span>
          )}
        </p>
      </ScrollReveal>

      <ul className={styles.skillsGrid}>
        {skills.map((skill, index) => {
          const Icon = SKILL_ICONS[skill.name];
          const color = SKILL_COLORS[skill.name];
          const badge = SKILL_BADGES[skill.name];

          return (
            <ScrollReveal key={skill.id} delay={index * 0.05} direction="scale">
              <li className={styles.skillItem} title={skill.name}>
                {Icon ? (
                  <div className={styles.skillIconWrapper}>
                    <Icon
                      className={styles.skillIcon}
                      color={color}
                    />
                    {badge && (
                      <span className={styles.skillBadge}>{badge}</span>
                    )}
                  </div>
                ) : skill.icon_url ? (
                  <img src={skill.icon_url} alt={skill.name} />
                ) : (
                  <span>{skill.name}</span>
                )}
              </li>
            </ScrollReveal>
          );
        })}
      </ul>
    </section>
  );
}
