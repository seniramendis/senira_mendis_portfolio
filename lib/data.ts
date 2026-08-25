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
  { num: 10,  label: 'Featured projects' },
  { num: 5,  label: 'Languages mastered' },
];

export const ABOUT_STATS = [
  { num: 16,  suffix: '',  label: 'Public repositories' },
  { num: 10,   suffix: '',  label: 'Featured projects' },
  { num: 4,   suffix: '',  label: 'Agile sprints delivered' },
  { num: 146, suffix: 'K', label: 'Rs. fundraised' },
];

export const EDUCATION = [
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
  images?: string[]; // <-- ADD THIS LINE
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    role: 'Full-Stack Developer',
    title: 'Dopmin Web Scraper — Automated B2B Lead Generation Tool',
    description: 'Cross-platform desktop application automating localized data extraction and processing for the Dopmin agency. Architected a decoupled Electron main/renderer process with IPC state sync, an algorithmic query-expansion module for search permutation scaling, a concurrent scraping engine for dynamic web elements, and encrypted local state persistence.',
    tags: ['JavaScript (ES6+)', 'Node.js', 'Electron', 'Svelte', 'Vite', 'HTML/CSS'],
    href: '#',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571941/web_scraper_jzagm8.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571942/web_scraper_1_cuozvq.png',
    ],
  },
  {
    num: '02',
    role: 'Full-Stack Developer · Scrum Master',
    title: 'Dopmin — Corporate Web Platform',
    description: 'Production-grade corporate web platform for Dopmin, an IT solutions agency, built as both a digital storefront and a technical proof-of-concept with a premium "digital luxury" UI/UX. Engineered with the Next.js App Router for optimized SSR/SSG, a strictly typed TypeScript codebase, and a modular PostCSS component system, deployed via a continuous Vercel pipeline. Led the project as Scrum Master, coordinating frontend, backend, and QA across sprints.',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Vercel', 'PostCSS', 'ESLint', 'Node.js'],
    href: 'https://dopmin.vercel.app/',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571915/dopmin_w191aj.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571912/dopmin_1_pwvw2z.png',
    ],
  },
  {
    num: '03',
    role: 'Product Owner',
    title: 'BrainPath — Educational Roadmap Mobile App',
    description: 'Cross-platform mobile app digitizing the national curriculum into an interactive node-based roadmap. Facilitated agile sprints for complex features including interactive roadmap logic and Firebase integration.',
    tags: ['React Native', 'Firebase', 'Android Studio', 'Agile/Scrum'],
    href: '#',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657169/Brain_Path_vdex8k.png',
    ],
  },
  {
  num: '04',
  role: 'Backend Developer · Scrum Master',
  title: 'AgriLease — Agricultural Machinery Platform',
  description: "'Sharing economy platform digitising Sri Lanka's Custom Hiring system. Engineered geospatial radius searches via PostGIS and a high-concurrency booking engine with pessimistic locking to eliminate double-booking during peak seasons",
  tags: ['Laravel 10', 'PostgreSQL 15', 'PostGIS', 'Supabase Auth', 'Docker'],
  href: 'https://github.com/seniramendis/AgriLease-Platform',
  images: [
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1787560571/agri_lease_ieludf.png',
  ],
},
  {
    num: '05',
    role: 'Software Engineer / Full-Stack Developer',
    title: 'Daiwaya.lk — AI-Powered Matrix of Destiny Platform',
    description: 'A highly scalable, bilingual numerology platform for the Sri Lankan market. Engineered a custom mathematical engine in JS to process complex destiny nodes and integrated Gemini 1.5 Flash with robust fail-safes to prevent UI crashes during API rate limits.',
    tags: ['React.js', 'Node.js', 'Gemini API', 'Tailwind CSS', 'Vite', 'Vercel'],
    href: 'https://github.com/seniramendis/Daiwaya',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571634/daiwaya_bywpkx.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571632/daiwaya1_yfbcit.png'
    ]
  },
  {
  num: '06',
  role: 'Full-Stack Developer',
  title: 'KMC Solution — Digital Cultural Heritage Platform',
  description: 'A centralized hub bridging ancient Kandyan traditions with digital ticketing. Built a dynamic organizer command center with real-time KPI tracking and secure "Digital Cultural Passports" for event attendees.',
  tags: ['ASP.NET Core MVC', 'C#', 'Entity Framework', 'Bootstrap 5'],
  href: 'https://github.com/seniramendis/KMCSolution',
  images: [
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571683/kmc_solutions_1_owf4bl.png',
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571683/kmc_solution_azhste.png',
  ],
},
 {
  num: '07',
  role: 'Android Developer',
  title: 'TechCare — Electronic Repair Mobile App',
  description: 'Native Android app streamlining device repairs. Features a custom "Live Repair Tracker" utilizing background handlers for real-time progress updates, automated local notifications, and complex SQLite database architecture.',
  tags: ['Java', 'XML', 'Android Studio', 'SQLite'],
  href: 'https://github.com/seniramendis/TechCare',
  images: [
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1787571844/techcare_zb2gcm.png',
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1787572039/Techcare11_oqkaiv.png',
  ],
},
  {
    num: '08',
    role: 'Full-Stack Developer',
    title: 'Medicare Plus — Healthcare Web Application',
    description: 'Secure healthcare platform featuring an automated 24/7 online scheduling system, telemedicine direct messaging via AJAX, and an e-prescription module with role-based access control.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'CSS Grid'],
    href: 'https://github.com/seniramendis/Medicare-Plus',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657204/Medicare_ufze84.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657197/Medicare1_fxwwjx.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657200/medicare2_ralxkg.png',
    ],
  },
  {
    num: '09',
    role: 'Java Developer',
    title: "The Wizard's Code — Java Game",
    description: 'An interactive 2D game exploring a magical world where code transforms reality. Developed as a team project, combining creative game mechanics with core Java programming concepts.',
    tags: ['Java', 'Game Development', 'OOP'],
    href: '#',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657335/java_Game_tsd8lw.png',
    ],
  },
  {
    num: '10',
    role: 'Full-Stack Developer',
    title: 'Little Haven — Bookstore Management',
    description: 'A management system digitizing bookstore workflows, including inventory tracking, sales processing, and customer record management. Built with a focus on clean CRUD operations and robust data modelling.',
    tags: ['Java', 'MySQL', 'OOP'],
    href: 'https://github.com/seniramendis/Little-Haven-Bookstore-Management-System',
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657013/Little_Heaven_almhdw.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1787657017/Little_Heaven1_huzrea.png',
    ],
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
