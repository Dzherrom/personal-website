import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import type { Client } from "../../../types/api";
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
          Alguno de los clientes con los que he trabajado
        </h2>
      </ScrollReveal>

      <p className={styles.sectionNote}>
        *Los enlaces redireccionan a la página principal del negocio.
      </p>

      <ul className={styles.clientGrid}>
        {clients.map((client, index) => (
          <ScrollReveal key={client.id} delay={index * 0.08} direction="scale">
            <li>
              <a
                className={styles.clientCard}
                href={client.website_url || "#"}
                target="_blank"
                rel="noreferrer"
                aria-label={client.name}
              >
                {client.logo_url ? (
                  <img src={client.logo_url} alt={client.name} />
                ) : (
                  <span className={styles.clientName}>{client.name}</span>
                )}
              </a>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
