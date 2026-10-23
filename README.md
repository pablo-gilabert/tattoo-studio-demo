# UMBRAL — Tattoo Atelier

**A responsive, Spanish-language tattoo studio concept website built with React, TypeScript, and Vite.**

UMBRAL is an independent frontend portfolio project that explores how visual storytelling, clean component architecture, and thoughtful interactions can turn a creative studio's work into a compelling digital experience. The imagined studio operates in Buenos Aires, Argentina; its branding, contact information, artist profiles, and customer testimonials are fictional.

> **Portfolio project — not a commercial commission.** This is a concept for demonstrating frontend development and interface design. It is not affiliated with an operating tattoo studio, and the photographs are AI-generated illustrative assets rather than documentation of real clients or tattoos.

## Project at a glance

| | |
| --- | --- |
| **Category** | Responsive studio / artist portfolio website |
| **Content language** | Spanish (Argentina) |
| **Development language** | English (code, comments, naming, documentation) |
| **Frontend** | React 18, TypeScript 5, Vite 6 |
| **Routing** | React Router 6 |
| **Icons** | Lucide React |
| **Styling** | Custom CSS, design tokens, mobile-first media queries |
| **Deployment target** | Vercel (static single-page application) |

## Product overview

The website presents a fictional tattoo atelier through editorial typography, warm neutral colors, copper accents, and atmospheric imagery. Visitors can learn about the studio, explore artist profiles and services, browse a filterable portfolio, and prepare an inquiry about a tattoo idea.

The interface is intentionally written in **Spanish**, reflecting its intended market, while the source code and technical documentation are written in **English** for easier international technical review.

### Routes

| Path | Page | Main responsibility |
| --- | --- | --- |
| `/` | Home | Editorial hero, studio highlights, selected work, artists, and calls to action |
| `/estudio` | Studio | Studio concept, story, creative process, and values |
| `/artistas` | Artists | Fictional artist profiles and specializations |
| `/galeria` | Gallery | Artwork grid, style filters, and image viewer |
| `/servicios` | Services | Offerings, preparation information, and expandable FAQ |
| `/contacto` | Contact | Studio details and a demonstration inquiry form |
| Other routes | Not found | Custom 404 screen with return navigation |

## Features and interactions

- **Mobile-first, responsive layout:** centered content wrappers occupy approximately **90% of the available viewport width** with a maximum page width. They preserve comfortable side gutters from small phones to large displays.
- **Responsive navigation:** compact mobile menu and desktop links, active route indication, keyboard-accessible controls, and automatic menu closure on navigation.
- **Interactive portfolio:** filter work by tattoo style, open a larger image, and navigate between images with the arrow keys or the provided controls. `Escape` closes the viewer.
- **Data-driven content:** navigation items, artists, artwork descriptions, services, FAQs, testimonials, and business details are centralized in a typed module.
- **Interactive FAQ:** expand or collapse answers without navigating to another page.
- **Inquiry preview:** a validated contact form prepares a message locally and supports copying the text. **It does not submit data to a server or send a real appointment request.**
- **Accessible foundations:** semantic HTML, meaningful image alt text, control labels, visible focus states, and reduced-motion support.
- **Lightweight media:** twelve locally hosted WebP photographs with 1920 × 1080 output dimensions. Some images were upscaled, so those dimensions do not imply native Full HD source detail.
- **Navigation-aware metadata:** browser titles and descriptions are updated when switching routes.
- **Production routing:** a Vercel rewrite supports refreshing or opening deep links directly.

## Engineering decisions

### Component architecture

The app separates **shared UI components**, **page-level compositions**, **fictional content data**, and **global design tokens**. Reusable components such as `Header`, `PageHero`, `SectionHeading`, and `ArtworkGrid` make it easier to add new screens without duplicating layout logic.

### Responsive design

Styles start with the smallest screens and progressively enhance the layout at tablet and desktop breakpoints. A reusable `.container` class controls content alignment:

```css
/* Keeps 5% breathing room on either side, with a readable desktop limit. */
.container {
  width: min(90%, var(--contentWidth));
  margin-inline: auto;
}
```

The homepage hero uses the same container system. Its background image is allowed to extend across the full viewport, while text and controls stay within the content grid. This separation is especially important at narrow widths such as 320 px.

### State management

Local React state is sufficient for the mobile navigation, gallery filters, image viewer, contact preview, and FAQ accordion. No external state-management library or backend is required for the demo.

### Project naming conventions

