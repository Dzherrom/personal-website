import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getSkills } from "../../services/api";
import type { Skill } from "../../types/api";
import styles from "./Skills.module.scss";

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(setSkills)
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.section}>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Skills & Herramientas
      </motion.h2>

      {loading && <p className={styles.empty}>Cargando skills...</p>}

      {!loading && skills.length === 0 && (
        <p className={styles.empty}>
          No hay skills aún. Agrégalos desde el admin de Django.
        </p>
      )}

      <div className={styles.grid}>
        {skills.map((skill, index) => (
          <motion.span
            key={skill.id}
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
