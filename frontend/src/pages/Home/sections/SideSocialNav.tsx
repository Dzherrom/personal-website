import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiCodewars, SiFreelancer } from "react-icons/si";
import type { SiteProfile } from "../../../types/api";
import styles from "./SideSocialNav.module.scss";

const ICON_COMPONENTS: Record<string, ComponentType<{ size?: number }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  freelancer: SiFreelancer,
  codewars: SiCodewars,
};

const ICONS: Array<{
  id: string;
  label: string;
  urlKey?: keyof SiteProfile;
  url?: string;
}> = [
  { id: "github", url: "https://github.com/Dzherrom/", label: "GitHub" },
  { id: "linkedin", url: "https://www.linkedin.com/in/dzherrom/", label: "LinkedIn" },
  { id: "freelancer", url: "https://www.freelancer.com", label: "Freelancer" },
  { id: "codewars", url: "https://www.codewars.com/users/dzherrom99", label: "Codewars" },
];

export function SideSocialNav({ profile }: { profile: SiteProfile }) {
  const links = ICONS.map((item) => ({
    ...item,
    href: item.urlKey ? String(profile[item.urlKey] ?? "") : (item.url ?? ""),
  })).filter((link) => link.href);

  return (
    <aside className={styles.sidebar} aria-label="Redes sociales">
      <ul className={styles.iconList}>
        {links.map((link, index) => {
          const Icon = ICON_COMPONENTS[link.id];

          return (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8 + index * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={styles.iconLink}
                aria-label={link.label}
              >
                {Icon ? <Icon size={32} /> : link.label[0]}
              </a>
            </motion.li>
          );
        })}
      </ul>
      <div className={styles.line} aria-hidden="true" />
    </aside>
  );
}
