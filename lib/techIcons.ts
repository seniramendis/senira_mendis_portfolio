// ─────────────────────────────────────────────
// TECH STACK ICONS
// Maps each tag used in lib/data.ts → a Simple Icons slug + brand color.
// Icons are served live from the Simple Icons CDN (cdn.simpleicons.org),
// so there's nothing to store locally — just an <img> pointed at the API.
// Unmapped / unrecognised tags simply render as plain text (no broken icon).
// ─────────────────────────────────────────────

export type TechIcon = { slug: string; color: string };

export const TECH_ICONS: Record<string, TechIcon> = {
  'JavaScript (ES6+)': { slug: 'javascript', color: 'F7DF1E' },
  JavaScript: { slug: 'javascript', color: 'F7DF1E' },
  'Node.js': { slug: 'nodedotjs', color: '339933' },
  Electron: { slug: 'electron', color: '9FEAF9' },
  Svelte: { slug: 'svelte', color: 'FF3E00' },
  Vite: { slug: 'vite', color: '646CFF' },
  'HTML/CSS': { slug: 'html5', color: 'E34F26' },
  'Next.js': { slug: 'nextdotjs', color: '000000' },
  'React.js': { slug: 'react', color: '61DAFB' },
  'React Native': { slug: 'react', color: '61DAFB' },
  TypeScript: { slug: 'typescript', color: '3178C6' },
  Vercel: { slug: 'vercel', color: '000000' },
  PostCSS: { slug: 'postcss', color: 'DD3A0A' },
  ESLint: { slug: 'eslint', color: '4B32C3' },
  Firebase: { slug: 'firebase', color: 'FFCA28' },
  'Android Studio': { slug: 'androidstudio', color: '3DDC84' },
  'Laravel 10': { slug: 'laravel', color: 'FF2D20' },
  'PostgreSQL 15': { slug: 'postgresql', color: '4169E1' },
  PostGIS: { slug: 'postgresql', color: '4169E1' },
  'Supabase Auth': { slug: 'supabase', color: '3ECF8E' },
  Docker: { slug: 'docker', color: '2496ED' },
  'Gemini API': { slug: 'googlegemini', color: '8E75B2' },
  'Tailwind CSS': { slug: 'tailwindcss', color: '06B6D4' },
  'ASP.NET Core MVC': { slug: 'dotnet', color: '512BD4' },
  'C#': { slug: 'csharp', color: '239120' },
  'Bootstrap 5': { slug: 'bootstrap', color: '7952B3' },
  Java: { slug: 'openjdk', color: 'ED8B00' },
  SQLite: { slug: 'sqlite', color: '003B57' },
  PHP: { slug: 'php', color: '777BB4' },
  MySQL: { slug: 'mysql', color: '4479A1' },
  'CSS Grid': { slug: 'css3', color: '1572B6' },
  'Agile/Scrum': { slug: 'jira', color: '0052CC' },
};

export function getTechIconUrl(tag: string): string | null {
  const icon = TECH_ICONS[tag];
  if (!icon) return null;
  return `https://cdn.simpleicons.org/${icon.slug}/${icon.color}`;
}
