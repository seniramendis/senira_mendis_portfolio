# Senira Mendis — Portfolio (Next.js)

A Next.js 14 rebuild of the original HTML portfolio, structured for easy extension.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build && npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
senira-mendis-portfolio/
├── app/
│   ├── globals.css        ← Design tokens & shared styles
│   ├── layout.tsx         ← Root layout + metadata (SEO)
│   └── page.tsx           ← Assembles all sections
│
├── components/
│   ├── sections/
│   │   ├── Nav.tsx        ← Fixed navbar + mobile hamburger
│   │   ├── Hero.tsx       ← Hero with canvas grain field
│   │   ├── Marquee.tsx    ← Auto-scrolling skills ticker
│   │   ├── About.tsx      ← About + stats + education
│   │   ├── Skills.tsx     ← Drag-scroll skills wall
│   │   ├── Projects.tsx   ← Editorial project list
│   │   ├── Leadership.tsx ← Leadership cards
│   │   ├── Contact.tsx    ← Full-bleed dark contact
│   │   └── Footer.tsx
│   └── ui/
│       ├── Cursor.tsx     ← Custom cursor (desktop only)
│       ├── ProgressBar.tsx← Scroll progress bar
│       └── Reveal.tsx     ← Reusable scroll-reveal wrapper
│
├── hooks/
│   ├── useMagnetic.ts     ← Magnetic button effect
│   ├── useCounter.ts      ← Animated number counter
│   └── useReveal.ts       ← IntersectionObserver reveal
│
└── lib/
    └── data.ts            ← ⭐ ALL CONTENT LIVES HERE
```

---

## ✏️ How to Update Content

**All text, links, projects, skills, stats are in one file: `lib/data.ts`**

```ts
// Change personal info
export const PERSONAL = {
  name: 'Senira Mendis',
  email: 'senira@email.com',
  linkedin: 'https://www.linkedin.com/in/senira-mendis/',
  github: 'https://github.com/seniramendis',
  ...
};

// Add a project
export const PROJECTS: Project[] = [
  {
    num: '07',
    title: 'My New Project',
    description: 'What it does...',
    tags: ['Next.js', 'TypeScript'],
    href: 'https://github.com/seniramendis/my-project',
  },
  ...
];

// Add a skill category
export const SKILLS = [
  {
    category: 'New Category',
    items: ['Skill A', 'Skill B'],
  },
  ...
];
```

---

## 🆕 Adding New Sections

1. Create `components/sections/MySection.tsx`
2. Create `components/sections/MySection.module.css`
3. Import and add to `app/page.tsx`

Use the `Reveal` wrapper for scroll-triggered animations:

```tsx
import Reveal from '@/components/ui/Reveal';

<Reveal delay={100}>
  <p>This will animate in on scroll</p>
</Reveal>
```

---

## 🎨 Design Tokens

All design variables are in `app/globals.css`:

```css
:root {
  --accent:    #C4601A;  /* Orange accent */
  --text-1:    #0D0D0D;  /* Primary text */
  --serif:     'Fraunces', Georgia, serif;
  --sans:      'Inter', system-ui, sans-serif;
}
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next@14` | Framework |
| `react@18` | UI |
| `gsap@3` | Available for advanced animations |
| `clsx` | Conditional classNames |

---

## 🌐 Deploy

### Vercel (recommended — zero config)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Deploy the `.next` folder
```

---

## 🔮 Ideas for Future Features

- [ ] Blog section with MDX
- [ ] Dark mode toggle
- [ ] Project filter by technology
- [ ] Resume PDF download button
- [ ] Animated page transitions
- [ ] Contact form with email API (Resend / SendGrid)
- [ ] Image gallery per project
- [ ] Analytics (Vercel Analytics / Plausible)
