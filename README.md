# UMBRAL Tattoo Atelier — Bilingual Tattoo Studio & Booking Demo

A responsive, editorial tattoo-studio portfolio built with **React, TypeScript, Vite, React Router, CSS Modules, Lucide React, and SweetAlert2**. The public experience includes an image-led studio presentation, individual artist profiles, a style-filtered gallery, a service catalog, and a demonstration inquiry flow. A separate administrative experience supports appointments, services, prices, opening hours, and deposits.

**Portfolio concept only.** UMBRAL, its artists, customer records, contact information, booking data, and prices are fictional. Nothing entered in this demo reaches a real business.

## Key features

- **Responsive public pages:** Home, Studio, Artists, Gallery, Services, and Contact.
- **Spanish and English** support across public and administrative interfaces.
- **Dark and light themes** with browser-saved preferences.
- **Custom old-school dual-coil tattoo machine icon** in the brand, admin navigation, sign-in page, and SVG favicon.
- **Distinct artist visuals** for Alma Ríos, Dante Vidal, and Vera Montes; the same image asset is not used across artist profiles.
- **Six distinct AI-generated tattoo styles shown on skin:** Fineline (fine botanical lines), Blackwork (large solid-black coverage), Ornamental (mandala), Realism (color pet portrait), Old School (color eagle and rose), and Oriental (red Japanese oni mask). One gallery card per style; style filtering and keyboard-accessible lightbox.
- **Three distinct, newly AI-generated Full HD interior scenes** for the studio banner, studio experience block, and Home introduction, with no repeated photo across those slots.
- **Locally bundled image assets** so visual rendering does not depend on an external image CDN. Full-screen hero art is packaged at 2560 × 1440 pixels, and other presentation images at approximately 1920 × 1280 or 1500 × 1900 pixels.
- **Public appointment simulation** with open-date selection, time-slot availability, service durations, and local appointment records.
- **Admin service and price management** with editable localized descriptions and duration settings.
- **Admin appointment management:** create, edit, cancel, restore, remove, and mark deposits through dialogs.
- **Configurable opening hours** and overlapping-appointment checks.
- **Demo credentials displayed on the login screen** for easy evaluation.
- **Browser-only persistence:** booking/service data in `localStorage`, demo login state in `sessionStorage`.

## Demo login

Visit `/admin/login`, or use the **Iniciar sesión / Sign in** link.

| Field | Demo credential |
| --- | --- |
| Email | `admin@demo.tattoo` |
| Password | `Demo2026!` |

These credentials and authorization checks live entirely in the frontend and **must never be treated as secure authentication**.

## Image provenance and quality

The six gallery artworks are **AI-generated conceptual images of tattoos on skin**, included as local WebP files in `public/images`. Each category has one distinct representative image, with no repeated category cards and no individual artwork titles. **Realism** shows a full-color golden retriever portrait; **Blackwork** features dense solid-black ink; **Fineline** features delicate black botanical lines; **Ornamental** uses a mandala; **Old School** shows a colorful eagle and rose; and **Oriental** features a red oni mask.

The three artist images are also fictional AI-created portraits of tattoo artists; the gallery and artist photos use separate image files. The **three different interior images** used by the `/estudio` studio banner, `/estudio` experience section, and Home introduction were generated specifically for this update, then exported to 1920 × 1080 WebP. Their AI source renders were 1672 × 941, so the last resize improves delivery resolution without inventing source-level photographic detail. Other studio and atmospheric images may still come from previously processed/upscaled illustrative reference material. Images depict **fictional people, venues and examples**; they are not actual completed work by a real studio.

All images are packaged locally and do not require third-party image hosting. See `public/images/README.md` for the file mapping.

## Architecture

```text
public/
├── favicon.svg                  # Custom coil tattoo machine icon
├── icons/                       # Language icons
└── images/                      # Bundled concept images (no remote URLs)

src/
├── admin/                       # Session demo, appointments, services, seed data, dialogs
├── components/
│   ├── TattooMachineIcon/       # Reusable custom SVG artwork
│   ├── ArtistCards/             # Three distinct artist images
│   ├── ArtworkGrid/             # Six styles + accessible filter and modal navigation
│   ├── StudioImage/             # Local image wrapper
│   ├── BookingWidget/           # Public booking demo
│   ├── Header/                  # Responsive site navigation
│   └── ...
├── context/DisplayContext.tsx   # ES/EN and dark/light preferences
├── data/SiteContent.ts         # Localized public copy, artists, artwork metadata
├── pages/                       # Public and administrator routes
├── styles/                      # Global colors and responsive styles
├── App.tsx
└── Main.tsx

scripts/VerifyAssets.mjs         # Checks that local image assets are present
```

The original public components and administrator logic are retained. The gallery retains the six AI-generated tattoo styles, one card per category; the three artists retain their separate portraits. This update replaces the three repeated interior scenes with different, locally bundled Full HD images without changing component logic, booking behavior, translations, or themes.

## Local setup

**Requirements:** a current Node.js and npm version compatible with the dependency stack.

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

The assets are already in `public/images`. `postinstall` checks that all expected assets exist and **does not download** any photographs. The production build is compatible with Vercel's Vite hosting flow and the included `vercel.json` SPA rewrites.

For a safe complete-project replacement, keep your existing `.git` directory and any intentionally configured local `.env` files, and replace the other project files with those from this ZIP. Run `npm install` to regenerate the `package-lock.json` if needed.

## Scope and limitations

The app is a standalone demonstration, not a business booking product. It has no actual identity management, secure authentication, transactional database, cross-device synchronization, real appointment notifications, payments, or contact inbox. Since local browsers keep independent databases, a customer's demo booking is visible only in the same browser's admin panel. Never enter real customer information.

A production implementation would require authenticated backend endpoints, server-enforced authorization, a shared database, reliable booking concurrency, privacy controls, and verified notification and payment integrations.

## Author

**Pablo Gilabert** — Software Developer  
Source: https://github.com/pablo-gilabert/tattoo-studio-demo
