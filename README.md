# UMBRAL Tattoo Atelier

**A bilingual, responsive tattoo studio website concept built with React, TypeScript, Vite, and CSS Modules.**

UMBRAL is a fictional tattoo atelier created as a front-end portfolio project. The website explores an editorial visual identity with oversized typography, dark and light themes, curated tattoo photography, and a content-focused browsing experience. All artists, testimonials, business details, and contact information are fictional.

## Features

- **Six fully navigable pages:** Home, Studio, Artists, Gallery, Services, and Contact.
- **Bilingual experience:** Spanish (default) and English, including navigation, artwork descriptions, artist profiles, FAQ entries, form labels, alerts, and metadata.
- **Dual color themes:** Dark (default) and light, controlled through semantic CSS variables.
- **Preferences:** Language and theme are retained in `localStorage` between visits.
- **Artwork gallery:** Category filtering, keyboard-accessible lightbox navigation, and responsive image cards.
- **Artist showcase:** Structured, reusable artist profiles.
- **Services and FAQ:** Expandable questions and localized service descriptions.
- **Demonstration contact form:** Browser-only message preparation and copy-to-clipboard. No submission API, database, or live booking service.
- **Responsive layout:** Mobile navigation, fluid typography, and adaptive grids.
- **Routing and metadata:** React Router with page-specific document titles and descriptions.

## Tech stack

| Category | Technology |
| --- | --- |
| User interface | React 18, TypeScript 5 |
| Tooling | Vite 6 |
| Routing | React Router 6 |
| Styling | CSS Modules, global design tokens |
| Icons | Lucide React |
| Persistence | Browser `localStorage` (appearance preferences only) |
| Deployment | Vercel or any static hosting provider supporting SPA rewrites |

## Getting started

Requires **Node.js 20+** and npm.

```bash
npm install
npm run dev
```

Open the local address printed by Vite. For a production build:

```bash
npm run typecheck
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/
│   ├── ArtistCards/
│   ├── ArtworkGrid/
│   ├── Brand/
│   ├── DisplayControls/
│   ├── Footer/
│   ├── Header/
│   ├── PageHero/
│   ├── ScrollTop/
│   ├── SectionHeading/
│   └── StudioImage/
├── context/
│   └── DisplayContext.tsx
├── data/
│   └── SiteContent.ts
├── hooks/
│   └── UsePageMeta.ts
├── pages/
│   ├── Artists/
│   ├── Contact/
│   ├── Gallery/
│   ├── Home/
│   ├── NotFound/
│   ├── Services/
│   └── Studio/
├── styles/
│   └── Global.css
├── types/
│   └── Content.ts
├── App.tsx
└── Main.tsx
```

Every visual page or reusable component has its own PascalCase folder, PascalCase component filename, and `*.module.css` file when styling is needed. CSS declarations use a four-space indentation and one property per line. Component names and exported React functions use PascalCase; hooks and ordinary JavaScript functions retain idiomatic camelCase.

### Architecture

**Localization.** `SiteContent.ts` keeps matching Spanish and English content dictionaries and fictional entities. `DisplayContext.tsx` exposes the active locale and theme throughout the component tree. React components render content from `useContent()` so changing the locale updates the current route immediately.

**Themes.** `Global.css` defines semantic color tokens (`--color-text`, `--color-surface`, `--color-muted`, and so on). Components consume the tokens rather than hard-coding colors, keeping controls, borders, and typography readable in both themes. Photo overlays use explicit contrast colors independently of theme.

**Navigation and reuse.** Page components contain page-specific layouts. Repeated patterns (hero headings, cards, gallery behavior, and site navigation) live in `components/`.

**Image handling.** The original portfolio photos are attributed to the earlier iteration of this same project. During `npm install`, `scripts/DownloadAssets.mjs` retrieves the original images from a pinned public GitHub commit into `public/images`. Components automatically fall back to those immutable URLs if the local image cache is not present. Internet access is therefore required when first installing the project or viewing uncached fallback images.

## Vercel deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Select **Vite** as the framework preset.
4. Use **`npm run build`** and **`dist`** as the output directory.
5. Keep the root directory set to the repository root.

The included `vercel.json` rewrites unknown frontend paths to `index.html` so React Router works on direct page visits. No environment variables are required for the concept site.

## Scope and limitations

This is a front-end showcase, **not a live tattoo studio booking platform**. Form messages are created locally and are never transmitted or stored. WhatsApp links use a placeholder phone number. Before real-world use, replace all fictional data, obtain the necessary rights for imagery, configure real contact endpoints, and review accessibility, privacy, and production hosting requirements.

## Author

Pablo Gilabert — Software Developer

**Repository:** https://github.com/pablo-gilabert/tattoo-studio-demo
