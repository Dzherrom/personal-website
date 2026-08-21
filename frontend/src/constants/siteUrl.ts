/** URL pública del sitio en Netlify (sin barra final). */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ||
  "https://dzherrom.netlify.app";

/** Construye URL de un archivo en frontend/public (p. ej. /images/projects/foo.png). */
export function publicAssetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
