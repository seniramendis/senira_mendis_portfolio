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
  images?: string[]; // <-- ADD THIS LINE
};

export const PROJECTS: Project[] = [
  {
    num: '01',
    role: 'Software Engineer / Full-Stack Developer',
    title: 'Daiwaya.lk — AI-Powered Matrix of Destiny Platform',
    description: 'A highly scalable, bilingual numerology platform for the Sri Lankan market. Engineered a custom mathematical engine in JS to process complex destiny nodes and integrated Gemini 1.5 Flash with robust fail-safes to prevent UI crashes during API rate limits.',
    tags: ['React.js', 'Node.js', 'Gemini API', 'Tailwind CSS', 'Vite', 'Vercel'],
    href: 'https://github.com/seniramendis/Daiwaya',
    // <-- ADD YOUR IMAGES HERE
    images: [
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1781649916/Daiwaya_mockup_1_zhaiir.png',
      'https://res.cloudinary.com/dukv2otyn/image/upload/v1781649913/Daiwaya_mockup_2_spvrft.png'
    ]
  },
  {
  num: '02',
  role: 'Backend Developer · Scrum Master',
  title: 'AgriLease — Agricultural Machinery Platform',
  description: "'Sharing economy platform digitising Sri Lanka's Custom Hiring system. Engineered geospatial radius searches via PostGIS and a high-concurrency booking engine with pessimistic locking to eliminate double-booking during peak seasons",
  tags: ['Laravel 10', 'PostgreSQL 15', 'PostGIS', 'Supabase Auth', 'Docker'],
  href: 'https://github.com/seniramendis/AgriLease-Platform',
  images: [
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1781649941/agriLease_mockup_xqapxz.png',
  ],
},
  {
    num: '03',
    role: 'Full-Stack Developer',
    title: 'GlobeTrek Elite — Full-Stack Travel Management',
    description: 'Premium travel booking application tailored for the luxury market. Features a robust role-based access control system for automated booking workflows, secure inquiry management, and a dynamic admin revenue dashboard.',
    tags: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript'],
    href: 'https://github.com/seniramendis/globetrek',
  },
  {
    num: '04',
    role: 'Android Developer',
    title: 'LuxeVista Resort — Hotel Management System',
    description: 'Comprehensive Android application to streamline hotel operations. Architected using the MVVM pattern with a multi-table Room database, reactive UI updates via LiveData, and complex navigation flows.',
    tags: ['Java', 'Android SDK', 'Room', 'Navigation Component', 'View Binding'],
    href: 'https://github.com/seniramendis/LuxeVista-Resort',
  },
  {
    num: '05',
    role: 'Full-Stack Developer',
    title: 'KMC Solution — Digital Cultural Heritage Platform',
    description: 'A centralized hub bridging ancient Kandyan traditions with digital ticketing. Built a dynamic organizer command center with real-time KPI tracking and secure "Digital Cultural Passports" for event attendees.',
    tags: ['ASP.NET Core MVC', 'C#', 'Entity Framework', 'Bootstrap 5'],
    href: 'https://github.com/seniramendis/KMCSolution',
  },
  {
    num: '06',
    role: 'Full-Stack Developer',
    title: 'FitZone — Gym Management System',
    description: 'Complete digitalization of fitness center operations. Engineered secure role-based dashboards, a smart booking ledger requiring checkout, and an automated SQL-driven payroll engine for trainer commissions.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap 5'],
    href: 'https://github.com/seniramendis/FitZone',
  },
  {
    num: '07',
    role: 'Product Owner',
    title: 'BrainPath — Educational Roadmap Mobile App',
    description: 'Cross-platform mobile app digitizing the national curriculum into an interactive node-based roadmap. Facilitated agile sprints for complex features including interactive roadmap logic and Firebase integration.',
    tags: ['React Native', 'Firebase', 'Android Studio', 'Agile/Scrum'],
    href: '#',
  },
 {
  num: '08',
  role: 'Android Developer',
  title: 'TechCare — Electronic Repair Mobile App',
  description: 'Native Android app streamlining device repairs. Features a custom "Live Repair Tracker" utilizing background handlers for real-time progress updates, automated local notifications, and complex SQLite database architecture.',
  tags: ['Java', 'XML', 'Android Studio', 'SQLite'],
  href: 'https://github.com/seniramendis/TechCare',
  images: [
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1781649967/tech_care_mockup_mjxucm.png',
    'https://res.cloudinary.com/dukv2otyn/image/upload/v1781649981/tech_care_mockup_2_thi0v0.png',
  ],
},
  {
    num: '09',
    role: 'Full-Stack Developer',
    title: 'Medicare Plus — Healthcare Web Application',
    description: 'Secure healthcare platform featuring an automated 24/7 online scheduling system, telemedicine direct messaging via AJAX, and an e-prescription module with role-based access control.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'CSS Grid'],
    href: 'https://github.com/seniramendis/Medicare-Plus',
  },
  {
    num: '10',
    role: 'Java Developer',
    title: "The Wizard's Code — Java Game",
    description: 'An interactive 2D game exploring a magical world where code transforms reality. Developed as a team project, combining creative game mechanics with core Java programming concepts.',
    tags: ['Java', 'Game Development', 'OOP'],
    href: '#',
  },
  {
    num: '11',
    role: 'Full-Stack Developer',
    title: 'Little Haven — Bookstore Management',
    description: 'A management system digitizing bookstore workflows, including inventory tracking, sales processing, and customer record management. Built with a focus on clean CRUD operations and robust data modelling.',
    tags: ['Java', 'MySQL', 'OOP'],
    href: 'https://github.com/seniramendis/Little-Haven-Bookstore-Management-System',
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
