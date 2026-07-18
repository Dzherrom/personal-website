import { ScrollReveal } from "../../../components/animations/ScrollReveal";
import type { SiteProfile } from "../../../types/api";
import styles from "../Home.module.scss";

interface ContactSectionProps {
  profile: SiteProfile;
}

function buildWhatsAppUrl(number: string): string {
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}`;
}

export function ContactSection({ profile }: ContactSectionProps) {
  const whatsappUrl = profile.whatsapp_number
    ? buildWhatsAppUrl(profile.whatsapp_number)
    : null;

  return (
    <section className={styles.section} id="contacto">
      <ScrollReveal>
        <h2 className={styles.sectionTitle}>{profile.contact_title}</h2>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <p className={styles.contactText}>
          {profile.contact_message ||
            "Mi bandeja de entrada siempre está abierta. Contáctame por WhatsApp o correo."}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.24} direction="scale">
        <div className={styles.contactActions}>
          {whatsappUrl && (
            <a
              className={styles.whatsappButton}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.whatsappIcon}>
                <path
                  fill="currentColor"
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                />
                <path
                  fill="currentColor"
                  d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 0 0 .917.917l4.458-1.495A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.357-.212-2.647.887.887-2.647-.212-.357A9.818 9.818 0 1 1 12 21.818z"
                />
              </svg>
              WhatsApp
            </a>
          )}

          {profile.email && (
            <a className={styles.emailButton} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.36}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
      </ScrollReveal>
    </section>
  );
}
