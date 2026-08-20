export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const LOCALE_STORAGE_KEY = "portfolio-locale";

const ui = {
  es: {
    loading: "Cargando...",
    intro: {
      passionate: "Soy un apasionado",
      cta: "¡Empecemos!",
    },
    home: {
      noProfile: "No hay perfil activo. Ejecuta",
      banner: "Sitio desactualizado, nuevo en construcción",
      heroLead: "Hola, como pudiste ver antes, mi nombre es",
      downloadCv: "Descargar CV",
      experienceTitle: "Algunos clientes con los que he trabajado",
      clientLabel: "Cliente",
      projectsTitle: "Algunos proyectos que he desarrollado",
      projectLabel: "Proyecto",
      skillsTitle: "Habilidades y herramientas",
      skillsSubtitle:
        "Aquí hay algunas tecnologías y herramientas que he estado usando recientemente.",
      contactFallback:
        "Mi bandeja de entrada siempre está abierta. Contáctame por WhatsApp o correo.",
      whatsapp: "WhatsApp",
      visitClientSite: "Visitar sitio de",
      clientPreview: "Preview de",
      visitSkillSite: "Visitar sitio oficial de",
      projectPreview: "Preview de",
      projectRepo: "Repositorio de",
      projectDemo: "Ver demo de",
      onGithub: "en GitHub",
    },
    lang: {
      switchToEn: "Cambiar idioma a inglés",
      switchToEs: "Cambiar idioma a español",
    },
    footer: {
      socialNav: "Redes sociales",
      rights: "Todos los derechos reservados.",
    },
    side: {
      siteStatus: "Estado del sitio",
    },
  },
  en: {
    loading: "Loading...",
    intro: {
      passionate: "I'm passionate about",
      cta: "Let's go!",
    },
    home: {
      noProfile: "No active profile. Run",
      banner: "Outdated site, new version under construction",
      heroLead: "Hi, as you saw before, my name is",
      downloadCv: "Download résumé",
      experienceTitle: "Some clients I've worked with",
      clientLabel: "Client",
      projectsTitle: "Some projects I've built",
      projectLabel: "Project",
      skillsTitle: "Skills and tools",
      skillsSubtitle:
        "Here are some technologies and tools I've been using recently.",
      contactFallback:
        "My inbox is always open. Reach out via WhatsApp or email.",
      whatsapp: "WhatsApp",
      visitClientSite: "Visit website of",
      clientPreview: "Preview of",
      visitSkillSite: "Visit official site of",
      projectPreview: "Preview of",
      projectRepo: "Repository for",
      projectDemo: "View demo of",
      onGithub: "on GitHub",
    },
    lang: {
      switchToEn: "Switch language to English",
      switchToEs: "Switch language to Spanish",
    },
    footer: {
      socialNav: "Social links",
      rights: "All rights reserved.",
    },
    side: {
      siteStatus: "Site status",
    },
  },
} as const;

/** English overrides for API / seed content (keyed by stable ids) */
const contentEn = {
  profile: {
    tagline: "A developer who loves building solutions for the web.",
    bio: "Computer engineer specialized in building (and occasionally designing) exceptional digital experiences. Currently based in Mexico. I've been in frontend since 2020.",
    skills_note: "*Currently learning Next.js.",
    contact_title: "What are you waiting for?",
    contact_message:
      "I'm looking for new opportunities. My inbox is always open — click WhatsApp or send me an email and I'll get back to you as soon as I can.",
    intro_greeting: "HELLO, I'M",
    typewriter_roles: [
      "Frontend React Developer",
      "Full Stack Developer",
      "Django Enthusiast",
    ],
  },
  fallbackProfile: {
    intro_greeting: "HELLO, I'M",
    typewriter_roles: ["Backend Developer", "React", "Django"],
    contact_title: "What are you waiting for?",
  },
  clients: {
    TaskUp: {
      description:
        "Landing page for TaskUp, a virtual assistant platform. Modern design with hero, navigation, and conversion-focused CTAs.",
      highlights: [
        "Hero with main message and calls to action",
        "Responsive navigation with pricing and contact sections",
        "Visual design aligned with brand identity",
      ],
    },
  },
  projects: {
    "portfolio-personal": {
      title: "Personal Portfolio",
      description:
        "Personal website with dynamic content from Django REST, Framer Motion animations, and responsive design.",
      highlights: [
        "Letter-by-letter and scroll reveal animations",
        "REST API for profile, projects, skills, and contact",
        "Admin panel to manage content",
      ],
    },
    "plataforma-seguros": {
      title: "Insurance Platform",
      description:
        "Web platform for insurance quotes and policy management. Dynamic forms, premium calculation, and admin dashboard.",
      highlights: [
        "Online quote tool with automatic premium calculation",
        "Policy, client, and payment management",
        "Admin dashboard with reports",
      ],
    },
    "gestion-prestamos": {
      title: "Loan Management System",
      description:
        "Internal platform to manage company loans. Client tracking, installments, payments, and account statements.",
      highlights: [
        "Registration and tracking of active loans",
        "Automatic installment and interest calculation",
        "Payment history and account statements",
      ],
    },
  },
} as const;

export type UiKey = keyof typeof ui.es;

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof value === "string" ? value : undefined;
}

export function translate(locale: Locale, key: string): string {
  return getNested(ui[locale] as Record<string, unknown>, key) ?? key;
}

export function getEnglishContent() {
  return contentEn;
}
