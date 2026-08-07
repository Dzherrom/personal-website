import type {
  Client,
  ContactPayload,
  PaginatedResponse,
  Project,
  SiteProfile,
  Skill,
} from "../types/api";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

/** Convierte URLs de archivos del API a ruta local proxied (/media/...) en desarrollo. */
export function getMediaUrl(fileUrl: string): string {
  if (!fileUrl) return "";

  try {
    const { pathname } = new URL(fileUrl);
    if (pathname.startsWith("/media/")) {
      return pathname;
    }
  } catch {
    if (fileUrl.startsWith("/media/")) {
      return fileUrl;
    }
  }

  return fileUrl;
}

/** @deprecated Usa getMediaUrl */
export function getCvDownloadUrl(cvFile: string): string {
  return getMediaUrl(cvFile);
}

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getProfile(): Promise<SiteProfile | null> {
  const data = await fetchJson<PaginatedResponse<SiteProfile>>("/profile/");
  return data.results[0] ?? null;
}

export async function getClients(): Promise<Client[]> {
  const data = await fetchJson<PaginatedResponse<Client>>("/clients/");
  return data.results;
}

export async function getProjects(): Promise<Project[]> {
  const data = await fetchJson<PaginatedResponse<Project>>("/projects/");
  return data.results;
}

export async function getSkills(): Promise<Skill[]> {
  const data = await fetchJson<PaginatedResponse<Skill>>("/skills/");
  return data.results;
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
  await fetchJson("/contact/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface HomeData {
  profile: SiteProfile | null;
  clients: Client[];
  projects: Project[];
  skills: Skill[];
}

export async function getHomeData(): Promise<HomeData> {
  const [profile, clients, projects, skills] = await Promise.all([
    getProfile().catch(() => null),
    getClients().catch(() => []),
    getProjects().catch(() => []),
    getSkills().catch(() => []),
  ]);

  return { profile, clients, projects, skills };
}
