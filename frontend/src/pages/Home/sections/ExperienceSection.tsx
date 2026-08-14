import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import { getMediaUrl } from "../../../services/api";
import type { Client } from "../../../types/api";
import { FiExternalLink } from "react-icons/fi";
import styles from "../Home.module.scss";

interface ExperienceSectionProps {
  clients: Client[];
}

export function ExperienceSection({ clients }: ExperienceSectionProps) {
  if (clients.length === 0) return null;

  return (
    <section className={styles.section} id="experiencia">
      <ScrollReveal>
        <h2 className={styles.sectionTitle}>
          Algunos clientes con los que he trabajado
        </h2>
      </ScrollReveal>

      <div className={styles.experienceList}>
        {clients.map((client, index) => (
          <ScrollReveal
            key={client.id}
            delay={index * 0.1}
            direction="left"
          >
            <article
              className={`${styles.experienceCard} ${
                client.preview_image ? styles.experienceCardWithPreview : ""
              }`}
            >
              <div className={styles.experienceCardContent}>
                <span className={styles.projectLabel}>Cliente</span>
                <h3 className={styles.projectTitle}>{client.name}</h3>

                {client.description && (
                  <p className={styles.projectDesc}>{client.description}</p>
                )}

                {client.highlights.length > 0 && (
                  <ul className={styles.projectHighlights}>
                    {client.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {(client.tech_stack.length > 0 || client.website_url) && (
                  <div className={styles.experienceCardFooter}>
                    {client.tech_stack.length > 0 && (
                      <div className={styles.projectTags}>
                        {client.tech_stack.map((tech) => (
                          <span key={tech} className={styles.projectTag}>
                            #{tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {client.website_url && (
                      <div className={styles.experienceCardIcons}>
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.experienceCardIconLink}
                          aria-label={`Visitar sitio de ${client.name}`}
                        >
                          <FiExternalLink size={24} strokeWidth={1.75} />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {client.preview_image && (
                <div className={styles.experienceCardPreview}>
                  <img
                    src={getMediaUrl(client.preview_image)}
                    alt={`Preview de ${client.name}`}
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
