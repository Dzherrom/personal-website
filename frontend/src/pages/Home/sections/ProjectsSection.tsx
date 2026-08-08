import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import { getMediaUrl } from "../../../services/api";
import type { Project } from "../../../types/api";
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
          const hasPreview = !!project.preview_image;
          const isEven = index % 2 === 0;
          const projectUrl = project.demo_url || project.repo_url;

          return (
            <ScrollReveal
              key={project.id}
              delay={index * 0.1}
              direction={isEven ? "left" : "right"}
            >
              <article
                className={`${styles.projectCard} ${
                  hasPreview ? styles.projectCardWithPreview : ""
                } ${!isEven && hasPreview ? styles.projectCardReverse : ""}`}
              >
                <div className={styles.projectCardContent}>
                  <span className={styles.projectLabel}>Proyecto</span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.description}</p>

                  {project.highlights.length > 0 && (
                    <ul className={styles.projectHighlights}>
                      {project.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}

                  <div className={styles.projectTags}>
                    {project.tech_stack.map((tech) => (
                      <span key={tech} className={styles.projectTag}>
                        #{tech}
                      </span>
                    ))}
                  </div>

                  <div className={styles.projectLinks}>
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer">
                        Demo
                      </a>
                    )}
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noreferrer">
                        Repo
                      </a>
                    )}
                  </div>
                </div>

                {hasPreview && (
                  <a
                    href={projectUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.projectCardPreview}
                    aria-label={`Ver ${project.title}`}
                  >
                    <img
                      src={getMediaUrl(project.preview_image)}
                      alt={`Preview de ${project.title}`}
                      loading="lazy"
                    />
                  </a>
                )}
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
