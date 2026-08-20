import { getEnglishContent } from "./translations";
import type { Locale } from "./translations";
import type { Client, Project, SiteProfile } from "../types/api";

type ClientOverrides = (typeof getEnglishContent extends () => infer R
  ? R
  : never)["clients"];
type ProjectOverrides = (typeof getEnglishContent extends () => infer R
  ? R
  : never)["projects"];

export function localizeProfile(profile: SiteProfile, locale: Locale): SiteProfile {
  if (locale === "es") return profile;

  const en = getEnglishContent().profile;

  return {
    ...profile,
    tagline: en.tagline,
    bio: en.bio,
    skills_note: en.skills_note,
    contact_title: en.contact_title,
    contact_message: en.contact_message,
    intro_greeting: en.intro_greeting,
    typewriter_roles: [...en.typewriter_roles],
  };
}

export function localizeFallbackProfile(
  profile: SiteProfile,
  locale: Locale,
): SiteProfile {
  if (locale === "es") return profile;

  const en = getEnglishContent().fallbackProfile;

  return {
    ...profile,
    intro_greeting: en.intro_greeting,
    typewriter_roles: [...en.typewriter_roles],
    contact_title: en.contact_title,
  };
}

export function localizeClient(client: Client, locale: Locale): Client {
  if (locale === "es") return client;

  const clients = getEnglishContent().clients as ClientOverrides;
  const override = clients[client.name as keyof ClientOverrides];

  if (!override) return client;

  return {
    ...client,
    description: override.description,
    highlights: [...override.highlights],
  };
}

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "es") return project;

  const projects = getEnglishContent().projects as ProjectOverrides;
  const override = projects[project.slug as keyof ProjectOverrides];

  if (!override) return project;

  return {
    ...project,
    title: override.title,
    description: override.description,
    highlights: [...override.highlights],
  };
}