- **PascalCase (`ThisConvention`) filenames** for `.ts`, `.tsx`, and `.css` (`HomePage.tsx`, `SiteData.ts`, `Global.css`, `ViteConfig.ts`).
- **PascalCase component and type names**, using named exports for React components.
- **camelCase** for variables, data fields, CSS class names, ordinary functions, and React hooks (for example `usePageMeta`, following React's hook naming rules).
- **English source comments** focused on why a component or behavior exists, rather than restating individual lines of code.
- Exact filename casing in imports for compatibility with Linux-based CI and Vercel builds.

The Vite configuration is intentionally named `ViteConfig.ts`; all relevant scripts explicitly pass `--config ViteConfig.ts`.

## Technology stack

| Technology | Implementation role |
| --- | --- |
| React 18 | Functional components, hooks, declarative UI |
| TypeScript 5 | Static typing for components and studio data |
| Vite 6 | Development server and optimized production build |
| React Router 6 | Client-side routing and active navigation states |
| Lucide React | Consistent, lightweight SVG icons |
| CSS3 | Custom design system, fluid layouts, responsive breakpoints |
| GitHub Actions | Build validation on pushes and pull requests |
| Vercel | Static site hosting with SPA fallback routing |

## Installation and local development

### Prerequisites

- **Node.js 20.19+ or 22.12+** (Node.js 22 LTS is recommended for this Vite 6 project).
- **npm**, bundled with Node.js.
- **Git**, recommended for publishing the source code.

From the project root:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, typically `http://localhost:5173`.

### Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run typecheck` | Run TypeScript project validation |
| `npm run build` | Type-check and produce the optimized `dist/` directory |
| `npm run preview` | Serve the local production bundle |

The repository should **not** contain `node_modules/` or `dist/`; both are generated locally. A `package-lock.json` can be committed after dependency installation to make CI builds more reproducible.

## Repository structure

```text
umbralTattooDemo/
├── public/
│   ├── images/                 # Local portfolio and studio assets
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ArtistCards.tsx      # Shared artist profile layout
│   │   ├── ArtworkGrid.tsx     # Filterable portfolio and image viewer
│   │   ├── Brand.tsx           # Studio wordmark
│   │   ├── Footer.tsx          # Footer navigation and demo disclaimer
│   │   ├── Header.tsx          # Navigation and mobile menu
│   │   ├── PageHero.tsx        # Reusable interior-page hero
│   │   ├── ScrollTop.tsx       # Scroll reset on route changes
│   │   └── SectionHeading.tsx  # Section introduction component
│   ├── data/
│   │   └── SiteData.ts         # Typed, fictional business information
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── StudioPage.tsx
│   │   ├── ArtistsPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── styles/
│   │   └── Global.css          # Tokens, responsive rules, and shared styles
│   ├── utils/
│   │   └── UsePageMeta.ts      # Page title and description updates
│   ├── App.tsx                 # Page routes and shared layout
│   └── Main.tsx                # React application bootstrap
├── .github/workflows/ci.yml  # Build checks on GitHub
├── InstallationGuide.md      # Extended setup and deployment walkthrough
├── ViteConfig.ts             # Vite configuration (PascalCase convention)
├── vercel.json               # SPA routing fallback
├── index.html
├── package.json
└── README.md
```

## Customization

1. **Business information:** edit `src/data/SiteData.ts` to change the fictional studio identity, contact details, social links, artist profiles, work categories, and services.
2. **Photography:** replace the corresponding files in `public/images/` with properly licensed media and update the paths where needed.
3. **Brand colors and typography:** adjust CSS variables at the beginning of `src/styles/Global.css`.
4. **User-facing copy:** update the Spanish strings in the page components.
5. **Contact integration:** replace the example WhatsApp destination and connect the inquiry form to an appropriate backend or hosted form provider before handling real customer data.

## Deployment

### GitHub

Create an empty repository, then run the following in the extracted project folder:

```bash
git init
git add .
git commit -m "Build responsive tattoo studio portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/umbralTattooDemo.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username. If the directory is already a Git repository, reuse the existing repository instead of running `git init` again.

### Vercel

1. Open [vercel.com](https://vercel.com/) and import the GitHub repository.
2. Select **Vite** as the framework preset.
3. Use **`npm run build`** as the build command.
4. Use **`dist`** as the output directory and **`npm install`** as the installation command.
5. Deploy. No environment variables are required for this frontend-only sample.

The included `vercel.json` redirects unknown application paths to `index.html`, allowing React Router to resolve the requested page after a refresh.

## Quality assurance and known limitations

### Recommended pre-deployment checks

- Run `npm run typecheck` and `npm run build` without errors.
- Test viewport widths around **320, 375, 768, 1024, and 1920 pixels**, including text wrapping and horizontal overflow.
- Open every page, use the mobile menu, filter the gallery, navigate the lightbox, expand FAQs, and complete the contact preview.
- Test keyboard interactions and verify that images and styles load correctly after refreshing nested routes.

### Demo limitations

- There is no real booking system, database, authentication, CMS, or payment integration.
- The contact form produces a **local preview only**, not an email or a submitted lead.
- WhatsApp and other contact information are placeholders and must be replaced before using the site for a real business.
- Gallery imagery, team biographies, review quotations, and the business itself are fictional.
- The gallery has basic keyboard support; production-level dialog focus management and additional accessibility auditing would be appropriate before release for an actual client.
- Responsive images currently use single-resolution WebP sources. A real high-traffic site could add `srcset` variants and optimized image delivery.

## Design references and credits

- **Visual inspiration:** [Tattoo Studio Website Design — Figma Community](https://www.figma.com/community/file/1599513097736553902/tattoo-studio-website-design). The editable design frames were not available during implementation, so **this website is an original interpretation, not an exact reproduction or a claimed pixel-perfect conversion**.
- **Iconography:** [Lucide](https://lucide.dev/).
- **Photography:** AI-generated concept images created for this project.
- **Fonts:** Italiana and DM Sans via Google Fonts, with fallback font stacks.

## Author

**Pablo Gilabert — Software Developer**

Built as a portfolio case study highlighting React and TypeScript proficiency, reusable UI architecture, mobile-first styling, interaction design, and static deployment practices.

---

*This project is a fictional demonstration. No relationship to an existing tattoo business is implied.*
