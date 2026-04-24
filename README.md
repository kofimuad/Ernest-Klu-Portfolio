# Ernest Klu Portfolio

Premium portfolio website for Ernest Klu — Architect & Sound Engineer, Accra, Ghana.

## Stack

- **React 18** + **Vite 5**
- **React Router v6** (file-based page components)
- **CSS Modules** (zero runtime CSS-in-JS, scoped styles per component)
- No UI library — all components hand-crafted to match the moodboard

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, RootLayout
│   ├── ui/              # Button, Eyebrow, ProjectCard (shared primitives)
│   └── sections/
│       ├── home/        # Hero, Marquee, Services, FeaturedProjects …
│       ├── work/        # WorkGrid (with live filter)
│       ├── about/       # AboutHero, Philosophy
│       └── contact/     # ContactForm (controlled, ready for backend)
├── data/
│   └── content.js       # ← single source of truth for ALL copy & project data
├── hooks/
│   ├── useScrollTop.js  # Scroll-to-top on route change
│   └── useInView.js     # Intersection Observer for scroll animations
├── pages/               # One file per route
├── styles/
│   ├── globals.css      # Design tokens (CSS variables), reset
│   └── utils.css        # Shared utility classes
└── router.jsx           # createBrowserRouter config
```

## Customisation

All content (copy, project images, testimonials, contact details) lives in
`src/data/content.js`. Edit that file to update the site — no component
changes needed.

To swap in real project photos, update the `image` field on each entry in
the `PROJECTS` array. Images can be hosted on Cloudinary, Unsplash, or
moved to `public/images/`.

## Deployment

Recommended: **Vercel** (zero config for Vite + React Router).

```bash
npm i -g vercel
vercel
```

For other hosts (Netlify, Render), ensure the SPA fallback is configured
so React Router handles all routes:
- Netlify: add a `public/_redirects` file: `/* /index.html 200`
- Apache/Nginx: configure a catch-all rewrite to `index.html`
