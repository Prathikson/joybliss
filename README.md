# Spectre Ink — Tattoo Studio Website

A high-performance, SEO-optimised Next.js 14 website for Spectre Ink tattoo studio.

## Tech Stack

| Library | Purpose |
|---|---|
| Next.js 14 | Framework (App Router, SSR/SSG, SEO) |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| GSAP + ScrollTrigger | Scroll-driven animations & micro-interactions |
| Framer Motion | React component animations |
| Lenis | Smooth scroll |
| Lucide React | Icons |
| Inconsolata | Display / heading font |
| DM Sans | Body font |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout with full SEO metadata
│   ├── page.tsx             # Main page (orchestrates sections)
│   ├── robots.ts            # robots.txt generation
│   └── sitemap.ts           # sitemap.xml generation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Fixed header with pill nav, theme, progress
│   │   ├── Preloader.tsx    # Animated preloader with counter
│   │   └── Providers.tsx    # Client providers (Lenis)
│   │
│   ├── sections/
│   │   ├── Hero.tsx         # Orbiting images + services + headline
│   │   ├── WhatWeDo.tsx     # Two-column services grid
│   │   ├── Showcase.tsx     # Portfolio blocks + video section
│   │   ├── Process.tsx      # GSAP scroll-driven step ticker
│   │   ├── TrustedBy.tsx    # Press logo grid
│   │   ├── Testimonials.tsx # 3-column testimonial cards
│   │   └── Footer.tsx       # 4-column footer
│   │
│   └── ui/
│       ├── Button.tsx        # Animated button
│       ├── Cursor.tsx        # Custom magnetic cursor
│       ├── GrainOverlay.tsx  # Subtle grain texture
│       ├── Logo.tsx          # SVG logo mark + full logo
│       ├── SectionLabel.tsx  # Uppercase section labels
│       └── TattooSVG.tsx     # SVG tattoo art illustrations
│
├── hooks/
│   ├── useGSAP.ts           # GSAP context hook
│   ├── useLenis.ts          # Lenis smooth scroll init
│   ├── useScrollProgress.ts # Scroll % tracker
│   └── useTheme.ts          # Dark/light theme toggle
│
├── lib/
│   ├── data.ts              # All site content (edit here)
│   ├── seo.ts               # ← CENTRALISED SEO CONFIG (edit here)
│   └── utils.ts             # cn() helper
│
└── types/
    └── index.ts             # Shared TypeScript types
```

## ✏️ Editing Content

### SEO & Studio Info
Edit `src/lib/seo.ts` — all metadata, OG tags, schema, studio address, phone, email.

### Page Content
Edit `src/lib/data.ts` — nav items, services, work items, process steps, testimonials, logos.

### Theme & Colours
Edit `:root` and `.dark` in `src/app/globals.css`.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Works on Vercel, Netlify, or any Node.js host out of the box.
