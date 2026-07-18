import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProjects } from "../../services/api";
import type { Project } from "../../types/api";
import styles from "./Projects.module.scss";

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
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
        Proyectos
      </motion.h2>

      {loading && <p className={styles.empty}>Cargando proyectos...</p>}

      {!loading && projects.length === 0 && (
        <p className={styles.empty}>
          No hay proyectos aún. Agrégalos desde el admin de Django.
        </p>
      )}

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            {project.highlights?.length > 0 && (
              <ul className={styles.highlights}>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            <div className={styles.tags}>
              {project.tech_stack.map((tech) => (
                <span key={tech} className={styles.tag}>{tech}</span>
              ))}
            </div>
            <div className={styles.links}>
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noreferrer">Demo</a>
              )}
              {project.repo_url && (
                <a href={project.repo_url} target="_blank" rel="noreferrer">Repo</a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
