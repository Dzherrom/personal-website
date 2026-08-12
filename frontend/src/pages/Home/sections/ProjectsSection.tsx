import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import { getMediaUrl } from "../../../services/api";
import type { Project } from "../../../types/api";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import styles from "../Home.module.scss";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) return null;

  return (
    <section className={styles.section} id="proyectos">
      <ScrollReveal>
        <h2 className={styles.sectionTitle}>Algunos proyectos que he desarrollado</h2>
      </ScrollReveal>

      <div className={styles.projectsList}>
        {projects.map((project, index) => {
          const hasPreview = Boolean(project.preview_image);
          const isReversed = index % 2 === 1;

          const articleClassName = [
            styles.projectShowcase,
            isReversed ? styles.projectShowcaseReverse : "",
            !hasPreview ? styles.projectShowcaseNoImage : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <ScrollReveal
              key={project.id}
              delay={index * 0.1}
              direction={isReversed ? "right" : "left"}
            >
              <article className={articleClassName}>
                {hasPreview ? (
                  <img
                    className={styles.projectShowcaseBg}
                    src={getMediaUrl(project.preview_image)}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className={styles.projectShowcaseBgPlaceholder}
                    aria-hidden="true"
                  />
                )}

                <div className={styles.projectOverlay}>
                  <span className={styles.projectOverlayLabel}>Proyecto</span>
                  <h3 className={styles.projectOverlayTitle}>{project.title}</h3>
                  <p className={styles.projectOverlayDesc}>{project.description}</p>

                  {project.highlights.length > 0 && (
                    <ul className={styles.projectOverlayHighlights}>
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className={styles.projectOverlayFooter}>
                    <div className={styles.projectOverlayTags}>
                      {project.tech_stack.map((tech) => (
                        <span key={tech} className={styles.projectOverlayTag}>
                          #{tech}
                        </span>
                      ))}
                    </div>

                    <div className={styles.projectOverlayIcons}>
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.projectOverlayIconLink}
                          aria-label={`Repositorio de ${project.title} en GitHub`}
                        >
                          <FaGithub size={22} />
                        </a>
                      )}
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.projectOverlayIconLink}
                          aria-label={`Ver demo de ${project.title}`}
                        >
                          <FiExternalLink size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
