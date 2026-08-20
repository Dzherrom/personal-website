import type { ComponentType } from "react";
import {
  SiCss,
  SiDjango,
  SiFlydotio,
  SiFramer,
  SiHostinger,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNpm,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiRuby,
  SiRubyonrails,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

type SkillIconComponent = ComponentType<{
  className?: string;
  color?: string;
}>;

/** La key debe coincidir EXACTAMENTE con el nombre en Django admin */
export const SKILL_ICONS: Record<string, SkillIconComponent> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "React Router": SiReactrouter,
  "Next.js": SiNextdotjs,
  Tailwind: SiTailwindcss,
  SASS: SiSass,
  Redux: SiRedux,
  Python: SiPython,
  Django: SiDjango,
  "Django REST": SiDjango,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Ruby: SiRuby,
  "Ruby on Rails": SiRubyonrails,
  NPM: SiNpm,
  "VS Code": VscCode,
  "Fly.io": SiFlydotio,
  Hostinger: SiHostinger,
  Netlify: SiNetlify,
  Vercel: SiVercel,
  "Framer Motion": SiFramer,
};

/** Colores oficiales por tecnología */
export const SKILL_COLORS: Record<string, string> = {
  HTML: "#E34F26",
  CSS: "#1572B6",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  "React Router": "#CA4245",
  "Next.js": "#000000",
  Tailwind: "#06B6D4",
  SASS: "#CC6699",
  Redux: "#764ABC",
  Python: "#3776AB",
  Django: "#092E20",
  "Django REST": "#0C4B33",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Ruby: "#CC342D",
  "Ruby on Rails": "#CC0000",
  NPM: "#CB3837",
  "VS Code": "#007ACC",
  "Fly.io": "#8B5CF6",
  Hostinger: "#673DE6",
  Netlify: "#00C7B7",
  Vercel: "#000000",
  "Framer Motion": "#0055FF",
};

/** URLs oficiales de cada tecnología */
export const SKILL_URLS: Record<string, string> = {
  HTML: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  CSS: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  TypeScript: "https://www.typescriptlang.org/",
  React: "https://react.dev/",
  "React Router": "https://reactrouter.com/",
  "Next.js": "https://nextjs.org/",
  Tailwind: "https://tailwindcss.com/",
  SASS: "https://sass-lang.com/",
  Redux: "https://redux.js.org/",
  Python: "https://www.python.org/",
  Django: "https://www.djangoproject.com/",
  "Django REST": "https://www.django-rest-framework.org/",
  PostgreSQL: "https://www.postgresql.org/",
  MySQL: "https://www.mysql.com/",
  Ruby: "https://www.ruby-lang.org/",
  "Ruby on Rails": "https://rubyonrails.org/",
  NPM: "https://www.npmjs.com/",
  "VS Code": "https://code.visualstudio.com/",
  "Fly.io": "https://fly.io/",
  Hostinger: "https://www.hostinger.com/",
  Netlify: "https://www.netlify.com/",
  Vercel: "https://vercel.com/",
  "Framer Motion": "https://www.framer.com/motion/",
};

/** Skills que muestran badge de texto sobre el icono */
export const SKILL_BADGES: Record<string, string> = {
  "Django REST": "REST",
};
