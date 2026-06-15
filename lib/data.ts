// ─────────────────────────────────────────────
// PORTFOLIO DATA  ·  edit this file to update content
// ─────────────────────────────────────────────

export const PERSONAL = {
  name: 'Senira Mendis',
  tagline: 'Based in Colombo, Sri Lanka · Open to opportunities',
  headline: ['Building software', 'that solves real-world', 'problems.'],
  headlineItalic: 'solves real-world',
  sub: 'Software Engineering undergraduate at Cardiff Metropolitan University. Full-stack, mobile & backend developer — driven by elegant architecture and Agile delivery.',
  location: 'Mount Lavinia, Colombo',
  email: 'seniramendis41@gmail.com',
  linkedin: 'https://www.linkedin.com/in/senira-mendis/',
  github: 'https://github.com/seniramendis',
  instagram: 'https://www.instagram.com/senira._mendis/',
  facebook: 'https://facebook.com/seniramendis/',
  whatsapp: 'https://wa.me/94753356254',
  whatsappDisplay: '+94 75 335 6254',
  available: true,
};

// Rotating "currently building with" words for the hero intro typewriter
export const HERO_TECH_WORDS = [
  'Laravel',
  'React Native',
  'Java & Kotlin',
  'PostgreSQL + PostGIS',
  'Node.js',
  'Docker',
  'Firebase & Supabase',
];

export const STATS = [
  { num: 16, label: 'Public repositories' },
  { num: 6,  label: 'Featured projects' },
  { num: 5,  label: 'Languages mastered' },
];

export const ABOUT_STATS = [
  { num: 16,  suffix: '',  label: 'Public repositories' },
  { num: 6,   suffix: '',  label: 'Featured projects' },
  { num: 4,   suffix: '',  label: 'Agile sprints delivered' },
  { num: 146, suffix: 'K', label: 'Rs. fundraised' },
];

export const EDUCATION = [
  {
    school: 'Cardiff Metropolitan University',
    degree: 'HND · Computer Software Engineering',
    year: '2023–now',
  },
  {
    school: 'ICBT Campus, Colombo',
    degree: 'Affiliated institution',
    year: 'Sri Lanka',
  },
  {
    school: 'Available now',
    degree: 'Software · Web · Android · Backend roles',
    year: 'LK / Remote',
  },
];

export const SKILLS = [
  {
    category: 'Languages',
    items: ['Java', 'PHP', 'JavaScript', 'Kotlin', 'C#', 'C++', 'R', 'HTML / CSS'],
  },
  {
    category: 'Frameworks',
    items: ['Laravel', 'React Native', 'Node.js', '.NET', 'Bootstrap', 'jQuery', 'Android Studio'],
  },
  {
    category: 'Data & Cloud',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Supabase', 'PostGIS', 'SQLite', 'MSSQL'],
  },
  {
    category: 'Tooling & Process',
    items: ['Docker', 'Git', 'Postman', 'Figma', 'Jira', 'ClickUp', 'Agile / Scrum', 'REST APIs'],
  },
  {
    category: 'Architecture',
    items: ['MVC', 'OOP', 'RBAC', 'Geospatial', 'WebSockets', 'Concurrency', 'Pessimistic Locking'],
  },
  {
    category: 'Soft Skills',
    items: ['Scrum Master', 'Product Owner', 'Sprint Planning', 'Fundraising', 'Event Management'],
  },
];

export const MARQUEE_SKILLS = [
  'Full-Stack Development', 'Android Development', 'Backend Engineering',
  'Laravel', 'React Native', 'Java', 'PostgreSQL', 'Docker', 'Agile / Scrum',
  'System Architecture', 'REST APIs', 'Firebase', 'Node.js', 'Kotlin', 'PostGIS',
];

export type Project = {
  num: string;
  role?: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    role: 'Backend Developer · Scrum Master',
    title: 'AgriLease — Agricultural Machinery Platform',
    description: 'Sharing economy platform digitising Sri Lanka\'s "Custom Hiring" system. Geospatial radius search via PostGIS, high-concurrency booking engine with pessimistic locking, 4-sprint Agile delivery.',
    tags: ['Laravel 10', 'PostgreSQL 15', 'PostGIS', 'Supabase Auth', 'Docker'],
    href: 'https://github.com/seniramendis/AgriLease-Platform',
  },
  {
    num: '02',
    title: 'TechCare — Android Repair Tracker',
    description: 'Native Android app streamlining electronics repair bookings. Live Repair Tracker with background handlers, secure SQLite auth, ViewPager2 and Material Design UI.',
    tags: ['Java', 'Android Studio', 'SQLite', 'Material Design'],
    href: 'https://github.com/seniramendis/TechCare',
  },
  {
    num: '03',
    role: 'Product Owner',
    title: 'BrainPath — Educational Roadmap App',
    description: 'Cross-platform mobile app converting Sri Lanka\'s national curriculum into an interactive node-based roadmap. Google One-Tap Sign-In, collaborative sprint ownership.',
    tags: ['React Native', 'Firebase', 'Jira'],
    href: 'https://github.com/seniramendis',
  },
  {
    num: '04',
    title: 'Medicare Plus — Hospital Management System',
    description: 'Full-stack hospital platform with custom PHP sessions, RBAC, asynchronous encrypted chat, smart 24/7 scheduling, and automated financial tracking.',
    tags: ['PHP', 'MySQL', 'AJAX', 'RBAC'],
    href: 'https://github.com/seniramendis/Medicare-Plus',
  },
  {
    num: '05',
    title: 'Little Haven — Bookstore Management System',
    description: 'Inventory, sales, and customer record management with complex CRUD operations and clean OOP architecture.',
    tags: ['Java', 'OOP'],
    href: 'https://github.com/seniramendis/Little-Haven-Bookstore-Management-System',
  },
  {
    num: '06',
    title: "The Wizard's Code — 2D Java Game",
    description: 'Educational interactive 2D game blending creativity with programming concepts. Built by a 5-person team, showcased at ICBT Exito Exhibition.',
    tags: ['Java', '2D Game Dev', 'Team of 5'],
    href: 'https://github.com/seniramendis',
  },
];

export const LEADERSHIP = [
  {
    icon: '🏥',
    title: 'Vice Treasurer — Charity Donation Drive',
    body: 'Organised fundraising for the Cancer Hospital, Maharagama. Supervised full budget and resource allocation for medical supplies.',
    badge: 'Rs. 146,000+ managed',
  },
  {
    icon: '🎬',
    title: 'Vice Treasurer — ICBT Movie Screening',
    body: 'Managed ticket sales, fund operations, logistics, promotions, and complete event coordination for the ICBT campus event.',
    badge: null,
  },
];
